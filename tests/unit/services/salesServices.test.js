const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const salesModel = require("../../../src/models/salesModel");
const { salesMock, saleIdInvalid, saleById } = require("../../../src/utills/salesMocks");

const salesService = require("../../../src/services/salesService");

const { expect } = chai;
chai.use(sinonChai);

describe("Camada Service de sales", function () {
    afterEach(function () {
      sinon.restore();
    });
  
  it("Listar todas as vendas", async function () {
    sinon.stub(salesModel, "findAllSales").resolves(salesMock);

    const result = await salesService.findAllSales();

    expect(result.message).to.be.deep.equal(salesMock);
  });

  it('Listar vendas por id inexistente', async function () {
    const id = 99;

    sinon.stub(salesModel, "findSaleById").resolves(saleIdInvalid);

    const result = await salesService.findSaleById(id);

    expect(result.message).to.be.deep.equal(saleIdInvalid);
  });

  it("Listar vendas por id válido", async function () {
    const id = 1;

    sinon.stub(salesModel, "findSaleById").resolves(saleById);

    const result = await salesService.findSaleById(id);

    expect(result.message).to.be.deep.equal(saleById);
  });
});
