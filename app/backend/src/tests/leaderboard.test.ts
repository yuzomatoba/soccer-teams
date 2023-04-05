import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

import {app} from '../app';

import Match from '../database/models/match.model';
import leaderboardHomeMock from './mocks/leaderboardHome.mock';
import ILeaderboard from '../interfaces/ILeaderboard';
import { Response } from 'superagent';
import leaderboardAwayMock from './mocks/leaderboardAway.mock';

describe('Verifica a rota /leaderboard', () => {
  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Verifica o método GET na rota /leaderboard/home', () => {
it('Se é possível verificar a classificação dos times que jogaram na casa', async () => {
sinon.stub(Match, 'findAll').resolves(leaderboardHomeMock as ILeaderboard[] | any);
chai.request(app).get('/leaderboard/home');

expect(response.status).to.be.equal(200);
expect(response.body).to.be.deep.equal(leaderboardHomeMock);
});
  });

  describe('Verifica o método GET na rota /leaderboard/away', () => {
it('Se é possível verificar a classificação dos times que jogaram fora de casa', async () => {
  sinon.stub(Match, 'findAll').resolves(leaderboardAwayMock as ILeaderboard[] | any);

  const response = await chai.request(app).get('/leaderboard/away');

  expect(response.status).to.be.equal(200);
  expect(response.body).to.be.deep.equal(leaderboardAwayMock);
});
  });

  describe('Verificando o método GET em /leaderboard', () => {
it('Se obtêm a classificação geral dos times', async () => {
sinon.stub(Match, 'findAll').resolves(leaderboardHomeMock as [unknown[], any]);
sinon.restore()
sinon.stub(Match, 'findAll').resolves(leaderboardAwayMock as [unknown[], any]);

const response = await chai.request(app).get('/leaderboar');

expect(response.status).to.be.equal(200);
});
  });
});