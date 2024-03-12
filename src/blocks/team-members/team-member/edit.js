import {
	MediaPlaceholder,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { isBlobURL } from '@wordpress/blob';
import { Spinner, withNotices } from '@wordpress/components';

function Edit( { attributes, setAttributes, ...props } ) {
	const { name, bio, url, alt } = attributes;

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

	console.log( url, props );

	return (
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
		</div>
	);
}

export default withNotices( Edit );
