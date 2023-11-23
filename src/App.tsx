import React from "react";
import "./App.css";
import Main from "./pages/Main";
import { AppContextProvider } from "./common/context";

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
