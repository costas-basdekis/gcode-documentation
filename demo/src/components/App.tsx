import React, {Component, SyntheticEvent} from 'react';
import './App.css';
import {demoGcodeInfoSet} from "../demoGcodeInfoSet";
import {DocumentationService, SearchResult, Source} from "gcode-documentation";
import {SearchResults} from "./SearchResults";

type AppState = {
  documentationService: DocumentationService,
  hasFullDocumentation: boolean,
  documentationLength: number,
  searchTerm: string,
  searchResult: SearchResult,
  collapsedCommands: string[],
  includeSources: { [source in Source]: boolean },
};

export class App extends Component<{}, AppState> {
  getInitialState(): AppState {
    const documentationService = new DocumentationService(demoGcodeInfoSet, null);
    const searchTerm = "G1 X110";

    return {
      documentationService,
      hasFullDocumentation: false,
      documentationLength: Object.keys(documentationService.allGcodes).length,
      searchTerm: searchTerm,
      searchResult: documentationService.getSearchResult(searchTerm),
      collapsedCommands: [],
      includeSources: {
        "Marlin": true,
        "RepRap": true,
        "Klipper": true,
      },
    };
  }

  state: AppState = this.getInitialState();

  componentDidMount() {
    // noinspection JSIgnoredPromiseFromCall
    this.loadAllCodes();
  }

  async loadAllCodes() {
    const response = await fetch(`${process.env.PUBLIC_URL}/allCodes.json`);
    const allCodes = await response.json();
    const documentationService = new DocumentationService(allCodes, null);
    this.setState({
      documentationService,
      hasFullDocumentation: true,
      documentationLength: Object.keys(documentationService.allGcodes).length,
    });
    this.updateSearch();
  }

  updatedDays() {
    const allGcodesDate: Date | null = this.state.documentationService.allGcodesDate;
    if (!allGcodesDate) {
      return null;
    }
    const millisDifference =
      new Date().setHours(0, 0, 0, 0)
      - allGcodesDate.setHours(0, 0, 0, 0);
    const daysDifference =
      Math.round((millisDifference) / (1000 * 60 * 60 * 24));
    let text;
    if (daysDifference === 0) {
      text = "today";
    } else if (daysDifference === 1) {
      text = "yesterday";
    } else if (daysDifference < 7) {
      text = "this week";
    } else {
      text = `${daysDifference} days ago`;
    }
    return <>,
      updated <span title={allGcodesDate.toString()}>
        {text}
      </span>
    </>;
  }

  render() {
    const {documentationLength, hasFullDocumentation, searchTerm, searchResult, collapsedCommands, includeSources} = this.state;

    return (
      <div>
        <div>
          <a href={"https://github.com/costas-basdekis/gcode-documentation"}>GitHub Repo</a>
          {" "}
          <a href={"https://www.npmjs.com/package/gcode-documentation"}>NPM Package</a>
        </div>
        <p>
          A module that parses user GCode, and annotates it with documentation.
        </p>
        <p>
          This was originally created in <a href={"https://octoprint.org/"}>Octoprint</a> plugin
          {" "}<a href={"https://plugins.octoprint.org/plugins/marlingcodedocumentation/"}>MarlinGcodeDocumentation</a>,
          and needs the parsed documentation data to function.
        </p>
        <div>
          Search ({documentationLength} commands{this.updatedDays()}):{" "}
          <input type={"text"} value={searchTerm} onChange={this.onSearchChange} />
          {" "}
          <label>
            <input type={"checkbox"} checked={includeSources.Marlin} onChange={this.onIncludeMarlinChange}/>
            <span className={`terminal-documentation-source terminal-documentation-source-marlin`}>Marlin</span>
          </label>
          <label>
            <input type={"checkbox"} checked={includeSources.RepRap} onChange={this.onIncludeRepRapChange}/>
            <span className={`terminal-documentation-source terminal-documentation-source-reprap`}>RepRap</span>
          </label>
          <label>
            <input type={"checkbox"} checked={includeSources.Klipper} onChange={this.onIncludeKlipperChange}/>
            <span className={`terminal-documentation-source terminal-documentation-source-klipper`}>Klipper</span>
          </label>
        </div>
        <div>
          Results{!hasFullDocumentation ? " (only a small subset)" : null}:
          <SearchResults
            searchResult={searchResult}
            collapsedCommands={collapsedCommands}
            toggleCommandCollapsed={this.toggleCommandCollapsed}
          />
        </div>
      </div>
    );
  }

  onSearchChange = ({currentTarget: {value}}: SyntheticEvent<HTMLInputElement>) => {
    this.setState({searchTerm: value});
    this.updateSearch();
  };

  updateSearch() {
    this.setState(({documentationService, searchTerm, includeSources}) => ({
      searchResult: documentationService.getSearchResult(searchTerm, {include: includeSources}),
    }));
  }

  toggleCommandCollapsed = (id: string) => {
    this.setState(({collapsedCommands}) => ({
      collapsedCommands: collapsedCommands.includes(id)
        ? collapsedCommands.filter(_id => _id !== id)
        : collapsedCommands.concat(id)
    }));
  };

  makeOnIncludeChange = (source: Source) => {
    return ({currentTarget: {checked}}: SyntheticEvent<HTMLInputElement>) => {
      this.setState(({includeSources}) => ({
        includeSources: {
          ...includeSources,
          [source]: checked,
        },
      }));
      this.updateSearch();
    };
  };

  onIncludeMarlinChange = this.makeOnIncludeChange("Marlin");
  onIncludeRepRapChange = this.makeOnIncludeChange("RepRap");
  onIncludeKlipperChange = this.makeOnIncludeChange("Klipper");
}
