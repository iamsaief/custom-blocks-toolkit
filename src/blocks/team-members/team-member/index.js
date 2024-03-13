import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'custom-blocks-toolkit/team-member', {
	title: __( 'Team Member', 'team-member' ),
	description: __( 'A Team Member', 'team-member' ),
	icon: 'admin-users',
	parent: [ 'custom-blocks-toolkit/team-members' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		socialLinks: {
			type: 'array',
			default: [
				{ link: 'https://facebook.com', icon: 'facebook' },
				{ link: 'https://instagram.com', icon: 'instagram' },
			],
			source: 'query',
			selector:
				'.wp-block-custom-blocks-toolkit-team-member-social-links ul li',
			query: {
				icon: {
					source: 'attribute',
					attribute: 'data-icon',
				},
				link: {
					source: 'attribute',
					attribute: 'href',
					selector: 'a',
				},
			},
		},
	},
	edit: Edit,
	save: Save,
} );
