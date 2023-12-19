import { getOneHelper } from '../../helpers/commonHelpers.js';
import { handleError, handleResponse } from '../../helpers/requestHelper.js';
import { cacheServer } from '../../middleware/cacheMiddleware.js';
import { getSpecies } from './speciesService.js';

export const getAllSpecies = async (req, res) => {
  try {
    const { search, page, limit, sortBy, sortKey, designation } = req.query;
    const response = await getSpecies({
      search,
      page,
      limit,
      sortBy,
      sortKey,
      designation,
    });

    // Setting in-memory cache store
    response.url = req.url;
    cacheServer.set('species', response);

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

export const getSpecieById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = 'species';

    const response = await getOneHelper(resource, id);

    if (response?.error) {
      return handleError({
        res,
        statusCode: response?.status || 404,
        err: response.error,
      });
    }

    response.url = req.url;
    cacheServer.set('singleSpecieDoc', response);
    return handleResponse({
      res,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return handleError({ res, err: error.message });
  }
};
