(function() {

  function saveItem(id, description) {
    story.items[id].description = description;
    return true;
  }

  function processThingForm() {
    var id = $('#thing-id').val();
    var desc = $('#thing-description').val();
    if ($("#thing-is-item").prop('checked')) {
      return saveItem(id, desc);
    }
  }

  function addConnectionForm() {
    var index = $('.thing-connections .form-connection').length;
    fillEditAppendConnection(index, '', '');
  }

  function clearEditAppendConnection() {
    $('.thing-connections').find('.form-connection').remove();
  }

  // Append a connection.
  function fillEditAppendConnection(index, id, description) {
    var fields = $('.tmpl-connection').clone();
    fields.removeClass('tmpl-connection');
    fields.addClass('form-connection');
    fields.find(".connection-id").prop("id", "connection-id-" + index);
    fields.find(".connection-id").val(id);
    fields.find(".connection-description").prop("id", "connection-description-" + index);
    fields.find(".connection-description").val(description);
    $('.thing-connections .panel-body').append(fields);
  }

  // Populate the edit form.
  function fillEditForm(id, thing, isItem) {
    $('.thing-connections').addClass("hidden");
    clearEditAppendConnection();
    $('#thing-edit #thing-id').val(id);
    $('#thing-edit #thing-is-item').prop('checked', isItem);
    $('#thing-edit #thing-description').val(thing.description);
    if (isItem) {
      return;
    }
    $('.thing-connections').removeClass("hidden");
    for (i in thing.connections) {
      connection = thing.connections[i];
      fillEditAppendConnection(i, connection.id, connection.description);
    }
  }

  // Converts the story into Vis.js nodes.
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

  // Converts the story into Vis.js edges.
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
    nodes: new vis.DataSet(getNodes()),
    edges: new vis.DataSet(getEdges())
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
      },
      "smooth": {
        "type": "discrete",
        "forceDirection": "none"
      }
    },
    "physics": {
      "repulsion": {
        "centralGravity": 0,
        "springLength": 0,
        "springConstant": 0,
        "nodeDistance": 300,
        "damping": 1
      },
      "minVelocity": 0.75,
      "solver": "repulsion"
    }
  };
  var network = new vis.Network(container, data, options);

  network.on("click", function (params) {
    var id = params.nodes[0];
    var space = story.spaces[id];
    var item;
    if (space) {
      return fillEditForm(id, space, false);
    }
    item = story.items[id];
    if (item) {
      return fillEditForm(id, item, true);
    }
  });

  $('.add-connection').click(function (e) {
    e.preventDefault();
    addConnectionForm();
  });

  $('.save-thing').click(function (e) {
    e.preventDefault();
    if (processThingForm()) {
      network.setData({nodes: getNodes(), edges: getEdges()});
      network.redraw();
    }
  });

  $("#thing-is-item").click(function () {
    $('.thing-connections').toggle('hidden');
  });

}());
