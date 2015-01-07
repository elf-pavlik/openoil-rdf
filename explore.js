var fs = require('fs');
var _ = require('lodash');

var input = JSON.parse(fs.readFileSync('all.json'));

//console.log('data.row.nodes: ', input.table._response.data[0].row[0].nodes.length);
//console.log('data.row.links: ', input.table._response.data[0].row[0].links.length);
//console.log('data.graph.nodes: ', input.table._response.data[0].graph.nodes.length);
//console.log('data.graph.relationships: ', input.table._response.data[0].graph.relationships.length);
//console.log('nodes: ', input.table.nodes.length);
//console.log('relationships: ', input.table.relationships.length);

var nodes = {
  row: input.table._response.data[0].row[0].nodes,
  graph: input.table._response.data[0].graph.nodes,
  table: input.table.nodes
};

var edges = {
  row: input.table._response.data[0].row[0].links,
  graph: input.table._response.data[0].graph.relationships,
  table: input.table.relationships
};

// returns array with all different types of edges
function getEdgeTypes(){
  return _.uniq(_.map(edges.graph, function(edge){ return edge.type; }));
}

function getEdges(type){
  return _.filter(edges.graph, function(edge) { return edge.type == type; });
}

function printEdgesStats(){
  console.log("Node Statistics");
  _.forEach(getEdgeTypes(), function(type){
    console.log(type, getEdges(type).length);
  });
  console.log("");
}

/*
 * [ 'Company',
 *   'LegaType',
 *   'Country',
 *   'Request',
 *   'Contract',
 *   'ContractType',
 *   'LegalType' ]
 *
 */
function getNodeTypes() {
  return _.uniq(_.flatten(_.map(nodes.graph, function(node){ return node.labels; })));
}

function getNodes(type) {
  return _.filter(nodes.graph, function(node) { return node.labels.indexOf(type) >= 0; });
}

function printNodeStats(){
  console.log("Node Statistics");
  _.forEach(getNodeTypes(), function(type){
    console.log(type, getNodes(type).length);
  });
  console.log("");
}


printEdgesStats();
printNodeStats();

//console.log(_.filter(getEdges('IS_OWNER'), function(edge){ return edge.properties.contract_share !== ''; }));

//console.log(_.uniq(_.map(getEdges('IS_OWNER'), function(edge){ return edge.properties.ownership_type; })));

// console.log(getNodes('ContractType'));
// Production Contract, Service Contracts

//console.log('LegaType', getNodes('LegaType'));
// Public, Public Limited Company, Limited Liability Company
//console.log('LegalType', getNodes('LegalType'));
// Public, Public Limited Company, Limited Liability Company

// number of nodes with multiple labels
//console.log(_.filter(nodes.graph, function(node) { return node.labels.length > 1; }).length);
