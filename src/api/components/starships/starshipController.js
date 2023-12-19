import { getOneHelper } from '../../helpers/commonHelpers.js';
import { handleError, handleResponse } from '../../helpers/requestHelper.js';
import { cacheServer } from '../../middleware/cacheMiddleware.js';
import { getStarships } from './starshipService.js';

export const getAllStarships = async (req, res) => {
  try {
    const { search, page, limit, sortBy, sortKey } = req.query;
    const response = await getStarships({
      search,
      page,
      limit,
      sortBy,
      sortKey,
    });

    // Setting in-memory cache store
    response.url = req.url;
    cacheServer.set('starships', response);

    return handleResponse({
      res,
      data: response.results,
      result: response.resultCount,
      total: response.totalCount,
    });
  } catch (error) {
    console.log(error);
    return handleError({ res, err: error.message });
  }
};

export const getStarshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = 'starships';

    const response = await getOneHelper(resource, id);

    if (response?.error) {
      return handleError({
        res,
        statusCode: response?.status || 404,
        err: response.error,
      });
    }

    response.url = req.url;
    cacheServer.set('singleStarshipDoc', response);

    return handleResponse({
      res,
      data: response,
    });
  } catch (error) {
    return handleError({ res, err: error.message });
  }
};
