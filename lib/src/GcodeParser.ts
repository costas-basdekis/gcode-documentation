export type GcodeParserOptions = {
  flatten: boolean,
  noParseLine: boolean,
};
export type PartialGcodeParserOptions = {
  flatten?: boolean,
  noParseLine?: boolean,
};

export type GcodeParseResult = {
  line: string,
  words?: (string | [string | null, number | string | null] | null)[],
  cmds?: string[],
  ln?: number,
  cs?: number,
  err?: boolean,
};

// Adapted from https://github.com/cncjs/gcode-parser/blob/master/src/index.js
export class GcodeParser {
  static re = /(%.*)|({.*)|(\$\$|\$[a-zA-Z0-9#]*)|([a-zA-Z][0-9+\-.]+)|(\*[0-9]+)/igm;
  // Some commands have a string message, which is not parsed as normally
  static reStringMessage = /\s*([Nn]\s*[0-9+\-.]+)?\s*[Mm]\s*(16|23|28|30|33|117|118|928|81[0-9])([^0-9+\-.].*)/igm;
  static STRING_MESSAGE_PARAMETER_NAME: { [code: string]: string } = {
    16: 'string',
    23: 'filename',
    28: 'filename',
    30: 'filename',
    33: 'path',
    117: 'string',
    118: 'string',
    928: 'filename',
    810: 'command',
    811: 'command',
    812: 'command',
    813: 'command',
    814: 'command',
    815: 'command',
    816: 'command',
    817: 'command',
    818: 'command',
    819: 'command',
  }

  parseLine(line: string, options: PartialGcodeParserOptions = {}): GcodeParseResult {
    const fullOptions: GcodeParserOptions = {
      flatten: !!options.flatten,
      noParseLine: !!options.noParseLine,
      ...(options || {}),
    };

    const result: GcodeParseResult = {
      line: line,
    };

    if (fullOptions.noParseLine) {
      return result;
    }

    result.words = [];

    let ln; // Line number
    let cs; // Checksum
    const words = this.stripComments(line).match((this.constructor as typeof GcodeParser).re) || [];

    for (let i = 0; i < words.length; ++i) {
      const word: string = words[i];
      const letter: string = word[0].toUpperCase();
      const argument: string = word.slice(1);

      // Parse % commands for bCNC and CNCjs
      // - %wait Wait until the planner queue is empty
      if (letter === '%') {
        result.cmds = (result.cmds || []).concat(line.trim());
        continue;
      }

      // Parse JSON commands for TinyG and g2core
      if (letter === '{') {
        result.cmds = (result.cmds || []).concat(line.trim());
        continue;
      }

      // Parse $ commands for Grbl
      // - $C Check gcode mode
      // - $H Run homing cycle
      if (letter === '$') {
        result.cmds = (result.cmds || []).concat(`${letter}${argument}`);
        continue;
      }

      // N: Line number
      if (letter === 'N' && typeof ln === 'undefined') {
        // Line (block) number in program
        ln = Number(argument);
        continue;
      }

      // *: Checksum
      if (letter === '*' && typeof cs === 'undefined') {
        cs = Number(argument);
        continue;
      }

      let value: number | string = Number(argument);
      if (Number.isNaN(value)) {
        value = argument;
      }

      if (fullOptions.flatten) {
        result.words.push(letter + value);
      } else {
        result.words.push([letter, value]);
      }
    }

    // Line number
    (typeof (ln) !== 'undefined') && (result.ln = ln);

    const [command, stringMessage] = this.getStringMessage(line);
    if (command && stringMessage) {
      if (fullOptions.flatten) {
        result.words = [command, stringMessage];
      } else {
        const commandLetter = command[0];
        const commandNumber: string = command.slice(1);
        const parameterName: string = (this.constructor as typeof GcodeParser)
          .STRING_MESSAGE_PARAMETER_NAME[commandNumber];
        result.words = [
          [commandLetter, commandNumber],
          [parameterName, stringMessage],
        ];
      }
      return result;
    }

    // Checksum
    (typeof (cs) !== 'undefined') && (result.cs = cs);
    if (result.cs && (this.computeChecksum(line) !== result.cs)) {
      result.err = true; // checksum failed
    }

    return result;
  }

  getStringMessage(line: string): [string | null, string | null] {
    const [matchStringMessage] = Array.from(
      line.matchAll((this.constructor as typeof GcodeParser).reStringMessage));
    if (!matchStringMessage) {
      return [null, null];
    }
    const command = "M" + matchStringMessage[2].trim();
    let message = matchStringMessage[3]
      .trim()
      .replace(/(^|[^\\]|((^|[^\\])\\\\)+);.*/, '$1')
      .replaceAll(/\\([^\\])/g, '$1')
      .trim();
    return [command, message];
  }

  // http://reprap.org/wiki/G-code#Special_fields
  // The checksum "cs" for a GCode string "cmd" (including its line number) is computed
  // by exor-ing the bytes in the string up to and not including the * character.
  computeChecksum(s: string): number {
    s = s || '';
    if (s.lastIndexOf('*') >= 0) {
      s = s.slice(0, s.lastIndexOf('*'));
    }

    let cs = 0;
    for (let i = 0; i < s.length; ++i) {
      const c = s[i].charCodeAt(0);
      cs ^= c;
    }
    return cs;
  }

  static re1 = new RegExp(/\s*\([^)]*\)/g); // Remove anything inside the parentheses
  static re2 = new RegExp(/\s*;.*/g); // Remove anything after a semi-colon to the end of the line, including preceding spaces
  static re3 = new RegExp(/\s+/g);

  // http://linuxcnc.org/docs/html/gcode/overview.html#gcode:comments
  // Comments can be embedded in a line using parentheses () or for the remainder of a lineusing a semi-colon. The semi-colon is not treated as the start of a comment when enclosed in parentheses.
  stripComments (line: string): string {
    return line
      .replace((this.constructor as typeof GcodeParser).re1, '')
      .replace((this.constructor as typeof GcodeParser).re2, '')
      .replace((this.constructor as typeof GcodeParser).re3, '');
  }
}
