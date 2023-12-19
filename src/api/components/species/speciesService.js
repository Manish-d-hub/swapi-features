import axios from 'axios';
import config from '../../config/config.js';

export const getSpecies = async (dataObj) => {
  try {
    let { search, sortBy, sortKey, page, limit, designation } = dataObj;
    limit = limit > 0 ? +limit : 20;
    page = page > 0 ? +page - 1 : 0;

    let results = await axios.get(`${config.swapiBaseUrl.species}`);
    results = results.data;

    // Implementing search
    if (search) {
      search = new RegExp(search, 'i');
      results = results
        .map((el) => {
          if (el.name.match(search)) return el;
          if (el.language.match(search)) return el;
          if (el.classification.match(search)) return el;
          if (el.hair_colors.match(search)) return el;
          if (el.eye_colors.match(search)) return el;
          if (el.skin_colors.match(search)) return el;
        })
        .filter((el) => el);
    }

    // Adding filter on designation
    if (designation && ['sentient', 'reptilian'].includes(designation)) {
      results = results
        .map((el) => {
          if (el.designation === designation) return el;
        })
        .filter((el) => el);
    }

    // Sorting based on count of below values
    const sortConst = ['people', 'films'];
    if (sortBy && sortConst.includes(sortBy)) {
      if (sortKey === 'desc') {
        results = results.sort((a, b) => b[sortBy].length - a[sortBy].length);
      } else {
        results = results.sort((a, b) => a[sortBy].length - b[sortBy].length);
      }
    }

    // Paginating the results
    const totalCount = results.length;
    results = results.slice(page * limit, page * limit + limit);
    const resultCount = results.length;

    return { totalCount, resultCount, results };
  } catch (error) {
    return error;
  }
};
