import axios from 'axios';
import config from '../config/config.js';

export const getOneHelper = async (resource, itemId) => {
  try {
    console.log('helper', resource, itemId);
    let { data } = await axios.get(
      `${config.swapiBaseUrl[resource]}/${itemId}`,
    );
    return data;
  } catch (error) {
    return { error };
  }
};
