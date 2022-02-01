import {GcodeParser, GcodeParseResult, PartialGcodeParserOptions} from "./GcodeParser";

export class KlipperExtendedGcodeParser {
  static re = /^([A-Z][A-Z_]+)(\s+.*)?$/im;
  static reParameter = /^\s*([A-Z][A-Z0-9_]+)\s*=\s*(\S*)/im;
  gcodeParser = new GcodeParser();

  parseLine(line: string, options: PartialGcodeParserOptions = {}): GcodeParseResult {
    const result: GcodeParseResult = {
      line,
      words: [],
    };

    const nameMatch = (this.constructor as typeof KlipperExtendedGcodeParser).re.exec(this.stripComments(line));
    if (!nameMatch) {
      return this.gcodeParser.parseLine(line, options);
    }
    const [, name, parametersText] = nameMatch;
    result.words!.push([name, '']);

    let parametersRest = (parametersText || '').trim();
    while (parametersRest) {
      const parameterMatch = (this.constructor as typeof KlipperExtendedGcodeParser).reParameter
        .exec(parametersRest);
      if (!parameterMatch) {
        break;
      }
      const [parameterText, parameter, value] = parameterMatch;
      result.words!.push([parameter, value]);
      parametersRest = parametersRest.slice(parameterText.length).trim();
    }

    return result;
  }

  static re1 = new RegExp(/\s*\([^\)]*\)/g); // Remove anything inside the parentheses
  static re2 = new RegExp(/\s*;.*/g); // Remove anything after a semi-colon to the end of the line, including preceding spaces

  // http://linuxcnc.org/docs/html/gcode/overview.html#gcode:comments
  // Comments can be embedded in a line using parentheses () or for the remainder of a lineusing a semi-colon. The semi-colon is not treated as the start of a comment when enclosed in parentheses.
  stripComments (line: string): string {
    return line
      .replace((this.constructor as typeof KlipperExtendedGcodeParser).re1, '')
      .replace((this.constructor as typeof KlipperExtendedGcodeParser).re2, '');
  }
}
