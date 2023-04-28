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

### Login Response Type

After the login, the created token was received by the "Authorization" in the header field.

``` http
GET /login/role
```
<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
{
  "role": "admin"
}
```
Error case (satus: 401):
```json
{
 "message": "Token not found"
}

or

{
  "message": "Token must be a valid token"
}
```

</details>

### Getting all the matches
``` http
GET /matches
```
<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
[
  {
    "id": 4,
    "homeTeamId": 13,
    "homeTeamGoals": 3,
    "awayTeamId": 4,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Ferroviária"
    }
  },
  ...
  {
    "id": 54,
    "homeTeamId": 7,
    "homeTeamGoals": 1,
    "awayTeamId": 9,
    "awayTeamGoals": 2,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Palmeiras"
    },
    "awayTeam": {
      "teamName": "São Paulo"
    }
  },
  {
    "id": 48,
    "homeTeamId": 11,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Grêmio"
    },
    "awayTeam": {
      "teamName": "Corinthians"
    }
  }
]
```

</details>

### Getting the game by the status

For ongoing matches:
``` http
GET /matches?inProgress=true
```

For finished matches:
``` http
GET /matches?inProgress=false
```
<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
[
  {
    "id": 14,
    "homeTeamId": 15,
    "homeTeamGoals": 2,
    "awayTeamId": 7,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Atlético Mineiro"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 39,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 3,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Real Brasília"
    }
  }
]
```
Error case (status: 500):
```json
{
  "message": "Invalid parameter"
}
```

</details>

### Updating status changed to "finished"
*PS: Created token was necessary to avoid an error reponse.*

``` http
PATCH /matches/:id/finish
```
<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
{
  "message": "Finished"
}
```
Error case (status: 404):
```json
{
  "message": "Match not found"
}
```
</details>

### Updating score match
Updating match score required home team goal and away team goal.
*PS: Created token was necessary to avoid an error reponse.*

```json
{
  "homeTeamGoals": 4,
  "awayTeamGoals": 3
}
```

``` http
PATCH /matches/:id
```

<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
{
  "message": "Score updated"
}
```
Error case (statu: 404):
```json
{
  "message": "Match not found"
}
```

</details>

### Adding new match
To add a new match, API received in its body, home team goal and away team goal.
*PS: Created token was necessary to avoid an error reponse.*

```json
{
  "homeTeamId": 1, 
  "awayTeamId": 2, 
  "homeTeamGoals": 3,
  "awayTeamGoals": 3
}
```

``` http
POST /matches
```

<details><summary>Sample</summary></br>

Successful case (status: 201):
```json
{
  "id": 49,
  "homeTeamId": 1,
  "awayTeamId": 2,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

</details>

### View summary of home matches for all team

``` http
GET /leaderboard/home
```

<details><summary>Sample</summary></br>

Successful case (status: 200):

```json
[
  {
    "name": "São Paulo",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Grêmio",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": "77.78"
  },
  ...
  {
    "name": "Corinthians",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```

</details>

### View summary of away matches for all teams

``` http
GET /leaderboard/away
```
<details>Sample</summary></br>

Successful case (status: 200):

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": "66.67"
  },
  ...
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 4,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 4,
    "goalsFavor": 1,
    "goalsOwn": 13,
    "goalsBalance": -12,
    "efficiency": "0.00"
  }
]
```

</details>


### View total summary of away and home team matches for all teams

``` http
GET /leaderboard/
```

<details><summary>Sample</summary></br>

Successful case (status: 200):
```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  ...
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 6,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 4,
    "goalsFavor": 3,
    "goalsOwn": 15,
    "goalsBalance": -12,
    "efficiency": "11.11"
  }
]
```

</details>

---

## 🚀 Project view

1. Cloning the repository
 
```bash
git clone https://github.com/Wanderson-rpf/API-Football-championship-management.git
```

2. Accessing the root directory

```bash
cd API-Football-championship-management/app/
```

3. Executing docker compose

```bash
docker-compose up -d --build
```

4. Running in production mode

```bash
npm start
```

5. Running in developing mode

```bash
npm run dev
```

PS: The container was configured to start in the development mode.

## :man_technologist: Built by Yuzo Matoba
[Yuzo Matoba](https://www.linkedin.com/in/fabio-yuzo/)


