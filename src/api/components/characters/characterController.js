import { getOneHelper } from '../../helpers/commonHelpers.js';
import { handleError, handleResponse } from '../../helpers/requestHelper.js';
import { cacheServer } from '../../middleware/cacheMiddleware.js';
import { getCharacters } from './characterService.js';

export const getAllCharacters = async (req, res) => {
  try {
    const { search, page, limit, sortBy, sortKey, gender } = req.query;
    const response = await getCharacters({
      search,
      page,
      limit,
      sortBy,
      sortKey,
      gender,
    });

    // Setting in-memory cache store
    response.url = req.url;
    cacheServer.set('people', response);

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

export const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = 'people';
    const response = await getOneHelper(resource, id);

    if (response?.error) {
      return handleError({
        res,
        statusCode: response?.status || 404,
        err: response.error,
      });
    }

    response.url = req.url;
    cacheServer.set('singlePeopleDoc', response);

    return handleResponse({
      res,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return handleError({ res, err: error.message });
  }
};
