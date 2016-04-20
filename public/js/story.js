var story = {
	title: "Bobs Lonely Life",
	spaces: {
		'bobs house only room': {
			description: 'As expected for such a small house, Bobs place consists of one solitary room.',
			connections: {
				'bobs house front garden': {
					description: [
						'There is a window looking out to the front garden with small door to the right of it.',
						'The door, as new as it appears, is missing the most fundamental of things a front door to home should own. A lock.'
					]
				},
				'bobs house back garden': {
					description: 'The back wall has nothing but shelves full of paint. Perfectly positioned in the middle is a large cat flap.'
				}
			}
		},
		'bobs house front garden': {
			description: 'Bobs front garden is a small affair and not a pretty one. Lets just say his green thumb fell off many years earlier.',
			connections: {
				'bobs house only room': {
					description: 'The door closes as slowly as a snail rushing home for creamy Escargot. The long missing lock takes a sigh of want.'
				},
				'bobs house driveway': {
					description: 'Not six feet away is the driveway that once held a magnificent automotive specimen.'
				},
				'post office': {
					description: 'But without question is the best view in the village is directly opposite Bobs front door. The Post Office window.'
				}
			}
		},
		'bobs house back garden': {
			description: 'It takes some effort to squeeze through the deceptively small cat flap. Looking about there seems to be no end to the jungle Bob calls a his back garden.',
			connections: {
				'bobs house only room': {
					description: 'The cat flap slams shut and regardless of how much mud is thrown, it will not budge one bit.',
					if: {
						'bobs house back door key': {
							description: 'The rusty old cat flap has a worn area that looks remarkably like the shape of a bottle opener.'
						}
					}
				},
				'bobs house driveway': {
					description: 'Off to the right, hidden between the back of Bobs house and a blackberry bush is a well worn path.'
				}
			}
		},
		'bobs house driveway': {
			description: 'More blackberry bush than driveway this part of Bobs estate had most defiantly seen better days.',
			connections: {
				'bobs house back garden': {
					description: 'Not the most inviting of views, being mostly blackberry bush, but there is evidence of a pathway heading down the side of Bobs house.'
				},
				'bobs house front garden': {
					description: 'One could ponder for hours about how such a small front garden could be so well neglected.'
				},
				'post office': {
					description: 'From the driveway there is a clear view of the Post Office counter. Only obscured if one of the punters leaves the door open.'
				}
			}
		},
		'post office': {
			description: 'Waking into the Post Office there is an old wooden counter with the standard issue glass partition keeping away any unwanted advances. Behind said glass is the view many have died for, Mrs Molly Malone.',
			connections: {
				'bobs house front garden': {
					description: 'Opposite from Mrs Molly Malone\'s Post Office is Bobs house. If one can claim as such in todays world of health and safety.'
				},
				'bobs house driveway': {
					description: 'Mrs Molly Malone longs for customers to leave the Post Office door open. For the single reason that it blocks her view of Bobs bush.'
				}
			}
		}
	},
	items: {
		'bobs house back door key': {
			description: 'An old bottle opener with scratches on one side lays there, longing for a beer to open.',
			'owned': {
				description: 'A rusty bottle opener.'
			},
			'take': {
				description: 'Like an old school magicians trick the bottle opener vanishes from sight.'
			},
			'leave': {
				description: 'To the sound of a duck passing wind a small bottle opener appears on the ground.'
			},
			'use': {
				description: 'As if designed by the greatest minds of Silicon Valley the bottle opener perfectly positioned could gain entry to Bobs back door.'
			}
		}
	},
	'placements': {
		'bobs house only room': ['bobs house back door key'],
		'_reader': []
	}
};
