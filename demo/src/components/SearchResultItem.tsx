import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {GcodeInfo, SearchResult} from "gcode-documentation";
import {SearchResultItemParameter} from "./SearchResultItemParameter";

type SearchResultItemProps = {
  command: string,
  docItem: GcodeInfo,
  searchResult: SearchResult,
  collapsedCommands: string[],
  toggleCommandCollapsed: (id: string) => void,
};

export class SearchResultItem extends Component<SearchResultItemProps> {
  render() {
    const {command, docItem, searchResult, collapsedCommands} = this.props;

    return (
      <li className="terminal-documentation-result">
        <FontAwesomeIcon
          icon={collapsedCommands.includes(docItem.id) ? faPlus : faMinus}
          style={{cursor: "pointer"}}
          onClick={this.onToggleResultCollapsed}
        />
        <span
          className={"terminal-documentation-command"}
          title={"Use command"}
        >
          {command}
        </span>:
        <a
          target={"_blank"}
          rel={"noreferrer"}
          href={docItem.url}
          title={`Visit ${docItem.source} documentation`}
          className={`terminal-documentation-source terminal-documentation-source-${docItem.source.toLowerCase()}`}
        >
          <FontAwesomeIcon icon={faExternalLinkAlt}/>
        </a>
        <span>{docItem.title}</span>: <span>{docItem.brief}</span>
        {!collapsedCommands.includes(docItem.id) ? (
          <ul className="terminal-documentation-result-parameters">
            {docItem.parameters.map((parameter, index) => (
              <SearchResultItemParameter
                key={index}
                parameter={parameter}
                searchResult={searchResult}
              />
            ))}
          </ul>
        ) : null}
      </li>
   );
  }

  onToggleResultCollapsed = () => {
    const {docItem} = this.props;
    this.props.toggleCommandCollapsed(docItem.id);
  };
}
