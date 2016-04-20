(function () {

    var readerHistory = [];

    function inArray(array, item) {
        var i;
        console.log(array);
        for (i in array) {
            console.log(array[i] + "===" + item);
            if (array[i] === item) {
                return true;
            }
        }
        return false;
    }

    function addToArray(array, item) {
        var i;
        for (i in array) {
            if (array[i] === item) {
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
        // Make sure the spaceId is in the placements map.
        if (!story.placements[spaceId]) {
            story.placements[spaceId] = [];
        }
        // Remove item from space.
        story.placements[spaceId] = removeFromArray(story.placements[spaceId], itemId);
        // Add item to readers list.
        story.placements._reader = addToArray(story.placements._reader, itemId);
        console.log(story.placements);
        var li = $('<li/>');
        li.data('item-id', itemId);
        li.text(getDescription(story.items[itemId].owned.description));
        $('#items').append(li);
        $('#reader').append('<p>' + story.items[itemId].take.description + '</p>');
    }

    // Leave an item behind.
    function dropItem(spaceId, itemId) {
        // Make sure the spaceId is in the placements map.
        if (!story.placements[spaceId]) {
            story.placements[spaceId] = [];
        }
        // Remove from _reader.
        story.placements._reader = removeFromArray(story.placements._reader, itemId);
        // Add the item to the space.
        story.placements[spaceId] = addToArray(story.placements[spaceId], itemId);
        var span = $('<span/>');
        span.addClass('follow item');
        span.data('item-id', itemId);
        span.text(story.items[itemId].leave.description);
        $('#reader').append($('<p/>').append(span));
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
    function renderSpace(spaceId) {
        var space = story.spaces[spaceId];
        var items = story.placements[spaceId];
        var i;
        var p;
        var connection;
        var connectionId;
        var count = 0;
        var ownedId;
        if (!space) {
            return;
        }
        p = $('<p/>');
        p.append('<span>' + getDescription(space.description) + '</span> ')
        for (connectionId in space.connections) {
            connection = space.connections[connectionId];
            if (connection.if) {
                // Deal with `if` statments here.
                for (ownedId in connection.if) {
                    if (inArray(story.placements._reader, ownedId)) {
                        p.append('<span class="follow" data-connection-id="' + connectionId + '">' + getDescription(story.items[ownedId].use.description) + '</span> ');
                        count++;
                    }
                }
            } else {
                p.append('<span class="follow" data-connection-id="' + connectionId + '">' + getDescription(connection.description) + '</span> ');
                count++;
            }
        }
        if (items && items.length > 0) {
            for (i in items) {
                itemId = items[i];
                p.append('<span class="follow item" data-space-id="' + spaceId + '" data-item-id="' + itemId + '">' + getDescription(story.items[itemId].description) + '</span> ');
            }
        }
        updateReader(spaceId);
        $('#reader').append(p);
        // if (count == 1 ) {
        //     // Render the last connection-id.
        //     renderSpace(spaceId);
        // }
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

    // Drop an item.
    $('#items').click(function (e) {
        var itemId = $(e.target).data('item-id');
        var spaceId = readerHistory[readerHistory.length - 1];
        if (itemId && spaceId) {
            $(e.target).data('item-id', null);
            $(e.target).remove();
            dropItem(spaceId, itemId);
        }
    });

}());
