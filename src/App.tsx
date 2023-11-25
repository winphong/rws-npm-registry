import React from "react";
import "./App.css";
import { AppContextProvider } from "./common/context";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <header className="App-header">
          <RouterProvider router={router} />
        </header>
      </div>
    </AppContextProvider>
  );
}

export default App;
