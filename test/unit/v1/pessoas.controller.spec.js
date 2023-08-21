

const { expect } = require('chai');
const { createSandbox } = require('sinon');

const PessoasController = require('../../../app/v1/controller/pessoas-post.controller');

const sbox = createSandbox();

describe('PessoasController', () => {
  afterEach(sbox.reset);

  const resHandlerReturn = {
    OK: sbox.spy(),
    SERVICE_UNAVAILABLE: sbox.spy(),
  };

  const resHandler = sbox.stub();

  context('Controller Instance', () => {
    let instance;

    beforeEach(() =>
      instance = PessoasController({ resHandler, repos: {} })
    );

    it('expect return function', () =>{
      expect(instance).to.be.a('function')
    });
  });

  context('Repository Call', () => {
    let instance;
    const pessoasRepository = {
      insertOne: sbox.stub(),
    };

    const deps = {
      repos: {
        pessoasRepository
      },
      resHandler,
    };

    const rs = {};
    const rq = {
      data: {
        nome: 'John Doe',
      }
    };

    beforeEach(async () => {
      resHandler.returns(resHandlerReturn)
      instance = await PessoasController(deps)(rq, rs);
    });

    it('expect resHandler.OK to have been called', async () => {
      expect(resHandler.called).to.be.true;
    });

    it('expect call PessoasRepository.insertOne', async () => {
      expect(pessoasRepository.insertOne.called).to.be.true;
    })

    it('expect call PessoasRepository.insertOne with rq.data', async () => {
      expect(pessoasRepository.insertOne.calledWith(rq.data)).to.be.true;
    });

    it('expect call resHandler.OK with message', async () => {
      expect(resHandlerReturn.OK.calledWith({
        message: 'Pessoa cadastrada com sucesso',
      })).to.be.true;
    });
  });
});
