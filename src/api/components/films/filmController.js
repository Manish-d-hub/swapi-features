import { getOneHelper } from '../../helpers/commonHelpers.js';
import { handleError, handleResponse } from '../../helpers/requestHelper.js';
import { cacheServer } from '../../middleware/cacheMiddleware.js';
import { getFilms } from './filmService.js';

export const getAllFilms = async (req, res) => {
  try {
    const {
      search,
      page,
      limit,
      sortBy,
      sortKey,
      releaseStartDate,
      releaseEndDate,
    } = req.query;
    const response = await getFilms({
      search,
      page,
      limit,
      sortBy,
      sortKey,
      releaseStartDate,
      releaseEndDate,
    });

    // Setting in-memory cache store
    response.url = req.url;
    cacheServer.set('films', response);

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

export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = 'films';

    const response = await getOneHelper(resource, id);

    if (response?.error) {
      return handleError({
        res,
        statusCode: response?.status || 404,
        err: response.error,
      });
    }

    response.url = req.url;
    cacheServer.set('singleFilmDoc', response);

    return handleResponse({
      res,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return handleError({ res, err: error.message });
  }
};
