const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const salesService = require("../../../src/services/salesService");
const { salesAll } = require("../../../src/utills/salesMocks");
const salesController = require("../../../src/controllers/salesController");

const { expect } = chai;
chai.use(sinonChai);

describe("Camada Controller de sales", function () {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("Listar todas as vendas", async function () {
    sinon
      .stub(salesService, "findAllSales")
      .resolves({ type: null, message: salesAll });

    await salesController.listAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(salesAll);
  });

  it("Listar venda por id", async function () {
    req.params = { id: 1 };

    sinon.stub(salesService, "findSaleById").resolves({ type: null, message: salesAll[0] });

    await salesController.getSale(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(salesAll[0]);
  });
});
