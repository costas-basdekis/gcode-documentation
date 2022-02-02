import {DocumentationService, KlipperExtendedGcodeParser} from "../../src";
import {expect} from "chai";

describe("DocumentationService", () => {
  const gcodeParser = new KlipperExtendedGcodeParser();

  describe("parseParameters", () => {
    const documentationService = new DocumentationService({});

    const expectParseParameters = (line, parameters) => {
      expect(documentationService.parseParameters(gcodeParser.parseLine(line))).to.deep.equal(parameters);
    };

    it("parses empty result list", () => {
      expectParseParameters("", {});
    });

    it("parses bare command", () => {
      expectParseParameters("G0", {});
    });

    it("parses command with parameters", () => {
      expectParseParameters("G0 X110 Y220 Z330", {
        X: [110], Y: [220], Z: [330],
      });
    });

    it("parses command with duplicate parameters", () => {
      expectParseParameters("G0 X110 Y220 X120 Z330 Y230 Y240", {
        X: [110, 120], Y: [220, 230, 240], Z: [330],
      });
    });

    it("parses bare Klipper command", () => {
      expectParseParameters("SET_VELOCITY_LIMIT", {});
    });

    it("parses Klipper command with parameters", () => {
      expectParseParameters("SET_VELOCITY_LIMIT VELOCITY=50 ACCEL=WORD_WITH_5_NUMBERS", {
        VELOCITY: ["50"], ACCEL: ["WORD_WITH_5_NUMBERS"],
      });
    });

    it("parses Klipper command with duplicate parameters", () => {
      expectParseParameters("SET_VELOCITY_LIMIT VELOCITY=50 ACCEL=WORD_WITH_5_NUMBERS VELOCITY=60 VELOCITY=70 ACCEL=lower-case-and-symbols?", {
        VELOCITY: ["50", "60", "70"], ACCEL: ["WORD_WITH_5_NUMBERS", "lower-case-and-symbols?"],
      });
    });
  });
});
