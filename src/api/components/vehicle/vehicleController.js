import { getOneHelper } from '../../helpers/commonHelpers.js';
import { handleError, handleResponse } from '../../helpers/requestHelper.js';
import { cacheServer } from '../../middleware/cacheMiddleware.js';
import { getVehicles } from './vehicleService.js';

export const getAllVehicles = async (req, res) => {
  try {
    const { search, page, limit, sortBy, sortKey } = req.query;
    const response = await getVehicles({
      search,
      page,
      limit,
      sortBy,
      sortKey,
    });

    // Setting in-memory cache store
    response.url = req.url;
    cacheServer.set('vehicles', response);

    return handleResponse({
      res,
      data: response.results,
      result: response.resultCount,
      total: response.totalCount,
    });
  } catch (error) {
    return handleError({ res, err: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = 'vehicles';

    const response = await getOneHelper(resource, id);

    if (response?.error) {
      return handleError({
        res,
        statusCode: response?.status || 404,
        err: response.error,
      });
    }

    response.url = req.url;
    cacheServer.set('singleVehicleDoc', response);

    return handleResponse({
      res,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return handleError({ res, err: error.message });
  }
};
