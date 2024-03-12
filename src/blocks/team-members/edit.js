import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `has-${ columns }-columns`,
			} ) }
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Columns', 'team-members' ) }
						min={ 1 }
						max={ 6 }
						value={ columns }
						onChange={ ( newColumns ) =>
							setAttributes( { columns: newColumns } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ [ 'custom-blocks-toolkit/team-member' ] }
				template={ [
					[ 'custom-blocks-toolkit/team-member' ],
					[ 'custom-blocks-toolkit/team-member' ],
				] }
			/>
		</div>
	);
}
