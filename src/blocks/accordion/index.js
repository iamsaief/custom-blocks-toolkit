import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, RichText, InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

import "./style.scss";
import metadata from "./block.json";

const BLOCKS_TEMPLATE = [
	["core/heading", { placeholder: "Accordion heading ..." }],
	["core/paragraph", { placeholder: "Accordion body ..." }],
];

const tags = [
	{
		label: "h1",
		value: "h1",
	},
	{
		label: "h2",
		value: "h2",
	},
	{
		label: "h3",
		value: "h3",
	},
	{
		label: "h4",
		value: "h4",
	},
	{
		label: "h5",
		value: "h5",
	},
	{
		label: "h6",
		value: "h6",
	},
	{
		label: "p",
		value: "p",
	},
];

registerBlockType(metadata.name, {
	attributes: {
		heading: {
			type: "string",
			selector: "h4",
			default: "Accordion Heading",
		},
		headingTag: {
			type: "string",
			default: "h4",
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: function ({ attributes, setAttributes }) {
		const blockProps = useBlockProps({ className: "sf-accordion" });
		const innerBlocksProps = useInnerBlocksProps(blockProps);

		const { heading, headingTag } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody initialOpen={false} title={__("Accordion Head", "")}>
						<SelectControl
							label={__("Select Tag", "")}
							options={tags}
							onChange={(headingTag) => setAttributes({ headingTag })}
							value={headingTag}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="accordion-head">
						<RichText
							{...blockProps}
							tagName={headingTag}
							value={heading}
							onChange={(heading) => setAttributes({ heading })}
							placeholder={__("Accordion heading...")}
						/>
						<span>
							<svg
								className="icon"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
									stroke="#2F3437"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path d="M12 8V16" stroke="#2F3437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M8 12H16" stroke="#2F3437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<svg
								className="icon-active"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
									stroke="#2F3437"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path d="M8 12H16" stroke="#2F3437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</span>
					</div>
					<div className="accordion-body" style={{ "--spaceX": "", "--spaceY": "" }}>
						<InnerBlocks template={["core/paragraph", { placeholder: "Accordion body ..." }]} />
					</div>
				</div>
			</>
		);
	},

	/**
	 * @see ./save.js
	 */
	save: function ({ attributes }) {
		const blockProps = useBlockProps.save();
		const innerBlocksProps = useInnerBlocksProps.save();
		const { heading, headingTag } = attributes;

		return (
			<div {...blockProps}>
				<div className="accordion-head" style={{ "--spaceX": "", "--spaceY": "" }}>
					<RichText.Content tagName={headingTag} value={heading} />
					<span>
						<svg
							className="icon"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
								stroke="#2F3437"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M12 8V16" stroke="#2F3437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 12H16" stroke="#2F3437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<svg
							className="icon-active"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
								stroke="#2F3437"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M8 12H16" stroke="#2F3437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
				</div>
				<div className="accordion-body">
					<div {...innerBlocksProps} style={{ "--spaceX": "", "--spaceY": "" }} />
				</div>
			</div>
		);
	},
});
