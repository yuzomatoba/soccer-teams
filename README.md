# :ball: Soccer Team Project ! :ball:

The Socccer Team Project target was focused on developing an API to the Front-end, which the score and the games were sent to the requester. Besides, additional games could be added if the user and the token were validated.

The MSC Architecture was the tool to build it.

<details><summary>Project Structure</summary></br>

This project was structured in 4 parts:

:one: Database:
Database was responsible for obtaining the data to the Back-end.

:two: Back-end:
From the port 3001, The Back-end requested therequired data;
The app was initialized from the following path: app/backend/src/server.ts;
It was ensured that the express was executed and the app listened through the port the enviroment variables;

:three: Front-end:
The Front-end was built by the teachers.

:four: Docker:
The docker compose command had the responsability to gather all the containers (Back-end, Front-end and Database) and take them up through the "npm run compose:up" command;
