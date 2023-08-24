/**
 * @generated SignedSource<<3bcaea81ed346ab00ac7bc78caba24fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type DataFetchCheckQuery$variables = {};
export type DataFetchCheckQuery$data = {
  readonly itinerary: {
    readonly text: string | null;
  } | null;
};
export type DataFetchCheckQuery = {
  response: DataFetchCheckQuery$data;
  variables: DataFetchCheckQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "SXRpbmVyYXJ5OjE="
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DataFetchCheckQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Itinerary",
        "kind": "LinkedField",
        "name": "itinerary",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "itinerary(id:\"SXRpbmVyYXJ5OjE=\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DataFetchCheckQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Itinerary",
        "kind": "LinkedField",
        "name": "itinerary",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "itinerary(id:\"SXRpbmVyYXJ5OjE=\")"
      }
    ]
  },
  "params": {
    "cacheID": "549740383aaf6ff9c2c9d83526727a33",
    "id": null,
    "metadata": {},
    "name": "DataFetchCheckQuery",
    "operationKind": "query",
    "text": "query DataFetchCheckQuery {\n  itinerary(id: \"SXRpbmVyYXJ5OjE=\") {\n    text\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9edb8cac1c686e56ebae31944cf79c6e";

export default node;
