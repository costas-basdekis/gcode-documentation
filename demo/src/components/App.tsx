import React, {Component, SyntheticEvent} from 'react';
import './App.css';
import {demoGcodeInfoSet} from "../demoGcodeInfoSet";
import {DocumentationService, SearchResult, Source} from "gcode-documentation";
import {SearchResults} from "./SearchResults";

type AppState = {
  searchTerm: string,
  searchResult: SearchResult,
  collapsedCommands: string[],
  includeSources: { [source in Source]: boolean },
};

export class App extends Component<{}, AppState> {
  documentationService = new DocumentationService(demoGcodeInfoSet);
  state: AppState = {
    searchTerm: "G1 X110",
    searchResult: this.documentationService.getSearchResult("G1 X110"),
    collapsedCommands: [],
    includeSources: {
      "Marlin": true,
      "RepRap": true,
      "Klipper": true,
    },
  };

  render() {
    const {searchTerm, searchResult, collapsedCommands, includeSources} = this.state;

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
          Search:{" "}
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
          Results:
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
    this.setState(({searchTerm, includeSources}) => ({
      searchResult: this.documentationService.getSearchResult(searchTerm, {include: includeSources}),
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
