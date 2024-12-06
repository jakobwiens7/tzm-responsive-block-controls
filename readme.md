# TZM Responsive Block Controls

![Screenshot of Responsive Controls Panel](https://github.com/jakobwiens7/tzm-responsive-block-controls/blob/main/_wordpress-org/banner-1544x500.jpg)

**TZM Responsive Block Controls** enhances the WordPress Block Editor with advanced responsive design controls. Tailor block visibility, alignment, spacing, and more for different screen sizes — no custom CSS required!

## Features

- **Hide Blocks**: Create tailored, clutter-free layouts by hiding blocks on specific devices.
- **Custom Block Widths**: Adjust block widths per device for a consistent layout.
- **Reverse Block Direction**: Optimize block flow for Columns or Row blocks across devices.
- **Justify Blocks**: Achieve fluid layouts with adjustable block justification.
- **Media Alignment**: Align images, text, and backgrounds consistently.
- **Font Size Adjustments**: Fine-tune font sizes for readability on any device.
- **Padding & Margins**: Customize spacing with per-device padding and margins.
- **Block Heights**: Maintain proportional block heights across screen sizes.

With these tools, you can easily craft beautiful, responsive designs without writing code.

## Usage

1. Edit a block in the Block Editor.
2. Access the **Responsive Controls** panel in the block settings.
3. Configure device-specific settings like visibility, alignment, font size, and more.
4. Preview changes instantly across different screen sizes.

## Hooks and Filters

### How do I define custom breakpoints?

Add the following to your `functions.php` file:

```php
function override_responsive_block_controls_breakpoints( $breakpoints ) {
	$breakpoints['phone'] = '781px';
	$breakpoints['tablet'] = '1024px';
	$breakpoints['laptop'] = '1366px';
	return $breakpoints;
}
add_filter('tzm_responsive_block_controls_breakpoints', 'override_responsive_block_controls_breakpoints');
```

### How do I disable the default CSS?

Disable the plugin's CSS output with:

```php
function enqueue_responsive_block_controls_css( $bool ) {
	return  false;
}
add_filter('tzm_responsive_block_controls_output_css', 'enqueue_responsive_block_controls_css');
```

## Changelog

#### 1.1.2

- Added an option to toggle visibility of hidden blocks
- Bugfix regarding "reverse" and "block width" settings

#### 1.1.0

- Enhanced UI visuals
- Added "Focal Point" media control
- Improved "Width" settings
- Blocks remember last selected device
- Bug fixes

#### 1.0.2

- Added "Justification" and "Reverse" for Social Links block
- Minor bug fixes
- Migrated to GitHub

#### 1.0.0

- Initial release
