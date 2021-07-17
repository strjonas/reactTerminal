import "./index.scss";
import React, { useState } from "react";

var path = "/Users/Jonas";
var currentDir = "Jonas";
var folders = { Jonas: ["ReadME.txt", "Dokuments"], Dokuments: [] };
var parentDir = { Jonas: "Users", Dokuments: "Jonas" };

const user = "jonas";
const device = "pc";

function App() {
  const [val, setVal] = useState("");
  const [commands, setCommands] = useState([]);

  function output(command) {
    if (command.includes("mkdir")) {
      let dir = command.split(" ")[1];
      if (folders[currentDir].includes(dir)) return "Already exists!";
      folders[dir] = [];
      folders[currentDir].push(dir);
      parentDir[dir] = currentDir;
      return "";
    } else if (command.includes("cd")) {
      let dir = command.split(" ")[1];
      if (dir === "..") {
        currentDir = parentDir[currentDir];
        let index = path.lastIndexOf("/");
        path = path.substring(0, index);
        return "";
      }
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
        let str = "";
        folders[currentDir].forEach((item) => {
          str = str + `${item} `;
        });
        return str;
      case "path":
        return path;
      case "dir":
        return currentDir;
      case "ipconfig":
        var text = "ipv4: 192.168.178.1\n";
        return text;

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
      try {
        setVal(commands[commands.length - 1][0]);
      } catch (error) {}
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
              <div className="row">
                <div
                  style={{ color: "red", marginRight: "5px" }}
                >{`${user}@${device} ~ % `}</div>
                <div>{command[0]}</div>
              </div>

              <br></br>
              <div dangerouslySetInnerHTML={{ __html: `${command[1]}` }}></div>
            </div>
          ))}
          <div className="inputRow">
            <p
              style={{ color: "red", marginRight: "5px" }}
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
