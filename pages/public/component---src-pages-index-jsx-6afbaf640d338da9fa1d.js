(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{140:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(416),u=t(638),i=t(652),c=t.n(i),s=(t(1106),t(1108),t(1110)),d=t.n(s),l=(t(1428),t(1430)),p=t.n(l),f=t(1432),m=t.n(f),y={content:[d()(),c.a,p.a,m.a],layout:[]};t.d(n,"query",function(){return h}),n.default=function(e){var n,t,a=(n=e.data.pageJson.content,t=JSON.parse(n),r.a.createElement(u.HTMLRenderer,{state:t,plugins:y}));return r.a.createElement(o.a,null,a)};var h="2805805818"},1407:function(e,n){},1409:function(e,n){},234:function(e,n,t){var a;e.exports=(a=t(322))&&a.default||a},262:function(e,n,t){"use strict";t.r(n),t.d(n,"graphql",function(){return y}),t.d(n,"StaticQueryContext",function(){return f}),t.d(n,"StaticQuery",function(){return m});var a=t(0),r=t.n(a),o=t(8),u=t.n(o),i=t(164),c=t.n(i);t.d(n,"Link",function(){return c.a}),t.d(n,"withPrefix",function(){return i.withPrefix}),t.d(n,"navigate",function(){return i.navigate}),t.d(n,"push",function(){return i.push}),t.d(n,"replace",function(){return i.replace}),t.d(n,"navigateTo",function(){return i.navigateTo});var s=t(36);t.d(n,"waitForRouteChange",function(){return s.c});var d=t(234),l=t.n(d);t.d(n,"PageRenderer",function(){return l.a});var p=t(37);t.d(n,"parsePath",function(){return p.a});var f=r.a.createContext({}),m=function(e){return r.a.createElement(f.Consumer,null,function(n){return e.data||n[e.query]&&n[e.query].data?(e.render||e.children)(e.data?e.data.data:n[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function y(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:u.a.object,query:u.a.string.isRequired,render:u.a.func,children:u.a.func}},322:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(8),u=t.n(o),i=t(47),c=t(1),s=function(e){var n=e.location,t=c.default.getResourcesForPathname(n.pathname);return r.a.createElement(i.a,{location:n,pageResources:t})};s.propTypes={location:u.a.shape({pathname:u.a.string.isRequired}).isRequired},n.default=s},416:function(e,n,t){"use strict";var a=t(0),r=t.n(a),o=t(8),u=t.n(o),i=t(417),c=t.n(i),s=t(157),d=(t(262),t(181)),l=(t(53),{count:0,docs:null}),p={isCountrySelectorOpen:!1},f=Object(d.combineReducers)({contentRepository:function(e,n){void 0===e&&(e=l);var t=n.type,a=n.payload;switch(t){case"LOAD_RESOURCE_SUCCESS":return Object.assign({},e,{docs:a.docs,count:a.count});default:return e}},footer:function(e,n){switch(void 0===e&&(e=p),n.type){case"TOGGLE_COUNTRY_SELECTOR":return Object.assign({},e,{isCountrySelectorOpen:!e.isCountrySelectorOpen});default:return e}}}),m=function(e){var n,t=e.children,a=(n=function(e){return e},Object(d.createStore)(f,n));return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{title:"Banner",meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},r.a.createElement("html",{lang:"en"})),r.a.createElement(s.Provider,{store:a},r.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t)))};m.propTypes={children:u.a.node.isRequired},n.a=m}}]);
//# sourceMappingURL=component---src-pages-index-jsx-6afbaf640d338da9fa1d.js.map