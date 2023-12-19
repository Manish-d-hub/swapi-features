import axios from 'axios';
import config from '../../config/config.js';

export const getStarships = async (dataObj) => {
  try {
    let { search, sortBy, sortKey, page, limit } = dataObj;
    limit = limit > 0 ? +limit : 20;
    page = page > 0 ? +page - 1 : 0;

    let results = await axios.get(`${config.swapiBaseUrl.starships}`);
    results = results.data;

    // Implementing search
    if (search) {
      search = new RegExp(search, 'i');
      results = results
        .map((el) => {
          if (el.name.match(search)) return el;
          if (el.model.match(search)) return el;
          if (el.manufacturer.match(search)) return el;
          if (el.starship_class.match(search)) return el;
          if (el.consumables.match(search)) return el;
        })
        .filter((el) => el);
    }

    // Sorting based on count of below values
    const sortConst = ['films', 'pilots'];
    if (sortBy && sortConst.includes(sortBy)) {
      if (sortKey === 'desc') {
        results = results.sort((a, b) => b[sortBy].length - a[sortBy].length);
      } else {
        results = results.sort((a, b) => a[sortBy].length - b[sortBy].length);
      }
    }
    const totalCount = results.length;
    // Paginating the results
    results = results.slice(page * limit, page * limit + limit);
    const resultCount = results.length;

    return { totalCount, resultCount, results };
  } catch (error) {
    return error;
  }
};
