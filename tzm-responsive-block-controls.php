<?php

/**
 * Plugin Name:		TZM Responsive Block Controls
 * Description:		Control your block's appearance depending on a device's screen width.
 * Version:			1.1.1
 * Author:			TezmoMedia - Jakob Wiens
 * Author URI:		https://www.tezmo.media
 * License:			GPL-2.0-or-later
 * License URI:		https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:		tzm-responsive-block-controls
 * Domain Path:		/languages
 * Requires at least: 6.4
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Check if class exists
if (!class_exists('TZM_Responsive_Block_Controls')) {

    class TZM_Responsive_Block_Controls
    {

        // The instance of this class
        private static $instance = null;

        // Returns the instance of this class.
        public static function get_instance()
        {
            if (null === self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        public function __construct()
        {

            // Load plugin textdomain
            add_action('plugins_loaded', array($this, 'load_textdomain'));

            // Render block
            add_filter('render_block', array($this, 'render_block'), 10, 2);

            // Enqueue block editor assets
            add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));

            // Enqueue both backend + frontend block assets
            add_action('enqueue_block_assets', array($this, 'enqueue_block_assets'), 100);

            // Add the responsive controls attribute to blocks.
            add_action('wp_loaded', array($this, 'add_attribute_to_blocks'), 100);
        }

        /**
         * Load plugin textdomain
         */
        public function load_textdomain()
        {
            load_plugin_textdomain(
                'tzm-responsive-block-controls',
                false,
                dirname(plugin_basename(__FILE__)) . '/languages/'
            );
        }


        /**
         * Add the `responsiveControls` attribute to all server-side registered blocks.
         *
         * @hooked wp_loaded,100    This might not be late enough for all blocks, I don't know when blocks are supposed to be registered.
         */
        public function add_attribute_to_blocks()
        {
            $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

            foreach ($registered_blocks as $name => $block) {
                $block->attributes['responsiveControls'] = array(
                    'type'    => 'object',
                    'default' => null,
                );
            }
        }


        /**
         * Generate responsive block stylesheet
         */
        public function get_responsive_block_styles()
        {
            // Apply Filter wether to allow or prevent CSS output
            if (!apply_filters('tzm_responsive_block_controls_output_css', true)) return false;

            $default_breakpoints = array(
                'phone'     => '781px',
                'tablet'    => '1024px',
                'laptop'    => '1366px',
                'desktop'   => '1680px', // for now this value is will be ignored
                'mobile'    => '1024px'   // wp block related mobile breakpoint
            );

            // Apply Filter to allow custom breakpoints
            $breakpoints = apply_filters('tzm_responsive_block_controls_breakpoints', $default_breakpoints);

            // Merge provided breakpoints with defaults and restrict to only default keys
            $breakpoints = array_intersect_key(array_merge($default_breakpoints, $breakpoints));

            // Get source CSS stylesheet
            $css = file_get_contents(plugin_dir_path(__FILE__) . 'build/style-tzm-responsive-block-controls.css');
            $mobile_css = '.tzm-responsive__reverse___DEVICE_.is-layout-flex:not(.wp-block-group):not(.wp-block-navigation):not(.is-not-stacked-on-mobile) { flex-direction: column-reverse !important; }';
            $hidden_css = 'body { --tzm--hidden-blocks-bg: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAQAAAC1QeVaAAAASElEQVQY02NgQALS/5F5Ssg8qa/IUgooUg+QpWRRpA7hNB5VCsV4VANReKjOQDWDgYFIm/G4F7cv8YSNLG4pFCNQeSjq0MwAAPCoHW3Q0Dt9AAAAAElFTkSuQmCC"); }';

            // Generate responsive CSS stylesheet
            $output_css = $hidden_css;
            $placeholder = '_DEVICE_';

            foreach ($breakpoints as $device => $value) {
                if (!$device) break;

                // Insert the current device's media query
                switch ($device) {
                    case 'mobile':
                        $output_css .= '@media screen and (max-width: ' . $breakpoints['mobile'] . ') {';
                        $output_css .= str_replace($placeholder, 'phone', $mobile_css);
                        $output_css .= str_replace($placeholder, 'tablet', $mobile_css); // To-Do: Maybe check if tablet breakpoint is same as mobile breakpoint?
                        break;
                    case 'phone':
                        $output_css .= '@media screen and (max-width: ' . $breakpoints['phone'] . ') {';
                        break;
                    case 'tablet':
                        $output_css .= '@media screen and (min-width: calc(' . $breakpoints['phone'] . ' + 1px)) and (max-width: ' . $breakpoints['tablet'] . ') {';
                        break;
                    case 'laptop':
                        $output_css .= '@media screen and (min-width: calc(' . $breakpoints['tablet'] . ' + 1px)) and (max-width: ' . $breakpoints['laptop'] . ') {';
                        break;
                    case 'desktop':
                        $output_css .= '@media screen and (min-width: calc(' . $breakpoints['laptop'] . ' + 1px)) {';
                        break;
                    default:
                        $output_css .= ''; // Fallback if device doesn't match
                }

                // Insert the corresponding CSS for the device, replacing the placeholder
                if ($device !== 'mobile') $output_css .= str_replace($placeholder, $device, $css);

                // Add the current device's media query closing bracket
                $output_css .= '}';
            }

            return $output_css;
        }


        /**
         * Enqueue block editor assets
         */
        public function enqueue_editor_assets()
        {
            $editor_assets = include(plugin_dir_path(__FILE__) . 'build/tzm-responsive-block-controls.asset.php');

            wp_enqueue_style(
                'tzm-responsive-block-controls-editor',
                plugins_url('/build/tzm-responsive-block-controls.css', __FILE__),
                array('wp-editor'),
                $editor_assets['version']
            );
            wp_enqueue_script(
                'tzm-responsive-block-controls-editor',
                plugins_url('/build/tzm-responsive-block-controls.js', __FILE__),
                $editor_assets['dependencies'],
                $editor_assets['version'],
                array('in_footer' => true)
            );

            // Script Translations
            if (function_exists('wp_set_script_translations')) {
                wp_set_script_translations(
                    'tzm-responsive-block-controls-editor',
                    'tzm-responsive-block-controls',
                    plugin_dir_path(__FILE__) . 'languages'
                );
            }
        }


        /**
         * Enqueue both backend + frontend block assets
         */
        public function enqueue_block_assets()
        {
            $frontend_assets = include(plugin_dir_path(__FILE__) . 'build/tzm-responsive-block-controls.asset.php');

            // Get the dynamically generated CSS
            $css = $this->get_responsive_block_styles();

            // Register and enqueue responsive inline styles
            wp_register_style(
                'tzm-responsive-block-controls',
                false,
                is_admin() ? array('wp-editor') : array(),
                $frontend_assets['version']
            );
            wp_enqueue_style('tzm-responsive-block-controls');
            wp_add_inline_style('tzm-responsive-block-controls', $css);
        }


        /**
         * Render block
         */
        public function render_block($block_content, $block)
        {
            if (!isset($block['attrs']['responsiveControls']) || !$block['attrs']['responsiveControls']) {
                return $block_content;
            }

            $responsive_controls = $block['attrs']['responsiveControls'];
            $classes = [];
            $styles = [];

            foreach ($responsive_controls as $device => $options) {
                if (gettype($options) === 'string') continue;

                foreach ($options as $option => $value) {

                    switch ($option) {
                            // Collect classes
                        case 'hidden':
                        case 'reverse':
                            $classes[] = 'tzm-responsive__' . _wp_to_kebab_case($option) . '__' . $device;
                            break;

                        case 'imageAlign':
                            $classes[] = 'tzm-responsive__' . _wp_to_kebab_case($option) . '-' . $value . '__' . $device;
                            break;

                            // Collect styles
                        case 'padding':
                        case 'margin':
                            if (count($value) === 4) {
                                $is_short = $value['top'] == $value['right'] && $value['top'] == $value['bottom'] && $value['top'] == $value['left'];
                                $styles[] = '--tzm-responsive--' . $option . '--' . $device . ': ' . ($is_short ? $value['top'] : implode(' ', $value));
                            } else {
                                foreach ($value as $dir => $dirval) {
                                    $styles[] = '--tzm-responsive--' . $option . '-' . $dir . '--' . $device . ': ' . $dirval;
                                }
                            }
                            break;

                        case 'blockGap':
                            $styles[] = '--tzm-responsive--' . _wp_to_kebab_case($option) . '--' . $device . ': ' . $value['top'];
                            break;

                        case 'focalPoint':
                            if (is_array($value)) {
                                $styles[] = '--tzm-responsive--' . _wp_to_kebab_case($option) . '--' . $device . ': ' . ($value['x'] ?? 0) * 100 . "% " . ($value['y'] ?? 0) * 100 . "%";
                            }
                            break;
                        case 'justify':
                        case 'textAlign':
                        case 'fontSize':
                        case 'mediaWidth':
                        case 'minHeight':
                            $styles[] = '--tzm-responsive--' . _wp_to_kebab_case($option) . '--' . $device . ': ' . $value;

                            // Collect mixed
                        case 'width':
                            if ($value == 100) $classes[] = 'tzm-responsive__full-width__' . $device;
                            else $styles[] = '--tzm-responsive--width--' . $device . ': ' . $value;
                            break;
                    }
                }
            }
            $classes = implode(' ', $classes);
            $styles = implode(';', $styles);

            $html = new WP_HTML_Tag_Processor($block_content);
            $html->next_tag();

            // Replace classes
            if ($classes) {
                $html->add_class($classes);
            }

            // Replace styles
            if ($styles) {
                $html_style = $html->get_attribute('style');
                $html->set_attribute('style', $html_style ? $html_style . '; ' . $styles : $styles);
            }

            return $html->get_updated_html();
        }
    }

    TZM_Responsive_Block_Controls::get_instance();
}
