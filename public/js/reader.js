(function () {

    var readerHistory = [];

    function addToArray(array, item) {
        var i;
        for (i in array) {
            if (array[i] == item) {
                return array;
            }
        }
        array.push(item);
        return array;
    }

    function removeFromArray(array, item) {
        var i = array.indexOf(item);
        if (i > -1) {
            array.splice(i, 1);
            return array;
        }
        return array;
    }

    function updateReader(id) {
        readerHistory.push(id);
        console.log(readerHistory);
    }

    // Take an item and keep it.
    function pickUpItem(spaceId, itemId) {
        // Remove item from space.
        story.placements[spaceId] = removeFromArray(story.placements[spaceId], itemId);
        // Add item to readers list.
        story.placements._reader = addToArray(story.placements._reader, itemId);
        console.log(story.placements);
    }

    // Descriptions can be a string or array. In the case of an array one item is randomly selected.
    function getDescription(description) {
        if (!Array.isArray(description)) {
            return description;
        }
        var index = Math.round(Math.random() * (description.length - 1));
        return description[index];
    }

    // Render a space and it's connections.
    function renderSpace(id) {
        var space = story.spaces[id];
        var items = story.placements[id];
        var i;
        var p;
        var connection;
        var count = 0;
        if (!space) {
            return;
        }
        p = $('<p/>');
        p.append('<span>' + getDescription(space.description) + '</span> ')
        for (spaceId in space.connections) {
            connection = space.connections[spaceId];
            if (connection.if) {
                // Deal with `if` statments here.
                p.append('<span>' + getDescription(connection.description) + '</span> ');
            } else {
                p.append('<span class="follow" data-connection-id="' + spaceId + '">' + getDescription(connection.description) + '</span> ');
                count++;
            }
        }

        if (items && items.length > 0) {
            for (i in items) {
                itemId = items[i];
                p.append('<span class="follow item" data-space-id="' + id + '" data-item-id="' + itemId + '">' + getDescription(story.items[itemId].description) + '</span> ');
            }
        }
        updateReader(id);
        $('#reader').append(p);
        if (count == 1 ) {
            // Render the last connection-id.
            renderSpace(id);
        }
    }

    // Start the story.
    $('h1.title').text(story.title);
    renderSpace($('#reader').data('space-id'));

    // Follow the story.
    $('#reader').click(function (e) {
        var id = $(e.target).data('connection-id');
        if (id) {
            $('#reader').find('.follow').data('connection-id', null);
            $('#reader').find('.follow').removeClass('follow');
            renderSpace(id);
        }
    });

    // pick up an item.
    $('#reader').click(function (e) {
        var itemId = $(e.target).data('item-id');
        var spaceId = $(e.target).data('space-id');
        if (itemId && spaceId) {
            $(e.target).data('item-id', null);
            $(e.target).data('space-id', null);
            $(e.target).removeClass('follow');
            pickUpItem(spaceId, itemId);
        }
    });

}());
