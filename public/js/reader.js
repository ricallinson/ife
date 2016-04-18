(function () {

	// Render a space and it's connections.
	function renderSpace(id) {
		var space = story.spaces[id];
		if (!space) {
			return;
		}
		$('#reader').append('<p>' + space.description + '</p>');
		for (id in space.connections) {
			connection = space.connections[id];
			$('#reader').append('<p class="follow" data-connection-id="' + id + '">' + connection.description + '</p>');
		}
	}

	// Start the story.
	renderSpace($('#reader').data('space-id'));

	// Follow the story.
	$('#reader').click(function (e) {
		var id = $(e.target).data('connection-id');
		if (id) {
			$('#reader').find('.follow').removeClass('follow');
			renderSpace(id);
		}
	});

}());
