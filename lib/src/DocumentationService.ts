import {KlipperExtendedGcodeParser} from "./KlipperExtendedGcodeParser";
import {GcodeParseResult} from "./GcodeParser";
import {GcodeInfo, GcodeInfoGroup, GcodeInfoSet, Source} from "./GcodeInfo";

export type SearchOptions = {
  maxResultCount: number,
  include: {Marlin: boolean, RepRap: boolean, Klipper: boolean},
};

export type PartialSearchOptions = {
  maxResultCount?: number,
  include?: { [source in Source]: boolean },
};

export type ParsedParameters = {
  [tag: string]: (string | number)[]
};

export type SearchResult = {
  line: string,
  isEmpty: boolean,
  isSearch: boolean,
  parsedParameters?: ParsedParameters,
  docItems: {
    command: string,
    docItem: GcodeInfo,
  }[],
  extraResultsCount: number,
};

export class DocumentationService {
  public readonly allGcodes: GcodeInfoSet;
  private readonly allGcodesById: { [p: string]: [string, GcodeInfo] };
  private readonly klipperGcodeParser: KlipperExtendedGcodeParser;

  constructor(allGcodes: GcodeInfoSet) {
    this.allGcodes = allGcodes;
    this.allGcodesById = Object.fromEntries(
      Object.entries(this.allGcodes)
      .map(([command, values]) => values.map(value => ([command, value] as [string, GcodeInfo])))
      .flat()
      .map(commandAndValue => [commandAndValue[1].id, commandAndValue])
    );
    this.klipperGcodeParser = new KlipperExtendedGcodeParser();
  }

  findDocsIds(searchString: string): string[] {
    const parts = searchString.toLowerCase().trim().split(/\s+/g).filter(part => part);
    if (!parts.length) {
      return [];
    }
    const idLists: string[][] = Object.entries(this.allGcodes)
      .map(([command, doc]): string[] | null => {
        const commandLowerCase = command.toLowerCase();
        if (parts.some(part => commandLowerCase.includes(part))) {
          return doc.map(docItem => docItem.id);
        }
        const ids: string[] = doc
          .map(docItem => {
            const title = docItem.title.toLowerCase();
            if (parts.some(part => title.includes(part))) {
              return docItem.id;
            }
            const brief = docItem.brief.toLowerCase();
            if (parts.some(part => brief.includes(part))) {
              return docItem.id;
            }
            return null;
          })
          .filter((id: string | null) => id) as string[];
        if (!ids.length) {
          return null;
        }
        return ids;
      })
      .filter(ids => ids) as string[][];
    return Array.from(new Set(idLists.flat()));
  }

  findDocs(searchString: string): [string, GcodeInfo][] {
    return this.findDocsIds(searchString)
      .map(id => this.allGcodesById[id]);
  }

  parseParameters(line: GcodeParseResult, parsedParameters: ParsedParameters = {}): ParsedParameters {
    if (!line.words) {
      return parsedParameters;
    }
    for (const [tag, value] of (line.words.slice(1) as [string, string | number][])) {
      parsedParameters[tag] = parsedParameters[tag] || [];
      parsedParameters[tag].push(value);
    }

    return parsedParameters;
  }

  getSearchResult(commandLine: string, options: PartialSearchOptions = {}): SearchResult {
    const fullOptions: SearchOptions = {
      maxResultCount: options.maxResultCount === undefined ? 20 : options.maxResultCount,
      include: {
        Marlin: options.include?.Marlin === undefined ? true : options.include.Marlin,
        RepRap: options.include?.RepRap === undefined ? true : options.include.RepRap,
        Klipper: options.include?.Klipper === undefined ? true : options.include.Klipper,
      },
    };
    commandLine = commandLine.trim();
    if (!commandLine || commandLine === "?") {
      return {
        line: commandLine,
        isEmpty: true,
        isSearch: false,
        docItems: [],
        extraResultsCount: 0,
      };
    }

    let docItems: [string, GcodeInfo][];
    const parsedParameters: ParsedParameters = {};
    const isSearch = commandLine.startsWith('?');
    if (isSearch) {
      docItems = this.findDocs(commandLine.slice(1));
    } else {
      const line = this.klipperGcodeParser.parseLine(commandLine);
      const command: string | null = line.words!.length
        ? (line.words![0]! as [string, string | number]).join('') : null;
      const docItemsList: [string, GcodeInfoGroup][] = command && this.allGcodes[command]
        ? [[command, this.allGcodes[command]]]  : [];
      docItems = docItemsList
        .map(([command, docItems]) => docItems.map((docItem: GcodeInfo) => [command, docItem]))
        .flat() as [string, GcodeInfo][];
      this.parseParameters(line, parsedParameters);
    }

    return {
      line: commandLine,
      isEmpty: false,
      isSearch,
      parsedParameters,
      docItems: docItems
        .filter(([, docItem]: [string, GcodeInfo]) => fullOptions.include[docItem.source])
        .slice(0, fullOptions.maxResultCount)
        .map(([command, docItem]) => ({
          command,
          docItem,
        })),
      extraResultsCount: docItems.length > fullOptions.maxResultCount
        ? docItems.length - fullOptions.maxResultCount : 0,
    };
  }
}
