import {GcodeParser} from "../src";
import {expect} from "chai";

describe("GcodeParser", () => {
  const gcodeParser = new GcodeParser();


  const expectParseLine = (line, result) => {
    expect(gcodeParser.parseLine(line)).to.deep.equal({line, ...result});
  };

  describe("parseLine", () => {
    it("parses bare command", () => {
      expectParseLine("G0", {
        words: [["G", 0]],
      });
    });

    it("parses command with arguments", () => {
      expectParseLine("G0 X110 Y220 Z330", {
        words: [["G", 0], ["X", 110], ["Y", 220], ["Z", 330]],
      });
    });

    it("parses command with duplicate arguments", () => {
      expectParseLine("G0 X110 Y220 Z330 X120 X130 Y230", {
        words: [["G", 0], ["X", 110], ["Y", 220], ["Z", 330], ["X", 120], ["X", 130], ["Y", 230]],
      });
    });

    it("parses command with string arguments", () => {
      expectParseLine("M16 this is a long message", {
        words: [["M", 16], ["string", "this is a long message"]],
      });
    });

    it("doesn't parse parameter as string argument if command doesn't accept them", () => {
      expectParseLine("G1 this is a long message", {
        words: [["G", 1]],
      });
    });

    it("doesn't parse normal parameters, even it has string arguments and command doesn't accept them", () => {
      expectParseLine("G1 X110 this Y220 is Z330 a long message", {
        words: [["G", 1], ["X", 110], ["Y", 220], ["Z", 330]],
      });
    });

    it("parses line number", () => {
      expectParseLine("N123 G1 X110 this Y220 is Z330 a long message", {
        words: [["G", 1], ["X", 110], ["Y", 220], ["Z", 330]],
        ln: 123,
      });
    });

    it("parses checksum", () => {
      expectParseLine("N123 G1 X110 this Y220 is Z330 a long message *127", {
        words: [["G", 1], ["X", 110], ["Y", 220], ["Z", 330]],
        ln: 123,
        cs: 127,
      });
    });

    it("ignores ';' comments", () => {
      expectParseLine("G1 X110 this Y220 is Z330 a long message ; X600 this is a comment X300 Y400 Z500", {
        words: [["G", 1], ["X", 110], ["Y", 220], ["Z", 330]],
      });
    });

    it("ignores '('/')' comments", () => {
      expectParseLine("G1 X110 (comment) this Y220 (longer comment X700) is Z330 (Y800) a long message ; X600 this is a comment X300 Y400 Z500", {
        words: [["G", 1], ["X", 110], ["Y", 220], ["Z", 330]],
      });
    });
  });
});
