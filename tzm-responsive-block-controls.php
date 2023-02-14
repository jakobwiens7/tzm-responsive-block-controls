<?php

/**
 * Plugin Name:		TZM Responsive Block Controls
 * Description:		Control your block's appearance depending on a device's screen width.
 * Version:			0.9.54
 * Author:			TezmoMedia - Jakob Wiens
 * Author URI:		https://www.tezmo.media
 * License:			GPL-2.0-or-later
 * License URI:		https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:		tzm-responsive-block-controls
 * Domain Path:		/languages
 * Requires at least: 6.2
 *
 * @package	tzm
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

            /**
             * Workaround since it's not possible to enqueue inline css inside the site editor content iframe. Related topics:
             * https://github.com/WordPress/gutenberg/issues/33212#issuecomment-879447803
             * https://github.com/WordPress/gutenberg/pull/37466
             **/
            add_action('block_editor_settings_all', function ($settings) {
                $settings['styles'][] = array(
                    'css'            => $this->get_responsive_block_styles(),
                    '__unstableType' => 'plugin'
                );
                return $settings;
            });

            // Enqueue frontend block assets
            add_action('wp_enqueue_scripts', array($this, 'enqueue_block_assets'));

            // Enqueue both frontend + editor block assets.
            //add_action('enqueue_block_assets', array($this, 'enqueue_block_assets'));

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
         * Generate responsive block inline styles
         */
        public function get_responsive_block_styles()
        {
            // Apply Filter wether to allow or prevent CSS output
            if (!apply_filters('tzm_responsive_block_controls_output_css', true)) return false;

            // Apply Filter to allow custom breakpoints
            $breakpoints = apply_filters('tzm_responsive_block_controls_breakpoints', array(
                'phone'     => '781px',
                'tablet'    => '1024px',
                'laptop'    => '1366px',
                'desktop'   => '1680px', // for now this is will be ignored
                'mobile'    => '1024px'   // wp block related mobile breakpoint
            ));
            $css = file_get_contents(plugins_url('/dist/style-tzm-responsive-block-controls.css', __FILE__));
            $new_css = '';

            $mobile_css = '@media screen and (max-width: ' . $breakpoints['mobile'] . ') {
.tzm-responsive-reverse-_DEVICE_.is-layout-flex:not(.wp-block-group):not(.is-not-stacked-on-mobile),
.tzm-responsive-reverse-_DEVICE_.wp-block-navigation.is-responsive .wp-block-navigation__container {
    flex-direction: column-reverse !important;
}
            }';

            // Prepare CSS styles
            foreach ($breakpoints as $device => $value) {
                if (!$device) break;
                if ($device == 'mobile') continue;

                if ($device == 'phone') {
                    $new_css .= '@media screen and (max-width: ' . $breakpoints['phone'] . ') {';
                } elseif ($device == 'tablet') {
                    $new_css .= '@media screen and (min-width: calc(' . $breakpoints['phone'] . ' + 1px)) and (max-width: ' . $breakpoints['tablet'] . ') {';
                } elseif ($device == 'laptop') {
                    $new_css .= '@media screen and (min-width: calc(' . $breakpoints['tablet'] . ' + 1px)) and (max-width: ' . $breakpoints['laptop'] . ') {';
                } elseif ($device == 'desktop') {
                    $new_css .= '@media screen and (min-width: calc(' . $breakpoints['laptop'] . ' + 1px)) {';
                }

                $new_css .= str_replace("_DEVICE_", $device, $css) . '}';

                // Add mobile breakpoint styles
                if (intval($value) <= intval($breakpoints['mobile'])) {
                    $new_css .= str_replace("_DEVICE_", $device, $mobile_css);
                }
            }

            return $new_css;
        }


        /**
         * Enqueue block editor assets
         */
        public function enqueue_editor_assets()
        {
            $editor_assets = include(plugin_dir_path(__FILE__) . 'dist/tzm-responsive-block-controls.asset.php');

            wp_enqueue_style(
                'tzm-responsive-block-controls-editor',
                plugins_url('/dist/tzm-responsive-block-controls.css', __FILE__),
                array('wp-editor'),
                $editor_assets['version']
            );
            wp_enqueue_script(
                'tzm-responsive-block-controls-editor',
                plugins_url('/dist/tzm-responsive-block-controls.js', __FILE__),
                $editor_assets['dependencies'],
                $editor_assets['version']
            );

            /**
             * This is currently not possible yet. See related topics: 
             * https://github.com/WordPress/gutenberg/issues/33212#issuecomment-879447803
             * https://github.com/WordPress/gutenberg/pull/37466
             */
            /*
            $frontend_assets = include(plugin_dir_path(__FILE__) . 'dist/tzm-responsive-block-controls.asset.php');
            $new_css = $this->get_responsive_block_styles();

            wp_register_style(
                'tzm-responsive-block-controls',
                false,
                array('wp-editor'),
                $frontend_assets['version'],
            );
            wp_add_inline_style('tzm-responsive-block-controls', $new_css);
            add_editor_style('tzm-responsive-block-controls'); // Loads everything for you in the iframe.
            */

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
         * Enqueue block frontend assets.
         */
        public function enqueue_block_assets()
        {
            $frontend_assets = include(plugin_dir_path(__FILE__) . 'dist/tzm-responsive-block-controls.asset.php');
            $new_css = $this->get_responsive_block_styles();

            wp_register_style(
                'tzm-responsive-block-controls',
                false,
                is_admin() ? array('wp-editor') : array(),
                $frontend_assets['version']
            );
            wp_enqueue_style('tzm-responsive-block-controls');
            wp_add_inline_style('tzm-responsive-block-controls', $new_css);
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

            // Collect classes
            foreach ($responsive_controls as $device => $options) {
                foreach ($options as $option => $value) {
                    if ($option !== 'margin' && $option !== 'padding' && $value) {
                        $classes[] = 'tzm-responsive-' . strtolower($option) . '-' . $device;
                    }
                }
            }
            $classes = implode(' ', $classes);

            // Collect styles
            foreach ($responsive_controls as $device => $options) {
                foreach ($options as $option => $value) {
                    if ($option === 'margin' || $option === 'padding') {
                        if (sizeof($value) === 4) {
                            $is_short = $value['top'] == $value['right'] && $value['top'] == $value['bottom'] && $value['top'] == $value['left'];
                            $styles[] = '--tzm--responsive--' . $option . '--' . $device . ':' . ($is_short ? $value['top'] : implode(' ', $value));
                        } else {
                            foreach ($value as $dir => $dirval) {
                                $styles[] = '--tzm--responsive--' . $option . '-' . $dir . '--' . $device . ':' . $dirval;
                            }
                        }
                    }
                }
            }
            $styles = implode(';', $styles);

            /** 
             * WARNING !!! This currently requires Gutenberg plugin until available in core (probably WP 6.2) !!!
             * Modify the block's HTML attributes via WP_HTML_Tag_Processor.
             * Learn more here: https://github.com/WordPress/gutenberg/pull/42485
             */

            $html = new WP_HTML_Tag_Processor($block_content);
            $html->next_tag();

            // Replace classes
            if ($classes) {
                $html->add_class($classes);
            }

            // Replace styles
            if ($styles) {
                $html_style = $html->get_attribute('style');
                $html->set_attribute('style', $html_style ? $html_style . ' ' . $styles : $styles);
            }

            return $html->get_updated_html();
        }
    }

    TZM_Responsive_Block_Controls::get_instance();
}
