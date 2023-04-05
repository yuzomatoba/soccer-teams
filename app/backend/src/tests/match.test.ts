import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import {App} from '../app';
import matchMock from './mocks/match.mock';

import { Response } from 'superagent';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import IMatch from '../interfaces/IMatch';
import * as jsonwebtoken from 'jsonwebtoken';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verifica a rota /matches', () => {
  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Verificando o método GET, na rota /matches', () => {

it('Os dados de todas as partidas são obtidas', async () => {
  sinon.stub(Match, "findAll").resolves(matchMock as unknown as Match[]);

  const response = await chai.request(app).get('/matches');

  expect(response.status).to.be.equal(200);
  expect(response.body).to.be.deep.equal(matchMock);
});
  });

describe('Verifica se o GET da rota /matches?inProgress=true', () => {

it('Se retorna todas as partidas que estão em progresso', async () => {
 const matchesInProgress = matchMock.filter((match) => match.inProgress === true);

 sinon.stub(Match, "findAll").resolves(matchesInProgress as unknown as Match[]);

 const response = await chai.request(app).get('/matches?inProgress=true');

 expect(response.status).to.be.equal(200);
 expect(response.body).to.be.deep.equal(matchesInProgress);
});

it('Obtém todas as partidas finalizadas', async () => {
  const endedMatch = matchMock.filter((match) => match.inProgress === false);

  sinon.stub(Match, "findAll").resolves(endedMatch as unknown as Match[]);

  const response = await chai.request(app).get('/matches?inProgress=false');

  expect(response.status).to.be.equal(200);
  expect(response.body).to.be.deep.equal(endedMatch);
});
});

describe('Verifica através do método PATCH a rota /:id', () => {

it('Se é possível atualizar gols de uma partida', async () => {
  sinon.stub(Match, "update").resolves();

  const response = await chai.request(app).patch('/matches/1').send({
    homeTeamGoals: 4,
    awayTeamGoals: 2
  });

  expect(response.status).to.be.equal(200);
  expect(response.body).to.be.deep.equal({ message: 'Match is updated!' });
});
});

describe('Verifica o método PATCH, utilizando /:id/finish', () => {

it('E atualiza partida como finalizada', async () => {
  sinon.stub(Match, "update").resolves();

  const response = await chai.request(app).patch('/matches/1/finish');

  expect(response.status).to.be.equal(200);
  expect(response.body).to.be.deep.equal({ message: 'Ended' });
});
});

describe('Verifica o método POST, rota /matches', () => {

it('Se insere uma nova partida', async () => {
  const result = {
    id: 22,
    homeTeam: 14,
    awayTeam: 5,
    homeTeamGoals: 3,
    awayTeamGoals: 4,
    inProgress: true
  }

  sinon.stub(jsonwebtoken, 'verify').resolves({ email:'admin@admin.com', password: 'secret_admin' });
  sinon.stub(Team, "findByPk")
  .onCall(0).resolves({ id: 1, teamName: 'Corinthians'} as any)
  .onCall(1).resolves({ id: 1, teamName: 'Corinthians'} as any);
  sinon.stub(Match, "create").resolves(result as IMatch | any);

  const response = await chai.request(app).post('/matches').send({
    homeTeam: 15,
    awayTeam: 5,
    homeTeamGoals: 3,
    awayTeamGoals: 3,
  })
  .set('authorization', 'ouououououou');

  expect(response.status).to.be.equal(201);
  expect(response.body).to.be.deep.equal(result);
});

it('Verifica que partida não pode ser inserida sem um token válido', async () =>{
sinon.stub(jsonwebtoken, 'verify').resolves();
const response = await chai.request(app).post('/matches').send({
  homeTeam: 18,
  awayTeam: 5,
  homeTeamGoals: 3,
  awayTeamGoals: 3,
})
.set('authorization', '');

expect(response.status).to.be.equal(401);
expect(response.body).to.be.deep.equal({message: 'Token not found' });
}); 

it('Partida não pode ser iniciada sem o token válido', async () => {
sinon.stub(jsonwebtoken, 'verify').throws();

const response = await chai.request(app).post('/matches').send({
  homeTeam: 15,
  awayTeam: 7,
  homeTeamGoals: 3,
  awayTeamGoals: 3,
})
.set('authorization', 'oslndoonoand');

expect(response.status).to.be.equal(401);
expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
});

it('Times iguais não podem ser inseridos', async () => {
  sinon.stub(jsonwebtoken, 'verify').resolves({ email: 'admin@admin.com', password: 'secret_admin' });

  const response = await chai.request(app).post('/matches').send({
    homeTeam: 7,
    awayteam: 7,
    homeTeamGoals: 3,
    awayTeamGoals: 3,
  })
  .set('authorization', 'oslndoonoand');

  expect(response.status).to.be.equal(422);
  expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
});
});

it('Verifica quando a partida não existe', async () => {
  response = await chai.request(app).get('/matches/447');

  expect(response.status).to.be.equal(404);
  expect(response.body).to.be.deep.equal({ message: 'Match not found'});
});

it('Verifica se uma nova partida é solicitada pelo PATCH', async () => {
  response = await chai.request(app).patch('/matches/41/finish');

  expect(response.status).to.be.equal(200);
  expect(response.body).to.be.deep.equal({ message: 'Ended match'});
});
});

