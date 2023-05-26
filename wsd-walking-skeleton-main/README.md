## Contents
An application that can be used to create quizzes in topics and practicing random quizzes from the database.

## Online deployment:
The application can be found at this link: "https://apexpred.fly.dev/"

## Local deployment: Starting and shutting down

The application runs locally with Docker Compose.

- To start the application, open up the terminal in the folder that
  contains the `docker-compose.yml` file, in my case, you can right click on wsd-walking-skeleton-main, choose ```Open in Intergrated Terminal ```, 
  ![Open terminal](/assets/img/MarineGEO_logo.png "MarineGEO logo")
  and type ```docker-compose up```.
- To stop the application, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command ```docker-compose up```. Another option is to open up
  a new terminal and navigate to the folder that contains the
  ```docker-compose.yml``` file, and then write ```docker-compose stop```.

## E2E Tests with playwright

To test the application locally, you must first start the application by in docker as the above instructions.
To run E2E tests, launch the project using the following command:
```
docker-compose run --entrypoint=npx e2e-playwright playwright test
```