import 'dotenv/config';

const config = {
  port: process.env.PORT,
  swapiBaseUrl: {
    people: `${process.env.SWAPI_BASE_URL}/people`,
    starships: `${process.env.SWAPI_BASE_URL}/starships`,
    vehicles: `${process.env.SWAPI_BASE_URL}/vehicles`,
    species: `${process.env.SWAPI_BASE_URL}/species`,
    films: `${process.env.SWAPI_BASE_URL}/films`,
    planets: `${process.env.SWAPI_BASE_URL}/planets`,
  },
};

export default config;
