=== TZM Responsive Block Controls ===
Contributors: jakobwiens
Tags: responsivity, responsive, block controls, mobile, customization
Requires at least: 6.4.0
Tested up to: 6.6.2
Stable tag: 1.0.2
Requires PHP: 7.4.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

TZM Responsive Block Controls lets you customize blocks for different screen sizes. Control visibility, alignment, font size, spacing, and much more.


== Description ==

While the (Gutenberg) Block Editor has brought a lot of amazing and powerful tools to web design, it still falls short in one crucial aspect: **Responsive controls**

=== TZM Responsive Block Controls is here to fill the gap! ===

This plugin enhances the Block Editor by adding a dedicated **Responsive controls** panel right inside your block's settings tab. 
The provided options allow you to customize how your blocks appear on different devices. No more need for complicated workarounds or custom CSS!

* **Hide Blocks:** Easily hide blocks on specific devices to create tailored layouts.
* **Full Width Blocks:** Make blocks take up the full width of their available space to adjust layouts on mobile devices.
* **Reverse Direction:** Reverse the direction/order of blocks (like 'Media & Text', 'Columns', or 'Row' blocks) for optimized layouts.
* **Justify Blocks:** Ensure fluid layouts by adjusting block justification across different devices.
* **Align Images and Text:** Control horizontal alignment of images and text for consistent layouts across devices.
* **Font Size Adjustments:** Adjust font sizes per device to maintain readability and visual consistency.
* **Control Padding and Margin:** Set custom padding and margins for each device to achieve perfect spacing.
* **Adjust Block Gaps:** Adjust block spacing based on device type for optimal layout flow.
* **Adjust Block Heights:** Set different block heights across devices to maintain consistent, visually appealing layouts.

With its extensive feature set, TZM Responsive Block Controls provides everything you need to create stunning and visually appealing designs across different devices.

=== Source Code ===

The source code for TZM Responsive Block Controls is now available on GitHub! 
Follow the development, report issues, and get involved in improving the plugin. We welcome contributions, feedback, and feature requests from the community. 

* [View on GitHub](https://github.com/jakobwiens7/tzm-responsive-block-controls)


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/tzm-responsive-block-controls` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= How does TZM Responsive Block Controls work behind the scenes? =
TZM Responsive Block Controls applies responsive styles to your blocks using a combination of CSS classes and inline styles with CSS variables.

CSS Classes: For features like hiding or reversing blocks, the plugin assigns CSS classes to the block's element. Examples include:
`.tzm-responsive__hidden__phone` – Hides the block on phone-sized screens.
`.tzm-responsive__reverse__desktop` – Reverses the block's flow direction on desktop screens.

Inline Styles with CSS Variables: For features that require specific values, such as font size, padding, or margins, the plugin dynamically injects inline styles using CSS variables:
`--tzm-responsive--font-size--tablet` – Controls the font size on tablet-sized screens.
`--tzm-responsive--padding-top--laptop` – Adjusts the padding for laptop-sized screens.

Note: This plugin relies on `!important` declarations to ensure styles are applied correctly. While the use of `!important` is typically discouraged, it is necessary in certain cases to achieve consistent, responsive behavior across devices. Please keep this in mind.

= Does TZM Responsive Block Controls work with third-party blocks? =
While it is primarily designed to target WordPress core blocks, some responsive features should also work with third-party blocks. However, third-party blocks may not always behave the same way as core blocks, which can lead to unexpected results or prevent the responsive controls from taking effect.
Feel free to suggest blocks or plugins you think *TZM Responsive Block Controls* should support :)

= Can i define my own breakpoints? =
Yes, you can easily customize the default breakpoints used by TZM Responsive Block Controls. Simply add the following code to your theme's functions.php file:

	`function override_responsive_block_controls_breakpoints( $breakpoints ) {
		$breakpoints['phone']   = '781px';
		$breakpoints['tablet']  = '1024px';
		$breakpoints['laptop']  = '1366px';
		return $breakpoints;
	}
	add_filter('tzm_responsive_block_controls_breakpoints', 'override_responsive_block_controls_breakpoints');`

This will override the default breakpoints and allow you to use your own custom values.

= I want to use my own CSS. How can I disable the default CSS styling? =
If you prefer to use your own custom CSS for styling blocks, you can disable the plugin's default CSS output by adding this code to your theme's functions.php file:

	`function enqueue_responsive_block_controls_css( $bool ) {
		return false;
	}
	add_filter('tzm_responsive_block_controls_output_css', 'enqueue_responsive_block_controls_css');`

= Does it work with classic themes? =
No, this plugin is designed specifically for use with the Block Editor and works only with block-based themes. 
It doesn’t support classic themes that use the older editor framework.

= What happens if I uninstall the plugin? =
When you uninstall *TZM Responsive Block Controls*, any responsive adjustments (e.g. hiding blocks, margin/padding) you have applied will no longer work. 
However, your content will remain intact, and the blocks will revert to their default styling and behavior across all devices.


== Screenshots ==

1. The Responsive Controls panel in your Inspector Controls provides an extensive and easy-to-use feature set
2. Preview responsive adjustments instantly (Desktop view)
3. Preview responsive adjustments instantly (Tablet view)
4. Preview responsive adjustments instantly (Phone/Mobile view)


== Changelog ==

== 1.0.2 ==
- Added "Justification" and "Reverse" support for "Social Links" block
- Minor bugfixes
- Added changelog.txt
- Updated readme.txt
- Migrated source code to [GitHub](https://github.com/jakobwiens7/tzm-responsive-block-controls)

= 1.0.1 = 
- Fixed "Reverse block" functionality when "Stack on mobile" is enabled

= 1.0.0 = 
- Initial release :)


== Upgrade Notice ==
