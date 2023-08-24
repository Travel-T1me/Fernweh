import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import DataFetchCheck from "./DataFetchCheck";

export default function App(): React.ReactElement {
  return (
    <RelayEnvironment>
      <React.Suspense >
        <div className="app">
          <DataFetchCheck/>
        </div>
      </React.Suspense>
    </RelayEnvironment>
  );
}
