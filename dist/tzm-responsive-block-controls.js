/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tzm-responsive-block-controls.js":
/*!**********************************************!*\
  !*** ./src/tzm-responsive-block-controls.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");



/**
 * External Dependencies
 */

const {
  assign,
  merge
} = lodash;
/**
 * WordPress Dependencies
 */






/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * Add custom attributes for responsive settings.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */

function addResponsiveAttributes(settings) {
  // check if object exists for old Gutenberg version compatibility
  if (typeof settings.attributes !== 'undefined') {
    return assign({}, settings, {
      attributes: merge(settings.attributes, {
        responsiveControls: {
          type: 'object',
          default: null
        }
      })
    });
  }

  return settings;
}
/**
 * Add responsive controls on Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */


const withResponsiveControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes
    } = props;
    const {
      responsiveControls
    } = attributes;

    function isResponsiveControlsEmpty() {
      let newResponsiveControls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : responsiveControls;

      if (newResponsiveControls && typeof newResponsiveControls === 'object') {
        // Check every device in attribute
        for (let device in newResponsiveControls) {
          if (newResponsiveControls[device]) {
            return false;
          }

          ;
        }
      }

      return true;
    }

    function isResponsiveControlsDeviceEmpty(newDevice) {
      if (newDevice) {
        // Check every option in device
        for (let option in newDevice) {
          if (newDevice[option] === true || newDevice.padding || newDevice.margin) {
            return false;
          }
        }
      }

      return true;
    }

    function ResponsiveBlockControls(_ref) {
      var _attributes$layout, _responsiveControls$d, _responsiveControls$d2, _responsiveControls$d3, _responsiveControls$d4, _responsiveControls$d5, _responsiveControls$d6;

      let {
        device
      } = _ref;
      const isContainerBlock = name === 'core/group' || name === 'core/columns' || name === 'core/cover' || name === 'core/media-text' || name === 'tzm/section';
      const isReverseBlock = name === 'core/group' && ((_attributes$layout = attributes.layout) === null || _attributes$layout === void 0 ? void 0 : _attributes$layout.type) === 'flex' || name === 'core/columns' || name === 'core/media-text' || name === 'core/buttons';
      const units = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalUseCustomUnits)({
        availableUnits: (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.useSetting)('spacing.units') || ['%', 'px', 'em', 'rem', 'vw']
      });
      const paddingValues = splitStyleValue(responsiveControls === null || responsiveControls === void 0 ? void 0 : (_responsiveControls$d = responsiveControls[device]) === null || _responsiveControls$d === void 0 ? void 0 : _responsiveControls$d.padding);
      const marginValues = splitStyleValue(responsiveControls === null || responsiveControls === void 0 ? void 0 : (_responsiveControls$d2 = responsiveControls[device]) === null || _responsiveControls$d2 === void 0 ? void 0 : _responsiveControls$d2.margin);

      function splitStyleValue(value) {
        // Check for shorthand value (a string value).
        if (value && typeof value === 'string') {
          return {
            top: value,
            right: value,
            bottom: value,
            left: value
          };
        }

        return value;
      }

      function setOption(device, option, newVal) {
        let newResponsiveControls = responsiveControls || {};
        let newDevice = newResponsiveControls[device]; // Set newVal in newDevice

        if (!newDevice) {
          newDevice = {};
        }

        if (option !== 'padding' && option !== 'margin') {
          newDevice[option] = newVal ? newVal : undefined;
        } else {
          newDevice[option] = !newVal.top && !newVal.right && !newVal.bottom && !newVal.left ? undefined : newVal;
        } // Check if newDevice is empty and clear it


        if (isResponsiveControlsDeviceEmpty(newDevice)) {
          newDevice = undefined;
        } // Check if newResponsiveControls is empty and reset attribute


        newResponsiveControls[device] = newDevice;

        if (isResponsiveControlsEmpty(newResponsiveControls)) {
          setAttributes({
            responsiveControls: null
          }); // Then set the attribute
        } else {
          setAttributes({
            responsiveControls: { ...newResponsiveControls,
              [device]: newDevice
            }
          });
        }
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide', "tzm-responsive-block-controls"),
        checked: !!(responsiveControls !== null && responsiveControls !== void 0 && (_responsiveControls$d3 = responsiveControls[device]) !== null && _responsiveControls$d3 !== void 0 && _responsiveControls$d3.hidden),
        onChange: newVal => setOption(device, 'hidden', newVal)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
        icon: "visibility"
      })), !!isReverseBlock && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reverse', "tzm-responsive-block-controls"),
        checked: !!(responsiveControls !== null && responsiveControls !== void 0 && (_responsiveControls$d4 = responsiveControls[device]) !== null && _responsiveControls$d4 !== void 0 && _responsiveControls$d4.reverse),
        onChange: newVal => setOption(device, 'reverse', newVal)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
        icon: "randomize"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Center', "tzm-responsive-block-controls"),
        checked: !!(responsiveControls !== null && responsiveControls !== void 0 && (_responsiveControls$d5 = responsiveControls[device]) !== null && _responsiveControls$d5 !== void 0 && _responsiveControls$d5.center),
        onChange: newVal => setOption(device, 'center', newVal)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
        icon: "editor-aligncenter"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full width', "tzm-responsive-block-controls"),
        checked: !!(responsiveControls !== null && responsiveControls !== void 0 && (_responsiveControls$d6 = responsiveControls[device]) !== null && _responsiveControls$d6 !== void 0 && _responsiveControls$d6.fullWidth),
        onChange: newVal => setOption(device, 'fullWidth', newVal)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
        icon: "align-full-width"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalDivider, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding'),
        values: paddingValues,
        units: units,
        onChange: newVal => setOption(device, 'padding', newVal)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Margin'),
        inputProps: {
          min: -999
        },
        values: marginValues,
        units: units,
        onChange: newVal => setOption(device, 'margin', newVal),
        sides: isContainerBlock ? ['top', 'bottom'] : null
      }));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('block-editor-panel-responsive', {
        'has-active-phone-options': responsiveControls === null || responsiveControls === void 0 ? void 0 : responsiveControls.phone,
        'has-active-tablet-options': responsiveControls === null || responsiveControls === void 0 ? void 0 : responsiveControls.tablet,
        'has-active-laptop-options': responsiveControls === null || responsiveControls === void 0 ? void 0 : responsiveControls.laptop,
        'has-active-desktop-options': responsiveControls === null || responsiveControls === void 0 ? void 0 : responsiveControls.desktop
      }),
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Responsiveness', "tzm-responsive-block-controls"),
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.TabPanel, {
      className: "responsive-controls-tab-panel",
      tabs: [{
        name: 'phone',
        title: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
          icon: "smartphone"
        }),
        className: 'tab-phone',
        content: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ResponsiveBlockControls, {
          device: "phone"
        })
      }, {
        name: 'tablet',
        title: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
          icon: "tablet"
        }),
        className: 'tab-tablet',
        content: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ResponsiveBlockControls, {
          device: "tablet"
        })
      }, {
        name: 'laptop',
        title: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
          icon: "laptop"
        }),
        className: 'tab-laptop',
        content: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ResponsiveBlockControls, {
          device: "laptop"
        })
      }, {
        name: 'desktop',
        title: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
          icon: "desktop"
        }),
        className: 'tab-desktop',
        content: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ResponsiveBlockControls, {
          device: "desktop"
        })
      }]
    }, _ref2 => {
      let {
        content
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "responsive-controls-tab-content"
      }, content);
    }))));
  };
}, 'withResponsiveControls');
/**
 * Add responsive classes to the block in the editor
 */

const addResponsiveClassesEditor = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    const {
      attributes,
      className
    } = props;
    const {
      responsiveControls
    } = attributes;

    function getClasses() {
      let classes = [];

      if (responsiveControls && typeof responsiveControls === 'object') {
        for (const [device, options] of Object.entries(responsiveControls)) {
          if (typeof options === 'object') {
            for (const [option, value] of Object.entries(options)) {
              if (option !== 'padding' && option !== 'margin' && value) {
                classes.push('tzm-responsive-' + option.toLowerCase() + '-' + device);
              }
            }
          }
        }
      }

      return classes;
    }

    function getStyles() {
      let styles = {};

      if (responsiveControls && typeof responsiveControls === 'object') {
        for (const [device, options] of Object.entries(responsiveControls)) {
          if (typeof options === 'object') {
            for (const [option, value] of Object.entries(options)) {
              if ((option == 'padding' || option == 'margin') && typeof value === 'object') {
                if (Object.keys(value).length === 4) {
                  let isShort = value['top'] == value['right'] && value['top'] == value['bottom'] && value['top'] == value['left'];
                  let valStr = value['top'] + ' ' + value['right'] + ' ' + value['bottom'] + ' ' + value['left'];
                  styles['--tzm--responsive--' + option + '--' + device] = isShort ? value['top'] : valStr;
                } else {
                  for (const [dir, dirVal] of Object.entries(value)) {
                    styles['--tzm--responsive--' + option + '-' + dir + '--' + device] = dirVal;
                  }
                }
              }
            }
          }
        }
      }

      return styles;
    }

    let wrapperProps = props.wrapperProps || {};
    wrapperProps.style = getStyles();
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockListBlock, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, getClasses()),
      wrapperProps: wrapperProps
    }));
  };
}, 'addResponsiveClassesEditor');
/**
 * Add custom element class in save element.
 *
 * @param {Object} props     	Block element.
 * @param {Object} block      	Blocks object.
 * @param {Object} attributes	Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */

/*function addResponsiveClasses( props, block, attributes ) {

	const { 
		className,
 	} = props;
	
	const {
		responsiveControls
	} = attributes;
	
	return assign( {}, props, {
		className: classnames( 
			className, 'tzm-responsive-test', {
				[`tzm-responsive-${responsiveControls?.id}`]: responsiveControls && responsiveControls.id
			}
		)
	} );
}*/

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('blocks.registerBlockType', 'tzm/responsive-attributes', addResponsiveAttributes);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('editor.BlockEdit', 'tzm/responsive-controls', withResponsiveControls);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('editor.BlockListBlock', 'tzm/responsive-clasess-editor', addResponsiveClassesEditor);
/*addFilter(
	'blocks.getSaveContent.extraProps',
	'tzm/responsive-classes-frontend',
	addResponsiveClasses
);*/

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"tzm-responsive-block-controls": 0,
/******/ 			"./style-tzm-responsive-block-controls": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktzm_responsive_block_controls"] = self["webpackChunktzm_responsive_block_controls"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-tzm-responsive-block-controls"], function() { return __webpack_require__("./src/tzm-responsive-block-controls.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=tzm-responsive-block-controls.js.map