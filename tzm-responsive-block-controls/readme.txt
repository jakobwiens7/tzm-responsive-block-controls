=== TZM Responsive Block Controls ===
Contributors:      TezmoMedia - Jakob Wiens
Tags:              block, responsive, controls
Requires at least: 5.6.0
Tested up to:      6.0.2
Stable tag:        1.0.0
Requires PHP:      7.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Control your block's appearance depending on a device's screen width.


== Description ==

wp i18n make-pot . languages/tzm-responsive-block-controls.pot
wp i18n make-json languages/tzm-responsive-block-controls-de_DE.po --no-purge
wp i18n make-json languages/tzm-responsive-block-controls-de_DE_formal.po --no-purge

This is the long description. No limit, and you can use Markdown (as well as in the following sections).

For backwards compatibility, if this section is missing, the full length of the short description will be used, and
Markdown parsed.


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/tzm-responsive-block-controls` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= How can i define my own breakpoints? =

function override_responsive_block_controls_breakpoints( $breakpoints ) {
	$breakpoints['phone'] 	= '781px';
	$breakpoints['tablet'] 	= '1024px';
	$breakpoints['laptop'] 	= '1366px';
	
	return $breakpoints;
}
add_filter('tzm_responsive_block_controls_breakpoints', 'override_responsive_block_controls_breakpoints');


= I want to use my own CSS. How can i disable the default CSS styling? =

function enqueue_responsive_block_controls_css( $bool ) {
	return false;
}
add_filter('tzm_responsive_block_controls_output_css', 'enqueue_responsive_block_controls_css');


== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot


== Changelog ==

= 0.9.0 =
* Release
