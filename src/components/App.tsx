import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import DataFetchCheck from "./DataFetchCheck";
import GlobalStyles from "../GlobalStyles";
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Homepage from "../pages/Homepage";
import Questionaire from "../pages/Questionaire";
import ResultsPage from "../pages/ResultsPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/questionaire",
    element: <Questionaire />
  },
  {
    path: "/results",
    element: <ResultsPage />
  }
])


export default function App(): React.ReactElement {
  return (
    <RelayEnvironment>
      <React.Suspense >
        <GlobalStyles />
        <div className="app">
            {/* <DataFetchCheck/> */}
            <RouterProvider router={router} />
        </div>
  );
}
