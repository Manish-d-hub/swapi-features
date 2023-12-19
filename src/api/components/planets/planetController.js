import { getOneHelper } from '../../helpers/commonHelpers.js';
import { handleError, handleResponse } from '../../helpers/requestHelper.js';
import { cacheServer } from '../../middleware/cacheMiddleware.js';
import { getPlanets } from './planetService.js';

export const getAllPlanets = async (req, res) => {
  try {
    const { search, page, limit } = req.query;
    const response = await getPlanets({
      search,
      page,
      limit,
    });

    // Setting in-memory cache store
    response.url = req.url;
    cacheServer.set('planets', response);

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

export const getPlanetById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = 'planets';

    const response = await getOneHelper(resource, id);

    if (response?.error) {
      return handleError({
        res,
        statusCode: response?.status || 404,
        err: response.error,
      });
    }

    response.url = req.url;
    cacheServer.set('singlePlanetDoc', response);
    return handleResponse({
      res,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return handleError({ res, err: error.message });
  }
};
