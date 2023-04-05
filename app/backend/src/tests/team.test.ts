import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import {App} from '../app';
import teamMock from './mocks/team.mock';
import { Response } from 'superagent';
import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verifica a rota /teams', () => {
  
 let response: Response;

 afterEach(function() { sinon.restore() });

 describe('Verificando o GET em /teams', () => {

  it('Verifica se é feita a busca dos times pelo usuário', async () => {

    sinon.stub(Team, "findAll").resolves(teamMock as unknown as Team[]);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamMock);
  });

  it('Verifica se a busca de um time pelo id acontece', async () => {

    sinon.stub(Team, "findByPk").resolves(teamMock[0] as unknown as Team);

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamMock[0]);
  });
  
  it('Verifica que o time não existe', async () => {
    const response = await chai.request(app).get('/teams/999');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!'})
  });
 });
});