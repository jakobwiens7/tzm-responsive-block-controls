/**
 * WordPress Dependencies
 */
import { hasBlockSupport } from '@wordpress/blocks';


/**
 * Helper functions to determine supported blocks by feature
 * 
 * @param {Object} props
 * @param {Object} parentProps 
 * @param {Boolean} hasInnerBlocks 
 */
export const hasBlockWidth = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		parentProps?.attributes?.layout?.type === "flex" ||
		props.name === 'core/column' ||
		props.name === 'core/button' ||
		props.name === 'core/social-link' ||
		props.name === 'core/navigation-item' ||
		(props.name === 'core/image' && parentProps?.name === 'core/gallery')
	) return true;
	
	return false;
}

export const hasBlockMediaWidth = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name === 'core/site-logo' ||
		props.name === 'core/post-featured-image' ||
		props.name === 'core/avatar' ||
		props.name === 'core/video' ||
		(props.name === 'core/image' && parentProps?.name !== 'core/gallery')
	) return true;
	
	return false;
}

export const hasBlockJustify = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.attributes.layout?.type === "flex" ||
		props.name === 'core/navigation' ||
		props.name === 'core/buttons' ||
		props.name === 'core/social-links' ||
		props.name === 'outermost/icon-block'
	) return true;
	
	return false;
}

export const hasBlockReverse = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.attributes.layout?.type === "flex" ||
		props.name === 'core/navigation' ||
		props.name === 'core/columns' ||
		props.name === 'core/gallery' ||
		props.name === 'core/buttons' ||
		props.name === 'core/social-links'
	) return true;
	
	return false;
}

export const hasBlockMediaAlign = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name === 'core/site-logo' ||
		props.name === 'core/post-featured-image' ||
		props.name === 'core/avatar' ||
		(props.name === 'core/image' && parentProps?.name !== 'core/gallery')
	) return true;
	
	return false;
}

export const hasBlockFocalPoint = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		(
			props.name === 'core/media-text' ||
			props.name === 'core/image' ||
			props.name === 'core/video' ||
			props.name === 'core/cover' ||
			props.name === 'tzm/section'
		) && (
			!! props.attributes.url ||
			!! props.attributes.mediaUrl ||
			!! props.attributes.style?.background?.backgroundImage?.url || 
			props.attributes.useFeaturedImage
		)
	) return true;
	
	return false;
}

export const hasBlockTextAlign = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name !== 'core/site-logo' &&
		props.name !== 'core/post-featured-image' &&
		props.name !== 'core/video' &&
		props.name !== 'core/audio' &&
		props.name !== 'core/spacer' &&
		props.name !== 'core/separator' &&
		props.name !== 'core/avatar'
	) return true;
	
	else return false;
}

export const hasBlockFontSize = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		hasBlockSupport( props.name, "typography.fontSize" )
	) return true;
	
	return false;
}

export const hasBlockPadding = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		hasBlockSupport( props.name, "spacing.padding" )
	) return true;
	
	return false;
}

export const hasBlockMargin = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		hasBlockSupport( props.name, "spacing.margin" )
	) return true;
	
	return false;
}

export const hasBlockGap = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		!! hasBlockSupport( props.name, "spacing.blockGap" )
	) return true;
	
	return false;
}

export const hasBlockMinHeight = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		hasBlockSupport( props.name, "dimensions.minHeight" ) ||
		//"minHeight" in props.attributes ||
        // props.name === "core/group" ||
		props.name === "core/cover" ||
		props.name === "core/post-content" ||
		props.name === "core/columns" ||
		props.name === "core/spacer" ||
		props.name === "tzm/section"
	) return true;
	
	return false;
}

export const hasBlockBorder = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		hasBlockSupport( props.name, "__experimentalBorder" )
	) return true;
	
	return false;
}