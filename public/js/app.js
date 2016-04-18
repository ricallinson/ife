(function() {

  function getNodes() {
    var nodes = [];
    var id;
    var space;
    var item;
    for (id in story.spaces) {
      space = story.spaces[id];
      nodes.push({
        id: id,
        label: space.description,
        shape: 'box'
      });
    }
    for (id in story.items) {
      item = story.items[id];
      nodes.push({
        id: id,
        label: item.description,
        shape: 'eclipse',
        color: '#7BE141'
      });
    }
    return nodes;
  }

  function getEdges() {
    var edges = [];
    var connection;
    var placement;
    for (id in story.spaces) {
      for (i in story.spaces[id].connections) {
        connection = story.spaces[id].connections[i];
        edges.push({
          from: id,
          to: connection.id,
          label: connection.description
        });
      }
    }
    for (id in story.placements) {
      to = story.placements[id];
      edges.push({
          from: id,
          to: to
        });
    }
    return edges;
  }

  var container = document.getElementById('story-graph');
  var data = {
    nodes: getNodes(),
    edges: getEdges()
  };
  var options = {
    layout: {
      randomSeed: 1000
    },
    edges: {
      arrows: {
        to: true
      },
      font: {
        strokeWidth: 5,
        strokeColor: 'white'
      }
    },
    "physics": {
      "hierarchicalRepulsion": {
        "centralGravity": 0,
        "springLength": 0,
        "springConstant": 0,
        "nodeDistance": 200,
        "damping": 1
      },
      "minVelocity": 0.75,
      "solver": "hierarchicalRepulsion"
    }
  };
  var network = new vis.Network(container, data, options);
}());
