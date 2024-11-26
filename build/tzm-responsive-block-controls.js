(()=>{"use strict";var e,t={926:()=>{function e(t){var o,n,i="";if("string"==typeof t||"number"==typeof t)i+=t;else if("object"==typeof t)if(Array.isArray(t)){var s=t.length;for(o=0;o<s;o++)t[o]&&(n=e(t[o]))&&(i&&(i+=" "),i+=n)}else for(n in t)t[n]&&(i&&(i+=" "),i+=n);return i}const t=function(){for(var t,o,n=0,i="",s=arguments.length;n<s;n++)(t=arguments[n])&&(o=e(t))&&(i&&(i+=" "),i+=o);return i},o=window.wp.i18n,n=window.wp.hooks,i=window.wp.compose,s=window.wp.element,l=window.wp.data,r=window.wp.coreData,a=window.wp.plugins,c=window.wp.editor,d=window.wp.primitives,p=window.ReactJSXRuntime,m=(0,p.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,p.jsx)(d.Path,{d:"M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"})}),u=window.wp.blockEditor,h=window.wp.components,g=window.lodash;function v(e,t="px"){return""===e||isNaN(parseFloat(e))?null:"number"==typeof e?e+t:"string"!=typeof e||isNaN(e)?e:e.trim()+t}function _(e){return e&&"string"==typeof e?{top:e,right:e,bottom:e,left:e}:e}function b(e){if("object"==typeof e&&null!==e){const t={};for(let o in e)t[o]=v(e[o]);return Object.values(t).some((e=>void 0!==e))?t:void 0}return v(e)}function x(e){return!(!e||"object"!=typeof e)&&Object.values(e).some((e=>"object"==typeof e&&null!==e?x(e):!!e))}const f=e=>{if(!(0,g.isObject)(e)||Array.isArray(e))return e;const t=(0,g.pickBy)((0,g.mapValues)(e,f),(e=>null!=e&&""!==e&&!1!==e));return(0,g.isEmpty)(t)?void 0:t},k=(e,t=null,o=!1)=>{if(e)return"flex"===t?.attributes?.layout?.type||"core/column"===e.name||"core/button"===e.name||"core/social-link"===e.name||"core/navigation-item"===e.name||"core/image"===e.name&&"core/gallery"===t?.name},j=(e,t=null,o=!1)=>{if(e)return"core/site-logo"===e.name||"core/post-featured-image"===e.name||"core/avatar"===e.name||"core/video"===e.name||"core/image"===e.name&&"core/gallery"!==t?.name},w=(e,t=null,o=!1)=>{if(e)return"flex"===e.attributes.layout?.type||"core/navigation"===e.name||"core/buttons"===e.name||"core/social-links"===e.name},z=(e,t=null,o=!1)=>{if(e)return"flex"===e.attributes.layout?.type||"core/navigation"===e.name||"core/columns"===e.name||"core/gallery"===e.name||"core/buttons"===e.name||"core/social-links"===e.name},y=(e,t=null,o=!1)=>{if(e)return"core/site-logo"===e.name||"core/post-featured-image"===e.name||"core/avatar"===e.name||"core/image"===e.name&&"core/gallery"!==t?.name},B=(e,t=null,o=!1)=>{if(e)return!("core/media-text"!==e.name&&"core/image"!==e.name&&"core/video"!==e.name&&"core/cover"!==e.name&&"tzm/section"!==e.name||!(e.attributes.url||e.attributes.mediaUrl||e.attributes.style?.background?.backgroundImage?.url||e.attributes.useFeaturedImage))},P=(e,t=null,o=!1)=>{if(e)return"core/site-logo"!==e.name&&"core/post-featured-image"!==e.name&&"core/video"!==e.name&&"core/audio"!==e.name&&"core/spacer"!==e.name&&"core/separator"!==e.name&&"core/avatar"!==e.name},C=(e,t=null,o=!1)=>{if(e)return"core/site-logo"!==e.name&&"core/post-featured-image"!==e.name&&"core/video"!==e.name&&"core/audio"!==e.name&&"core/spacer"!==e.name&&"core/separator"!==e.name&&"core/avatar"!==e.name},S=(e,t=null,o=!1)=>{if(e)return"core/spacer"!==e.name&&"core/separator"!==e.name&&"core/calendar"!==e.name&&"core/search"!==e.name},A=(e,t=null,o=!1)=>{if(e)return!0},D=(e,t=null,o=!1)=>{if(e)return!(!o||"core/list"===e.name||"core/list-item"===e.name||"core/page-list"===e.name||"core/comments"===e.name||"core/quote"===e.name||"core/details"===e.name)},H=(e,t=null,o=!1)=>{if(e)return"minHeight"in e.attributes||"core/cover"===e.name||"core/group"===e.name||"core/post-content"===e.name||"core/columns"===e.name||"core/spacer"===e.name||"tzm/section"===e.name},N=(0,p.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,p.jsx)(d.Path,{d:"M9 9v6h11V9H9zM4 20h1.5V4H4v16z"})}),T=(0,p.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,p.jsx)(d.Path,{d:"M12.5 15v5H11v-5H4V9h7V4h1.5v5h7v6h-7Z"})}),I=(0,p.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,p.jsx)(d.Path,{d:"M4 15h11V9H4v6zM18.5 4v16H20V4h-1.5z"})}),M=(0,p.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,p.jsx)(d.Path,{d:"M9 15h6V9H9v6zm-5 5h1.5V4H4v16zM18.5 4v16H20V4h-1.5z"})});function V({props:e}){const{device:t,attributes:n,updateAttribute:i,hasBlock:s}=e,{responsiveControls:l}=n,r=!!l?.[t]?.hidden,a=!!l?.[t]?.reverse,c=e=>i({...l,[t]:{...l?.[t],width:e,customWidth:void 0}}),d=e=>i({...l,[t]:{...l?.[t],justify:e}});return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(h.PanelRow,{className:"responsive-hide-control",children:(0,p.jsx)(h.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Hide block","tzm-responsive-block-controls"),checked:r,onChange:e=>i({...l,[t]:{...l?.[t],hidden:e}})})}),s.reverse&&(0,p.jsx)(h.PanelRow,{className:"responsive-reverse-control",children:(0,p.jsx)(h.ToggleControl,{label:(0,o.__)("Reverse order","tzm-responsive-block-controls"),checked:a,onChange:e=>i({...l,[t]:{...l?.[t],reverse:e}})})}),s.width&&(0,p.jsx)(h.PanelRow,{className:"responsive-width-control",children:(0,p.jsx)(h.BaseControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Block width","tzm-responsive-block-controls"),className:"responsive-controls__width",children:(0,p.jsxs)(h.ButtonGroup,{children:[(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,size:"small",label:(0,o.__)("50%","tzm-responsive-block-controls"),isPressed:50==l?.[t]?.width,onClick:()=>c(50==l?.[t]?.width?void 0:50),children:(0,o.__)("50%","tzm-responsive-block-controls")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,size:"small",label:(0,o.__)("66%","tzm-responsive-block-controls"),isPressed:66==l?.[t]?.width,onClick:()=>c(66==l?.[t]?.width?void 0:66),children:(0,o.__)("66%","tzm-responsive-block-controls")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,size:"small",label:(0,o.__)("75%","tzm-responsive-block-controls"),isPressed:75==l?.[t]?.width,onClick:()=>c(75==l?.[t]?.width?void 0:75),children:(0,o.__)("75%","tzm-responsive-block-controls")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,size:"small",label:(0,o.__)("100%","tzm-responsive-block-controls"),isPressed:100==l?.[t]?.width,onClick:()=>c(100==l?.[t]?.width?void 0:100),children:(0,o.__)("100%","tzm-responsive-block-controls")})]})})}),s.justify&&(0,p.jsx)(h.PanelRow,{className:"responsive-justify-control",children:(0,p.jsx)(h.BaseControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Block justification","tzm-responsive-block-controls"),className:"responsive-controls__justify",children:(0,p.jsxs)(h.ButtonGroup,{children:[(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:N,label:(0,o.__)("Justify left","tzm-responsive-block-controls"),isPressed:"start"==l?.[t]?.justify,onClick:()=>d("start"==l?.[t]?.justify?void 0:"start")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:T,label:(0,o.__)("Justify center","tzm-responsive-block-controls"),isPressed:"center"==l?.[t]?.justify,onClick:()=>d("center"==l?.[t]?.justify?void 0:"center")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:I,label:(0,o.__)("Justify right","tzm-responsive-block-controls"),isPressed:"end"==l?.[t]?.justify,onClick:()=>d("end"==l?.[t]?.justify?void 0:"end")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:M,label:(0,o.__)("Space between blocks","tzm-responsive-block-controls"),isPressed:"space-between"==l?.[t]?.justify,onClick:()=>d("space-between"==l?.[t]?.justify?void 0:"space-between")})]})})})]})}function O({props:e}){var t,n;const{device:i,attributes:s,updateAttribute:a,featuredImage:c,hasBlock:d}=e,{responsiveControls:m}=s,u=!!m?.[i]?.imageAlign,g=e=>a({...m,[i]:{...m?.[i],imageAlign:e}}),_=!!m?.[i]?.mediaWidth,b=e=>a({...m,[i]:{...m?.[i],mediaWidth:v(e)}}),x=!!m?.[i]?.focalPoint,f=e=>a({...m,[i]:{...m?.[i],focalPoint:e}});let k=null!==(t=null!==(n=s.style?.background?.backgroundImage?.url)&&void 0!==n?n:s.url)&&void 0!==t?t:s.mediaUrl;if(s.useFeaturedImage){const e=(0,l.useSelect)((e=>c&&e(r.store).getMedia(c,{context:"view"})),[c]);k=e?.source_url}return(0,p.jsxs)(h.__experimentalToolsPanel,{label:(0,o.__)("Media","tzm-responsive-block-controls"),resetAll:()=>a({...m,[i]:{...m?.[i],imageAlign:void 0,mediaWidth:void 0,focalPoint:void 0}}),children:[d.mediaAlign&&(0,p.jsx)(h.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Alignment","tzm-responsive-block-controls"),hasValue:()=>u,onDeselect:()=>g(),children:(0,p.jsx)(h.BaseControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Alignment","tzm-responsive-block-controls"),children:(0,p.jsxs)(h.ButtonGroup,{children:[(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:"align-left",label:(0,o.__)("Align left","tzm-responsive-block-controls"),isPressed:"left"==m?.[i]?.imageAlign,onClick:()=>g("left"==m?.[i]?.imageAlign?void 0:"left")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:"align-center",label:(0,o.__)("Align centered","tzm-responsive-block-controls"),isPressed:"center"==m?.[i]?.imageAlign,onClick:()=>g("center"==m?.[i]?.imageAlign?void 0:"center")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:"align-right",label:(0,o.__)("Align right","tzm-responsive-block-controls"),isPressed:"right"==m?.[i]?.imageAlign,onClick:()=>g("right"==m?.[i]?.imageAlign?void 0:"right")})]})})}),d.mediaWidth&&(0,p.jsx)(h.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Width","tzm-responsive-block-controls"),hasValue:()=>_,onDeselect:()=>b(),children:(0,p.jsx)(h.__experimentalUnitControl,{__next40pxDefaultSize:!0,label:(0,o.__)("Width","tzm-responsive-block-controls"),min:0,onChange:e=>b(e),value:m?.[i]?.mediaWidth})}),d.focalPoint&&(0,p.jsx)(h.__experimentalToolsPanelItem,{isShownByDefault:!d.mediaAlign&&!d.mediaWidth,label:(0,o.__)("Focal point","tzm-responsive-block-controls"),hasValue:()=>x,onDeselect:()=>f(),children:(0,p.jsx)(h.FocalPointPicker,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Focal point","tzm-responsive-block-controls"),url:k,value:m?.[i]?.focalPoint,onChange:e=>f(e)})})]})}function $({props:e}){const{device:t,attributes:n,updateAttribute:i,hasBlock:s,units:l}=e,{responsiveControls:r}=n,a=!!r?.[t]?.textAlign,c=e=>i({...r,[t]:{...r?.[t],textAlign:e}}),d=!!r?.[t]?.fontSize,m=e=>i({...r,[t]:{...r?.[t],fontSize:v(e)}});return(0,p.jsxs)(h.__experimentalToolsPanel,{label:(0,o.__)("Typography"),resetAll:()=>i({...r,[t]:{...r?.[t],textAlign:void 0,fontSize:void 0}}),children:[s.textAlign&&(0,p.jsx)(h.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Text alignment","tzm-responsive-block-controls"),hasValue:()=>a,onDeselect:()=>c(),children:(0,p.jsx)(h.BaseControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Text alignment","tzm-responsive-block-controls"),children:(0,p.jsxs)(h.ButtonGroup,{children:[(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:"editor-alignleft",label:(0,o.__)("Align text left"),isPressed:"left"==r?.[t]?.textAlign,onClick:()=>c("left"==r?.[t]?.textAlign?void 0:"left")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:"editor-aligncenter",label:(0,o.__)("Align text center"),isPressed:"center"==r?.[t]?.textAlign,onClick:()=>c("center"==r?.[t]?.textAlign?void 0:"center")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:"editor-alignright",label:(0,o.__)("Align text right"),isPressed:"right"==r?.[t]?.textAlign,onClick:()=>c("right"==r?.[t]?.textAlign?void 0:"right")}),(0,p.jsx)(h.Button,{__next40pxDefaultSize:!0,icon:"editor-justify",label:(0,o.__)("Align text justify","tzm-responsive-block-controls"),isPressed:"justify"==r?.[t]?.textAlign,onClick:()=>c("justify"==r?.[t]?.textAlign?void 0:"justify")})]})})}),s.fontSize&&(0,p.jsx)(h.__experimentalToolsPanelItem,{label:(0,o.__)("Font size"),hasValue:()=>d,onDeselect:()=>m(),children:(0,p.jsx)(h.__experimentalUnitControl,{__next40pxDefaultSize:!0,label:(0,o.__)("Font size"),onChange:m,value:r?.[t]?.fontSize,units:l})})]})}function W({props:e}){const{device:t,attributes:n,updateAttribute:i,hasBlock:s,hasInnerBlocks:l,units:r}=e,{responsiveControls:a}=n,c=_(a?.[t]?.padding),d=_(a?.[t]?.margin),m=!!a?.[t]?.padding,g=e=>i({...a,[t]:{...a?.[t],padding:b(e)}}),x=!!a?.[t]?.margin,f=e=>i({...a,[t]:{...a?.[t],margin:b(e)}}),k=!!a?.[t]?.minHeight,j=e=>i({...a,[t]:{...a?.[t],minHeight:v(e)}}),w=!!a?.[t]?.blockGap,z=e=>i({...a,[t]:{...a?.[t],blockGap:b(e)}});return(0,p.jsxs)(h.__experimentalToolsPanel,{label:(0,o.__)("Dimensions"),resetAll:()=>i({...a,[t]:{...a?.[t],padding:void 0,margin:void 0,customWidth:void 0,height:void 0,blockGap:void 0}}),children:[s.padding&&(0,p.jsx)(h.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Padding"),hasValue:()=>m,onDeselect:()=>g(),children:(0,p.jsx)(h.__experimentalBoxControl,{__next40pxDefaultSize:!0,allowReset:!1,label:(0,o.__)("Padding"),values:c,units:r,onChange:g})}),s.margin&&(0,p.jsx)(h.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Margin"),hasValue:()=>x,onDeselect:()=>f(),children:(0,p.jsx)(h.__experimentalBoxControl,{__next40pxDefaultSize:!0,allowReset:!1,label:(0,o.__)("Margin"),inputProps:{min:-999},values:d,units:r,onChange:f,sides:l?["top","bottom"]:null})}),s.blockGap&&(0,p.jsx)(h.__experimentalToolsPanelItem,{label:(0,o.__)("Block spacing"),hasValue:()=>w,onDeselect:()=>z(),children:(0,p.jsx)(h.__experimentalBoxControl,{__next40pxDefaultSize:!0,id:"responsive-block-gap-control",allowReset:!1,label:(0,o.__)("Block spacing"),values:a?.[t]?.blockGap,units:r,onChange:z,sides:["top"]})}),s.minHeight&&(0,p.jsx)(h.__experimentalToolsPanelItem,{label:(0,o.__)("Minimum height"),hasValue:()=>k,onDeselect:()=>j(),children:(0,p.jsx)(u.HeightControl,{label:(0,o.__)("Minimum height"),onChange:j,value:a?.[t]?.minHeight})})]})}const{assign:G,kebabCase:R,merge:F}=lodash,E=(0,i.createHigherOrderComponent)((e=>n=>{var i;const{attributes:a,setAttributes:c,clientId:d,isSelected:m,context:{postId:g,postType:v}}=n,{responsiveControls:_}=a;if("core/more"===n.name||"core/nextpage"===n.name)return(0,p.jsx)(e,{...n});const{parentProps:b,hasInnerBlocks:N}=(0,l.useSelect)((e=>{const{getBlockRootClientId:t,getBlock:o,getBlockListSettings:n}=e("core/block-editor");return{parentProps:o(t(d))||!1,hasInnerBlocks:!!n(d)||!1}}),[d]),[T]=(0,r.useEntityProp)("postType",v,"featured_media",g),[I]=(0,u.useSettings)("spacing.units"),M=(0,h.__experimentalUseCustomUnits)({availableUnits:I||["px","em","rem","vw","vh","%"]}),G=(0,l.useSelect)((e=>e("core/preferences").get("tzm","displayHiddenBlocks",!0)),[]);function R({device:e}){const t={reverse:z(n),justify:w(n),width:k(n,b),mediaWidth:j(n,b),mediaAlign:y(n,b),focalPoint:B(n),textAlign:P(n),fontSize:C(n),padding:S(n),margin:A(n),blockGap:D(n,b,N),minHeight:H(n,b)};function o(e={}){const t=f(e);c({responsiveControls:t})}(0,s.useEffect)((()=>{const n=document.querySelector('iframe[name="editor-canvas"]');n&&(n.contentDocument||n.contentWindow.document).body.classList.toggle("tzm--hidden-blocks",!G),_?.[e]?.height&&(console.log('TZM Responsive Block Controls: "height" attribute is now "minHeight. Converting attribute...'),o({..._,[e]:{..._[e],minHeight:_[e].height,height:void 0}})),_?.[e]?.fullWidth&&(console.log('TZM Responsive Block Controls: "Full Width" control is deprecated. Converting attribute...'),o({..._,[e]:{..._[e],fullWidth:void 0,width:100}}));const i={};Object.keys(t).forEach((o=>{const n=_?.[e]?.[o];!n||x(n)||t[o]||(i[o]=void 0)})),Object.keys(i).length>0&&o({..._,[e]:{..._[e],...i}})})),(0,s.useEffect)((()=>{const e=document.querySelector('iframe[name="editor-canvas"]');e&&(e.contentDocument||e.contentWindow.document).body.classList.toggle("tzm--hidden-blocks",!G)}),[G]);const i={device:e,attributes:a,updateAttribute:e=>o(e),hasBlock:t,hasInnerBlocks:N,featuredImage:T,units:M};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(V,{props:i}),(t.mediaWidth||t.mediaAlign||t.focalPoint)&&(0,p.jsx)(O,{props:i}),(t.textAlign||t.fontSize)&&(0,p.jsx)($,{props:i}),(t.padding||t.margin||t.blockGap||t.minHeight)&&(0,p.jsx)(W,{props:i})]})}return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(e,{...n}),(0,p.jsx)(u.InspectorControls,{children:(0,p.jsx)(h.PanelBody,{className:t("block-editor-panel-responsive",{"has-active-phone-options":_?.phone,"has-active-tablet-options":_?.tablet,"has-active-laptop-options":_?.laptop,"has-active-desktop-options":_?.desktop}),title:(0,o.__)("Responsive controls","tzm-responsive-block-controls"),initialOpen:!1,children:(0,p.jsx)(h.TabPanel,{className:"responsive-controls-tab-panel",initialTabName:null!==(i=_?.lastDevice)&&void 0!==i?i:null,onSelect:e=>c({responsiveControls:{..._,lastDevice:e}}),tabs:[{name:"phone",title:(0,o.__)("Phone","tzm-responsive-block-controls"),icon:"smartphone",className:"tab-phone",content:R({device:"phone"})},{name:"tablet",title:(0,o.__)("Tablet","tzm-responsive-block-controls"),icon:"tablet",className:"tab-tablet",content:R({device:"tablet"})},{name:"laptop",title:(0,o.__)("Laptop","tzm-responsive-block-controls"),icon:"laptop",className:"tab-laptop",content:R({device:"laptop"})},{name:"desktop",title:(0,o.__)("Desktop","tzm-responsive-block-controls"),icon:"desktop",className:"tab-desktop",content:R({device:"desktop"})}],children:({content:e})=>(0,p.jsx)("div",{className:"responsive-controls-tab-content",children:e})})})})]})}),"withResponsiveControls"),U=(0,i.createHigherOrderComponent)((e=>o=>{const{attributes:n,className:i}=o,{responsiveControls:s}=n;let l={...o.wrapperProps,style:s&&"object"==typeof s?Object.entries(s).reduce(((e,[t,o])=>("object"==typeof o&&Object.entries(o).forEach((([o,n])=>{switch(o){case"padding":case"margin":if("object"==typeof n){const i=["top","right","bottom","left"];if(i.every((e=>void 0!==n[e]))){const s=i.every((e=>n[e]===n.top));e[`--tzm-responsive--${o}--${t}`]=s?n.top:`${n.top} ${n.right} ${n.bottom} ${n.left}`}else Object.entries(n).forEach((([n,i])=>{e[`--tzm-responsive--${o}-${n}--${t}`]=i}))}break;case"blockGap":"object"==typeof n&&"top"in n&&(e[`--tzm-responsive--${R(o)}--${t}`]=n.top);break;case"focalPoint":var i,s;"object"==typeof n&&("x"in n||"y"in n)&&(e[`--tzm-responsive--${R(o)}--${t}`]=100*(null!==(i=n.x)&&void 0!==i?i:0)+"% "+100*(null!==(s=n.y)&&void 0!==s?s:0)+"%");break;case"justify":case"textAlign":case"fontSize":case"width":case"mediaWidth":case"minHeight":n&&(e[`--tzm-responsive--${R(o)}--${t}`]=n)}})),e)),{}):{}};return(0,p.jsx)(e,{...o,className:t(i,s&&"object"==typeof s?Object.entries(s).reduce(((e,[t,o])=>("object"==typeof o&&Object.entries(o).forEach((([o,n])=>{switch(o){case"hidden":case"reverse":e.push(`tzm-responsive__${R(o)}__${t}`);break;case"imageAlign":e.push(`tzm-responsive__${R(o)}-${n}__${t}`)}})),e)),[]):[]),wrapperProps:l})}),"addResponsiveStylingEditor");(0,n.addFilter)("blocks.registerBlockType","tzm/responsive-attributes",(function(e){return void 0!==e.attributes?G({},e,{attributes:F(e.attributes,{responsiveControls:{type:"object",default:null}})}):e})),(0,n.addFilter)("editor.BlockEdit","tzm/responsive-controls",E),(0,n.addFilter)("editor.BlockListBlock","tzm/responsive-styling-editor",U),(0,a.registerPlugin)("more-menu-item-test",{render:()=>{const{set:e}=(0,l.useDispatch)("core/preferences"),t=(0,l.useSelect)((e=>e("core/preferences").get("tzm","displayHiddenBlocks",!0)),[]);return(0,p.jsx)(c.PluginMoreMenuItem,{icon:t?m:"none",onClick:()=>{e("tzm","displayHiddenBlocks",!t)},children:(0,o.__)("Display hidden blocks","tzm-responsive-block-controls")})}})}},o={};function n(e){var i=o[e];if(void 0!==i)return i.exports;var s=o[e]={exports:{}};return t[e](s,s.exports,n),s.exports}n.m=t,e=[],n.O=(t,o,i,s)=>{if(!o){var l=1/0;for(d=0;d<e.length;d++){o=e[d][0],i=e[d][1],s=e[d][2];for(var r=!0,a=0;a<o.length;a++)(!1&s||l>=s)&&Object.keys(n.O).every((e=>n.O[e](o[a])))?o.splice(a--,1):(r=!1,s<l&&(l=s));if(r){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[o,i,s]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={216:0,51:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var i,s,l=o[0],r=o[1],a=o[2],c=0;if(l.some((t=>0!==e[t]))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(a)var d=a(n)}for(t&&t(o);c<l.length;c++)s=l[c],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},o=self.webpackChunktzm_responsive_block_controls=self.webpackChunktzm_responsive_block_controls||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var i=n.O(void 0,[51],(()=>n(926)));i=n.O(i)})();