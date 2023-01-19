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
    it("Deve retornar status 200 e todos os produtos", async function () {
      sinon.stub(productsService, 'findAll')
        .resolves({ type: null, message: productsMock.allProductsResponse });
      
      await productsController.listProducts(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsMock.allProductsResponse);

    });
  });
  describe(" Buscar um produto pelo id", function () {
    it("Deve retornar status 200 e produto requisitado", async function () {
      req.params = { id: 3};
      sinon
        .stub(productsService, "findById")
        .resolves({ type: null, message: productsMock.allProductsResponse[2] });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(
        productsMock.allProductsResponse[2]
      );
    });
  });
});