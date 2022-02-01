import React, {Component} from "react";
import {SearchResultItem} from "./SearchResultItem";
import {SearchResult} from "gcode-documentation";
import "./search.css";

type SearchResultProps = {
  searchResult: SearchResult,
  collapsedCommands: string[],
  toggleCommandCollapsed: (id: string) => void,
};

export class SearchResults extends Component<SearchResultProps> {
  render() {
    const {searchResult, collapsedCommands} = this.props;

    if (searchResult.isEmpty) {
      return "Search for a term";
    }
    if (!searchResult.docItems.length) {
      if (searchResult.isSearch) {
        return "No search results";
      } else {
        return "Unknown command";
      }
    }

    return (
      <>
        <ul>
          {searchResult.docItems.map(({command, docItem}, index) => (
            <SearchResultItem
              key={index}
              command={command}
              docItem={docItem}
              searchResult={searchResult}
              collapsedCommands={collapsedCommands}
              toggleCommandCollapsed={this.props.toggleCommandCollapsed}
            />
          ))}
        </ul>
        {searchResult.extraResultsCount ? (
          `${searchResult.extraResultsCount} more items`
        ) : null}
      </>
    );
  }
}
