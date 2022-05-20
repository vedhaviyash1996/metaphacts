const express = require('express')
const app = express()
const port = 3000
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client');



const GRAPHDB_BASE_URL = 'http://localhost:7200',
  GRAPHDB_REPOSITORY = 'Test',
  GRAPHDB_USERNAME = 'Test',
  GRAPHDB_PASSWORD = 'Test',
  GRAPHDB_CONTEXT_TEST = 'http://ont.enapso.com/repo',
  GRAPHDB_CONTEXT_SHACL = 'http://rdf4j.org/schema/rdf4j#SHACLShapeGraph';

// the default prefixes for all SPARQL queries
const DEFAULT_PREFIXES = [
  EnapsoGraphDBClient.PREFIX_OWL,
  EnapsoGraphDBClient.PREFIX_RDF,
  EnapsoGraphDBClient.PREFIX_RDFS,
  EnapsoGraphDBClient.PREFIX_XSD,
  EnapsoGraphDBClient.PREFIX_PROTONS,
  {
      prefix: 'entest',
      iri: 'http://ont.enapso.com/test#'
  }
];

//Create an Endpoint.
let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
  baseURL: GRAPHDB_BASE_URL,
  repository: GRAPHDB_REPOSITORY,
  prefixes: DEFAULT_PREFIXES,
  transform: 'toCSV'
});

app.get('/', (req, res) => {

  graphDBEndpoint
    .login(GRAPHDB_USERNAME, GRAPHDB_PASSWORD)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})