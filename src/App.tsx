import React from "react";
import "./App.css";
import Main from "./pages/Main";
import { AppContextProvider } from "./common/context";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <header className="App-header">
          <Main />
        </header>
      </div>
    </AppContextProvider>
  );
}

export default App;
