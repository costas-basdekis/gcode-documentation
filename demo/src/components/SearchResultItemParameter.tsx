import React, {Component} from "react";
import classnames from "classnames";
import {GcodeParameter, SearchResult} from "gcode-documentation";

type SearchResultItemParameterProps = {
  parameter: GcodeParameter,
  searchResult: SearchResult,
};

export class SearchResultItemParameter extends Component<SearchResultItemParameterProps> {
  render() {
    const {parameter, searchResult} = this.props;

    return (
      <li
        className={classnames("terminal-documentation-result-parameter", {
          required: !parameter.optional,
          missing: !searchResult.parsedParameters || !searchResult.parsedParameters[parameter.tag],
        })}
      >
        <pre className={"terminal-documentation-parameter-tag"}>
          {parameter.label}
        </pre>
        <pre
          className={"terminal-documentation-parameter-value"}
        >
          {((searchResult.parsedParameters && searchResult.parsedParameters[parameter.tag]) || [' ']).join(', ')}
        </pre>
        <span
          className={"terminal-documentation-parameter-description"}>
          {parameter.description}
        </span>
      </li>
    );
  }
}
