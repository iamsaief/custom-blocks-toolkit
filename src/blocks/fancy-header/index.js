import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import './index.scss';

import block from './block.json';

registerBlockType(block.name, {
	title: __(block.title),
	edit: ({ attributes, setAttributes }) => {
		const { content, textColor } = attributes;
		const blockProps = useBlockProps();
		const colors = [
			{ name: 'red', color: 'red' },
			{ name: 'white', color: 'green' },
			{ name: 'blue', color: 'blue' },
		];

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Color')}>
						<ColorPalette
							colors={colors}
							value={textColor}
							onChange={(newValue) => setAttributes({ textColor: newValue })}
						/>
					</PanelBody>
				</InspectorControls>
				<RichText
					{...blockProps}
					tagName="h2"
					placeholder={__('Enter your heading', block.textdomain)}
					value={content}
					onChange={(newValue) => setAttributes({ content: newValue })}
				/>
			</>
		);
	},
	save: ({ attributes }) => {
		const blockProps = useBlockProps.save();
		const { content, textColor } = attributes;
		return <RichText.Content {...blockProps} tagName="h2" value={content} style={{ color: textColor }} />;
	},
});
