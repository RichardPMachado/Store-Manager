const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");
const { productsService } = require("../../../src/services");
const { productsModel } = require("../../../src/models");
const productsMock = require("../../../__tests__/_dataMock");
const { findById } = require("../../../src/models/products.model");
const { expect } = chai;


describe("Service de Products", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe(" Listar todos os produtos", function () {
    it("Deve retornar todos os produtos", async function () {
      sinon.stub(productsModel, "findAll")
        .resolves(productsMock.allProductsResponse);

      const result = await productsService.findAll();
      
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(productsMock.allProductsResponse);
    });
  });
  
  describe(" Listar produto pelo id", function () {
    it('Deve rotornar false se produto não existe', async function () {
      sinon.stub(productsModel, 'findById')
        .resolves(undefined);
      
      const result = await productsService.findById(998);

      expect(result.type).to.be.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.be.equal("Product not found");
    });

    it("Deve retornar o produto requerido", async function () {
      sinon
        .stub(productsModel, "findById")
        .resolves(productsMock.allProductsResponse[1]);

      const result = await productsService.findById(2);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(productsMock.allProductsResponse[1]);
    });
  });
});
