(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{138:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(416);t.default=function(){return r.a.createElement(o.a,null,r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},234:function(e,t,n){var a;e.exports=(a=n(322))&&a.default||a},262:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return h}),n.d(t,"StaticQueryContext",function(){return f}),n.d(t,"StaticQuery",function(){return m});var a=n(0),r=n.n(a),o=n(8),u=n.n(o),i=n(164),c=n.n(i);n.d(t,"Link",function(){return c.a}),n.d(t,"withPrefix",function(){return i.withPrefix}),n.d(t,"navigate",function(){return i.navigate}),n.d(t,"push",function(){return i.push}),n.d(t,"replace",function(){return i.replace}),n.d(t,"navigateTo",function(){return i.navigateTo});var s=n(36);n.d(t,"waitForRouteChange",function(){return s.c});var d=n(234),l=n.n(d);n.d(t,"PageRenderer",function(){return l.a});var p=n(37);n.d(t,"parsePath",function(){return p.a});var f=r.a.createContext({}),m=function(e){return r.a.createElement(f.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:u.a.object,query:u.a.string.isRequired,render:u.a.func,children:u.a.func}},322:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),u=n.n(o),i=n(47),c=n(1),s=function(e){var t=e.location,n=c.default.getResourcesForPathname(t.pathname);return r.a.createElement(i.a,{location:t,pageResources:n})};s.propTypes={location:u.a.shape({pathname:u.a.string.isRequired}).isRequired},t.default=s},416:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),u=n.n(o),i=n(417),c=n.n(i),s=n(157),d=(n(262),n(181)),l=(n(53),{count:0,docs:null}),p={isCountrySelectorOpen:!1},f=Object(d.combineReducers)({contentRepository:function(e,t){void 0===e&&(e=l);var n=t.type,a=t.payload;switch(n){case"LOAD_RESOURCE_SUCCESS":return Object.assign({},e,{docs:a.docs,count:a.count});default:return e}},footer:function(e,t){switch(void 0===e&&(e=p),t.type){case"TOGGLE_COUNTRY_SELECTOR":return Object.assign({},e,{isCountrySelectorOpen:!e.isCountrySelectorOpen});default:return e}}}),m=function(e){var t,n=e.children,a=(t=function(e){return e},Object(d.createStore)(f,t));return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{title:"Banner",meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},r.a.createElement("html",{lang:"en"})),r.a.createElement(s.Provider,{store:a},r.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},n)))};m.propTypes={children:u.a.node.isRequired},t.a=m}}]);
//# sourceMappingURL=component---src-pages-404-js-b1be327aade56427fb51.js.map