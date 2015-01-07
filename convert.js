var fs = require('fs');
var _ = require('lodash');

var source = JSON.parse(fs.readFileSync('all.json'));

var prefix = "http://id.iilab.org/";

var input = {
  nodes: source.table._response.data[0].graph.nodes,
  edges: source.table._response.data[0].graph.relationships
};

var output = {};

// for now picking just few selected types and  properties
function processNode(node) {
  if(['Company', 'Contract'].indexOf(node.labels[0]) < 0) {
    return null;
  } else {
    var ld = {
      id: prefix + node.id,
      type: node.labels,
      name: node.properties.name
    };
    // Company
    if(node.labels.indexOf('Company')) {
      // interlink to Open Corporates
      if(node.properties.oc_id) {
        ld.sameAs = "https://opencorporates.com/companies/" + node.properties.oc_id;
      }
      if(node.properties.website) {
        ld.website = node.properties.website;
      }
    }
    return ld;
  }
}

function processEdge(node) {
}

output.nodes = _.uniq(_.map(input.nodes, processNode));

console.log(output.nodes);
