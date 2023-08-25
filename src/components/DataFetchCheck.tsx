import * as React from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import type {DataFetchCheckQuery} from "./__generated__/DataFetchCheckQuery.graphql";


const DataFetchCheckQuery = graphql`
  query DataFetchCheckQuery {
    itinerary(id: "SXRpbmVyYXJ5OjE=") {
      text
    }
  }
`;

export default function DataFetchCheck({}) {
  const data = useLazyLoadQuery<DataFetchCheckQuery>
  (DataFetchCheckQuery, {},);
  console.log('data?', data);
  const itinerary = data?.itinerary?.text;
  console.log("itinerary?", itinerary);
  // As before:
  return (
    <div className="itinerary">
      {itinerary}
      { "TEXT"}
    </div>
  );
}
