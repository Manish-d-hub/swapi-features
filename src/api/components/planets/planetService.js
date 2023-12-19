import axios from 'axios';
import config from '../../config/config.js';

export const getPlanets = async (dataObj) => {
  try {
    let { search, page, limit } = dataObj;
    limit = limit > 0 ? +limit : 20;
    page = page > 0 ? +page - 1 : 0;

    let results = await axios.get(`${config.swapiBaseUrl.planets}`);
    results = results.data;

    // Implementing search
    if (search) {
      search = new RegExp(search, 'i');
      results = results
        .map((el) => {
          if (el.name.match(search)) return el;
          if (el.climate.match(search)) return el;
          if (el.terrain.match(search)) return el;
        })
        .filter((el) => el);
    }

    // Paginating and counting results
    const totalCount = results.length;
    results = results.slice(page * limit, page * limit + limit);
    const resultCount = results.length;

    return { totalCount, resultCount, results };
  } catch (error) {
    return error;
  }
};
