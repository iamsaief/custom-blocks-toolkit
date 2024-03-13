import {
	BlockControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Button,
	Icon,
	Spinner,
	TextControl,
	ToolbarButton,
	Tooltip,
	withNotices,
} from '@wordpress/components';
import { usePrevious } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';

function Edit( { attributes, setAttributes, ...props } ) {
	const { name, bio, url, alt, id, socialLinks } = attributes;
	const [ blobURL, setBlogURL ] = useState();
	const [ selectedLink, setSelectedLink ] = useState();

	const prevIsSelected = usePrevious( props.isSelected );

	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

	const onSelectURL = ( newUrl ) => {
		setAttributes( {
			url: newUrl,
			id: undefined,
			alt: '',
		} );
	};

	const onUploadError = ( message ) => {
		props.noticeOperations.removeAllNotices();
		props.noticeOperations.createErrorNotice( message );
	};

	const removeImage = () => {
		setAttributes( { url: undefined, id: undefined, alt: '' } );
	};

	const addNewSocialIcon = () => {
		setAttributes( {
			socialLinks: [ ...socialLinks, { icon: 'wordpress', link: '' } ],
		} );
		setSelectedLink( socialLinks.length );
	};

	const updateSocialLink = ( type, value ) => {
		const socialLinksCopy = [ ...socialLinks ];
		socialLinksCopy[ selectedLink ][ type ] = value;
		setAttributes( { socialLinks: socialLinksCopy } );
	};

	const removeSocialLink = () => {
		setAttributes( {
			socialLinks: [
				...socialLinks.slice( 0, selectedLink ),
				...socialLinks.slice( selectedLink + 1 ),
			],
		} );
		setSelectedLink();
	};

	useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( { id: undefined, alt: '' } );
		}
	}, [] );

	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlogURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlogURL();
		}
	}, [ url ] );

	useEffect( () => {
		if ( prevIsSelected && ! props.isSelected ) {
			setSelectedLink();
		}
	}, [ props.isSelected, prevIsSelected ] );

	// console.log( url, props );

	return (
		<>
			{ url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={ __( 'Replace Image', 'team-members' ) }
						onSelect={ onSelectImage }
						onSelectURL={ onSelectURL }
						onError={ onUploadError }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						mediaId={ id }
						mediaURL={ url }
					/>
					<ToolbarButton onClick={ removeImage }>
						{ __( 'Remove Image', 'team-members' ) }
					</ToolbarButton>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ url && (
					<div
						className={ `wp-block-custom-blocks-toolkit-team-member-img ${
							isBlobURL( url ) ? 'is-loading' : ''
						}` }
					>
						<img src={ url } alt={ alt } />
						{ isBlobURL( url ) && <Spinner /> }
					</div>
				) }
				<MediaPlaceholder
					icon="admin-users"
					onSelect={ onSelectImage }
					onSelectURL={ onSelectURL }
					onError={ onUploadError }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					disableMediaButtons={ url }
					notices={ props.noticeUI }
				/>
				<RichText
					placeholder={ __( 'Member name', 'team-member' ) }
					tagName="h4"
					value={ name }
					onChange={ ( name ) => setAttributes( { name } ) }
				/>
				<RichText
					placeholder={ __( 'Member bio', 'team-member' ) }
					tagName="p"
					value={ bio }
					onChange={ ( bio ) => setAttributes( { bio } ) }
				/>
				<div className="wp-block-custom-blocks-toolkit-team-member-social-links">
					<ul>
						{ socialLinks.map( ( item, index ) => {
							return (
								<li
									key={ index }
									className={
										selectedLink === index
											? 'is-selected'
											: null
									}
								>
									<button
										aria-label={ __(
											'Edit Social Link',
											'team-members'
										) }
										onClick={ () =>
											setSelectedLink( index )
										}
									>
										<Icon icon={ item.icon } />
									</button>
								</li>
							);
						} ) }
						{ props.isSelected && (
							<li>
								<Tooltip
									text={ __(
										'Add Social Link',
										'team-members'
									) }
								>
									<button
										aria-label={ __(
											'Add Social Link',
											'team-members'
										) }
										onClick={ addNewSocialIcon }
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						) }
					</ul>
				</div>
				{ selectedLink !== undefined && (
					<div className="wp-block-custom-blocks-toolkit-team-member-link-form">
						<TextControl
							label={ __( 'Icon', 'team-members' ) }
							value={ socialLinks[ selectedLink ].icon }
							onChange={ ( icon ) =>
								updateSocialLink( 'icon', icon )
							}
						/>
						<TextControl
							label={ __( 'Link', 'team-members' ) }
							value={ socialLinks[ selectedLink ].link }
							onChange={ ( link ) =>
								updateSocialLink( 'link', link )
							}
						/>
						<Button isDestructive onClick={ removeSocialLink }>
							{ __( 'Remove Link', 'team-members' ) }
						</Button>
					</div>
				) }
			</div>
		</>
	);
}

export default withNotices( Edit );
