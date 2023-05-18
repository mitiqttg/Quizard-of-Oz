## Contents
An application that can be used to create quizzes in topics and practicing random quizzes from the database.

## Online deployment:
The application can be found at this link: 

## Local deployment: Starting and shutting down

The application runs locally with Docker Compose.

- To start the application, open up the terminal in the folder that
  contains the `docker-compose.yml` file and type ```docker-compose up```.
- To stop the application, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command ```docker-compose up```. Another option is to open up
  a new terminal and navigate to the folder that contains the
  ```docker-compose.yml``` file, and then write ```docker-compose stop```.

## E2E Tests with playwright

The walking skeleton comes also with simple
[Playwright](https://playwright.dev/) configuration that provides an easy
approach for building end-to-end tests. Check out the folder `tests` within
`e2e-playwright` to get started.

To run E2E tests, launch the project using the following command:
```
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
```