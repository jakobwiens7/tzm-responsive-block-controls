(()=>{"use strict";var e,t={156:()=>{function e(t){var o,n,s="";if("string"==typeof t||"number"==typeof t)s+=t;else if("object"==typeof t)if(Array.isArray(t)){var i=t.length;for(o=0;o<i;o++)t[o]&&(n=e(t[o]))&&(s&&(s+=" "),s+=n)}else for(n in t)t[n]&&(s&&(s+=" "),s+=n);return s}const t=function(){for(var t,o,n=0,s="",i=arguments.length;n<i;n++)(t=arguments[n])&&(o=e(t))&&(s&&(s+=" "),s+=o);return s},o=window.wp.i18n,n=window.wp.hooks,s=window.wp.compose,i=window.wp.blockEditor,l=window.wp.components,r=window.lodash;function a(e,t="px"){return""===e?e:"number"==typeof e?e+t:"string"!=typeof e||isNaN(e)?e:e.trim()+t}function c(e){return e&&"string"==typeof e?{top:e,right:e,bottom:e,left:e}:e}const p=e=>{if(!(0,r.isObject)(e)||Array.isArray(e))return e;const t=(0,r.pickBy)((0,r.mapValues)(e,p),r.identity);return(0,r.isEmpty)(t)?void 0:t},d=window.wp.primitives,u=window.ReactJSXRuntime,_=(0,u.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,u.jsx)(d.Path,{d:"M9 9v6h11V9H9zM4 20h1.5V4H4v16z"})}),h=(0,u.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,u.jsx)(d.Path,{d:"M12.5 15v5H11v-5H4V9h7V4h1.5v5h7v6h-7Z"})}),v=(0,u.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,u.jsx)(d.Path,{d:"M4 15h11V9H4v6zM18.5 4v16H20V4h-1.5z"})}),x=(0,u.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,u.jsx)(d.Path,{d:"M9 15h6V9H9v6zm-5 5h1.5V4H4v16zM18.5 4v16H20V4h-1.5z"})});function b({isBlockType:e,device:t,responsiveControls:n,updateAttribute:s}){const i=!!n?.[t]?.hidden,r=e=>s({...n,[t]:{...n?.[t],hidden:e}}),a=!!n?.[t]?.fullWidth,c=e=>s({...n,[t]:{...n?.[t],fullWidth:e}}),p=!!n?.[t]?.reverse,d=e=>s({...n,[t]:{...n?.[t],reverse:e}}),b=!!n?.[t]?.justify,m=e=>s({...n,[t]:{...n?.[t],justify:e}});return(0,u.jsxs)(l.__experimentalToolsPanel,{label:(0,o.__)("General & Layout","tzm-responsive-block-controls"),resetAll:()=>s({...n,[t]:{...n?.[t],hidden:void 0,fullwidth:void 0,reverse:void 0,justify:void 0}}),children:[(0,u.jsxs)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Hide block","tzm-responsive-block-controls"),hasValue:()=>i,onDeselect:()=>r(),children:[(0,u.jsx)(l.ToggleControl,{label:(0,o.__)("Hide block","tzm-responsive-block-controls"),checked:i,onChange:r}),(0,u.jsx)(l.Dashicon,{icon:"visibility"})]}),(0,u.jsxs)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Full width","tzm-responsive-block-controls"),hasValue:()=>a,onDeselect:()=>c(),children:[(0,u.jsx)(l.ToggleControl,{label:(0,o.__)("Full width","tzm-responsive-block-controls"),checked:a,onChange:c}),(0,u.jsx)(l.Dashicon,{icon:"align-full-width"})]}),!!e.reversable&&(0,u.jsxs)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Reverse order","tzm-responsive-block-controls"),hasValue:()=>p,onDeselect:()=>d(),children:[(0,u.jsx)(l.ToggleControl,{label:(0,o.__)("Reverse order","tzm-responsive-block-controls"),checked:p,onChange:d}),(0,u.jsx)(l.Dashicon,{icon:"randomize"})]}),!!e.flex&&(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Block justification","tzm-responsive-block-controls"),hasValue:()=>b,onDeselect:()=>m(),children:(0,u.jsx)(l.BaseControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Block justification","tzm-responsive-block-controls"),className:"responsive-controls__justify",children:(0,u.jsxs)(l.ButtonGroup,{children:[(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:_,label:(0,o.__)("Justify left","tzm-responsive-block-controls"),isPressed:"start"==n?.[t]?.justify,onClick:()=>m("start"==n?.[t]?.justify?void 0:"start")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:h,label:(0,o.__)("Justify center","tzm-responsive-block-controls"),isPressed:"center"==n?.[t]?.justify,onClick:()=>m("center"==n?.[t]?.justify?void 0:"center")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:v,label:(0,o.__)("Justify right","tzm-responsive-block-controls"),isPressed:"end"==n?.[t]?.justify,onClick:()=>m("end"==n?.[t]?.justify?void 0:"end")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:x,label:(0,o.__)("Space between blocks","tzm-responsive-block-controls"),isPressed:"space-between"==n?.[t]?.justify,onClick:()=>m("space-between"==n?.[t]?.justify?void 0:"space-between")})]})})})]})}function m({isBlockType:e,units:t,device:n,responsiveControls:s,updateAttribute:i}){const r=!!s?.[n]?.textAlign,c=e=>i({...s,[n]:{...s?.[n],textAlign:e}}),p=!!s?.[n]?.fontSize,d=e=>i({...s,[n]:{...s?.[n],fontSize:a(e)}});return(0,u.jsxs)(l.__experimentalToolsPanel,{label:(0,o.__)("Image & Typography","tzm-responsive-block-controls"),resetAll:()=>i({...s,[n]:{...s?.[n],textAlign:void 0,fontSize:void 0}}),children:[e.image?(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Image alignment","tzm-responsive-block-controls"),hasValue:()=>r,onDeselect:()=>c(),children:(0,u.jsx)(l.BaseControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Image alignment","tzm-responsive-block-controls"),children:(0,u.jsxs)(l.ButtonGroup,{children:[(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:"align-left",label:(0,o.__)("Align image left","tzm-responsive-block-controls"),isPressed:"left"==s?.[n]?.textAlign,onClick:()=>c("left"==s?.[n]?.textAlign?void 0:"left")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:"align-center",label:(0,o.__)("Align image centered","tzm-responsive-block-controls"),isPressed:"center"==s?.[n]?.textAlign,onClick:()=>c("center"==s?.[n]?.textAlign?void 0:"center")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:"align-right",label:(0,o.__)("Align image right","tzm-responsive-block-controls"),isPressed:"right"==s?.[n]?.textAlign,onClick:()=>c("right"==s?.[n]?.textAlign?void 0:"right")})]})})}):(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Text alignment","tzm-responsive-block-controls"),hasValue:()=>r,onDeselect:()=>c(),children:(0,u.jsx)(l.BaseControl,{__nextHasNoMarginBottom:!0,label:(0,o.__)("Text alignment","tzm-responsive-block-controls"),children:(0,u.jsxs)(l.ButtonGroup,{children:[(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:"editor-alignleft",label:(0,o.__)("Align text left"),isPressed:"left"==s?.[n]?.textAlign,onClick:()=>c("left"==s?.[n]?.textAlign?void 0:"left")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:"editor-aligncenter",label:(0,o.__)("Align text center"),isPressed:"center"==s?.[n]?.textAlign,onClick:()=>c("center"==s?.[n]?.textAlign?void 0:"center")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:"editor-alignright",label:(0,o.__)("Align text right"),isPressed:"right"==s?.[n]?.textAlign,onClick:()=>c("right"==s?.[n]?.textAlign?void 0:"right")}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,icon:"editor-justify",label:(0,o.__)("Align text justify","tzm-responsive-block-controls"),isPressed:"justify"==s?.[n]?.textAlign,onClick:()=>c("justify"==s?.[n]?.textAlign?void 0:"justify")})]})})}),(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Font size"),hasValue:()=>p,onDeselect:()=>d(),children:(0,u.jsx)(l.__experimentalUnitControl,{__next40pxDefaultSize:!0,label:(0,o.__)("Font size"),onChange:d,value:s?.[n]?.fontSize,units:t})})]})}function g(e){if("object"==typeof e&&null!==e){const t={};for(let o in e)t[o]=a(e[o]);return Object.values(t).some((e=>void 0!==e))?t:void 0}return a(e)}function f({isBlockType:e,units:t,device:n,responsiveControls:s,updateAttribute:r}){const p=c(s?.[n]?.padding),d=c(s?.[n]?.margin),_=!!s?.[n]?.padding,h=e=>r({...s,[n]:{...s?.[n],padding:g(e)}}),v=!!s?.[n]?.margin,x=e=>r({...s,[n]:{...s?.[n],margin:g(e)}}),b=!!s?.[n]?.height,m=e=>r({...s,[n]:{...s?.[n],height:a(e)}}),f=!!s?.[n]?.blockGap,j=e=>r({...s,[n]:{...s?.[n],blockGap:g(e)}});return(0,u.jsxs)(l.__experimentalToolsPanel,{label:(0,o.__)("Dimensions"),resetAll:()=>r({...s,[n]:{...s?.[n],padding:void 0,margin:void 0,height:void 0,blockGap:void 0}}),children:[(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Padding"),hasValue:()=>_,onDeselect:()=>h(),children:(0,u.jsx)(l.__experimentalBoxControl,{__next40pxDefaultSize:!0,allowReset:!1,label:(0,o.__)("Padding"),values:p,units:t,onChange:h})}),(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Margin"),hasValue:()=>v,onDeselect:()=>x(),children:(0,u.jsx)(l.__experimentalBoxControl,{__next40pxDefaultSize:!0,allowReset:!1,label:(0,o.__)("Margin"),inputProps:{min:-999},values:d,units:t,onChange:x,sides:e.container?["top","bottom"]:null})}),(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Block spacing"),hasValue:()=>f,onDeselect:()=>j(),children:(0,u.jsx)(l.__experimentalBoxControl,{__next40pxDefaultSize:!0,id:"responsive-block-gap-control",allowReset:!1,label:(0,o.__)("Block spacing"),values:s?.[n]?.blockGap,units:t,onChange:j,sides:["top"]})}),(0,u.jsx)(l.__experimentalToolsPanelItem,{isShownByDefault:!0,label:(0,o.__)("Minimum height"),hasValue:()=>b,onDeselect:()=>m(),children:(0,u.jsx)(i.HeightControl,{label:(0,o.__)("Minimum height"),onChange:m,value:s?.[n]?.height})})]})}const{assign:j,kebabCase:k,merge:y}=lodash,w=(0,s.createHigherOrderComponent)((e=>n=>{const{name:s,attributes:r,setAttributes:a}=n,{responsiveControls:c}=r;function d({device:e}){const[t]=(0,i.useSettings)("spacing.units"),o=(0,l.__experimentalUseCustomUnits)({availableUnits:t||["px","em","rem","vw","vh","%"]}),n={container:"core/group"===s||"core/columns"===s||"core/cover"===s||"core/media-text"===s||"tzm/section"===s,flex:"flex"===r.layout?.type||"core/navigation"===s,reversable:"flex"===r.layout?.type||"core/navigation"===s||"core/columns"===s||"core/media-text"===s,image:"core/site-logo"===s||"core/image"===s};function d(e={}){const t=p(e);a({responsiveControls:t})}return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(b,{isBlockType:n,device:e,updateAttribute:d,responsiveControls:c}),(0,u.jsx)(m,{isBlockType:n,units:o,device:e,updateAttribute:d,responsiveControls:c}),(0,u.jsx)(f,{isBlockType:n,units:o,device:e,updateAttribute:d,responsiveControls:c})]})}return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(e,{...n}),(0,u.jsx)(i.InspectorControls,{children:(0,u.jsx)(l.PanelBody,{className:t("block-editor-panel-responsive",{"has-active-phone-options":c?.phone,"has-active-tablet-options":c?.tablet,"has-active-laptop-options":c?.laptop,"has-active-desktop-options":c?.desktop}),title:(0,o.__)("Responsive controls","tzm-responsive-block-controls"),initialOpen:!1,children:(0,u.jsx)(l.TabPanel,{className:"responsive-controls-tab-panel",tabs:[{name:"phone",title:(0,o.__)("Phone","tzm-responsive-block-controls"),icon:"smartphone",className:"tab-phone",content:d({device:"phone"})},{name:"tablet",title:(0,o.__)("Tablet","tzm-responsive-block-controls"),icon:"tablet",className:"tab-tablet",content:d({device:"tablet"})},{name:"laptop",title:(0,o.__)("Laptop","tzm-responsive-block-controls"),icon:"laptop",className:"tab-laptop",content:d({device:"laptop"})},{name:"desktop",title:(0,o.__)("Desktop","tzm-responsive-block-controls"),icon:"desktop",className:"tab-desktop",content:d({device:"desktop"})}],children:({content:e})=>(0,u.jsx)("div",{className:"responsive-controls-tab-content",children:e})})})})]})}),"withResponsiveControls"),z=(0,s.createHigherOrderComponent)((e=>o=>{const{attributes:n,className:s}=o,{responsiveControls:i}=n;let l={...o.wrapperProps,style:i&&"object"==typeof i?Object.entries(i).reduce(((e,[t,o])=>("object"==typeof o&&Object.entries(o).forEach((([o,n])=>{switch(o){case"padding":case"margin":if("object"==typeof n){const s=["top","right","bottom","left"];if(s.every((e=>void 0!==n[e]))){const i=s.every((e=>n[e]===n.top));e[`--tzm-responsive--${o}--${t}`]=i?n.top:`${n.top} ${n.right} ${n.bottom} ${n.left}`}else Object.entries(n).forEach((([n,s])=>{e[`--tzm-responsive--${o}-${n}--${t}`]=s}))}break;case"blockGap":"object"==typeof n&&"top"in n&&(e[`--tzm-responsive--${k(o)}--${t}`]=n.top);break;default:n&&(e[`--tzm-responsive--${k(o)}--${t}`]=n)}})),e)),{}):{}};return(0,u.jsx)(e,{...o,className:t(s,i&&"object"==typeof i?Object.entries(i).reduce(((e,[t,o])=>("object"==typeof o&&Object.entries(o).forEach((([o,n])=>{switch(o){case"hidden":case"reverse":case"fullWidth":e.push(`tzm-responsive__${k(o)}__${t}`)}})),e)),[]):[]),wrapperProps:l})}),"addResponsiveStylingEditor");(0,n.addFilter)("blocks.registerBlockType","tzm/responsive-attributes",(function(e){return void 0!==e.attributes?j({},e,{attributes:y(e.attributes,{responsiveControls:{type:"object",default:null}})}):e})),(0,n.addFilter)("editor.BlockEdit","tzm/responsive-controls",w),(0,n.addFilter)("editor.BlockListBlock","tzm/responsive-styling-editor",z)}},o={};function n(e){var s=o[e];if(void 0!==s)return s.exports;var i=o[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,o,s,i)=>{if(!o){var l=1/0;for(p=0;p<e.length;p++){o=e[p][0],s=e[p][1],i=e[p][2];for(var r=!0,a=0;a<o.length;a++)(!1&i||l>=i)&&Object.keys(n.O).every((e=>n.O[e](o[a])))?o.splice(a--,1):(r=!1,i<l&&(l=i));if(r){e.splice(p--,1);var c=s();void 0!==c&&(t=c)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[o,s,i]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={216:0,51:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var s,i,l=o[0],r=o[1],a=o[2],c=0;if(l.some((t=>0!==e[t]))){for(s in r)n.o(r,s)&&(n.m[s]=r[s]);if(a)var p=a(n)}for(t&&t(o);c<l.length;c++)i=l[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(p)},o=self.webpackChunktzm_responsive_block_controls=self.webpackChunktzm_responsive_block_controls||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var s=n.O(void 0,[51],(()=>n(156)));s=n.O(s)})();