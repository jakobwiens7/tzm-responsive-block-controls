=== TZM Responsive Block Controls ===
Contributors: TezmoMedia - Jakob Wiens
Donate link: 
Tags: responsivity, blocks, controls
Requires at least: 5.6.0
Tested up to: 6.7
Stable tag: 1.0.0
Requires PHP: 7.4.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

TZM Responsive Block Controls lets you customize blocks for different screen sizes. Control visibility, alignments, font size, spacing, and much more.

== Description ==

While the (Gutenberg) Block Editor has brought a lot of powerful tools to web design, it still falls short in one crucial aspect: **Responsive controls**

**TZM Responsive Block Controls** is here to fill the gap! 

This plugin enhances the Block Editor by adding a dedicated **Responsive controls** panel right inside your block settings. This allows you to customize how blocks appear on different devices. No more need for complicated workarounds or custom CSS!

* **Hide Blocks:** Easily hide blocks on specific devices to create tailored layouts.
* **Align and Justify Blocks:** Ensure fluid layouts by adjusting block alignment and justification across different devices.
* **Reverse Direction:** Reverse the direction of blocks (like 'Media & Text', 'Columns', or 'Group' blocks) for optimized device-specific layouts.
* **Font Size Adjustments:** Adjust font sizes per device to maintain readability and visual consistency.
* **Control Padding and Margin:** Set custom padding and margins for each device to achieve perfect spacing.
* **Block Gaps:** Adjust block spacing based on device type for optimal layout flow.
* **Adjust Block Heights:** Set different block heights across devices to maintain consistent, visually appealing layouts.

Although there are similar plugins out there, they usually lack the comprehensive feature set needed to fully implement responsive design within the Block Editor.
**TZM Responsive Block Controls** was created based on the real-world needs of web designers and clients, addressing the common challenges that arise in modern responsive design.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/tzm-responsive-block-controls` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= How does TZM Responsive Block Controls work behind the scenes? =

TZM Responsive Block Controls applies responsive styles to your blocks using a combination of CSS classes and inline styles with CSS variables, depending on the feature you use.

CSS Classes: For features like hiding or reversing blocks, the plugin assigns CSS classes to the block's element. Examples include:
- .tzm-responsive__hidden__phone – Hides the block on phone-sized screens.
- .tzm-responsive__reverse__desktop – Reverses the block's flow direction on desktop screens.

Inline Styles with CSS Variables: For features that require specific values, such as font size, padding, or margins, the plugin dynamically injects inline styles using CSS variables. This allows for more precise control and flexibility:
- --tzm-responsive--font-size--tablet – Controls the font size on tablet-sized screens.
- --tzm-responsive--padding-top--laptop – Adjusts the padding for laptop-sized screens.

This combination ensures that your blocks adapt seamlessly across different devices and also enables easier customization, if you wish to override styling rules via custom CSS.


= Can i define my own breakpoints? =

Yes, you can easily customize the default breakpoints used by TZM Responsive Block Controls. Simply add the following code to your theme's functions.php file:

	`function override_responsive_block_controls_breakpoints( $breakpoints ) {
		$breakpoints['phone']   = '781px';
		$breakpoints['tablet']  = '1024px';
		$breakpoints['laptop']  = '1366px';
		$breakpoints['mobile']  = '781px'; // Optional: Custom mobile breakpoint
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


= What happens if I uninstall the plugin? =

When you uninstall TZM Responsive Block Controls, any responsive controls (e.g. hiding blocks on specific devices, margin/padding adjustments) you have applied will no longer function. 
However, your content will remain intact, and the blocks will revert to their default styling and behavior across all devices.



== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).
2. This is the second screen shot

== Changelog ==


== Upgrade Notice ==

