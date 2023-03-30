import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import {App} from '../app';
import User from '../database/models/user.model';
import token from './mocks/token.mock';

import { Response } from 'superagent';
import * as jsonwebtoken from 'jsonwebtoken';
import userMock from './mocks/user.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verifica a rota /login', () => {
 let response: Response;

 afterEach(function() {sinon.restore() });

 describe('Verificando o POST, em /login', () => {

  it('Se o usuário faz login com sucesso', async () => {

    sinon.stub(User, "findOne").resolves(userMock as unknown as User);
    sinon.stub(jsonwebtoken, 'sign').resolves(token);

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ token });
  });

  it('O usuário não informou o email', async () => {

    const response = await chai.request(app).post('/login').send({
      password: 'secret_admin'
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('O usuário não informou o password', async () => {

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com'
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('O email informado não é válido', async () => {

    const response = await chai.request(app).post('/login').send({
      email: 'admin@wrong.com',
      password: 'secret_admin'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('A senha informada não é válida', async () => {
    
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin',
      password: 'password'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
 });
});