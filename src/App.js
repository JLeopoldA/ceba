import React from "react";
// import SpinningShapes from "./Components/Ceba/SpinningShapes";
import ParticleBackground from "./Components/SpinningCircle/SpinningCircle";
import SpinningCircle from "./Components/SpinningCircle/SpinningCircle";

function App() {
  return (
    <div className="App">
      <h1>CEBA</h1>
      <div className="shape-container">
        {/* <SpinningShapes /> */}
        <SpinningCircle />
      </div>
    </div>
  );
}

export default App;
