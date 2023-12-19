import NodeCache from 'node-cache';
import { handleError, handleResponse } from '../helpers/requestHelper.js';

export const cacheServer = new NodeCache({ stdTTL: 60 * 10 });

// Caching middleware for multiple list of docs
export const getAllCacheMiddleware = (dataFor) => {
  try {
    return (req, res, next) => {
      if (cacheServer.has(dataFor)) {
        const response = cacheServer.get(dataFor);
        if (response.url === req.url) {
          console.log('Getting Data from CACHE');
          return handleResponse({
            res,
            data: response.results,
            result: response.resultCount,
            total: response.totalCount,
          });
        }
      }
      console.log('Getting Data from SERVER');
      return next();
    };
  } catch (error) {
    return handleError({ res, error });
  }
};

// Caching middleware for single docs
export const getOneCacheMiddleware = (dataFor) => {
  try {
    return (req, res, next) => {
      if (cacheServer.has(dataFor)) {
        const response = cacheServer.get(dataFor);
        if (response.url === req.url) {
          console.log('Getting Data from CACHE');
          return handleResponse({
            res,
            data: response,
          });
        }
      }
      console.log('Getting Data from SERVER');
      return next();
    };
  } catch (error) {
    return handleError({ res, error });
  }
};
