const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");
const { productsService } = require("../../../src/services");
const productsMock = require("../../../__tests__/_dataMock");
const { findById } = require("../../../src/models/products.model");
const { productsController } = require("../../../src/controllers");
const { expect } = chai;

chai.use(sinonChai);

describe("Controller de Products", function () {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe(" Listar todos os produtos", function () {
    it("Deve retornar satus 200 e todos os produtos", async function () {
      sinon.stub(productsService, 'findAll')
        .resolves({ type: null, message: productsMock.allProductsResponse });
      
      await productsController.listProducts(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsMock.allProductsResponse);

    });
  });
});