import React from 'react';
import './App.css';
import { DocumentationService } from "gcode-documentation/dist";

function App() {
  return (
    <div className="App">
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
      <div>{DocumentationService.name}</div>
    </div>
  );
}

export default App;
