import {DocumentationService} from "../../src";
import {expect} from "chai";
import {documentationService} from "./documentationService.fixture";

describe("DocumentationService", () => {
  describe("findDocsIds", () => {
    const expectFindDocIds = (searchString, ids) => {
      expect(documentationService.findDocsIds(searchString).sort()).to.deep.equal(ids.sort());
    };

    it("finds none with empty search string", () => {
      expectFindDocIds("", []);
    });

    it("finds one matching command", () => {
      expectFindDocIds("G0", ["Marlin.G0[0]"]);
    });

    it("finds one partially matching title", () => {
      expectFindDocIds("Linear", ["Marlin.G0[0]"]);
    });

    it("finds one partially matching brief", () => {
      expectFindDocIds("filament", ["Marlin.G20[0]"]);
    });

    it("finds many matching command", () => {
      expectFindDocIds("G1", ["Marlin.G11[0]", "Marlin.G12[0]"]);
    });

    it("finds many partially matching title", () => {
      expectFindDocIds("Weird", ["Marlin.G11[0]", "Marlin.G12[0]"]);
    });

    it("finds many partially matching brief", () => {
      expectFindDocIds("Seuss", ["Marlin.G11[0]", "Marlin.G12[0]"]);
    });
  });
});
