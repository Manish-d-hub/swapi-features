import axios from 'axios';
import config from '../../config/config.js';

export const getFilms = async (dataObj) => {
  try {
    let {
      search,
      sortBy,
      sortKey,
      page,
      limit,
      releaseStartDate,
      releaseEndDate,
    } = dataObj;
    limit = limit > 0 ? +limit : 20;
    page = page > 0 ? +page - 1 : 0;

    let results = await axios.get(`${config.swapiBaseUrl.films}`);
    results = results.data;

    // Implementing search
    if (search) {
      search = new RegExp(search, 'i');
      results = results
        .map((el) => {
          if (el.director.match(search)) return el;
          if (el.producer.match(search)) return el;
          if (el.title.match(search)) return el;
        })
        .filter((el) => el);
    }

    // Adding date-range filter
    if (releaseStartDate && releaseEndDate) {
      results = results
        .map((el) => {
          const releaseDate = new Date(el.release_date);
          const startDate = new Date(releaseStartDate);
          const endDate = new Date(releaseEndDate);

          if (releaseDate >= startDate && releaseDate <= endDate) {
            return el;
          }
        })
        .filter((el) => el);
    }

    // Sorting based on count of below values
    const sortConst = [
      'episode_id',
      'species',
      'starships',
      'vehicles',
      'characters',
      'planets',
    ];
    if (sortBy && sortConst.includes(sortBy)) {
      if (sortKey === 'desc') {
        if (sortBy === 'episode_id') {
          results = results.sort((a, b) => b[sortBy] - a[sortBy]);
        } else {
          results = results.sort((a, b) => b[sortBy].length - a[sortBy].length);
        }
      } else {
        if (sortBy === 'episode_id') {
          results = results.sort((a, b) => a[sortBy] - b[sortBy]);
        } else {
          results = results.sort((a, b) => a[sortBy].length - b[sortBy].length);
        }
      }
    }

    // Paginating and counting the documents
    const totalCount = results.length;
    results = results.slice(page * limit, page * limit + limit);
    const resultCount = results.length;

    return { totalCount, resultCount, results };
  } catch (error) {
    return error;
  }
};
