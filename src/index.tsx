import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./components/App";
import './index.css';

function Routes() {
  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById("app"));root.render(<Routes />);

