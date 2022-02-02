import {DocumentationService} from "../../src";
import {expect} from "chai";
import {documentationService} from "./documentationService.fixture";

describe("DocumentationService", () => {
  describe("getSearchResult", () => {
    it("returns search result when query starts with '?'", () => {
      const result = documentationService.getSearchResult("?Seuss");
      expect(result.isSearch).to.be.true;
      expect(result.docItems.map(docItem => docItem.docItem.id).sort()).to.deep.equal(["Marlin.G11[0]", "Marlin.G12[0]"].sort());
    });
  });

  describe("getSearchResult", () => {
    const result = documentationService.getSearchResult("G0 X110 Y220 X120 Z330 Y230 Y240");
    expect(result.isEmpty).to.be.false;
    expect(result.isSearch).to.be.false;
    expect(result.parsedParameters).to.deep.equal({
      X: [110, 120], Y: [220, 230, 240], Z: [330],
    });
    expect(result.docItems.map(docItem => docItem.docItem.id).sort()).to.deep.equal(["Marlin.G0[0]"].sort())
  });
});
