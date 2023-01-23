const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const productsMock = require('../../../__tests__/_dataMock');
const { expect } = chai;


describe('Model de Products', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe(" Listar todos os produtos", function () {
    it("Deve retornar todos os produtos", async function () {
      sinon
        .stub(connection, "execute")
        .resolves([productsMock.allProductsResponse]);

      const result = await productsModel.findAll();
      expect(result).to.be.deep.equal(productsMock.allProductsResponse);
    });
  });
  describe(" Listar produto pelo id", function () {
    it("Deve retornar o produto requerido", async function () {
      sinon
        .stub(connection, "execute")
        .resolves([[productsMock.allProductsResponse[1]]]);

      const result = await productsModel.findById(2);
      expect(result).to.be.deep.equal(productsMock.allProductsResponse[1]);
    });
  });
});
