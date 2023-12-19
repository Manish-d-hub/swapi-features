# SWAPI Apis and Caching

This Node.js server provides RESTful Apis and a in-memory caching layer for the Star Wars API (SWAPI).

## Local setup

1. Install [Node.js](https://nodejs.org/en/download/) for your system (skip if installed).
2. Clone/fork/download this repository to your system.
3. Create an `.env` file in the top level of the project.
4. Refer .env.example file for environment variables and other required fields.
5. Install the required dependencies using `npm install` command.

## Features

1. **Caching**: Responses from the SWAPI are cached in memory to improve response times and reduce the load on the SWAPI server.

2. **Search, Sort, and Filter**: Custom Apis are created to fetch the third party swapi apis and advance searching, sorting, filtering, pagination is added

3. **Usage**

   - Start the server: (In development mode)

     ```bash
     npm run dev
     ```

4. **Documentation**

- Access Additional documentation about apis and schema [Here](https://documenter.getpostman.com/view/23781195/2s9YkoeMYQ)

## Contributing

Feel free to contribute to this project by opening issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
