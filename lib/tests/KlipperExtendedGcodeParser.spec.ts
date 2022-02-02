import {expect} from "chai";
import {KlipperExtendedGcodeParser} from "../src";

describe("KlipperExtendedGcodeParser", () => {
  const gcodeParser = new KlipperExtendedGcodeParser();

  const expectParseLine = (line, result) => {
    expect(gcodeParser.parseLine(line)).to.deep.equal({line, ...result});
  };

  describe("parseLine", () => {
    it("parses Klipper bare command", () => {
      expectParseLine("SET_VELOCITY_LIMIT", {
        words: [["SET_VELOCITY_LIMIT", ""]],
      });
    });

    it("parses Klipper command with parameters", () => {
      expectParseLine("SET_VELOCITY_LIMIT VELOCITY=5 ACCEL=A_WORD_WITH_5_NUMBERS", {
        words: [["SET_VELOCITY_LIMIT", ""], ["VELOCITY", "5"], ["ACCEL", "A_WORD_WITH_5_NUMBERS"]],
      });
    });

    it("parses non-Klipper command", () => {
      expectParseLine("G1 X110 (comment) this Y220 (longer comment X700) is Z330 (Y800) a long message ; X600 this is a comment X300 Y400 Z500", {
        words: [["G", 1], ["X", 110], ["Y", 220], ["Z", 330]],
      });
    });
  });
});
