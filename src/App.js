import "./index.scss";
import React, { useState } from "react";

function App() {
  const [commands, setCommands] = useState([]);
  var path = "/Users/Jonas";
  var currentDir = "Jonas";
  var folders = { Jonas: ["ReadME.txt"] };
  var parentDir = { Jonas: "Users" };
  const [val, setVal] = useState("");
  const user = "jonas";
  const device = "pc";

  function output(command) {
    console.log(command);
    if (command.includes("mkdir")) {
      let dir = command.split(" ")[1];
      if (folders[currentDir].includes(dir)) return "Already exists!";
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
      const out = output(val);

      let coms = commands;
      if (val === "clear") {
        setCommands([]);
        setVal("");
        return;
      }
      let pack = [val, out];
      coms.push(pack);
      setVal([""]);
      setCommands(coms);
    }
  }

  function onValChange(e) {
    setVal(e.target.value);
  }

  function onKeyDown(e) {
    if (e.keyCode === 38) {
      setVal(commands[commands.length - 1][0][0]);
    }
  }

  return (
    <div className="App">
      <div className="Terminal">
        <div className="terminalHeader">
          <div className="redCircle"></div>
          <div className="yellowCircle"></div>
          <div
            onClick={() => {
              console.log(folders);
            }}
            className="greenCircle"
          ></div>
        </div>
        <div className="mainTerminalContainer">
          {commands.map((command, index) => (
            <div key={index} className="exprContainer">
              <div>{`${user}@${device} ~ %  ${command[0]}`}</div>
              <div>{`${command[1]}`}</div>
            </div>
          ))}
          <div className="inputRow">
            <p
              style={{ color: "red" }}
              className="pathP"
            >{`${user}@${device} ~ % `}</p>

            <input
              className="terminalInput"
              onKeyPress={onEnterClick}
              onKeyDown={onKeyDown}
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
