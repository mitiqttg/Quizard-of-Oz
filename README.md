## Contents
An application that can be used to create quizzes in topics and practicing random quizzes from the database.

<img src="./drill-and-practice\views\layouts\gifApp.gif" width="800" height="500">

## Online deployment:
The application can be found at this link: "expired link - no free storage left"

## Local deployment: Starting and shutting down

The application runs locally with Docker Compose.

- To start the application, open up the terminal in the folder that
  contains the `docker-compose.yml` file, in my case, you can right click on wsd-walking-skeleton-main, 
  choose ```Open in Intergrated Terminal ```,<br> 
  then type ```docker-compose up``` to terminal, click Enter and wait for a bit...<br>
  Finally, go to "http://localhost:7777/" to experience the application.

- To stop the application, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command ```docker-compose up```. Another option is to open up
  a new terminal and navigate to the folder that contains the
  ```docker-compose.yml``` file, and then write ```docker-compose stop```.

## E2E Tests with playwright

To test the application locally, you must first launch the application by docker as the above instructions.
To run E2E tests, go to the same root as when you launch the project above, using the following command:
```docker-compose run --entrypoint=npx e2e-playwright playwright test```<br>
  <img src="./pics/startTest.png" alt="E2E test" style="height: 200px; width:1000px;"/>
