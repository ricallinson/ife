var story = {
	spaces: {
		'bobs house only room': {
			description: 'As expected for such a small house,\nit only has one room.',
			connections: {
				'bobs house front garden': {
					description: 'For such a small house the door seems out of proportion.'
				},
				'bobs house back garden': {
					description: 'The garden looks abnormally big for a small house.'
				}
			}
		},
		'bobs house front garden': {
			description: 'Bob front garden is a small affair.\nLets just say his green thumb fell off.',
			connections: {
				'bobs house only room': {
					description: 'Foo.'
				},
				'bobs house driveway': {
					description: 'Bar.'
				},
				'post office': {
					description: 'Baz.'
				}
			}
		},
		'bobs house back garden': {
			description: 'There seems to be no end to jungle Bob calls a garden.',
			connections: {
				'bobs house driveway': {
					description: 'Moo.'
				},
				'bobs house only room': {
					description: 'Coo.',
					if: {
						id: 'bobs house back door key',
						description: 'Cew.'
					}
				}
			}
		},
		'bobs house driveway': {
			description: 'Single car driveway.',
			connections: {
				'bobs house back garden': {
					description: 'Yew.'
				},
				'bobs house front garden': {
					description: 'Few.'
				},
				'post office': {
					description: 'New.'
				}
			}
		},
		'post office': {
			description: 'Waking into the Post Office there is a single old wooden counter.',
			connections: {
				'bobs house front garden': {
					description: 'Pew.'
				},
				'bobs house driveway': {
					description: 'Mew.'
				}
			}
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
