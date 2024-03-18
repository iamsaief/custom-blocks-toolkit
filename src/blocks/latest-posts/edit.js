/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __experimentalGetSettings, dateI18n, format } from '@wordpress/date';
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { numberOfPosts, displayFeatImg } = attributes;

	const posts = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
			} );
		},
		[ numberOfPosts ]
	);

	console.log( posts );

	return (
		<ul { ...useBlockProps() }>
			{ posts &&
				posts.map( ( post ) => {
					const featImg =
						post._embedded &&
						post._embedded[ 'wp:featuredmedia' ] &&
						post._embedded[ 'wp:featuredmedia' ].length > 0 &&
						post._embedded[ 'wp:featuredmedia' ][ 0 ];
					return (
						<li key={ post.id }>
							{ displayFeatImg && featImg && (
								<img
									src={
										featImg.media_details.sizes.thumbnail
											.source_url
									}
									alt={ featImg.alt_text }
								/>
							) }
							<h5>
								<a href={ post.link }>
									{ post.title.rendered ? (
										<RawHTML>
											{ post.title.rendered }
										</RawHTML>
									) : (
										__( 'No title', 'latest-posts' )
									) }
								</a>
							</h5>
							{ post.date_gmt && (
								<time dateTime={ format( 'c', post.date_gmt ) }>
									{ dateI18n(
										__experimentalGetSettings().formats
											.date,
										post.date_gmt
									) }
								</time>
							) }
							{ post.excerpt.rendered && (
								<RawHTML>{ post.excerpt.rendered }</RawHTML>
							) }
						</li>
					);
				} ) }
		</ul>
	);
}
