# ⚽ Soccer Team Project  ⚽

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

</details>

---
🛠️ Built using

It was created using the following tools:
- MSC Architecture (Model, Service, Controller);
- Docker;
- MySQL;
- Express;
- API Rest;
- Sequelize ORM;
- JWT (Jason Web Token);
- Sinon;
- Chai;
- TypeScript;
- Middlewares.

---
## 💙 Routes - Endpoints

### Getting all the registered teams
``` http
GET /teams
```
<details><summary>Sample:</summary></br>

Successful case (status: 200):
```json
[
  {
    "id": 1,
    "teamName": "Botafogo"
  },
  {
    "id": 2,
    "teamName": "Corinthians"
  },
  ...
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]
```
</details>

### Getting the specific team by the ID
``` http
GET /teams/:id
```
<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
  {
	"id": 6,
	"teamName": "Ferroviária"
  }
```
</details>

### Login Route

To this requirement, the API received a validated email and a validated password. Also, both of them were registered in the database.
Sample:
```json
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```
``` http
POST /login
```
<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
{
  "token": *created token here 
}
```
Error case (status: 400):
```json
{
  "message": "All fields must be filled"
}
```
Error case (status: 401):
```json
{
  "message": "Invalid email or password"
}
```

</details>



