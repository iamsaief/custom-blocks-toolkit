/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	QueryControls,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __experimentalGetSettings, dateI18n, format } from '@wordpress/date';
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		numberOfPosts,
		displayFeatImg,
		order,
		orderby,
		categories,
		postsPerColumn,
		excerptLength,
	} = attributes;

	const catIDs =
		categories && categories.length > 0
			? categories.map( ( cat ) => cat.id )
			: [];

	const posts = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
				order,
				orderby,
				categories: catIDs,
			} );
		},
		[ numberOfPosts, order, orderby, categories ]
	);

	const onFeaturedImgChange = ( value ) => {
		setAttributes( { displayFeatImg: value } );
	};

	const onNumberOfItemsChange = ( value ) => {
		setAttributes( { numberOfPosts: value } );
	};

	const categorySuggestions = {};

	const allCategories = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
		} );
	}, [] );

	if ( allCategories ) {
		for ( let i = 0; i < allCategories.length; i++ ) {
			const cat = allCategories[ i ];

			categorySuggestions[ cat.name ] = cat;
		}
	}

	const onCategoryChange = ( values ) => {
		const hasNoSuggestions = values.some(
			( value ) =>
				typeof value === 'string' && ! categorySuggestions[ value ]
		);
		if ( hasNoSuggestions ) return;
		const updatedCats = values.map( ( cat ) => {
			return typeof cat === 'string' ? categorySuggestions[ cat ] : cat;
		} );

		setAttributes( { categories: updatedCats } );
	};

	const getExcerptWords = ( article, numWords ) => {
		const words = article.split( ' ' );
		const firstNWords = words.slice(
			0,
			Math.min( words.length, numWords )
		);
		const excerpt = firstNWords.join( ' ' );

		return excerpt;
	};

	// console.log( 'POSTS 🚀', posts, 'CATS 🗂️', categorySuggestions );

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={ __( 'Display featured image', 'latest-posts' ) }
						checked={ displayFeatImg }
						onChange={ onFeaturedImgChange }
					/>
					<QueryControls
						numberOfItems={ numberOfPosts }
						onNumberOfItemsChange={ onNumberOfItemsChange }
						minItems={ 1 }
						maxItems={ 10 }
						orderBy={ orderby }
						onOrderByChange={ ( value ) =>
							setAttributes( { orderby: value } )
						}
						order={ order }
						onOrderChange={ ( value ) =>
							setAttributes( { order: value } )
						}
						categorySuggestions={ categorySuggestions }
						selectedCategories={ categories }
						onCategoryChange={ onCategoryChange }
					/>
					<RangeControl
						label={ __( 'Posts per column', 'latest-posts' ) }
						min={ 1 }
						max={ 4 }
						value={ postsPerColumn }
						onChange={ ( value ) =>
							setAttributes( { postsPerColumn: value } )
						}
					/>
					<RangeControl
						label={ __(
							'Number of words in excerpt',
							'custom-post-query'
						) }
						value={ excerptLength }
						onChange={ ( value ) => {
							setAttributes( { excerptLength: value } );
						} }
						min="10"
						max="50"
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<ul style={ { '--posts-per-column': `${ postsPerColumn }` } }>
					{ posts &&
						posts.map( ( post ) => {
							const featImg =
								post._embedded &&
								post._embedded[ 'wp:featuredmedia' ] &&
								post._embedded[ 'wp:featuredmedia' ].length >
									0 &&
								post._embedded[ 'wp:featuredmedia' ][ 0 ];
							const postCategories = allCategories.filter(
								( cat ) => post.categories.includes( cat.id )
							);
							return (
								<li key={ post.id }>
									{ displayFeatImg && featImg && (
										<img
											src={
												featImg.media_details.sizes
													.large?.source_url
											}
											alt={ featImg.alt_text }
										/>
									) }
									<h4 className="title">
										<a href={ post.link }>
											{ post.title.rendered ? (
												<RawHTML>
													{ post.title.rendered }
												</RawHTML>
											) : (
												__( 'No title', 'latest-posts' )
											) }
										</a>
									</h4>
									<p className="category">
										{ postCategories
											.map( ( cat ) => cat.name )
											.join( ', ' ) }
									</p>
									{ post.date_gmt && (
										<time
											dateTime={ format(
												'c',
												post.date_gmt
											) }
										>
											{ dateI18n(
												__experimentalGetSettings()
													.formats.date,
												post.date_gmt
											) }
										</time>
									) }
									{ post.excerpt.rendered && (
										<RawHTML>
											{ getExcerptWords(
												post.excerpt.rendered,
												excerptLength
											) }
										</RawHTML>
									) }
								</li>
							);
						} ) }
				</ul>
			</div>
		</>
	);
}
