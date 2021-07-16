import "./index.scss";
import React, { useState } from "react";

function App() {
  const [commands, setCommands] = useState(["ls", "ipconfig"]);
  const [path, setPath] = useState(["/Users/Jonas"]);
  const [currentDir, setcurrentDir] = useState(["Jonas"]);
  const [folders, setFolders] = useState([{ Jonas: ["ReadME.txt"] }]);
  const [parentDir, setparentDir] = useState([{ Jonas: "Users" }]);

  console.log(commands);
  function output(command) {
    return "command not found";
  }

  function onEnterClick(e) {
    setCommands(commands);
  }

  return (
    <div className="App">
      <div className="Terminal">
        {commands.map((index, command) => (
          <div key={index} className="exprContainer">
            <div>{`${path}> ${command}`}</div>
            <div>{`${output(command)}`}</div>
          </div>
        ))}
        <input onChange={onEnterClick}></input>
      </div>
    </div>
  );
}

export default App;
