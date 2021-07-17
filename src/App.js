import "./index.scss";
import React, { useState } from "react";

function App() {
  const [commands, setCommands] = useState([]);
  var path = "/Users/Jonas";
  var currentDir = "Jonas";
  const folders = { Jonas: ["ReadME.txt"] };
  const parentDir = { Jonas: "Users" };
  const [val, setVal] = useState([""]);
  const user = "jonas";
  const device = "pc";

  function output(command) {
    command = command[0];
    if (command.includes("mkdir")) {
      let dir = command.split(" ")[1];
      if (folders[dir]) return "Already exists!";
      folders[dir] = [];
      folders[currentDir].push(dir);
      parentDir[dir] = currentDir;

      return "";
    } else if (command.includes("cd")) {
      let dir = command.split(" ")[1];
      if (!folders[currentDir].includes(dir)) return "No such directory";
      currentDir = dir;
      path = path + "/" + dir;
      return "";
    }
    switch (command) {
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
        <div className="terminalHeader">
          <div className="redCircle"></div>
          <div className="yellowCircle"></div>
          <div className="greenCircle"></div>
        </div>
        <div className="mainTerminalContainer">
          {commands.map((command, index) => (
            <div key={index} className="exprContainer">
              <div>{`${user}@${device} ~ %  ${command}`}</div>
              <div>{`${output(command)}`}</div>
            </div>
          ))}
          <div className="inputRow">
            <p className="pathP">{`${user}@${device} ~ % `}</p>

            <input
              className="terminalInput"
              onKeyPress={onEnterClick}
              value={val}
              onChange={onValChange}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
