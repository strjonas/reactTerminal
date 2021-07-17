import "./index.scss";
import React, { useState } from "react";

function App() {
  const [commands, setCommands] = useState(["ls", "ipconfig"]);
  const [path, setPath] = useState("/Users/Jonas");
  const [currentDir, setcurrentDir] = useState("Jonas");
  const [folders, setFolders] = useState({ Jonas: ["ReadME.txt"] });
  const [parentDir, setparentDir] = useState({ Jonas: "Users" });
  const [val, setVal] = useState([""]);

  console.log(commands);
  function output(command) {
    switch (command[0]) {
      case "":
        return "";
      case "clear":
        setCommands([]);
        return "";
      case "ls":
        return folders[currentDir];

      default:
        return "command not found";
    }
  }

  function onEnterClick(e) {
    if (e.key === "Enter") {
      var coms = commands;
      coms.push(val);
      setVal([""]);
      setCommands(coms);
    }
  }

  function onValChange(e) {
    setVal([e.target.value]);
  }

  return (
    <div className="App">
      <div className="Terminal">
        {commands.map((command, index) => (
          <div key={index} className="exprContainer">
            <div>{`${path}> ${command}`}</div>
            <div>{`${output(command)}`}</div>
          </div>
        ))}
        <div className="inputRow">
          <div>{`${path}> `}</div>

          <input
            className="terminalInput"
            onKeyPress={onEnterClick}
            value={val}
            onChange={onValChange}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default App;
