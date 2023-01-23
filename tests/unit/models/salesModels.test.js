const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModel")
const salesMock = require("../../../src/utills/salesMocks");

const { expect } = chai;
chai.use(sinonChai);

describe("Camada Model de sales", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("Listar todas as vendas", async function () {
    sinon.stub(connection, "execute").resolves([salesMock.salesAll]);

    const result = await salesModel.findAllSales();

    expect(result).to.be.deep.equal(salesMock.salesAll);
  });

  it("Listar venda por id", async function () {
    sinon.stub(connection, "execute").resolves([salesMock[1]]);

    const result = await salesModel.findSaleById(2);

    expect(result).to.be.deep.equal(salesMock[1]);
  });
});
