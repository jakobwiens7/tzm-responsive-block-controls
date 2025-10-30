<?php

/**
 * Plugin Name:		TZM Responsive Block Controls
 * Description:		Control your block's appearance depending on a device's screen width.
 * Version:			1.2.2
 * Author:			TezmoMedia - Jakob Wiens
 * Author URI:		https://www.tezmo.media
 * License:			GPL-2.0-or-later
 * License URI:		https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:		tzm-responsive-block-controls
 * Domain Path:		/languages
 * Requires at least: 6.4
 */

namespace TZM\ResponsiveBlockControls;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Check if class already exists.
if (!class_exists('TZM_Responsive_Block_Controls')) {

    class TZM_Responsive_Block_Controls
    {
        /**
         * Instance of this class
         *
         * @var self|null
         */
        private static $instance = null;

        /**
         * Plugin directory path
         *
         * @var string
         */
        private $plugin_path;

        /**
         * Plugin directory URL
         *
         * @var string
         */
        private $plugin_url;

        /**
         * Constructor
         */
        private function __construct()
        {
            $this->plugin_path = plugin_dir_path(__FILE__);
            $this->plugin_url = plugins_url('', __FILE__);

            $this->init_hooks();
        }

        /**
         * Get singleton instance
         *
         * @return self
         */
        public static function get_instance(): self
        {
            if (null === self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Initialize WordPress hooks
         *
         * @return void
         */
        private function init_hooks(): void
        {
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
         * Add the `responsiveControls` attribute to all server-side registered blocks.
         *
         * @hooked wp_loaded,100    This might not be late enough for all blocks, I don't know when blocks are supposed to be registered.
         */
        public function add_attribute_to_blocks()
        {
            $registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

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
                'desktop'   => '1680px', // note that this actual value will be ignored
                'mobile'    => '1024px'   // wp block related mobile breakpoint
            );

            // Apply Filter to allow custom breakpoints
            $breakpoints = apply_filters('tzm_responsive_block_controls_breakpoints', $default_breakpoints);

            // Merge provided breakpoints with defaults and restrict to only default keys
            $breakpoints = array_intersect_key(array_merge($default_breakpoints, $breakpoints));

            // Get source CSS stylesheet
            $css = file_get_contents(plugin_dir_path(__FILE__) . 'build/style-tzm-responsive-block-controls.css');
            $mobile_css = '.tzm-responsive__reverse___DEVICE_.is-layout-flex:not(.wp-block-group):not(.wp-block-navigation):not(.is-not-stacked-on-mobile) { flex-direction: column-reverse !important }';

            // Generate responsive CSS stylesheet
            $output_css = '';
            $placeholder = '_DEVICE_';

            foreach ($breakpoints as $device => $value) {
                if (!$device) break;

                // Insert the current device's media query
                switch ($device) {
                    case 'desktop':
                        $output_css .= '@media screen and (min-width: ' . $breakpoints['laptop'] . ') {';
                        break;
                    case 'laptop':
                        $output_css .= '@media screen and (min-width: calc(' . $breakpoints['tablet'] . ' + 1px)) and (max-width: ' . $breakpoints['laptop'] . ') {';
                        break;
                    case 'tablet':
                        $output_css .= '@media screen and (min-width: calc(' . $breakpoints['phone'] . ' + 1px)) and (max-width: ' . $breakpoints['tablet'] . ') {';
                        break;
                    case 'phone':
                        $output_css .= '@media screen and (max-width: ' . $breakpoints['phone'] . ') {';
                        break;

                    case 'mobile': // Used to override WordPress' default responsive styles
                        $output_css .= '@media screen and (max-width: ' . $breakpoints['mobile'] . ') {';
                        $output_css .= str_replace($placeholder, 'phone', $mobile_css);
                        $output_css .= str_replace($placeholder, 'tablet', $mobile_css); // To-Do: Maybe check if tablet breakpoint is same as mobile breakpoint?
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
            $editor_assets = include($this->plugin_path . 'build/tzm-responsive-block-controls.asset.php');

            wp_enqueue_style(
                'tzm-responsive-block-controls-editor',
                $this->plugin_url . '/build/tzm-responsive-block-controls.css',
                array('wp-editor'),
                $editor_assets['version']
            );
            wp_enqueue_script(
                'tzm-responsive-block-controls-editor',
                $this->plugin_url . '/build/tzm-responsive-block-controls.js',
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
            $frontend_assets = include($this->plugin_path . 'build/tzm-responsive-block-controls.asset.php');

            // Get the dynamically generated CSS
            $css = $this->get_responsive_block_styles();

            // Register and enqueue responsive inline styles
            wp_register_style(
                'tzm-responsive-block-controls',
                false, // source url is false since we're adding inline styles
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
                        case 'hidden':
                        case 'reverse':
                            $classes[] = 'tzm-responsive__' . _wp_to_kebab_case($option) . '__' . $device;
                            break;

                        case 'imageAlign':
                            $classes[] = 'tzm-responsive__' . _wp_to_kebab_case($option) . '-' . $value . '__' . $device;
                            break;

                        case 'padding':
                        case 'margin':
                        case 'borderRadius':
                            if (is_array($value) && count($value) === 4) {
                                $is_short = count(array_unique($value)) === 1;

                                if ($option == 'borderRadius') {
                                    $styles[] = '--tzm-responsive--' . _wp_to_kebab_case($option) . '--' . $device . ': ' . ($is_short
                                        ? $value['topLeft']
                                        :  $value['topLeft'] . ' ' .  $value['topRight'] . ' ' .  $value['bottomRight'] . ' ' .  $value['bottomLeft']
                                    );
                                } else {
                                    //$is_short = $value['top'] == $value['right'] && $value['top'] == $value['bottom'] && $value['top'] == $value['left'];
                                    $styles[] = '--tzm-responsive--' . $option . '--' . $device . ': ' . ($is_short
                                        ? $value['top']
                                        : $value['top']  . ' ' . $value['right']  . ' ' . $value['bottom']  . ' ' . $value['left']
                                    );
                                }
                            } else {
                                foreach ($value as $dir => $dirval) {
                                    $styles[] = '--tzm-responsive--' . _wp_to_kebab_case($option) . '-' . _wp_to_kebab_case($dir) . '--' . $device . ': ' . $dirval;
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
                            break;

                        case 'width':
                            if ($value == 100) $classes[] = 'tzm-responsive__full-width__' . $device;
                            else $styles[] = '--tzm-responsive--width--' . $device . ': ' . $value;
                            break;
                    }
                }
            }
            $classes = implode(' ', $classes);
            $styles = implode(';', $styles);

            $html = new \WP_HTML_Tag_Processor($block_content);
            $html->next_tag();

            if ($classes) {
                $html->add_class($classes);
            }

            if ($styles) {
                $html_style = $html->get_attribute('style');
                $html->set_attribute('style', $html_style ? $html_style . '; ' . $styles : $styles);
            }

            return $html->get_updated_html();
        }
    }

    TZM_Responsive_Block_Controls::get_instance();
}
