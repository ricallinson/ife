var story = {
	spaces: {
		'bobs house only room': {
			description: 'As expected for such a small house,\nit only has one room.',
			connections: [
				{
					id: 'bobs house front garden',
					description: 'For such a small house the door seems out of proportion.'
				},
				{
					id: 'bobs house back garden',
					description: 'The garden looks abnormally big for a small house.'
				}
			]
		},
		'bobs house front garden': {
			description: 'Bob front garden is a small affair.\nLets just say his green thumb fell off.',
			connections: [
				{
					id: 'bobs house only room',
					description: 'Foo.'
				},
				{
					id: 'bobs house driveway',
					description: 'Bar.'
				},
				{
					id: 'post office',
					description: 'Baz.'
				}
			]
		},
		'bobs house back garden': {
			description: 'There seems to be no end to jungle Bob calls a garden.',
			connections: [
				{
					id: 'bobs house driveway',
					description: 'Moo.'
				},
				{
					id: 'bobs house only room',
					description: 'Coo.',
					if: {
						id: 'bobs house back door key',
						description: 'Cew.'
					}
				}
			]
		},
		'bobs house driveway': {
			description: 'Single car driveway.',
			connections: [
				{
					id: 'bobs house back garden',
					description: 'Yew.'
				},
				{
					id: 'bobs house front garden',
					description: 'Few.'
				},
				{
					id: 'post office',
					description: 'New.'
				}
			]
		},
		'post office': {
			description: 'Waking into the Post Office there is a single old wooden counter.',
			connections: [
				{
					id: 'bobs house front garden',
					description: 'Pew.'
				},
				{
					id: 'bobs house driveway',
					description: 'Mew.'
				}
			]
		}
	},
	items: {
		'bobs house back door key': {
			description: 'A key to a door.',
		}
	},
	'placements': {
		'bobs house back door key': 'bobs house only room'
	}
};
