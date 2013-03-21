;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){// Autosize 1.15.2 - jQuery plugin for textareas
// (c) 2013 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php
(function(a){var j,b={className:"autosizejs",append:"",callback:!1},c="hidden",d="border-box",e="lineHeight",f='<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',g=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],h="oninput",i="onpropertychange",k=a(f).data("autosize",!0)[0];k.style.lineHeight="99px","99px"===a(k).css(e)&&g.push(e),k.style.lineHeight="",a.fn.autosize=function(e){return e=a.extend({},b,e||{}),k.parentNode!==document.body&&a(document.body).append(k),this.each(function(){function s(){j=b,k.className=e.className,a.each(g,function(a,b){k.style[b]=f.css(b)})}function t(){var a,d,g;j!==b&&s(),n||(n=!0,k.value=b.value+e.append,k.style.overflowY=b.style.overflowY,g=parseInt(b.style.height,10),k.style.width=f.width()+"px",k.scrollTop=0,k.scrollTop=9e4,a=k.scrollTop,a>m?(a=m,d="scroll"):l>a&&(a=l),a+=p,b.style.overflowY=d||c,g!==a&&(b.style.height=a+"px",r&&e.callback.call(b)),setTimeout(function(){n=!1},1))}var n,o,b=this,f=a(b),l=f.height(),m=parseInt(f.css("maxHeight"),10),p=0,q=b.value,r=a.isFunction(e.callback);f.data("autosize")||((f.css("box-sizing")===d||f.css("-moz-box-sizing")===d||f.css("-webkit-box-sizing")===d)&&(p=f.outerHeight()-f.height()),o="none"===f.css("resize")?"none":"horizontal",f.css({overflow:c,overflowY:c,wordWrap:"break-word",resize:o}).data("autosize",!0),m=m&&m>0?m:9e4,i in b?h in b?b[h]=b.onkeyup=t:b[i]=t:(b[h]=t,b.value="",b.value=q),a(window).resize(t),f.bind("autosize",t),t())})}})(window.jQuery||window.Zepto);
},{}],2:[function(require,module,exports){(function(global){(function(e,t){"use strict";function n(e){var t=e.length,n=st.type(e);return st.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}function r(e){var t=Tt[e]={};return st.each(e.match(lt)||[],function(e,n){t[n]=!0}),t}function i(e,n,r,i){if(st.acceptData(e)){var o,a,s=st.expando,u="string"==typeof n,l=e.nodeType,c=l?st.cache:e,f=l?e[s]:e[s]&&s;if(f&&c[f]&&(i||c[f].data)||!u||r!==t)return f||(l?e[s]=f=K.pop()||st.guid++:f=s),c[f]||(c[f]={},l||(c[f].toJSON=st.noop)),("object"==typeof n||"function"==typeof n)&&(i?c[f]=st.extend(c[f],n):c[f].data=st.extend(c[f].data,n)),o=c[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[st.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[st.camelCase(n)])):a=o,a}}function o(e,t,n){if(st.acceptData(e)){var r,i,o,a=e.nodeType,u=a?st.cache:e,l=a?e[st.expando]:st.expando;if(u[l]){if(t&&(r=n?u[l]:u[l].data)){st.isArray(t)?t=t.concat(st.map(t,st.camelCase)):t in r?t=[t]:(t=st.camelCase(t),t=t in r?[t]:t.split(" "));for(i=0,o=t.length;o>i;i++)delete r[t[i]];if(!(n?s:st.isEmptyObject)(r))return}(n||(delete u[l].data,s(u[l])))&&(a?st.cleanData([e],!0):st.support.deleteExpando||u!=u.window?delete u[l]:u[l]=null)}}}function a(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(Nt,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:wt.test(r)?st.parseJSON(r):r}catch(o){}st.data(e,n,r)}else r=t}return r}function s(e){var t;for(t in e)if(("data"!==t||!st.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function u(){return!0}function l(){return!1}function c(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function f(e,t,n){if(t=t||0,st.isFunction(t))return st.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return st.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=st.grep(e,function(e){return 1===e.nodeType});if(Wt.test(t))return st.filter(t,r,!n);t=st.filter(t,r)}return st.grep(e,function(e){return st.inArray(e,t)>=0===n})}function p(e){var t=zt.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function d(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function h(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function g(e){var t=nn.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function m(e,t){for(var n,r=0;null!=(n=e[r]);r++)st._data(n,"globalEval",!t||st._data(t[r],"globalEval"))}function y(e,t){if(1===t.nodeType&&st.hasData(e)){var n,r,i,o=st._data(e),a=st._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)st.event.add(t,n,s[n][r])}a.data&&(a.data=st.extend({},a.data))}}function v(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!st.support.noCloneEvent&&t[st.expando]){r=st._data(t);for(i in r.events)st.removeEvent(t,i,r.handle);t.removeAttribute(st.expando)}"script"===n&&t.text!==e.text?(h(t).text=e.text,g(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),st.support.html5Clone&&e.innerHTML&&!st.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Zt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function b(e,n){var r,i,o=0,a=e.getElementsByTagName!==t?e.getElementsByTagName(n||"*"):e.querySelectorAll!==t?e.querySelectorAll(n||"*"):t;if(!a)for(a=[],r=e.childNodes||e;null!=(i=r[o]);o++)!n||st.nodeName(i,n)?a.push(i):st.merge(a,b(i,n));return n===t||n&&st.nodeName(e,n)?st.merge([e],a):a}function x(e){Zt.test(e.type)&&(e.defaultChecked=e.checked)}function T(e,t){if(t in e)return t;for(var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Nn.length;i--;)if(t=Nn[i]+n,t in e)return t;return r}function w(e,t){return e=t||e,"none"===st.css(e,"display")||!st.contains(e.ownerDocument,e)}function N(e,t){for(var n,r=[],i=0,o=e.length;o>i;i++)n=e[i],n.style&&(r[i]=st._data(n,"olddisplay"),t?(r[i]||"none"!==n.style.display||(n.style.display=""),""===n.style.display&&w(n)&&(r[i]=st._data(n,"olddisplay",S(n.nodeName)))):r[i]||w(n)||st._data(n,"olddisplay",st.css(n,"display")));for(i=0;o>i;i++)n=e[i],n.style&&(t&&"none"!==n.style.display&&""!==n.style.display||(n.style.display=t?r[i]||"":"none"));return e}function C(e,t,n){var r=mn.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=st.css(e,n+wn[o],!0,i)),r?("content"===n&&(a-=st.css(e,"padding"+wn[o],!0,i)),"margin"!==n&&(a-=st.css(e,"border"+wn[o]+"Width",!0,i))):(a+=st.css(e,"padding"+wn[o],!0,i),"padding"!==n&&(a+=st.css(e,"border"+wn[o]+"Width",!0,i)));return a}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=ln(e),a=st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=un(e,t,o),(0>i||null==i)&&(i=e.style[t]),yn.test(i))return i;r=a&&(st.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+k(e,t,n||(a?"border":"content"),r,o)+"px"}function S(e){var t=V,n=bn[e];return n||(n=A(e,t),"none"!==n&&n||(cn=(cn||st("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(cn[0].contentWindow||cn[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=A(e,t),cn.detach()),bn[e]=n),n}function A(e,t){var n=st(t.createElement(e)).appendTo(t.body),r=st.css(n[0],"display");return n.remove(),r}function j(e,t,n,r){var i;if(st.isArray(t))st.each(t,function(t,i){n||kn.test(e)?r(e,i):j(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==st.type(t))r(e,t);else for(i in t)j(e+"["+i+"]",t[i],n,r)}function D(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(lt)||[];if(st.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function L(e,n,r,i){function o(u){var l;return a[u]=!0,st.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||s||a[c]?s?!(l=c):t:(n.dataTypes.unshift(c),o(c),!1)}),l}var a={},s=e===$n;return o(n.dataTypes[0])||!a["*"]&&o("*")}function H(e,n){var r,i,o=st.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((o[r]?e:i||(i={}))[r]=n[r]);return i&&st.extend(!0,e,i),e}function M(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(o in c)o in r&&(n[c[o]]=r[o]);for(;"*"===l[0];)l.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("Content-Type"));if(i)for(o in u)if(u[o]&&u[o].test(i)){l.unshift(o);break}if(l[0]in r)a=l[0];else{for(o in r){if(!l[0]||e.converters[o+" "+l[0]]){a=o;break}s||(s=o)}a=a||s}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function q(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=u[++s];)if("*"!==i){if("*"!==l&&l!==i){if(n=a[l+" "+i]||a["* "+i],!n)for(r in a)if(o=r.split(" "),o[1]===i&&(n=a[l+" "+o[0]]||a["* "+o[0]])){n===!0?n=a[r]:a[r]!==!0&&(i=o[0],u.splice(s--,0,i));break}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(c){return{state:"parsererror",error:n?c:"No conversion from "+l+" to "+i}}}l=i}return{state:"success",data:t}}function _(){try{return new e.XMLHttpRequest}catch(t){}}function F(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function O(){return setTimeout(function(){Qn=t}),Qn=st.now()}function B(e,t){st.each(t,function(t,n){for(var r=(rr[t]||[]).concat(rr["*"]),i=0,o=r.length;o>i;i++)if(r[i].call(e,t,n))return})}function P(e,t,n){var r,i,o=0,a=nr.length,s=st.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Qn||O(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:st.extend({},t),opts:st.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qn||O(),duration:n.duration,tweens:[],createTween:function(t,n){var r=st.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(R(c,l.opts.specialEasing);a>o;o++)if(r=nr[o].call(l,e,c,l.opts))return r;return B(l,c),st.isFunction(l.opts.start)&&l.opts.start.call(e,l),st.fx.timer(st.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function R(e,t){var n,r,i,o,a;for(n in e)if(r=st.camelCase(n),i=t[r],o=e[n],st.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=st.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function W(e,t,n){var r,i,o,a,s,u,l,c,f,p=this,d=e.style,h={},g=[],m=e.nodeType&&w(e);n.queue||(c=st._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,f=c.empty.fire,c.empty.fire=function(){c.unqueued||f()}),c.unqueued++,p.always(function(){p.always(function(){c.unqueued--,st.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===st.css(e,"display")&&"none"===st.css(e,"float")&&(st.support.inlineBlockNeedsLayout&&"inline"!==S(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",st.support.shrinkWrapBlocks||p.done(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(r in t)if(o=t[r],Zn.exec(o)){if(delete t[r],u=u||"toggle"===o,o===(m?"hide":"show"))continue;g.push(r)}if(a=g.length){s=st._data(e,"fxshow")||st._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?st(e).show():p.done(function(){st(e).hide()}),p.done(function(){var t;st._removeData(e,"fxshow");for(t in h)st.style(e,t,h[t])});for(r=0;a>r;r++)i=g[r],l=p.createTween(i,m?s[i]:0),h[i]=s[i]||st.style(e,i),i in s||(s[i]=l.start,m&&(l.end=l.start,l.start="width"===i||"height"===i?1:0))}}function $(e,t,n,r,i){return new $.prototype.init(e,t,n,r,i)}function I(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=wn[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function z(e){return st.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var X,U,V=e.document,Y=e.location,J=e.jQuery,G=e.$,Q={},K=[],Z="1.9.0",et=K.concat,tt=K.push,nt=K.slice,rt=K.indexOf,it=Q.toString,ot=Q.hasOwnProperty,at=Z.trim,st=function(e,t){return new st.fn.init(e,t,X)},ut=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,lt=/\S+/g,ct=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ft=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,pt=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,dt=/^[\],:{}\s]*$/,ht=/(?:^|:|,)(?:\s*\[)+/g,gt=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,mt=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,yt=/^-ms-/,vt=/-([\da-z])/gi,bt=function(e,t){return t.toUpperCase()},xt=function(){V.addEventListener?(V.removeEventListener("DOMContentLoaded",xt,!1),st.ready()):"complete"===V.readyState&&(V.detachEvent("onreadystatechange",xt),st.ready())};st.fn=st.prototype={jquery:Z,constructor:st,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:ft.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof st?n[0]:n,st.merge(this,st.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:V,!0)),pt.test(i[1])&&st.isPlainObject(n))for(i in n)st.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=V.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=V,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):st.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),st.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return nt.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=st.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return st.each(this,e,t)},ready:function(e){return st.ready.promise().done(e),this},slice:function(){return this.pushStack(nt.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(st.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:tt,sort:[].sort,splice:[].splice},st.fn.init.prototype=st.fn,st.extend=st.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||st.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(e=arguments[u]))for(n in e)r=s[n],i=e[n],s!==i&&(c&&i&&(st.isPlainObject(i)||(o=st.isArray(i)))?(o?(o=!1,a=r&&st.isArray(r)?r:[]):a=r&&st.isPlainObject(r)?r:{},s[n]=st.extend(c,a,i)):i!==t&&(s[n]=i));return s},st.extend({noConflict:function(t){return e.$===st&&(e.$=G),t&&e.jQuery===st&&(e.jQuery=J),st},isReady:!1,readyWait:1,holdReady:function(e){e?st.readyWait++:st.ready(!0)},ready:function(e){if(e===!0?!--st.readyWait:!st.isReady){if(!V.body)return setTimeout(st.ready);st.isReady=!0,e!==!0&&--st.readyWait>0||(U.resolveWith(V,[st]),st.fn.trigger&&st(V).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===st.type(e)},isArray:Array.isArray||function(e){return"array"===st.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?Q[it.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==st.type(e)||e.nodeType||st.isWindow(e))return!1;try{if(e.constructor&&!ot.call(e,"constructor")&&!ot.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||ot.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||V;var r=pt.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=st.buildFragment([e],t,i),i&&st(i).remove(),st.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=st.trim(n),n&&dt.test(n.replace(gt,"@").replace(mt,"]").replace(ht,"")))?Function("return "+n)():(st.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||st.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&st.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(yt,"ms-").replace(vt,bt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,a=e.length,s=n(e);if(r){if(s)for(;a>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(s)for(;a>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:at&&!at.call("\ufeff\u00a0")?function(e){return null==e?"":at.call(e)}:function(e){return null==e?"":(e+"").replace(ct,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?st.merge(r,"string"==typeof e?[e]:e):tt.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(rt)return rt.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else for(;n[o]!==t;)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,a=e.length,s=n(e),u=[];if(s)for(;a>o;o++)i=t(e[o],o,r),null!=i&&(u[u.length]=i);else for(o in e)i=t(e[o],o,r),null!=i&&(u[u.length]=i);return et.apply([],u)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(r=e[n],n=e,e=r),st.isFunction(e)?(i=nt.call(arguments,2),o=function(){return e.apply(n||this,i.concat(nt.call(arguments)))},o.guid=e.guid=e.guid||st.guid++,o):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===st.type(r)){o=!0;for(u in r)st.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,st.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(st(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),st.ready.promise=function(t){if(!U)if(U=st.Deferred(),"complete"===V.readyState)setTimeout(st.ready);else if(V.addEventListener)V.addEventListener("DOMContentLoaded",xt,!1),e.addEventListener("load",st.ready,!1);else{V.attachEvent("onreadystatechange",xt),e.attachEvent("onload",st.ready);var n=!1;try{n=null==e.frameElement&&V.documentElement}catch(r){}n&&n.doScroll&&function i(){if(!st.isReady){try{n.doScroll("left")}catch(e){return setTimeout(i,50)}st.ready()}}()}return U.promise(t)},st.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){Q["[object "+t+"]"]=t.toLowerCase()}),X=st(V);var Tt={};st.Callbacks=function(e){e="string"==typeof e?Tt[e]||r(e):st.extend({},e);var n,i,o,a,s,u,l=[],c=!e.once&&[],f=function(t){for(n=e.memory&&t,i=!0,u=a||0,a=0,s=l.length,o=!0;l&&s>u;u++)if(l[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}o=!1,l&&(c?c.length&&f(c.shift()):n?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function r(t){st.each(t,function(t,n){var i=st.type(n);"function"===i?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==i&&r(n)})})(arguments),o?s=l.length:n&&(a=t,f(n))}return this},remove:function(){return l&&st.each(arguments,function(e,t){for(var n;(n=st.inArray(t,l,n))>-1;)l.splice(n,1),o&&(s>=n&&s--,u>=n&&u--)}),this},has:function(e){return st.inArray(e,l)>-1},empty:function(){return l=[],this},disable:function(){return l=c=n=t,this},disabled:function(){return!l},lock:function(){return c=t,n||p.disable(),this},locked:function(){return!c},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!l||i&&!c||(o?c.push(t):f(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},st.extend({Deferred:function(e){var t=[["resolve","done",st.Callbacks("once memory"),"resolved"],["reject","fail",st.Callbacks("once memory"),"rejected"],["notify","progress",st.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return st.Deferred(function(n){st.each(t,function(t,o){var a=o[0],s=st.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&st.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?st.extend(e,r):r}},i={};return r.pipe=r.then,st.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=nt.call(arguments),a=o.length,s=1!==a||e&&st.isFunction(e.promise)?a:0,u=1===s?e:st.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?nt.call(arguments):i,r===t?u.notifyWith(n,r):--s||u.resolveWith(n,r)}};if(a>1)for(t=Array(a),n=Array(a),r=Array(a);a>i;i++)o[i]&&st.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--s;return s||u.resolveWith(r,o),u.promise()}}),st.support=function(){var n,r,i,o,a,s,u,l,c,f,p=V.createElement("div");if(p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",r=p.getElementsByTagName("*"),i=p.getElementsByTagName("a")[0],!r||!i||!r.length)return{};o=V.createElement("select"),a=o.appendChild(V.createElement("option")),s=p.getElementsByTagName("input")[0],i.style.cssText="top:1px;float:left;opacity:.5",n={getSetAttribute:"t"!==p.className,leadingWhitespace:3===p.firstChild.nodeType,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(i.getAttribute("style")),hrefNormalized:"/a"===i.getAttribute("href"),opacity:/^0.5/.test(i.style.opacity),cssFloat:!!i.style.cssFloat,checkOn:!!s.value,optSelected:a.selected,enctype:!!V.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==V.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===V.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},s.checked=!0,n.noCloneChecked=s.cloneNode(!0).checked,o.disabled=!0,n.optDisabled=!a.disabled;try{delete p.test}catch(d){n.deleteExpando=!1}s=V.createElement("input"),s.setAttribute("value",""),n.input=""===s.getAttribute("value"),s.value="t",s.setAttribute("type","radio"),n.radioValue="t"===s.value,s.setAttribute("checked","t"),s.setAttribute("name","t"),u=V.createDocumentFragment(),u.appendChild(s),n.appendChecked=s.checked,n.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,p.attachEvent&&(p.attachEvent("onclick",function(){n.noCloneEvent=!1}),p.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})p.setAttribute(l="on"+f,"t"),n[f+"Bubbles"]=l in e||p.attributes[l].expando===!1;return p.style.backgroundClip="content-box",p.cloneNode(!0).style.backgroundClip="",n.clearCloneStyle="content-box"===p.style.backgroundClip,st(function(){var r,i,o,a="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",s=V.getElementsByTagName("body")[0];s&&(r=V.createElement("div"),r.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",s.appendChild(r).appendChild(p),p.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=p.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",c=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",n.reliableHiddenOffsets=c&&0===o[0].offsetHeight,p.innerHTML="",p.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",n.boxSizing=4===p.offsetWidth,n.doesNotIncludeMarginInBodyOffset=1!==s.offsetTop,e.getComputedStyle&&(n.pixelPosition="1%"!==(e.getComputedStyle(p,null)||{}).top,n.boxSizingReliable="4px"===(e.getComputedStyle(p,null)||{width:"4px"}).width,i=p.appendChild(V.createElement("div")),i.style.cssText=p.style.cssText=a,i.style.marginRight=i.style.width="0",p.style.width="1px",n.reliableMarginRight=!parseFloat((e.getComputedStyle(i,null)||{}).marginRight)),p.style.zoom!==t&&(p.innerHTML="",p.style.cssText=a+"width:1px;padding:1px;display:inline;zoom:1",n.inlineBlockNeedsLayout=3===p.offsetWidth,p.style.display="block",p.innerHTML="<div></div>",p.firstChild.style.width="5px",n.shrinkWrapBlocks=3!==p.offsetWidth,s.style.zoom=1),s.removeChild(r),r=p=o=i=null)}),r=o=u=a=i=s=null,n}();var wt=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,Nt=/([A-Z])/g;st.extend({cache:{},expando:"jQuery"+(Z+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?st.cache[e[st.expando]]:e[st.expando],!!e&&!s(e)},data:function(e,t,n){return i(e,t,n,!1)},removeData:function(e,t){return o(e,t,!1)},_data:function(e,t,n){return i(e,t,n,!0)},_removeData:function(e,t){return o(e,t,!0)},acceptData:function(e){var t=e.nodeName&&st.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),st.fn.extend({data:function(e,n){var r,i,o=this[0],s=0,u=null;if(e===t){if(this.length&&(u=st.data(o),1===o.nodeType&&!st._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>s;s++)i=r[s].name,i.indexOf("data-")||(i=st.camelCase(i.substring(5)),a(o,i,u[i]));st._data(o,"parsedAttrs",!0)}return u}return"object"==typeof e?this.each(function(){st.data(this,e)}):st.access(this,function(n){return n===t?o?a(o,e,st.data(o,e)):null:(this.each(function(){st.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){st.removeData(this,e)})}}),st.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=st._data(e,n),r&&(!i||st.isArray(r)?i=st._data(e,n,st.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=st.queue(e,t),r=n.length,i=n.shift(),o=st._queueHooks(e,t),a=function(){st.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return st._data(e,n)||st._data(e,n,{empty:st.Callbacks("once memory").add(function(){st._removeData(e,t+"queue"),st._removeData(e,n)})})}}),st.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?st.queue(this[0],e):n===t?this:this.each(function(){var t=st.queue(this,e,n);st._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&st.dequeue(this,e)})},dequeue:function(e){return this.each(function(){st.dequeue(this,e)})},delay:function(e,t){return e=st.fx?st.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=st.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};for("string"!=typeof e&&(n=e,e=t),e=e||"fx";s--;)r=st._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var Ct,kt,Et=/[\t\r\n]/g,St=/\r/g,At=/^(?:input|select|textarea|button|object)$/i,jt=/^(?:a|area)$/i,Dt=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,Lt=/^(?:checked|selected)$/i,Ht=st.support.getSetAttribute,Mt=st.support.input;st.fn.extend({attr:function(e,t){return st.access(this,st.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){st.removeAttr(this,e)})},prop:function(e,t){return st.access(this,st.prop,e,t,arguments.length>1)},removeProp:function(e){return e=st.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):" ")){for(o=0;i=t[o++];)0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=st.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");n.className=e?st.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return st.isFunction(e)?this.each(function(n){st(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n)for(var i,o=0,a=st(this),s=t,u=e.match(lt)||[];i=u[o++];)s=r?s:!a.hasClass(i),a[s?"addClass":"removeClass"](i);else("undefined"===n||"boolean"===n)&&(this.className&&st._data(this,"__className__",this.className),this.className=this.className||e===!1?"":st._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Et," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=st.isFunction(e),this.each(function(r){var o,a=st(this);1===this.nodeType&&(o=i?e.call(this,r,a.val()):e,null==o?o="":"number"==typeof o?o+="":st.isArray(o)&&(o=st.map(o,function(e){return null==e?"":e+""})),n=st.valHooks[this.type]||st.valHooks[this.nodeName.toLowerCase()],n&&"set"in n&&n.set(this,o,"value")!==t||(this.value=o))});if(o)return n=st.valHooks[o.type]||st.valHooks[o.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(o,"value"))!==t?r:(r=o.value,"string"==typeof r?r.replace(St,""):null==r?"":r)}}}),st.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(st.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&st.nodeName(n.parentNode,"optgroup"))){if(t=st(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=st.makeArray(t);return st(e).find("option").each(function(){this.selected=st.inArray(st(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return e.getAttribute===t?st.prop(e,n,r):(a=1!==s||!st.isXMLDoc(e),a&&(n=n.toLowerCase(),o=st.attrHooks[n]||(Dt.test(n)?kt:Ct)),r===t?o&&a&&"get"in o&&null!==(i=o.get(e,n))?i:(e.getAttribute!==t&&(i=e.getAttribute(n)),null==i?t:i):null!==r?o&&a&&"set"in o&&(i=o.set(e,r,n))!==t?i:(e.setAttribute(n,r+""),r):(st.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(lt);if(o&&1===e.nodeType)for(;n=o[i++];)r=st.propFix[n]||n,Dt.test(n)?!Ht&&Lt.test(n)?e[st.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:st.attr(e,n,""),e.removeAttribute(Ht?n:r)},attrHooks:{type:{set:function(e,t){if(!st.support.radioValue&&"radio"===t&&st.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!st.isXMLDoc(e),a&&(n=st.propFix[n]||n,o=st.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):At.test(e.nodeName)||jt.test(e.nodeName)&&e.href?0:t}}}}),kt={get:function(e,n){var r=st.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?Mt&&Ht?null!=i:Lt.test(n)?e[st.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?st.removeAttr(e,n):Mt&&Ht||!Lt.test(n)?e.setAttribute(!Ht&&st.propFix[n]||n,n):e[st.camelCase("default-"+n)]=e[n]=!0,n}},Mt&&Ht||(st.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return st.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t
},set:function(e,n,r){return st.nodeName(e,"input")?(e.defaultValue=n,t):Ct&&Ct.set(e,n,r)}}),Ht||(Ct=st.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},st.attrHooks.contenteditable={get:Ct.get,set:function(e,t,n){Ct.set(e,""===t?!1:t,n)}},st.each(["width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),st.support.hrefNormalized||(st.each(["href","src","width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),st.each(["href","src"],function(e,t){st.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),st.support.style||(st.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),st.support.optSelected||(st.propHooks.selected=st.extend(st.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),st.support.enctype||(st.propFix.enctype="encoding"),st.support.checkOn||st.each(["radio","checkbox"],function(){st.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),st.each(["radio","checkbox"],function(){st.valHooks[this]=st.extend(st.valHooks[this],{set:function(e,n){return st.isArray(n)?e.checked=st.inArray(st(e).val(),n)>=0:t}})});var qt=/^(?:input|select|textarea)$/i,_t=/^key/,Ft=/^(?:mouse|contextmenu)|click/,Ot=/^(?:focusinfocus|focusoutblur)$/,Bt=/^([^.]*)(?:\.(.+)|)$/;st.event={global:{},add:function(e,n,r,i,o){var a,s,u,l,c,f,p,d,h,g,m,y=3!==e.nodeType&&8!==e.nodeType&&st._data(e);if(y){for(r.handler&&(a=r,r=a.handler,o=a.selector),r.guid||(r.guid=st.guid++),(l=y.events)||(l=y.events={}),(s=y.handle)||(s=y.handle=function(e){return st===t||e&&st.event.triggered===e.type?t:st.event.dispatch.apply(s.elem,arguments)},s.elem=e),n=(n||"").match(lt)||[""],c=n.length;c--;)u=Bt.exec(n[c])||[],h=m=u[1],g=(u[2]||"").split(".").sort(),p=st.event.special[h]||{},h=(o?p.delegateType:p.bindType)||h,p=st.event.special[h]||{},f=st.extend({type:h,origType:m,data:i,handler:r,guid:r.guid,selector:o,needsContext:o&&st.expr.match.needsContext.test(o),namespace:g.join(".")},a),(d=l[h])||(d=l[h]=[],d.delegateCount=0,p.setup&&p.setup.call(e,i,g,s)!==!1||(e.addEventListener?e.addEventListener(h,s,!1):e.attachEvent&&e.attachEvent("on"+h,s))),p.add&&(p.add.call(e,f),f.handler.guid||(f.handler.guid=r.guid)),o?d.splice(d.delegateCount++,0,f):d.push(f),st.event.global[h]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,m=st.hasData(e)&&st._data(e);if(m&&(u=m.events)){for(t=(t||"").match(lt)||[""],l=t.length;l--;)if(s=Bt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){for(f=st.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||st.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)st.event.remove(e,d+t[l],n,r,!0);st.isEmptyObject(u)&&(delete m.handle,st._removeData(e,"events"))}},trigger:function(n,r,i,o){var a,s,u,l,c,f,p,d=[i||V],h=n.type||n,g=n.namespace?n.namespace.split("."):[];if(s=u=i=i||V,3!==i.nodeType&&8!==i.nodeType&&!Ot.test(h+st.event.triggered)&&(h.indexOf(".")>=0&&(g=h.split("."),h=g.shift(),g.sort()),c=0>h.indexOf(":")&&"on"+h,n=n[st.expando]?n:new st.Event(h,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=g.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:st.makeArray(r,[n]),p=st.event.special[h]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!st.isWindow(i)){for(l=p.delegateType||h,Ot.test(l+h)||(s=s.parentNode);s;s=s.parentNode)d.push(s),u=s;u===(i.ownerDocument||V)&&d.push(u.defaultView||u.parentWindow||e)}for(a=0;(s=d[a++])&&!n.isPropagationStopped();)n.type=a>1?l:p.bindType||h,f=(st._data(s,"events")||{})[n.type]&&st._data(s,"handle"),f&&f.apply(s,r),f=c&&s[c],f&&st.acceptData(s)&&f.apply&&f.apply(s,r)===!1&&n.preventDefault();if(n.type=h,!(o||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===h&&st.nodeName(i,"a")||!st.acceptData(i)||!c||!i[h]||st.isWindow(i))){u=i[c],u&&(i[c]=null),st.event.triggered=h;try{i[h]()}catch(m){}st.event.triggered=t,u&&(i[c]=u)}return n.result}},dispatch:function(e){e=st.event.fix(e);var n,r,i,o,a,s=[],u=nt.call(arguments),l=(st._data(this,"events")||{})[e.type]||[],c=st.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){for(s=st.event.handlers.call(this,e,l),n=0;(o=s[n++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,r=0;(a=o.handlers[r++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(a.namespace))&&(e.handleObj=a,e.data=a.data,i=((st.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u),i!==t&&(e.result=i)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(l.disabled!==!0||"click"!==e.type){for(i=[],r=0;u>r;r++)a=n[r],o=a.selector+" ",i[o]===t&&(i[o]=a.needsContext?st(o,this).index(l)>=0:st.find(o,this,null,[l]).length),i[o]&&i.push(a);i.length&&s.push({elem:l,handlers:i})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[st.expando])return e;var t,n,r=e,i=st.event.fixHooks[e.type]||{},o=i.props?this.props.concat(i.props):this.props;for(e=new st.Event(r),t=o.length;t--;)n=o[t],e[n]=r[n];return e.target||(e.target=r.srcElement||V),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,i.filter?i.filter(e,r):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,a=n.button,s=n.fromElement;return null==e.pageX&&null!=n.clientX&&(r=e.target.ownerDocument||V,i=r.documentElement,o=r.body,e.pageX=n.clientX+(i&&i.scrollLeft||o&&o.scrollLeft||0)-(i&&i.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(i&&i.scrollTop||o&&o.scrollTop||0)-(i&&i.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&s&&(e.relatedTarget=s===e.target?n.toElement:s),e.which||a===t||(e.which=1&a?1:2&a?3:4&a?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return st.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==V.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===V.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=st.extend(new st.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?st.event.trigger(i,null,t):st.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},st.removeEvent=V.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,n,r){var i="on"+n;e.detachEvent&&(e[i]===t&&(e[i]=null),e.detachEvent(i,r))},st.Event=function(e,n){return this instanceof st.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?u:l):this.type=e,n&&st.extend(this,n),this.timeStamp=e&&e.timeStamp||st.now(),this[st.expando]=!0,t):new st.Event(e,n)},st.Event.prototype={isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=u,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=u,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u,this.stopPropagation()}},st.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){st.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!st.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),st.support.submitBubbles||(st.event.special.submit={setup:function(){return st.nodeName(this,"form")?!1:(st.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=st.nodeName(n,"input")||st.nodeName(n,"button")?n.form:t;r&&!st._data(r,"submitBubbles")&&(st.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),st._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&st.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return st.nodeName(this,"form")?!1:(st.event.remove(this,"._submit"),t)}}),st.support.changeBubbles||(st.event.special.change={setup:function(){return qt.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(st.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),st.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),st.event.simulate("change",this,e,!0)})),!1):(st.event.add(this,"beforeactivate._change",function(e){var t=e.target;qt.test(t.nodeName)&&!st._data(t,"changeBubbles")&&(st.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||st.event.simulate("change",this.parentNode,e,!0)}),st._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return st.event.remove(this,"._change"),!qt.test(this.nodeName)}}),st.support.focusinBubbles||st.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){st.event.simulate(t,e.target,st.event.fix(e),!0)};st.event.special[t]={setup:function(){0===n++&&V.addEventListener(e,r,!0)},teardown:function(){0===--n&&V.removeEventListener(e,r,!0)}}}),st.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(s in e)this.on(s,n,r,e[s],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=l;else if(!i)return this;return 1===o&&(a=i,i=function(e){return st().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=st.guid++)),this.each(function(){st.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,st(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=l),this.each(function(){st.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){st.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?st.event.trigger(e,n,r,!0):t},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),st.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){st.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)},_t.test(t)&&(st.event.fixHooks[t]=st.event.keyHooks),Ft.test(t)&&(st.event.fixHooks[t]=st.event.mouseHooks)}),function(e,t){function n(e){return ht.test(e+"")}function r(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>C.cacheLength&&delete e[t.shift()],e[n]=r}}function i(e){return e[P]=!0,e}function o(e){var t=L.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function a(e,t,n,r){var i,o,a,s,u,l,c,d,h,g;if((t?t.ownerDocument||t:R)!==L&&D(t),t=t||L,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!M&&!r){if(i=gt.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&O(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Q.apply(n,K.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&W.getByClassName&&t.getElementsByClassName)return Q.apply(n,K.call(t.getElementsByClassName(a),0)),n}if(W.qsa&&!q.test(e)){if(c=!0,d=P,h=t,g=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(l=f(e),(c=t.getAttribute("id"))?d=c.replace(vt,"\\$&"):t.setAttribute("id",d),d="[id='"+d+"'] ",u=l.length;u--;)l[u]=d+p(l[u]);h=dt.test(e)&&t.parentNode||t,g=l.join(",")}if(g)try{return Q.apply(n,K.call(h.querySelectorAll(g),0)),n}catch(m){}finally{c||t.removeAttribute("id")}}}return x(e.replace(at,"$1"),t,n,r)}function s(e,t){for(var n=e&&t&&e.nextSibling;n;n=n.nextSibling)if(n===t)return-1;return e?1:-1}function u(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return i(function(t){return t=+t,i(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function f(e,t){var n,r,i,o,s,u,l,c=X[e+" "];if(c)return t?0:c.slice(0);for(s=e,u=[],l=C.preFilter;s;){(!n||(r=ut.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(i=[])),n=!1,(r=lt.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(at," ")}),s=s.slice(n.length));for(o in C.filter)!(r=pt[o].exec(s))||l[o]&&!(r=l[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?a.error(e):X(e,u).slice(0)}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){var r=t.dir,i=n&&"parentNode"===t.dir,o=I++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,u,l,c=$+" "+o;if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i)if(l=t[P]||(t[P]={}),(u=l[r])&&u[0]===c){if((s=u[1])===!0||s===N)return s===!0}else if(u=l[r]=[c],u[1]=e(t,n,a)||N,u[1]===!0)return!0}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function m(e,t,n,r,o,a){return r&&!r[P]&&(r=m(r)),o&&!o[P]&&(o=m(o,a)),i(function(i,a,s,u){var l,c,f,p=[],d=[],h=a.length,m=i||b(t||"*",s.nodeType?[s]:s,[]),y=!e||!i&&t?m:g(m,p,e,s,u),v=n?o||(i?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r)for(l=g(v,d),r(l,[],s,u),c=l.length;c--;)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f));if(i){if(o||e){if(o){for(l=[],c=v.length;c--;)(f=v[c])&&l.push(y[c]=f);o(null,v=[],l,u)}for(c=v.length;c--;)(f=v[c])&&(l=o?Z.call(i,f):p[c])>-1&&(i[l]=!(a[l]=f))}}else v=g(v===a?v.splice(h,v.length):v),o?o(null,a,v,u):Q.apply(a,v)})}function y(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],a=o||C.relative[" "],s=o?1:0,u=d(function(e){return e===t},a,!0),l=d(function(e){return Z.call(t,e)>-1},a,!0),c=[function(e,n,r){return!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r))}];i>s;s++)if(n=C.relative[e[s].type])c=[d(h(c),n)];else{if(n=C.filter[e[s].type].apply(null,e[s].matches),n[P]){for(r=++s;i>r&&!C.relative[e[r].type];r++);return m(s>1&&h(c),s>1&&p(e.slice(0,s-1)).replace(at,"$1"),n,r>s&&y(e.slice(s,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}c.push(n)}return h(c)}function v(e,t){var n=0,r=t.length>0,o=e.length>0,s=function(i,s,u,l,c){var f,p,d,h=[],m=0,y="0",v=i&&[],b=null!=c,x=j,T=i||o&&C.find.TAG("*",c&&s.parentNode||s),w=$+=null==x?1:Math.E;for(b&&(j=s!==L&&s,N=n);null!=(f=T[y]);y++){if(o&&f){for(p=0;d=e[p];p++)if(d(f,s,u)){l.push(f);break}b&&($=w,N=++n)}r&&((f=!d&&f)&&m--,i&&v.push(f))}if(m+=y,r&&y!==m){for(p=0;d=t[p];p++)d(v,h,s,u);if(i){if(m>0)for(;y--;)v[y]||h[y]||(h[y]=G.call(l));h=g(h)}Q.apply(l,h),b&&!i&&h.length>0&&m+t.length>1&&a.uniqueSort(l)}return b&&($=w,j=x),v};return r?i(s):s}function b(e,t,n){for(var r=0,i=t.length;i>r;r++)a(e,t[r],n);return n}function x(e,t,n,r){var i,o,a,s,u,l=f(e);if(!r&&1===l.length){if(o=l[0]=l[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&!M&&C.relative[o[1].type]){if(t=C.find.ID(a.matches[0].replace(xt,Tt),t)[0],!t)return n;e=e.slice(o.shift().value.length)}for(i=pt.needsContext.test(e)?-1:o.length-1;i>=0&&(a=o[i],!C.relative[s=a.type]);i--)if((u=C.find[s])&&(r=u(a.matches[0].replace(xt,Tt),dt.test(o[0].type)&&t.parentNode||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return Q.apply(n,K.call(r,0)),n;break}}return S(e,l)(r,t,M,n,dt.test(e)),n}function T(){}var w,N,C,k,E,S,A,j,D,L,H,M,q,_,F,O,B,P="sizzle"+-new Date,R=e.document,W={},$=0,I=0,z=r(),X=r(),U=r(),V=typeof t,Y=1<<31,J=[],G=J.pop,Q=J.push,K=J.slice,Z=J.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},et="[\\x20\\t\\r\\n\\f]",tt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",nt=tt.replace("w","w#"),rt="([*^$|!~]?=)",it="\\["+et+"*("+tt+")"+et+"*(?:"+rt+et+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+nt+")|)|)"+et+"*\\]",ot=":("+tt+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+it.replace(3,8)+")*)|.*)\\)|)",at=RegExp("^"+et+"+|((?:^|[^\\\\])(?:\\\\.)*)"+et+"+$","g"),ut=RegExp("^"+et+"*,"+et+"*"),lt=RegExp("^"+et+"*([\\x20\\t\\r\\n\\f>+~])"+et+"*"),ct=RegExp(ot),ft=RegExp("^"+nt+"$"),pt={ID:RegExp("^#("+tt+")"),CLASS:RegExp("^\\.("+tt+")"),NAME:RegExp("^\\[name=['\"]?("+tt+")['\"]?\\]"),TAG:RegExp("^("+tt.replace("w","w*")+")"),ATTR:RegExp("^"+it),PSEUDO:RegExp("^"+ot),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+et+"*(even|odd|(([+-]|)(\\d*)n|)"+et+"*(?:([+-]|)"+et+"*(\\d+)|))"+et+"*\\)|)","i"),needsContext:RegExp("^"+et+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+et+"*((?:-\\d)?\\d*)"+et+"*\\)|)(?=[^-]|$)","i")},dt=/[\x20\t\r\n\f]*[+~]/,ht=/\{\s*\[native code\]\s*\}/,gt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,mt=/^(?:input|select|textarea|button)$/i,yt=/^h\d$/i,vt=/'|\\/g,bt=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,xt=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,Tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{K.call(H.childNodes,0)[0].nodeType}catch(wt){K=function(e){for(var t,n=[];t=this[e];e++)n.push(t);return n}}E=a.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},D=a.setDocument=function(e){var r=e?e.ownerDocument||e:R;return r!==L&&9===r.nodeType&&r.documentElement?(L=r,H=r.documentElement,M=E(r),W.tagNameNoComments=o(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),W.attributes=o(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),W.getByClassName=o(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),W.getByName=o(function(e){e.id=P+0,e.innerHTML="<a name='"+P+"'></a><div name='"+P+"'></div>",H.insertBefore(e,H.firstChild);var t=r.getElementsByName&&r.getElementsByName(P).length===2+r.getElementsByName(P+0).length;return W.getIdNotName=!r.getElementById(P),H.removeChild(e),t}),C.attrHandle=o(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==V&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},W.getIdNotName?(C.find.ID=function(e,t){if(typeof t.getElementById!==V&&!M){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){return e.getAttribute("id")===t}}):(C.find.ID=function(e,n){if(typeof n.getElementById!==V&&!M){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==V&&r.getAttributeNode("id").value===e?[r]:t:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){var n=typeof e.getAttributeNode!==V&&e.getAttributeNode("id");return n&&n.value===t}}),C.find.TAG=W.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==V?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i];i++)1===n.nodeType&&r.push(n);return r}return o},C.find.NAME=W.getByName&&function(e,n){return typeof n.getElementsByName!==V?n.getElementsByName(name):t},C.find.CLASS=W.getByClassName&&function(e,n){return typeof n.getElementsByClassName===V||M?t:n.getElementsByClassName(e)},_=[],q=[":focus"],(W.qsa=n(r.querySelectorAll))&&(o(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||q.push("\\["+et+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||q.push(":checked")}),o(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&q.push("[*^$]="+et+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),q.push(",.*:")})),(W.matchesSelector=n(F=H.matchesSelector||H.mozMatchesSelector||H.webkitMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&o(function(e){W.disconnectedMatch=F.call(e,"div"),F.call(e,"[s!='']:x"),_.push("!=",ot)}),q=RegExp(q.join("|")),_=RegExp(_.join("|")),O=n(H.contains)||H.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},B=H.compareDocumentPosition?function(e,t){var n;return e===t?(A=!0,0):(n=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&n||e.parentNode&&11===e.parentNode.nodeType?e===r||O(R,e)?-1:t===r||O(R,t)?1:0:4&n?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var n,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];if(e===t)return A=!0,0;if(e.sourceIndex&&t.sourceIndex)return(~t.sourceIndex||Y)-(O(R,e)&&~e.sourceIndex||Y);if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===R?-1:l[i]===R?1:0},A=!1,[0,0].sort(B),W.detectDuplicates=A,L):L},a.matches=function(e,t){return a(e,null,null,t)},a.matchesSelector=function(e,t){if((e.ownerDocument||e)!==L&&D(e),t=t.replace(bt,"='$1']"),!(!W.matchesSelector||M||_&&_.test(t)||q.test(t)))try{var n=F.call(e,t);if(n||W.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return a(t,L,null,[e]).length>0},a.contains=function(e,t){return(e.ownerDocument||e)!==L&&D(e),O(e,t)},a.attr=function(e,t){var n;return(e.ownerDocument||e)!==L&&D(e),M||(t=t.toLowerCase()),(n=C.attrHandle[t])?n(e):M||W.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},a.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},a.uniqueSort=function(e){var t,n=[],r=1,i=0;if(A=!W.detectDuplicates,e.sort(B),A){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));for(;i--;)e.splice(n[i],1)}return e},k=a.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=k(t);return n},C=a.selectors={cacheLength:50,createPseudo:i,match:pt,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xt,Tt),e[3]=(e[4]||e[5]||"").replace(xt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||a.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&a.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return pt.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&ct.test(n)&&(t=f(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(xt,Tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=z[e+" "];return t||(t=RegExp("(^|"+et+")"+e+"("+et+"|$)"))&&z(e,function(e){return t.test(e.className||typeof e.getAttribute!==V&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=a.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.substr(i.length-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(s?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){for(c=m[P]||(m[P]={}),l=c[e]||[],d=l[0]===$&&l[1],p=l[0]===$&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[$,d,p];break}}else if(v&&(l=(t[P]||(t[P]={}))[e])&&l[0]===$)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==y:1!==f.nodeType)||!++p||(v&&((f[P]||(f[P]={}))[e]=[$,p]),f!==t)););return p-=i,p===r||0===p%r&&p/r>=0}}},PSEUDO:function(e,t){var n,r=C.pseudos[e]||C.setFilters[e.toLowerCase()]||a.error("unsupported pseudo: "+e);return r[P]?r(t):r.length>1?(n=[e,e,"",t],C.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,n){for(var i,o=r(e,t),a=o.length;a--;)i=Z.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:i(function(e){var t=[],n=[],r=S(e.replace(at,"$1"));return r[P]?i(function(e,t,n,i){for(var o,a=r(e,null,i,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:i(function(e){return function(t){return a(e,t).length>0}}),contains:i(function(e){return function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:i(function(e){return ft.test(e||"")||a.error("unsupported lang: "+e),e=e.replace(xt,Tt).toLowerCase(),function(t){var n;do if(n=M?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===L.activeElement&&(!L.hasFocus||L.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return yt.test(e.nodeName)},input:function(e){return mt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;t>++r;)e.push(r);return e})}};for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=u(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=l(w);S=a.compile=function(e,t){var n,r=[],i=[],o=U[e+" "];if(!o){for(t||(t=f(e)),n=t.length;n--;)o=y(t[n]),o[P]?r.push(o):i.push(o);o=U(e,v(i,r))}return o},C.pseudos.nth=C.pseudos.eq,C.filters=T.prototype=C.pseudos,C.setFilters=new T,D(),a.attr=st.attr,st.find=a,st.expr=a.selectors,st.expr[":"]=st.expr.pseudos,st.unique=a.uniqueSort,st.text=a.getText,st.isXMLDoc=a.isXML,st.contains=a.contains}(e);var Pt=/Until$/,Rt=/^(?:parents|prev(?:Until|All))/,Wt=/^.[^:#\[\.,]*$/,$t=st.expr.match.needsContext,It={children:!0,contents:!0,next:!0,prev:!0};st.fn.extend({find:function(e){var t,n,r;if("string"!=typeof e)return r=this,this.pushStack(st(e).filter(function(){for(t=0;r.length>t;t++)if(st.contains(r[t],this))return!0}));for(n=[],t=0;this.length>t;t++)st.find(e,this[t],n);return n=this.pushStack(st.unique(n)),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=st(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(st.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(f(this,e,!1))},filter:function(e){return this.pushStack(f(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?$t.test(e)?st(e,this.context).index(this[0])>=0:st.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){for(var n,r=0,i=this.length,o=[],a=$t.test(e)||"string"!=typeof e?st(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n.ownerDocument&&n!==t&&11!==n.nodeType;){if(a?a.index(n)>-1:st.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}return this.pushStack(o.length>1?st.unique(o):o)},index:function(e){return e?"string"==typeof e?st.inArray(this[0],st(e)):st.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?st(e,t):st.makeArray(e&&e.nodeType?[e]:e),r=st.merge(this.get(),n);return this.pushStack(st.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),st.fn.andSelf=st.fn.addBack,st.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return st.dir(e,"parentNode")},parentsUntil:function(e,t,n){return st.dir(e,"parentNode",n)},next:function(e){return c(e,"nextSibling")},prev:function(e){return c(e,"previousSibling")
},nextAll:function(e){return st.dir(e,"nextSibling")},prevAll:function(e){return st.dir(e,"previousSibling")},nextUntil:function(e,t,n){return st.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return st.dir(e,"previousSibling",n)},siblings:function(e){return st.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return st.sibling(e.firstChild)},contents:function(e){return st.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:st.merge([],e.childNodes)}},function(e,t){st.fn[e]=function(n,r){var i=st.map(this,t,n);return Pt.test(e)||(r=n),r&&"string"==typeof r&&(i=st.filter(r,i)),i=this.length>1&&!It[e]?st.unique(i):i,this.length>1&&Rt.test(e)&&(i=i.reverse()),this.pushStack(i)}}),st.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?st.find.matchesSelector(t[0],e)?[t[0]]:[]:st.find.matches(e,t)},dir:function(e,n,r){for(var i=[],o=e[n];o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!st(o).is(r));)1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});var zt="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Xt=/ jQuery\d+="(?:null|\d+)"/g,Ut=RegExp("<(?:"+zt+")[\\s/>]","i"),Vt=/^\s+/,Yt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Jt=/<([\w:]+)/,Gt=/<tbody/i,Qt=/<|&#?\w+;/,Kt=/<(?:script|style|link)/i,Zt=/^(?:checkbox|radio)$/i,en=/checked\s*(?:[^=]|=\s*.checked.)/i,tn=/^$|\/(?:java|ecma)script/i,nn=/^true\/(.*)/,rn=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,on={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:st.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},an=p(V),sn=an.appendChild(V.createElement("div"));on.optgroup=on.option,on.tbody=on.tfoot=on.colgroup=on.caption=on.thead,on.th=on.td,st.fn.extend({text:function(e){return st.access(this,function(e){return e===t?st.text(this):this.empty().append((this[0]&&this[0].ownerDocument||V).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(st.isFunction(e))return this.each(function(t){st(this).wrapAll(e.call(this,t))});if(this[0]){var t=st(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return st.isFunction(e)?this.each(function(t){st(this).wrapInner(e.call(this,t))}):this.each(function(){var t=st(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=st.isFunction(e);return this.each(function(n){st(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){st.nodeName(this,"body")||st(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=0;null!=(n=this[r]);r++)(!e||st.filter(e,[n]).length>0)&&(t||1!==n.nodeType||st.cleanData(b(n)),n.parentNode&&(t&&st.contains(n.ownerDocument,n)&&m(b(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&st.cleanData(b(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&st.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return st.clone(this,e,t)})},html:function(e){return st.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(Xt,""):t;if(!("string"!=typeof e||Kt.test(e)||!st.support.htmlSerialize&&Ut.test(e)||!st.support.leadingWhitespace&&Vt.test(e)||on[(Jt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(Yt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(st.cleanData(b(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=st.isFunction(e);return t||"string"==typeof e||(e=st(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;(n&&1===this.nodeType||11===this.nodeType)&&(st(this).remove(),t?t.parentNode.insertBefore(e,t):n.appendChild(e))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=et.apply([],e);var i,o,a,s,u,l,c=0,f=this.length,p=this,m=f-1,y=e[0],v=st.isFunction(y);if(v||!(1>=f||"string"!=typeof y||st.support.checkClone)&&en.test(y))return this.each(function(i){var o=p.eq(i);v&&(e[0]=y.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(f&&(i=st.buildFragment(e,this[0].ownerDocument,!1,this),o=i.firstChild,1===i.childNodes.length&&(i=o),o)){for(n=n&&st.nodeName(o,"tr"),a=st.map(b(i,"script"),h),s=a.length;f>c;c++)u=i,c!==m&&(u=st.clone(u,!0,!0),s&&st.merge(a,b(u,"script"))),r.call(n&&st.nodeName(this[c],"table")?d(this[c],"tbody"):this[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,st.map(a,g),c=0;s>c;c++)u=a[c],tn.test(u.type||"")&&!st._data(u,"globalEval")&&st.contains(l,u)&&(u.src?st.ajax({url:u.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):st.globalEval((u.text||u.textContent||u.innerHTML||"").replace(rn,"")));i=o=null}return this}}),st.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){st.fn[e]=function(e){for(var n,r=0,i=[],o=st(e),a=o.length-1;a>=r;r++)n=r===a?this:this.clone(!0),st(o[r])[t](n),tt.apply(i,n.get());return this.pushStack(i)}}),st.extend({clone:function(e,t,n){var r,i,o,a,s,u=st.contains(e.ownerDocument,e);if(st.support.html5Clone||st.isXMLDoc(e)||!Ut.test("<"+e.nodeName+">")?s=e.cloneNode(!0):(sn.innerHTML=e.outerHTML,sn.removeChild(s=sn.firstChild)),!(st.support.noCloneEvent&&st.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||st.isXMLDoc(e)))for(r=b(s),i=b(e),a=0;null!=(o=i[a]);++a)r[a]&&v(o,r[a]);if(t)if(n)for(i=i||b(e),r=r||b(s),a=0;null!=(o=i[a]);a++)y(o,r[a]);else y(e,s);return r=b(s,"script"),r.length>0&&m(r,!u&&b(e,"script")),r=i=o=null,s},buildFragment:function(e,t,n,r){for(var i,o,a,s,u,l,c,f=e.length,d=p(t),h=[],g=0;f>g;g++)if(o=e[g],o||0===o)if("object"===st.type(o))st.merge(h,o.nodeType?[o]:o);else if(Qt.test(o)){for(s=s||d.appendChild(t.createElement("div")),a=(Jt.exec(o)||["",""])[1].toLowerCase(),u=on[a]||on._default,s.innerHTML=u[1]+o.replace(Yt,"<$1></$2>")+u[2],c=u[0];c--;)s=s.lastChild;if(!st.support.leadingWhitespace&&Vt.test(o)&&h.push(t.createTextNode(Vt.exec(o)[0])),!st.support.tbody)for(o="table"!==a||Gt.test(o)?"<table>"!==u[1]||Gt.test(o)?0:s:s.firstChild,c=o&&o.childNodes.length;c--;)st.nodeName(l=o.childNodes[c],"tbody")&&!l.childNodes.length&&o.removeChild(l);for(st.merge(h,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=d.lastChild}else h.push(t.createTextNode(o));for(s&&d.removeChild(s),st.support.appendChecked||st.grep(b(h,"input"),x),g=0;o=h[g++];)if((!r||-1===st.inArray(o,r))&&(i=st.contains(o.ownerDocument,o),s=b(d.appendChild(o),"script"),i&&m(s),n))for(c=0;o=s[c++];)tn.test(o.type||"")&&n.push(o);return s=null,d},cleanData:function(e,n){for(var r,i,o,a,s=0,u=st.expando,l=st.cache,c=st.support.deleteExpando,f=st.event.special;null!=(o=e[s]);s++)if((n||st.acceptData(o))&&(i=o[u],r=i&&l[i])){if(r.events)for(a in r.events)f[a]?st.event.remove(o,a):st.removeEvent(o,a,r.handle);l[i]&&(delete l[i],c?delete o[u]:o.removeAttribute!==t?o.removeAttribute(u):o[u]=null,K.push(i))}}});var un,ln,cn,fn=/alpha\([^)]*\)/i,pn=/opacity\s*=\s*([^)]*)/,dn=/^(top|right|bottom|left)$/,hn=/^(none|table(?!-c[ea]).+)/,gn=/^margin/,mn=RegExp("^("+ut+")(.*)$","i"),yn=RegExp("^("+ut+")(?!px)[a-z%]+$","i"),vn=RegExp("^([+-])=("+ut+")","i"),bn={BODY:"block"},xn={position:"absolute",visibility:"hidden",display:"block"},Tn={letterSpacing:0,fontWeight:400},wn=["Top","Right","Bottom","Left"],Nn=["Webkit","O","Moz","ms"];st.fn.extend({css:function(e,n){return st.access(this,function(e,n,r){var i,o,a={},s=0;if(st.isArray(n)){for(i=ln(e),o=n.length;o>s;s++)a[n[s]]=st.css(e,n[s],!1,i);return a}return r!==t?st.style(e,n,r):st.css(e,n)},e,n,arguments.length>1)},show:function(){return N(this,!0)},hide:function(){return N(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:w(this))?st(this).show():st(this).hide()})}}),st.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=un(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":st.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=st.camelCase(n),l=e.style;if(n=st.cssProps[u]||(st.cssProps[u]=T(l,u)),s=st.cssHooks[n]||st.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=vn.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(st.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||st.cssNumber[u]||(r+="px"),st.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=st.camelCase(n);return n=st.cssProps[u]||(st.cssProps[u]=T(e.style,u)),s=st.cssHooks[n]||st.cssHooks[u],s&&"get"in s&&(o=s.get(e,!0,r)),o===t&&(o=un(e,n,i)),"normal"===o&&n in Tn&&(o=Tn[n]),r?(a=parseFloat(o),r===!0||st.isNumeric(a)?a||0:o):o},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(ln=function(t){return e.getComputedStyle(t,null)},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||st.contains(e.ownerDocument,e)||(u=st.style(e,n)),yn.test(u)&&gn.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):V.documentElement.currentStyle&&(ln=function(e){return e.currentStyle},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),yn.test(u)&&!dn.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u}),st.each(["height","width"],function(e,n){st.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&hn.test(st.css(e,"display"))?st.swap(e,xn,function(){return E(e,n,i)}):E(e,n,i):t},set:function(e,t,r){var i=r&&ln(e);return C(e,t,r?k(e,n,r,st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,i),i):0)}}}),st.support.opacity||(st.cssHooks.opacity={get:function(e,t){return pn.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=st.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===st.trim(o.replace(fn,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=fn.test(o)?o.replace(fn,i):o+" "+i)}}),st(function(){st.support.reliableMarginRight||(st.cssHooks.marginRight={get:function(e,n){return n?st.swap(e,{display:"inline-block"},un,[e,"marginRight"]):t}}),!st.support.pixelPosition&&st.fn.position&&st.each(["top","left"],function(e,n){st.cssHooks[n]={get:function(e,r){return r?(r=un(e,n),yn.test(r)?st(e).position()[n]+"px":r):t}}})}),st.expr&&st.expr.filters&&(st.expr.filters.hidden=function(e){return 0===e.offsetWidth&&0===e.offsetHeight||!st.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||st.css(e,"display"))},st.expr.filters.visible=function(e){return!st.expr.filters.hidden(e)}),st.each({margin:"",padding:"",border:"Width"},function(e,t){st.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+wn[r]+t]=o[r]||o[r-2]||o[0];return i}},gn.test(e)||(st.cssHooks[e+t].set=C)});var Cn=/%20/g,kn=/\[\]$/,En=/\r?\n/g,Sn=/^(?:submit|button|image|reset)$/i,An=/^(?:input|select|textarea|keygen)/i;st.fn.extend({serialize:function(){return st.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=st.prop(this,"elements");return e?st.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!st(this).is(":disabled")&&An.test(this.nodeName)&&!Sn.test(e)&&(this.checked||!Zt.test(e))}).map(function(e,t){var n=st(this).val();return null==n?null:st.isArray(n)?st.map(n,function(e){return{name:t.name,value:e.replace(En,"\r\n")}}):{name:t.name,value:n.replace(En,"\r\n")}}).get()}}),st.param=function(e,n){var r,i=[],o=function(e,t){t=st.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=st.ajaxSettings&&st.ajaxSettings.traditional),st.isArray(e)||e.jquery&&!st.isPlainObject(e))st.each(e,function(){o(this.name,this.value)});else for(r in e)j(r,e[r],n,o);return i.join("&").replace(Cn,"+")};var jn,Dn,Ln=st.now(),Hn=/\?/,Mn=/#.*$/,qn=/([?&])_=[^&]*/,_n=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Fn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,On=/^(?:GET|HEAD)$/,Bn=/^\/\//,Pn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Rn=st.fn.load,Wn={},$n={},In="*/".concat("*");try{Dn=Y.href}catch(zn){Dn=V.createElement("a"),Dn.href="",Dn=Dn.href}jn=Pn.exec(Dn.toLowerCase())||[],st.fn.load=function(e,n,r){if("string"!=typeof e&&Rn)return Rn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),st.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(o="POST"),s.length>0&&st.ajax({url:e,type:o,dataType:"html",data:n}).done(function(e){a=arguments,s.html(i?st("<div>").append(st.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,a||[e.responseText,t,e])}),this},st.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){st.fn[t]=function(e){return this.on(t,e)}}),st.each(["get","post"],function(e,n){st[n]=function(e,r,i,o){return st.isFunction(r)&&(o=o||i,i=r,r=t),st.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),st.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Dn,type:"GET",isLocal:Fn.test(jn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":In,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":st.parseJSON,"text xml":st.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?H(H(e,st.ajaxSettings),t):H(st.ajaxSettings,e)},ajaxPrefilter:D(Wn),ajaxTransport:D($n),ajax:function(e,n){function r(e,n,r,s){var l,f,v,b,T,N=n;2!==x&&(x=2,u&&clearTimeout(u),i=t,a=s||"",w.readyState=e>0?4:0,r&&(b=M(p,w,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=w.getResponseHeader("Last-Modified"),T&&(st.lastModified[o]=T),T=w.getResponseHeader("etag"),T&&(st.etag[o]=T)),304===e?(l=!0,N="notmodified"):(l=q(p,b),N=l.state,f=l.data,v=l.error,l=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),w.status=e,w.statusText=(n||N)+"",l?g.resolveWith(d,[f,N,w]):g.rejectWith(d,[w,N,v]),w.statusCode(y),y=t,c&&h.trigger(l?"ajaxSuccess":"ajaxError",[w,p,l?f:v]),m.fireWith(d,[w,N]),c&&(h.trigger("ajaxComplete",[w,p]),--st.active||st.event.trigger("ajaxStop")))}"object"==typeof e&&(n=e,e=t),n=n||{};var i,o,a,s,u,l,c,f,p=st.ajaxSetup({},n),d=p.context||p,h=p.context&&(d.nodeType||d.jquery)?st(d):st.event,g=st.Deferred(),m=st.Callbacks("once memory"),y=p.statusCode||{},v={},b={},x=0,T="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=_n.exec(a);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=b[n]=b[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)y[t]=[y[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||T;return i&&i.abort(t),r(0,t),this}};if(g.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,p.url=((e||p.url||Dn)+"").replace(Mn,"").replace(Bn,jn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=st.trim(p.dataType||"*").toLowerCase().match(lt)||[""],null==p.crossDomain&&(l=Pn.exec(p.url.toLowerCase()),p.crossDomain=!(!l||l[1]===jn[1]&&l[2]===jn[2]&&(l[3]||("http:"===l[1]?80:443))==(jn[3]||("http:"===jn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=st.param(p.data,p.traditional)),L(Wn,p,n,w),2===x)return w;c=p.global,c&&0===st.active++&&st.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!On.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(Hn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=qn.test(o)?o.replace(qn,"$1_="+Ln++):o+(Hn.test(o)?"&":"?")+"_="+Ln++)),p.ifModified&&(st.lastModified[o]&&w.setRequestHeader("If-Modified-Since",st.lastModified[o]),st.etag[o]&&w.setRequestHeader("If-None-Match",st.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&w.setRequestHeader("Content-Type",p.contentType),w.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+In+"; q=0.01":""):p.accepts["*"]);for(f in p.headers)w.setRequestHeader(f,p.headers[f]);if(p.beforeSend&&(p.beforeSend.call(d,w,p)===!1||2===x))return w.abort();T="abort";for(f in{success:1,error:1,complete:1})w[f](p[f]);if(i=L($n,p,n,w)){w.readyState=1,c&&h.trigger("ajaxSend",[w,p]),p.async&&p.timeout>0&&(u=setTimeout(function(){w.abort("timeout")},p.timeout));try{x=1,i.send(v,r)}catch(N){if(!(2>x))throw N;r(-1,N)}}else r(-1,"No Transport");return w},getScript:function(e,n){return st.get(e,t,n,"script")},getJSON:function(e,t,n){return st.get(e,t,n,"json")}}),st.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return st.globalEval(e),e}}}),st.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),st.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=V.head||st("head")[0]||V.documentElement;return{send:function(t,i){n=V.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Xn=[],Un=/(=)\?(?=&|$)|\?\?/;st.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xn.pop()||st.expando+"_"+Ln++;return this[e]=!0,e}}),st.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Un.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Un.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=st.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Un,"$1"+o):n.jsonp!==!1&&(n.url+=(Hn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||st.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Xn.push(o)),s&&st.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Vn,Yn,Jn=0,Gn=e.ActiveXObject&&function(){var e;for(e in Vn)Vn[e](t,!0)};st.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&_()||F()}:_,Yn=st.ajaxSettings.xhr(),st.support.cors=!!Yn&&"withCredentials"in Yn,Yn=st.support.ajax=!!Yn,Yn&&st.ajaxTransport(function(n){if(!n.crossDomain||st.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,f,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=st.noop,Gn&&delete Vn[a]),i)4!==u.readyState&&u.abort();else{f={},s=u.status,p=u.responseXML,c=u.getAllResponseHeaders(),p&&p.documentElement&&(f.xml=p),"string"==typeof u.responseText&&(f.text=u.responseText);try{l=u.statusText}catch(d){l=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=f.text?200:404}}catch(h){i||o(-1,h)}f&&o(s,l,f,c)},n.async?4===u.readyState?setTimeout(r):(a=++Jn,Gn&&(Vn||(Vn={},st(e).unload(Gn)),Vn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Qn,Kn,Zn=/^(?:toggle|show|hide)$/,er=RegExp("^(?:([+-])=|)("+ut+")([a-z%]*)$","i"),tr=/queueHooks$/,nr=[W],rr={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=er.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(st.cssNumber[e]?"":"px"),"px"!==r&&s){s=st.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,st.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};st.Animation=st.extend(P,{tweener:function(e,t){st.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],rr[n]=rr[n]||[],rr[n].unshift(t)},prefilter:function(e,t){t?nr.unshift(e):nr.push(e)}}),st.Tween=$,$.prototype={constructor:$,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(st.cssNumber[n]?"":"px")},cur:function(){var e=$.propHooks[this.prop];return e&&e.get?e.get(this):$.propHooks._default.get(this)},run:function(e){var t,n=$.propHooks[this.prop];return this.pos=t=this.options.duration?st.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):$.propHooks._default.set(this),this}},$.prototype.init.prototype=$.prototype,$.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=st.css(e.elem,e.prop,"auto"),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){st.fx.step[e.prop]?st.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[st.cssProps[e.prop]]||st.cssHooks[e.prop])?st.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},$.propHooks.scrollTop=$.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},st.each(["toggle","show","hide"],function(e,t){var n=st.fn[t];st.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(I(t,!0),e,r,i)}}),st.fn.extend({fadeTo:function(e,t,n,r){return this.filter(w).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=st.isEmptyObject(e),o=st.speed(t,n,r),a=function(){var t=P(this,st.extend({},e),o);a.finish=function(){t.stop(!0)},(i||st._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=st.timers,a=st._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&tr.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&st.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=st._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=st.timers,a=r?r.length:0;for(n.finish=!0,st.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),st.each({slideDown:I("show"),slideUp:I("hide"),slideToggle:I("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){st.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),st.speed=function(e,t,n){var r=e&&"object"==typeof e?st.extend({},e):{complete:n||!n&&t||st.isFunction(e)&&e,duration:e,easing:n&&t||t&&!st.isFunction(t)&&t};return r.duration=st.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in st.fx.speeds?st.fx.speeds[r.duration]:st.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){st.isFunction(r.old)&&r.old.call(this),r.queue&&st.dequeue(this,r.queue)},r},st.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},st.timers=[],st.fx=$.prototype.init,st.fx.tick=function(){var e,n=st.timers,r=0;for(Qn=st.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||st.fx.stop(),Qn=t},st.fx.timer=function(e){e()&&st.timers.push(e)&&st.fx.start()},st.fx.interval=13,st.fx.start=function(){Kn||(Kn=setInterval(st.fx.tick,st.fx.interval))},st.fx.stop=function(){clearInterval(Kn),Kn=null},st.fx.speeds={slow:600,fast:200,_default:400},st.fx.step={},st.expr&&st.expr.filters&&(st.expr.filters.animated=function(e){return st.grep(st.timers,function(t){return e===t.elem}).length}),st.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){st.offset.setOffset(this,e,t)});var n,r,i={top:0,left:0},o=this[0],a=o&&o.ownerDocument;if(a)return n=a.documentElement,st.contains(n,o)?(o.getBoundingClientRect!==t&&(i=o.getBoundingClientRect()),r=z(a),{top:i.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:i.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):i},st.offset={setOffset:function(e,t,n){var r=st.css(e,"position");"static"===r&&(e.style.position="relative");var i,o,a=st(e),s=a.offset(),u=st.css(e,"top"),l=st.css(e,"left"),c=("absolute"===r||"fixed"===r)&&st.inArray("auto",[u,l])>-1,f={},p={};c?(p=a.position(),i=p.top,o=p.left):(i=parseFloat(u)||0,o=parseFloat(l)||0),st.isFunction(t)&&(t=t.call(e,n,s)),null!=t.top&&(f.top=t.top-s.top+i),null!=t.left&&(f.left=t.left-s.left+o),"using"in t?t.using.call(e,f):a.css(f)}},st.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===st.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),st.nodeName(e[0],"html")||(n=e.offset()),n.top+=st.css(e[0],"borderTopWidth",!0),n.left+=st.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-st.css(r,"marginTop",!0),left:t.left-n.left-st.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||V.documentElement;e&&!st.nodeName(e,"html")&&"static"===st.css(e,"position");)e=e.offsetParent;return e||V.documentElement})}}),st.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);st.fn[e]=function(i){return st.access(this,function(e,i,o){var a=z(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?st(a).scrollLeft():o,r?o:st(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}}),st.each({Height:"height",Width:"width"},function(e,n){st.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){st.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return st.access(this,function(n,r,i){var o;return st.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?st.css(n,r,s):st.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=st,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return st})})(window);

})(window)
},{}],3:[function(require,module,exports){/**
 * Returns a description of this date in relative terms.

 * Examples, where new Date().toString() == "Mon Nov 23 2009 17:36:51 GMT-0500 (EST)":
 *
 * new Date().toRelativeTime()
 * --> 'Just now'
 *
 * new Date("Nov 21, 2009").toRelativeTime()
 * --> '2 days ago'
 *
 * new Date("Nov 25, 2009").toRelativeTime()
 * --> '2 days from now'
 *
 * // One second ago
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime()
 * --> '1 second ago'
 *
 * toRelativeTime() takes an optional argument - a configuration object.
 * It can have the following properties:
 * - now - Date object that defines "now" for the purpose of conversion.
 *         By default, current date & time is used (i.e. new Date())
 * - nowThreshold - Threshold in milliseconds which is considered "Just now"
 *                  for times in the past or "Right now" for now or the immediate future
 * - smartDays - If enabled, dates within a week of now will use Today/Yesterday/Tomorrow
 *               or weekdays along with time, e.g. "Thursday at 15:10:34"
 *               rather than "4 days ago" or "Tomorrow at 20:12:01"
 *               instead of "1 day from now"
 *
 * If a single number is given as argument, it is interpreted as nowThreshold:
 *
 * // One second ago, now setting a now_threshold to 5 seconds
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime(5000)
 * --> 'Just now'
 *
 * // One second in the future, now setting a now_threshold to 5 seconds
 * new Date("Nov 23 2009 17:36:52 GMT-0500 (EST)").toRelativeTime(5000)
 * --> 'Right now'
 *
 */
 Date.prototype.toRelativeTime = (function() {

  var _ = function(options) {
    var opts = processOptions(options);

    var now = opts.now || new Date();
    var delta = now - this;
    var future = (delta <= 0);
    delta = Math.abs(delta);

    // special cases controlled by options
    if (delta <= opts.nowThreshold) {
      return future ? 'Right now' : 'Just now';
    }
    if (opts.smartDays && delta <= 6 * MS_IN_DAY) {
      return toSmartDays(this, now);
    }

    var units = null;
    for (var key in CONVERSIONS) {
      if (delta < CONVERSIONS[key])
        break;
      units = key; // keeps track of the selected key over the iteration
      delta = delta / CONVERSIONS[key];
    }

    // pluralize a unit when the difference is greater than 1.
    delta = Math.floor(delta);
    if (delta !== 1) { units += "s"; }
    return [delta, units, future ? "from now" : "ago"].join(" ");
  };

  var processOptions = function(arg) {
    if (!arg) arg = 0;
    if (typeof arg === 'string') {
      arg = parseInt(arg, 10);
    }
    if (typeof arg === 'number') {
      if (isNaN(arg)) arg = 0;
      return {nowThreshold: arg};
    }
    return arg;
  };

  var toSmartDays = function(date, now) {
    var day;
    var weekday = date.getDay(),
        dayDiff = weekday - now.getDay();
    if (dayDiff == 0)       day = 'Today';
    else if (dayDiff == -1) day = 'Yesterday';
    else if (dayDiff == 1 && date > now)  day = 'Tomorrow';
    else                    day = WEEKDAYS[weekday];
    return day + " at " + date.toLocaleTimeString();
  };

  var CONVERSIONS = {
    millisecond: 1, // ms    -> ms
    second: 1000,   // ms    -> sec
    minute: 60,     // sec   -> min
    hour:   60,     // min   -> hour
    day:    24,     // hour  -> day
    month:  30,     // day   -> month (roughly)
    year:   12      // month -> year
  };
  var MS_IN_DAY = (CONVERSIONS.millisecond * CONVERSIONS.second * CONVERSIONS.minute * CONVERSIONS.hour * CONVERSIONS.day);

  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return _;

})();



/*
 * Wraps up a common pattern used with this plugin whereby you take a String
 * representation of a Date, and want back a date object.
 */
Date.fromString = function(str) {
  return new Date(Date.parse(str));
};

},{}],4:[function(require,module,exports){// Knockout JavaScript library v2.2.1
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {function j(w){throw w;}var m=!0,p=null,r=!1;function u(w){return function(){return w}};var x=window,y=document,ga=navigator,F=window.jQuery,I=void 0;
function L(w){function ha(a,d,c,e,f){var g=[];a=b.j(function(){var a=d(c,f)||[];0<g.length&&(b.a.Ya(M(g),a),e&&b.r.K(e,p,[c,a,f]));g.splice(0,g.length);b.a.P(g,a)},p,{W:a,Ka:function(){return 0==g.length||!b.a.X(g[0])}});return{M:g,j:a.pa()?a:I}}function M(a){for(;a.length&&!b.a.X(a[0]);)a.splice(0,1);if(1<a.length){for(var d=a[0],c=a[a.length-1],e=[d];d!==c;){d=d.nextSibling;if(!d)return;e.push(d)}Array.prototype.splice.apply(a,[0,a.length].concat(e))}return a}function S(a,b,c,e,f){var g=Math.min,
h=Math.max,k=[],l,n=a.length,q,s=b.length,v=s-n||1,G=n+s+1,J,A,z;for(l=0;l<=n;l++){A=J;k.push(J=[]);z=g(s,l+v);for(q=h(0,l-1);q<=z;q++)J[q]=q?l?a[l-1]===b[q-1]?A[q-1]:g(A[q]||G,J[q-1]||G)+1:q+1:l+1}g=[];h=[];v=[];l=n;for(q=s;l||q;)s=k[l][q]-1,q&&s===k[l][q-1]?h.push(g[g.length]={status:c,value:b[--q],index:q}):l&&s===k[l-1][q]?v.push(g[g.length]={status:e,value:a[--l],index:l}):(g.push({status:"retained",value:b[--q]}),--l);if(h.length&&v.length){a=10*n;var t;for(b=c=0;(f||b<a)&&(t=h[c]);c++){for(e=
0;k=v[e];e++)if(t.value===k.value){t.moved=k.index;k.moved=t.index;v.splice(e,1);b=e=0;break}b+=e}}return g.reverse()}function T(a,d,c,e,f){f=f||{};var g=a&&N(a),g=g&&g.ownerDocument,h=f.templateEngine||O;b.za.vb(c,h,g);c=h.renderTemplate(c,e,f,g);("number"!=typeof c.length||0<c.length&&"number"!=typeof c[0].nodeType)&&j(Error("Template engine must return an array of DOM nodes"));g=r;switch(d){case "replaceChildren":b.e.N(a,c);g=m;break;case "replaceNode":b.a.Ya(a,c);g=m;break;case "ignoreTargetNode":break;
default:j(Error("Unknown renderMode: "+d))}g&&(U(c,e),f.afterRender&&b.r.K(f.afterRender,p,[c,e.$data]));return c}function N(a){return a.nodeType?a:0<a.length?a[0]:p}function U(a,d){if(a.length){var c=a[0],e=a[a.length-1];V(c,e,function(a){b.Da(d,a)});V(c,e,function(a){b.s.ib(a,[d])})}}function V(a,d,c){var e;for(d=b.e.nextSibling(d);a&&(e=a)!==d;)a=b.e.nextSibling(e),(1===e.nodeType||8===e.nodeType)&&c(e)}function W(a,d,c){a=b.g.aa(a);for(var e=b.g.Q,f=0;f<a.length;f++){var g=a[f].key;if(e.hasOwnProperty(g)){var h=
e[g];"function"===typeof h?(g=h(a[f].value))&&j(Error(g)):h||j(Error("This template engine does not support the '"+g+"' binding within its templates"))}}a="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+b.g.ba(a)+" } })()})";return c.createJavaScriptEvaluatorBlock(a)+d}function X(a,d,c,e){function f(a){return function(){return k[a]}}function g(){return k}var h=0,k,l;b.j(function(){var n=c&&c instanceof b.z?c:new b.z(b.a.d(c)),q=n.$data;e&&b.eb(a,n);if(k=("function"==typeof d?
d(n,a):d)||b.J.instance.getBindings(a,n)){if(0===h){h=1;for(var s in k){var v=b.c[s];v&&8===a.nodeType&&!b.e.I[s]&&j(Error("The binding '"+s+"' cannot be used with virtual elements"));if(v&&"function"==typeof v.init&&(v=(0,v.init)(a,f(s),g,q,n))&&v.controlsDescendantBindings)l!==I&&j(Error("Multiple bindings ("+l+" and "+s+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")),l=s}h=2}if(2===h)for(s in k)(v=b.c[s])&&"function"==
typeof v.update&&(0,v.update)(a,f(s),g,q,n)}},p,{W:a});return{Nb:l===I}}function Y(a,d,c){var e=m,f=1===d.nodeType;f&&b.e.Ta(d);if(f&&c||b.J.instance.nodeHasBindings(d))e=X(d,p,a,c).Nb;e&&Z(a,d,!f)}function Z(a,d,c){for(var e=b.e.firstChild(d);d=e;)e=b.e.nextSibling(d),Y(a,d,c)}function $(a,b){var c=aa(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:p}function aa(a,b){for(var c=a,e=1,f=[];c=c.nextSibling;){if(H(c)&&(e--,0===e))return f;f.push(c);B(c)&&e++}b||j(Error("Cannot find closing comment tag to match: "+
a.nodeValue));return p}function H(a){return 8==a.nodeType&&(K?a.text:a.nodeValue).match(ia)}function B(a){return 8==a.nodeType&&(K?a.text:a.nodeValue).match(ja)}function P(a,b){for(var c=p;a!=c;)c=a,a=a.replace(ka,function(a,c){return b[c]});return a}function la(){var a=[],d=[];this.save=function(c,e){var f=b.a.i(a,c);0<=f?d[f]=e:(a.push(c),d.push(e))};this.get=function(c){c=b.a.i(a,c);return 0<=c?d[c]:I}}function ba(a,b,c){function e(e){var g=b(a[e]);switch(typeof g){case "boolean":case "number":case "string":case "function":f[e]=
g;break;case "object":case "undefined":var h=c.get(g);f[e]=h!==I?h:ba(g,b,c)}}c=c||new la;a=b(a);if(!("object"==typeof a&&a!==p&&a!==I&&!(a instanceof Date)))return a;var f=a instanceof Array?[]:{};c.save(a,f);var g=a;if(g instanceof Array){for(var h=0;h<g.length;h++)e(h);"function"==typeof g.toJSON&&e("toJSON")}else for(h in g)e(h);return f}function ca(a,d){if(a)if(8==a.nodeType){var c=b.s.Ua(a.nodeValue);c!=p&&d.push({sb:a,Fb:c})}else if(1==a.nodeType)for(var c=0,e=a.childNodes,f=e.length;c<f;c++)ca(e[c],
d)}function Q(a,d,c,e){b.c[a]={init:function(a){b.a.f.set(a,da,{});return{controlsDescendantBindings:m}},update:function(a,g,h,k,l){h=b.a.f.get(a,da);g=b.a.d(g());k=!c!==!g;var n=!h.Za;if(n||d||k!==h.qb)n&&(h.Za=b.a.Ia(b.e.childNodes(a),m)),k?(n||b.e.N(a,b.a.Ia(h.Za)),b.Ea(e?e(l,g):l,a)):b.e.Y(a),h.qb=k}};b.g.Q[a]=r;b.e.I[a]=m}function ea(a,d,c){c&&d!==b.k.q(a)&&b.k.T(a,d);d!==b.k.q(a)&&b.r.K(b.a.Ba,p,[a,"change"])}var b="undefined"!==typeof w?w:{};b.b=function(a,d){for(var c=a.split("."),e=b,f=0;f<
c.length-1;f++)e=e[c[f]];e[c[c.length-1]]=d};b.p=function(a,b,c){a[b]=c};b.version="2.2.1";b.b("version",b.version);b.a=new function(){function a(a,d){if("input"!==b.a.u(a)||!a.type||"click"!=d.toLowerCase())return r;var c=a.type;return"checkbox"==c||"radio"==c}var d=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,c={},e={};c[/Firefox\/2/i.test(ga.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];c.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
for(var f in c){var g=c[f];if(g.length)for(var h=0,k=g.length;h<k;h++)e[g[h]]=f}var l={propertychange:m},n,c=3;f=y.createElement("div");for(g=f.getElementsByTagName("i");f.innerHTML="\x3c!--[if gt IE "+ ++c+"]><i></i><![endif]--\x3e",g[0];);n=4<c?c:I;return{Na:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],o:function(a,b){for(var d=0,c=a.length;d<c;d++)b(a[d])},i:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var d=0,c=a.length;d<
c;d++)if(a[d]===b)return d;return-1},lb:function(a,b,d){for(var c=0,e=a.length;c<e;c++)if(b.call(d,a[c]))return a[c];return p},ga:function(a,d){var c=b.a.i(a,d);0<=c&&a.splice(c,1)},Ga:function(a){a=a||[];for(var d=[],c=0,e=a.length;c<e;c++)0>b.a.i(d,a[c])&&d.push(a[c]);return d},V:function(a,b){a=a||[];for(var d=[],c=0,e=a.length;c<e;c++)d.push(b(a[c]));return d},fa:function(a,b){a=a||[];for(var d=[],c=0,e=a.length;c<e;c++)b(a[c])&&d.push(a[c]);return d},P:function(a,b){if(b instanceof Array)a.push.apply(a,
b);else for(var d=0,c=b.length;d<c;d++)a.push(b[d]);return a},extend:function(a,b){if(b)for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);return a},ka:function(a){for(;a.firstChild;)b.removeNode(a.firstChild)},Hb:function(a){a=b.a.L(a);for(var d=y.createElement("div"),c=0,e=a.length;c<e;c++)d.appendChild(b.A(a[c]));return d},Ia:function(a,d){for(var c=0,e=a.length,g=[];c<e;c++){var f=a[c].cloneNode(m);g.push(d?b.A(f):f)}return g},N:function(a,d){b.a.ka(a);if(d)for(var c=0,e=d.length;c<e;c++)a.appendChild(d[c])},
Ya:function(a,d){var c=a.nodeType?[a]:a;if(0<c.length){for(var e=c[0],g=e.parentNode,f=0,h=d.length;f<h;f++)g.insertBefore(d[f],e);f=0;for(h=c.length;f<h;f++)b.removeNode(c[f])}},bb:function(a,b){7>n?a.setAttribute("selected",b):a.selected=b},D:function(a){return(a||"").replace(d,"")},Rb:function(a,d){for(var c=[],e=(a||"").split(d),f=0,g=e.length;f<g;f++){var h=b.a.D(e[f]);""!==h&&c.push(h)}return c},Ob:function(a,b){a=a||"";return b.length>a.length?r:a.substring(0,b.length)===b},tb:function(a,b){if(b.compareDocumentPosition)return 16==
(b.compareDocumentPosition(a)&16);for(;a!=p;){if(a==b)return m;a=a.parentNode}return r},X:function(a){return b.a.tb(a,a.ownerDocument)},u:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},n:function(b,d,c){var e=n&&l[d];if(!e&&"undefined"!=typeof F){if(a(b,d)){var f=c;c=function(a,b){var d=this.checked;b&&(this.checked=b.nb!==m);f.call(this,a);this.checked=d}}F(b).bind(d,c)}else!e&&"function"==typeof b.addEventListener?b.addEventListener(d,c,r):"undefined"!=typeof b.attachEvent?b.attachEvent("on"+
d,function(a){c.call(b,a)}):j(Error("Browser doesn't support addEventListener or attachEvent"))},Ba:function(b,d){(!b||!b.nodeType)&&j(Error("element must be a DOM node when calling triggerEvent"));if("undefined"!=typeof F){var c=[];a(b,d)&&c.push({nb:b.checked});F(b).trigger(d,c)}else"function"==typeof y.createEvent?"function"==typeof b.dispatchEvent?(c=y.createEvent(e[d]||"HTMLEvents"),c.initEvent(d,m,m,x,0,0,0,0,0,r,r,r,r,0,b),b.dispatchEvent(c)):j(Error("The supplied element doesn't support dispatchEvent")):
"undefined"!=typeof b.fireEvent?(a(b,d)&&(b.checked=b.checked!==m),b.fireEvent("on"+d)):j(Error("Browser doesn't support triggering events"))},d:function(a){return b.$(a)?a():a},ua:function(a){return b.$(a)?a.t():a},da:function(a,d,c){if(d){var e=/[\w-]+/g,f=a.className.match(e)||[];b.a.o(d.match(e),function(a){var d=b.a.i(f,a);0<=d?c||f.splice(d,1):c&&f.push(a)});a.className=f.join(" ")}},cb:function(a,d){var c=b.a.d(d);if(c===p||c===I)c="";if(3===a.nodeType)a.data=c;else{var e=b.e.firstChild(a);
!e||3!=e.nodeType||b.e.nextSibling(e)?b.e.N(a,[y.createTextNode(c)]):e.data=c;b.a.wb(a)}},ab:function(a,b){a.name=b;if(7>=n)try{a.mergeAttributes(y.createElement("<input name='"+a.name+"'/>"),r)}catch(d){}},wb:function(a){9<=n&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},ub:function(a){if(9<=n){var b=a.style.width;a.style.width=0;a.style.width=b}},Lb:function(a,d){a=b.a.d(a);d=b.a.d(d);for(var c=[],e=a;e<=d;e++)c.push(e);return c},L:function(a){for(var b=[],d=0,c=a.length;d<
c;d++)b.push(a[d]);return b},Pb:6===n,Qb:7===n,Z:n,Oa:function(a,d){for(var c=b.a.L(a.getElementsByTagName("input")).concat(b.a.L(a.getElementsByTagName("textarea"))),e="string"==typeof d?function(a){return a.name===d}:function(a){return d.test(a.name)},f=[],g=c.length-1;0<=g;g--)e(c[g])&&f.push(c[g]);return f},Ib:function(a){return"string"==typeof a&&(a=b.a.D(a))?x.JSON&&x.JSON.parse?x.JSON.parse(a):(new Function("return "+a))():p},xa:function(a,d,c){("undefined"==typeof JSON||"undefined"==typeof JSON.stringify)&&
j(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js"));return JSON.stringify(b.a.d(a),d,c)},Jb:function(a,d,c){c=c||{};var e=c.params||{},f=c.includeFields||this.Na,g=a;if("object"==typeof a&&"form"===b.a.u(a))for(var g=a.action,h=f.length-1;0<=h;h--)for(var k=b.a.Oa(a,f[h]),l=k.length-1;0<=l;l--)e[k[l].name]=k[l].value;d=b.a.d(d);var n=y.createElement("form");
n.style.display="none";n.action=g;n.method="post";for(var w in d)a=y.createElement("input"),a.name=w,a.value=b.a.xa(b.a.d(d[w])),n.appendChild(a);for(w in e)a=y.createElement("input"),a.name=w,a.value=e[w],n.appendChild(a);y.body.appendChild(n);c.submitter?c.submitter(n):n.submit();setTimeout(function(){n.parentNode.removeChild(n)},0)}}};b.b("utils",b.a);b.b("utils.arrayForEach",b.a.o);b.b("utils.arrayFirst",b.a.lb);b.b("utils.arrayFilter",b.a.fa);b.b("utils.arrayGetDistinctValues",b.a.Ga);b.b("utils.arrayIndexOf",
b.a.i);b.b("utils.arrayMap",b.a.V);b.b("utils.arrayPushAll",b.a.P);b.b("utils.arrayRemoveItem",b.a.ga);b.b("utils.extend",b.a.extend);b.b("utils.fieldsIncludedWithJsonPost",b.a.Na);b.b("utils.getFormFields",b.a.Oa);b.b("utils.peekObservable",b.a.ua);b.b("utils.postJson",b.a.Jb);b.b("utils.parseJson",b.a.Ib);b.b("utils.registerEventHandler",b.a.n);b.b("utils.stringifyJson",b.a.xa);b.b("utils.range",b.a.Lb);b.b("utils.toggleDomNodeCssClass",b.a.da);b.b("utils.triggerEvent",b.a.Ba);b.b("utils.unwrapObservable",
b.a.d);Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice.call(arguments);a=c.shift();return function(){return b.apply(a,c.concat(Array.prototype.slice.call(arguments)))}});b.a.f=new function(){var a=0,d="__ko__"+(new Date).getTime(),c={};return{get:function(a,d){var c=b.a.f.la(a,r);return c===I?I:c[d]},set:function(a,d,c){c===I&&b.a.f.la(a,r)===I||(b.a.f.la(a,m)[d]=c)},la:function(b,f){var g=b[d];if(!g||!("null"!==g&&c[g])){if(!f)return I;g=b[d]="ko"+
a++;c[g]={}}return c[g]},clear:function(a){var b=a[d];return b?(delete c[b],a[d]=p,m):r}}};b.b("utils.domData",b.a.f);b.b("utils.domData.clear",b.a.f.clear);b.a.F=new function(){function a(a,d){var e=b.a.f.get(a,c);e===I&&d&&(e=[],b.a.f.set(a,c,e));return e}function d(c){var e=a(c,r);if(e)for(var e=e.slice(0),k=0;k<e.length;k++)e[k](c);b.a.f.clear(c);"function"==typeof F&&"function"==typeof F.cleanData&&F.cleanData([c]);if(f[c.nodeType])for(e=c.firstChild;c=e;)e=c.nextSibling,8===c.nodeType&&d(c)}
var c="__ko_domNodeDisposal__"+(new Date).getTime(),e={1:m,8:m,9:m},f={1:m,9:m};return{Ca:function(b,d){"function"!=typeof d&&j(Error("Callback must be a function"));a(b,m).push(d)},Xa:function(d,e){var f=a(d,r);f&&(b.a.ga(f,e),0==f.length&&b.a.f.set(d,c,I))},A:function(a){if(e[a.nodeType]&&(d(a),f[a.nodeType])){var c=[];b.a.P(c,a.getElementsByTagName("*"));for(var k=0,l=c.length;k<l;k++)d(c[k])}return a},removeNode:function(a){b.A(a);a.parentNode&&a.parentNode.removeChild(a)}}};b.A=b.a.F.A;b.removeNode=
b.a.F.removeNode;b.b("cleanNode",b.A);b.b("removeNode",b.removeNode);b.b("utils.domNodeDisposal",b.a.F);b.b("utils.domNodeDisposal.addDisposeCallback",b.a.F.Ca);b.b("utils.domNodeDisposal.removeDisposeCallback",b.a.F.Xa);b.a.ta=function(a){var d;if("undefined"!=typeof F)if(F.parseHTML)d=F.parseHTML(a);else{if((d=F.clean([a]))&&d[0]){for(a=d[0];a.parentNode&&11!==a.parentNode.nodeType;)a=a.parentNode;a.parentNode&&a.parentNode.removeChild(a)}}else{var c=b.a.D(a).toLowerCase();d=y.createElement("div");
c=c.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!c.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!c.indexOf("<td")||!c.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];a="ignored<div>"+c[1]+a+c[2]+"</div>";for("function"==typeof x.innerShiv?d.appendChild(x.innerShiv(a)):d.innerHTML=a;c[0]--;)d=d.lastChild;d=b.a.L(d.lastChild.childNodes)}return d};b.a.ca=function(a,d){b.a.ka(a);d=b.a.d(d);if(d!==p&&d!==I)if("string"!=typeof d&&(d=d.toString()),
"undefined"!=typeof F)F(a).html(d);else for(var c=b.a.ta(d),e=0;e<c.length;e++)a.appendChild(c[e])};b.b("utils.parseHtmlFragment",b.a.ta);b.b("utils.setHtml",b.a.ca);var R={};b.s={ra:function(a){"function"!=typeof a&&j(Error("You can only pass a function to ko.memoization.memoize()"));var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);R[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},hb:function(a,b){var c=R[a];c===I&&j(Error("Couldn't find any memo with ID "+
a+". Perhaps it's already been unmemoized."));try{return c.apply(p,b||[]),m}finally{delete R[a]}},ib:function(a,d){var c=[];ca(a,c);for(var e=0,f=c.length;e<f;e++){var g=c[e].sb,h=[g];d&&b.a.P(h,d);b.s.hb(c[e].Fb,h);g.nodeValue="";g.parentNode&&g.parentNode.removeChild(g)}},Ua:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:p}};b.b("memoization",b.s);b.b("memoization.memoize",b.s.ra);b.b("memoization.unmemoize",b.s.hb);b.b("memoization.parseMemoText",b.s.Ua);b.b("memoization.unmemoizeDomNodeAndDescendants",
b.s.ib);b.Ma={throttle:function(a,d){a.throttleEvaluation=d;var c=p;return b.j({read:a,write:function(b){clearTimeout(c);c=setTimeout(function(){a(b)},d)}})},notify:function(a,d){a.equalityComparer="always"==d?u(r):b.m.fn.equalityComparer;return a}};b.b("extenders",b.Ma);b.fb=function(a,d,c){this.target=a;this.ha=d;this.rb=c;b.p(this,"dispose",this.B)};b.fb.prototype.B=function(){this.Cb=m;this.rb()};b.S=function(){this.w={};b.a.extend(this,b.S.fn);b.p(this,"subscribe",this.ya);b.p(this,"extend",
this.extend);b.p(this,"getSubscriptionsCount",this.yb)};b.S.fn={ya:function(a,d,c){c=c||"change";var e=new b.fb(this,d?a.bind(d):a,function(){b.a.ga(this.w[c],e)}.bind(this));this.w[c]||(this.w[c]=[]);this.w[c].push(e);return e},notifySubscribers:function(a,d){d=d||"change";this.w[d]&&b.r.K(function(){b.a.o(this.w[d].slice(0),function(b){b&&b.Cb!==m&&b.ha(a)})},this)},yb:function(){var a=0,b;for(b in this.w)this.w.hasOwnProperty(b)&&(a+=this.w[b].length);return a},extend:function(a){var d=this;if(a)for(var c in a){var e=
b.Ma[c];"function"==typeof e&&(d=e(d,a[c]))}return d}};b.Qa=function(a){return"function"==typeof a.ya&&"function"==typeof a.notifySubscribers};b.b("subscribable",b.S);b.b("isSubscribable",b.Qa);var C=[];b.r={mb:function(a){C.push({ha:a,La:[]})},end:function(){C.pop()},Wa:function(a){b.Qa(a)||j(Error("Only subscribable things can act as dependencies"));if(0<C.length){var d=C[C.length-1];d&&!(0<=b.a.i(d.La,a))&&(d.La.push(a),d.ha(a))}},K:function(a,b,c){try{return C.push(p),a.apply(b,c||[])}finally{C.pop()}}};
var ma={undefined:m,"boolean":m,number:m,string:m};b.m=function(a){function d(){if(0<arguments.length){if(!d.equalityComparer||!d.equalityComparer(c,arguments[0]))d.H(),c=arguments[0],d.G();return this}b.r.Wa(d);return c}var c=a;b.S.call(d);d.t=function(){return c};d.G=function(){d.notifySubscribers(c)};d.H=function(){d.notifySubscribers(c,"beforeChange")};b.a.extend(d,b.m.fn);b.p(d,"peek",d.t);b.p(d,"valueHasMutated",d.G);b.p(d,"valueWillMutate",d.H);return d};b.m.fn={equalityComparer:function(a,
b){return a===p||typeof a in ma?a===b:r}};var E=b.m.Kb="__ko_proto__";b.m.fn[E]=b.m;b.ma=function(a,d){return a===p||a===I||a[E]===I?r:a[E]===d?m:b.ma(a[E],d)};b.$=function(a){return b.ma(a,b.m)};b.Ra=function(a){return"function"==typeof a&&a[E]===b.m||"function"==typeof a&&a[E]===b.j&&a.zb?m:r};b.b("observable",b.m);b.b("isObservable",b.$);b.b("isWriteableObservable",b.Ra);b.R=function(a){0==arguments.length&&(a=[]);a!==p&&(a!==I&&!("length"in a))&&j(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."));
var d=b.m(a);b.a.extend(d,b.R.fn);return d};b.R.fn={remove:function(a){for(var b=this.t(),c=[],e="function"==typeof a?a:function(b){return b===a},f=0;f<b.length;f++){var g=b[f];e(g)&&(0===c.length&&this.H(),c.push(g),b.splice(f,1),f--)}c.length&&this.G();return c},removeAll:function(a){if(a===I){var d=this.t(),c=d.slice(0);this.H();d.splice(0,d.length);this.G();return c}return!a?[]:this.remove(function(d){return 0<=b.a.i(a,d)})},destroy:function(a){var b=this.t(),c="function"==typeof a?a:function(b){return b===
a};this.H();for(var e=b.length-1;0<=e;e--)c(b[e])&&(b[e]._destroy=m);this.G()},destroyAll:function(a){return a===I?this.destroy(u(m)):!a?[]:this.destroy(function(d){return 0<=b.a.i(a,d)})},indexOf:function(a){var d=this();return b.a.i(d,a)},replace:function(a,b){var c=this.indexOf(a);0<=c&&(this.H(),this.t()[c]=b,this.G())}};b.a.o("pop push reverse shift sort splice unshift".split(" "),function(a){b.R.fn[a]=function(){var b=this.t();this.H();b=b[a].apply(b,arguments);this.G();return b}});b.a.o(["slice"],
function(a){b.R.fn[a]=function(){var b=this();return b[a].apply(b,arguments)}});b.b("observableArray",b.R);b.j=function(a,d,c){function e(){b.a.o(z,function(a){a.B()});z=[]}function f(){var a=h.throttleEvaluation;a&&0<=a?(clearTimeout(t),t=setTimeout(g,a)):g()}function g(){if(!q)if(n&&w())A();else{q=m;try{var a=b.a.V(z,function(a){return a.target});b.r.mb(function(c){var d;0<=(d=b.a.i(a,c))?a[d]=I:z.push(c.ya(f))});for(var c=s.call(d),e=a.length-1;0<=e;e--)a[e]&&z.splice(e,1)[0].B();n=m;h.notifySubscribers(l,
"beforeChange");l=c}finally{b.r.end()}h.notifySubscribers(l);q=r;z.length||A()}}function h(){if(0<arguments.length)return"function"===typeof v?v.apply(d,arguments):j(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")),this;n||g();b.r.Wa(h);return l}function k(){return!n||0<z.length}var l,n=r,q=r,s=a;s&&"object"==typeof s?(c=s,s=c.read):(c=c||{},s||(s=c.read));"function"!=typeof s&&j(Error("Pass a function that returns the value of the ko.computed"));
var v=c.write,G=c.disposeWhenNodeIsRemoved||c.W||p,w=c.disposeWhen||c.Ka||u(r),A=e,z=[],t=p;d||(d=c.owner);h.t=function(){n||g();return l};h.xb=function(){return z.length};h.zb="function"===typeof c.write;h.B=function(){A()};h.pa=k;b.S.call(h);b.a.extend(h,b.j.fn);b.p(h,"peek",h.t);b.p(h,"dispose",h.B);b.p(h,"isActive",h.pa);b.p(h,"getDependenciesCount",h.xb);c.deferEvaluation!==m&&g();if(G&&k()){A=function(){b.a.F.Xa(G,arguments.callee);e()};b.a.F.Ca(G,A);var D=w,w=function(){return!b.a.X(G)||D()}}return h};
b.Bb=function(a){return b.ma(a,b.j)};w=b.m.Kb;b.j[w]=b.m;b.j.fn={};b.j.fn[w]=b.j;b.b("dependentObservable",b.j);b.b("computed",b.j);b.b("isComputed",b.Bb);b.gb=function(a){0==arguments.length&&j(Error("When calling ko.toJS, pass the object you want to convert."));return ba(a,function(a){for(var c=0;b.$(a)&&10>c;c++)a=a();return a})};b.toJSON=function(a,d,c){a=b.gb(a);return b.a.xa(a,d,c)};b.b("toJS",b.gb);b.b("toJSON",b.toJSON);b.k={q:function(a){switch(b.a.u(a)){case "option":return a.__ko__hasDomDataOptionValue__===
m?b.a.f.get(a,b.c.options.sa):7>=b.a.Z?a.getAttributeNode("value").specified?a.value:a.text:a.value;case "select":return 0<=a.selectedIndex?b.k.q(a.options[a.selectedIndex]):I;default:return a.value}},T:function(a,d){switch(b.a.u(a)){case "option":switch(typeof d){case "string":b.a.f.set(a,b.c.options.sa,I);"__ko__hasDomDataOptionValue__"in a&&delete a.__ko__hasDomDataOptionValue__;a.value=d;break;default:b.a.f.set(a,b.c.options.sa,d),a.__ko__hasDomDataOptionValue__=m,a.value="number"===typeof d?
d:""}break;case "select":for(var c=a.options.length-1;0<=c;c--)if(b.k.q(a.options[c])==d){a.selectedIndex=c;break}break;default:if(d===p||d===I)d="";a.value=d}}};b.b("selectExtensions",b.k);b.b("selectExtensions.readValue",b.k.q);b.b("selectExtensions.writeValue",b.k.T);var ka=/\@ko_token_(\d+)\@/g,na=["true","false"],oa=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;b.g={Q:[],aa:function(a){var d=b.a.D(a);if(3>d.length)return[];"{"===d.charAt(0)&&(d=d.substring(1,d.length-1));a=[];for(var c=
p,e,f=0;f<d.length;f++){var g=d.charAt(f);if(c===p)switch(g){case '"':case "'":case "/":c=f,e=g}else if(g==e&&"\\"!==d.charAt(f-1)){g=d.substring(c,f+1);a.push(g);var h="@ko_token_"+(a.length-1)+"@",d=d.substring(0,c)+h+d.substring(f+1),f=f-(g.length-h.length),c=p}}e=c=p;for(var k=0,l=p,f=0;f<d.length;f++){g=d.charAt(f);if(c===p)switch(g){case "{":c=f;l=g;e="}";break;case "(":c=f;l=g;e=")";break;case "[":c=f,l=g,e="]"}g===l?k++:g===e&&(k--,0===k&&(g=d.substring(c,f+1),a.push(g),h="@ko_token_"+(a.length-
1)+"@",d=d.substring(0,c)+h+d.substring(f+1),f-=g.length-h.length,c=p))}e=[];d=d.split(",");c=0;for(f=d.length;c<f;c++)k=d[c],l=k.indexOf(":"),0<l&&l<k.length-1?(g=k.substring(l+1),e.push({key:P(k.substring(0,l),a),value:P(g,a)})):e.push({unknown:P(k,a)});return e},ba:function(a){var d="string"===typeof a?b.g.aa(a):a,c=[];a=[];for(var e,f=0;e=d[f];f++)if(0<c.length&&c.push(","),e.key){var g;a:{g=e.key;var h=b.a.D(g);switch(h.length&&h.charAt(0)){case "'":case '"':break a;default:g="'"+h+"'"}}e=e.value;
c.push(g);c.push(":");c.push(e);e=b.a.D(e);0<=b.a.i(na,b.a.D(e).toLowerCase())?e=r:(h=e.match(oa),e=h===p?r:h[1]?"Object("+h[1]+")"+h[2]:e);e&&(0<a.length&&a.push(", "),a.push(g+" : function(__ko_value) { "+e+" = __ko_value; }"))}else e.unknown&&c.push(e.unknown);d=c.join("");0<a.length&&(d=d+", '_ko_property_writers' : { "+a.join("")+" } ");return d},Eb:function(a,d){for(var c=0;c<a.length;c++)if(b.a.D(a[c].key)==d)return m;return r},ea:function(a,d,c,e,f){if(!a||!b.Ra(a)){if((a=d()._ko_property_writers)&&
a[c])a[c](e)}else(!f||a.t()!==e)&&a(e)}};b.b("expressionRewriting",b.g);b.b("expressionRewriting.bindingRewriteValidators",b.g.Q);b.b("expressionRewriting.parseObjectLiteral",b.g.aa);b.b("expressionRewriting.preProcessBindings",b.g.ba);b.b("jsonExpressionRewriting",b.g);b.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",b.g.ba);var K="\x3c!--test--\x3e"===y.createComment("test").text,ja=K?/^\x3c!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\x3e$/:/^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/,ia=K?/^\x3c!--\s*\/ko\s*--\x3e$/:
/^\s*\/ko\s*$/,pa={ul:m,ol:m};b.e={I:{},childNodes:function(a){return B(a)?aa(a):a.childNodes},Y:function(a){if(B(a)){a=b.e.childNodes(a);for(var d=0,c=a.length;d<c;d++)b.removeNode(a[d])}else b.a.ka(a)},N:function(a,d){if(B(a)){b.e.Y(a);for(var c=a.nextSibling,e=0,f=d.length;e<f;e++)c.parentNode.insertBefore(d[e],c)}else b.a.N(a,d)},Va:function(a,b){B(a)?a.parentNode.insertBefore(b,a.nextSibling):a.firstChild?a.insertBefore(b,a.firstChild):a.appendChild(b)},Pa:function(a,d,c){c?B(a)?a.parentNode.insertBefore(d,
c.nextSibling):c.nextSibling?a.insertBefore(d,c.nextSibling):a.appendChild(d):b.e.Va(a,d)},firstChild:function(a){return!B(a)?a.firstChild:!a.nextSibling||H(a.nextSibling)?p:a.nextSibling},nextSibling:function(a){B(a)&&(a=$(a));return a.nextSibling&&H(a.nextSibling)?p:a.nextSibling},jb:function(a){return(a=B(a))?a[1]:p},Ta:function(a){if(pa[b.a.u(a)]){var d=a.firstChild;if(d){do if(1===d.nodeType){var c;c=d.firstChild;var e=p;if(c){do if(e)e.push(c);else if(B(c)){var f=$(c,m);f?c=f:e=[c]}else H(c)&&
(e=[c]);while(c=c.nextSibling)}if(c=e){e=d.nextSibling;for(f=0;f<c.length;f++)e?a.insertBefore(c[f],e):a.appendChild(c[f])}}while(d=d.nextSibling)}}}};b.b("virtualElements",b.e);b.b("virtualElements.allowedBindings",b.e.I);b.b("virtualElements.emptyNode",b.e.Y);b.b("virtualElements.insertAfter",b.e.Pa);b.b("virtualElements.prepend",b.e.Va);b.b("virtualElements.setDomNodeChildren",b.e.N);b.J=function(){this.Ha={}};b.a.extend(b.J.prototype,{nodeHasBindings:function(a){switch(a.nodeType){case 1:return a.getAttribute("data-bind")!=
p;case 8:return b.e.jb(a)!=p;default:return r}},getBindings:function(a,b){var c=this.getBindingsString(a,b);return c?this.parseBindingsString(c,b,a):p},getBindingsString:function(a){switch(a.nodeType){case 1:return a.getAttribute("data-bind");case 8:return b.e.jb(a);default:return p}},parseBindingsString:function(a,d,c){try{var e;if(!(e=this.Ha[a])){var f=this.Ha,g,h="with($context){with($data||{}){return{"+b.g.ba(a)+"}}}";g=new Function("$context","$element",h);e=f[a]=g}return e(d,c)}catch(k){j(Error("Unable to parse bindings.\nMessage: "+
k+";\nBindings value: "+a))}}});b.J.instance=new b.J;b.b("bindingProvider",b.J);b.c={};b.z=function(a,d,c){d?(b.a.extend(this,d),this.$parentContext=d,this.$parent=d.$data,this.$parents=(d.$parents||[]).slice(0),this.$parents.unshift(this.$parent)):(this.$parents=[],this.$root=a,this.ko=b);this.$data=a;c&&(this[c]=a)};b.z.prototype.createChildContext=function(a,d){return new b.z(a,this,d)};b.z.prototype.extend=function(a){var d=b.a.extend(new b.z,this);return b.a.extend(d,a)};b.eb=function(a,d){if(2==
arguments.length)b.a.f.set(a,"__ko_bindingContext__",d);else return b.a.f.get(a,"__ko_bindingContext__")};b.Fa=function(a,d,c){1===a.nodeType&&b.e.Ta(a);return X(a,d,c,m)};b.Ea=function(a,b){(1===b.nodeType||8===b.nodeType)&&Z(a,b,m)};b.Da=function(a,b){b&&(1!==b.nodeType&&8!==b.nodeType)&&j(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"));b=b||x.document.body;Y(a,b,m)};b.ja=function(a){switch(a.nodeType){case 1:case 8:var d=b.eb(a);if(d)return d;
if(a.parentNode)return b.ja(a.parentNode)}return I};b.pb=function(a){return(a=b.ja(a))?a.$data:I};b.b("bindingHandlers",b.c);b.b("applyBindings",b.Da);b.b("applyBindingsToDescendants",b.Ea);b.b("applyBindingsToNode",b.Fa);b.b("contextFor",b.ja);b.b("dataFor",b.pb);var fa={"class":"className","for":"htmlFor"};b.c.attr={update:function(a,d){var c=b.a.d(d())||{},e;for(e in c)if("string"==typeof e){var f=b.a.d(c[e]),g=f===r||f===p||f===I;g&&a.removeAttribute(e);8>=b.a.Z&&e in fa?(e=fa[e],g?a.removeAttribute(e):
a[e]=f):g||a.setAttribute(e,f.toString());"name"===e&&b.a.ab(a,g?"":f.toString())}}};b.c.checked={init:function(a,d,c){b.a.n(a,"click",function(){var e;if("checkbox"==a.type)e=a.checked;else if("radio"==a.type&&a.checked)e=a.value;else return;var f=d(),g=b.a.d(f);"checkbox"==a.type&&g instanceof Array?(e=b.a.i(g,a.value),a.checked&&0>e?f.push(a.value):!a.checked&&0<=e&&f.splice(e,1)):b.g.ea(f,c,"checked",e,m)});"radio"==a.type&&!a.name&&b.c.uniqueName.init(a,u(m))},update:function(a,d){var c=b.a.d(d());
"checkbox"==a.type?a.checked=c instanceof Array?0<=b.a.i(c,a.value):c:"radio"==a.type&&(a.checked=a.value==c)}};b.c.css={update:function(a,d){var c=b.a.d(d());if("object"==typeof c)for(var e in c){var f=b.a.d(c[e]);b.a.da(a,e,f)}else c=String(c||""),b.a.da(a,a.__ko__cssValue,r),a.__ko__cssValue=c,b.a.da(a,c,m)}};b.c.enable={update:function(a,d){var c=b.a.d(d());c&&a.disabled?a.removeAttribute("disabled"):!c&&!a.disabled&&(a.disabled=m)}};b.c.disable={update:function(a,d){b.c.enable.update(a,function(){return!b.a.d(d())})}};
b.c.event={init:function(a,d,c,e){var f=d()||{},g;for(g in f)(function(){var f=g;"string"==typeof f&&b.a.n(a,f,function(a){var g,n=d()[f];if(n){var q=c();try{var s=b.a.L(arguments);s.unshift(e);g=n.apply(e,s)}finally{g!==m&&(a.preventDefault?a.preventDefault():a.returnValue=r)}q[f+"Bubble"]===r&&(a.cancelBubble=m,a.stopPropagation&&a.stopPropagation())}})})()}};b.c.foreach={Sa:function(a){return function(){var d=a(),c=b.a.ua(d);if(!c||"number"==typeof c.length)return{foreach:d,templateEngine:b.C.oa};
b.a.d(d);return{foreach:c.data,as:c.as,includeDestroyed:c.includeDestroyed,afterAdd:c.afterAdd,beforeRemove:c.beforeRemove,afterRender:c.afterRender,beforeMove:c.beforeMove,afterMove:c.afterMove,templateEngine:b.C.oa}}},init:function(a,d){return b.c.template.init(a,b.c.foreach.Sa(d))},update:function(a,d,c,e,f){return b.c.template.update(a,b.c.foreach.Sa(d),c,e,f)}};b.g.Q.foreach=r;b.e.I.foreach=m;b.c.hasfocus={init:function(a,d,c){function e(e){a.__ko_hasfocusUpdating=m;var f=a.ownerDocument;"activeElement"in
f&&(e=f.activeElement===a);f=d();b.g.ea(f,c,"hasfocus",e,m);a.__ko_hasfocusUpdating=r}var f=e.bind(p,m),g=e.bind(p,r);b.a.n(a,"focus",f);b.a.n(a,"focusin",f);b.a.n(a,"blur",g);b.a.n(a,"focusout",g)},update:function(a,d){var c=b.a.d(d());a.__ko_hasfocusUpdating||(c?a.focus():a.blur(),b.r.K(b.a.Ba,p,[a,c?"focusin":"focusout"]))}};b.c.html={init:function(){return{controlsDescendantBindings:m}},update:function(a,d){b.a.ca(a,d())}};var da="__ko_withIfBindingData";Q("if");Q("ifnot",r,m);Q("with",m,r,function(a,
b){return a.createChildContext(b)});b.c.options={update:function(a,d,c){"select"!==b.a.u(a)&&j(Error("options binding applies only to SELECT elements"));for(var e=0==a.length,f=b.a.V(b.a.fa(a.childNodes,function(a){return a.tagName&&"option"===b.a.u(a)&&a.selected}),function(a){return b.k.q(a)||a.innerText||a.textContent}),g=a.scrollTop,h=b.a.d(d());0<a.length;)b.A(a.options[0]),a.remove(0);if(h){c=c();var k=c.optionsIncludeDestroyed;"number"!=typeof h.length&&(h=[h]);if(c.optionsCaption){var l=y.createElement("option");
b.a.ca(l,c.optionsCaption);b.k.T(l,I);a.appendChild(l)}d=0;for(var n=h.length;d<n;d++){var q=h[d];if(!q||!q._destroy||k){var l=y.createElement("option"),s=function(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c},v=s(q,c.optionsValue,q);b.k.T(l,b.a.d(v));q=s(q,c.optionsText,v);b.a.cb(l,q);a.appendChild(l)}}h=a.getElementsByTagName("option");d=k=0;for(n=h.length;d<n;d++)0<=b.a.i(f,b.k.q(h[d]))&&(b.a.bb(h[d],m),k++);a.scrollTop=g;e&&"value"in c&&ea(a,b.a.ua(c.value),m);b.a.ub(a)}}};
b.c.options.sa="__ko.optionValueDomData__";b.c.selectedOptions={init:function(a,d,c){b.a.n(a,"change",function(){var e=d(),f=[];b.a.o(a.getElementsByTagName("option"),function(a){a.selected&&f.push(b.k.q(a))});b.g.ea(e,c,"value",f)})},update:function(a,d){"select"!=b.a.u(a)&&j(Error("values binding applies only to SELECT elements"));var c=b.a.d(d());c&&"number"==typeof c.length&&b.a.o(a.getElementsByTagName("option"),function(a){var d=0<=b.a.i(c,b.k.q(a));b.a.bb(a,d)})}};b.c.style={update:function(a,
d){var c=b.a.d(d()||{}),e;for(e in c)if("string"==typeof e){var f=b.a.d(c[e]);a.style[e]=f||""}}};b.c.submit={init:function(a,d,c,e){"function"!=typeof d()&&j(Error("The value for a submit binding must be a function"));b.a.n(a,"submit",function(b){var c,h=d();try{c=h.call(e,a)}finally{c!==m&&(b.preventDefault?b.preventDefault():b.returnValue=r)}})}};b.c.text={update:function(a,d){b.a.cb(a,d())}};b.e.I.text=m;b.c.uniqueName={init:function(a,d){if(d()){var c="ko_unique_"+ ++b.c.uniqueName.ob;b.a.ab(a,
c)}}};b.c.uniqueName.ob=0;b.c.value={init:function(a,d,c){function e(){h=r;var e=d(),f=b.k.q(a);b.g.ea(e,c,"value",f)}var f=["change"],g=c().valueUpdate,h=r;g&&("string"==typeof g&&(g=[g]),b.a.P(f,g),f=b.a.Ga(f));if(b.a.Z&&("input"==a.tagName.toLowerCase()&&"text"==a.type&&"off"!=a.autocomplete&&(!a.form||"off"!=a.form.autocomplete))&&-1==b.a.i(f,"propertychange"))b.a.n(a,"propertychange",function(){h=m}),b.a.n(a,"blur",function(){h&&e()});b.a.o(f,function(c){var d=e;b.a.Ob(c,"after")&&(d=function(){setTimeout(e,
0)},c=c.substring(5));b.a.n(a,c,d)})},update:function(a,d){var c="select"===b.a.u(a),e=b.a.d(d()),f=b.k.q(a),g=e!=f;0===e&&(0!==f&&"0"!==f)&&(g=m);g&&(f=function(){b.k.T(a,e)},f(),c&&setTimeout(f,0));c&&0<a.length&&ea(a,e,r)}};b.c.visible={update:function(a,d){var c=b.a.d(d()),e="none"!=a.style.display;c&&!e?a.style.display="":!c&&e&&(a.style.display="none")}};b.c.click={init:function(a,d,c,e){return b.c.event.init.call(this,a,function(){var a={};a.click=d();return a},c,e)}};b.v=function(){};b.v.prototype.renderTemplateSource=
function(){j(Error("Override renderTemplateSource"))};b.v.prototype.createJavaScriptEvaluatorBlock=function(){j(Error("Override createJavaScriptEvaluatorBlock"))};b.v.prototype.makeTemplateSource=function(a,d){if("string"==typeof a){d=d||y;var c=d.getElementById(a);c||j(Error("Cannot find template with ID "+a));return new b.l.h(c)}if(1==a.nodeType||8==a.nodeType)return new b.l.O(a);j(Error("Unknown template type: "+a))};b.v.prototype.renderTemplate=function(a,b,c,e){a=this.makeTemplateSource(a,e);
return this.renderTemplateSource(a,b,c)};b.v.prototype.isTemplateRewritten=function(a,b){return this.allowTemplateRewriting===r?m:this.makeTemplateSource(a,b).data("isRewritten")};b.v.prototype.rewriteTemplate=function(a,b,c){a=this.makeTemplateSource(a,c);b=b(a.text());a.text(b);a.data("isRewritten",m)};b.b("templateEngine",b.v);var qa=/(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi,ra=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;b.za={vb:function(a,
d,c){d.isTemplateRewritten(a,c)||d.rewriteTemplate(a,function(a){return b.za.Gb(a,d)},c)},Gb:function(a,b){return a.replace(qa,function(a,e,f,g,h,k,l){return W(l,e,b)}).replace(ra,function(a,e){return W(e,"\x3c!-- ko --\x3e",b)})},kb:function(a){return b.s.ra(function(d,c){d.nextSibling&&b.Fa(d.nextSibling,a,c)})}};b.b("__tr_ambtns",b.za.kb);b.l={};b.l.h=function(a){this.h=a};b.l.h.prototype.text=function(){var a=b.a.u(this.h),a="script"===a?"text":"textarea"===a?"value":"innerHTML";if(0==arguments.length)return this.h[a];
var d=arguments[0];"innerHTML"===a?b.a.ca(this.h,d):this.h[a]=d};b.l.h.prototype.data=function(a){if(1===arguments.length)return b.a.f.get(this.h,"templateSourceData_"+a);b.a.f.set(this.h,"templateSourceData_"+a,arguments[1])};b.l.O=function(a){this.h=a};b.l.O.prototype=new b.l.h;b.l.O.prototype.text=function(){if(0==arguments.length){var a=b.a.f.get(this.h,"__ko_anon_template__")||{};a.Aa===I&&a.ia&&(a.Aa=a.ia.innerHTML);return a.Aa}b.a.f.set(this.h,"__ko_anon_template__",{Aa:arguments[0]})};b.l.h.prototype.nodes=
function(){if(0==arguments.length)return(b.a.f.get(this.h,"__ko_anon_template__")||{}).ia;b.a.f.set(this.h,"__ko_anon_template__",{ia:arguments[0]})};b.b("templateSources",b.l);b.b("templateSources.domElement",b.l.h);b.b("templateSources.anonymousTemplate",b.l.O);var O;b.wa=function(a){a!=I&&!(a instanceof b.v)&&j(Error("templateEngine must inherit from ko.templateEngine"));O=a};b.va=function(a,d,c,e,f){c=c||{};(c.templateEngine||O)==I&&j(Error("Set a template engine before calling renderTemplate"));
f=f||"replaceChildren";if(e){var g=N(e);return b.j(function(){var h=d&&d instanceof b.z?d:new b.z(b.a.d(d)),k="function"==typeof a?a(h.$data,h):a,h=T(e,f,k,h,c);"replaceNode"==f&&(e=h,g=N(e))},p,{Ka:function(){return!g||!b.a.X(g)},W:g&&"replaceNode"==f?g.parentNode:g})}return b.s.ra(function(e){b.va(a,d,c,e,"replaceNode")})};b.Mb=function(a,d,c,e,f){function g(a,b){U(b,k);c.afterRender&&c.afterRender(b,a)}function h(d,e){k=f.createChildContext(b.a.d(d),c.as);k.$index=e;var g="function"==typeof a?
a(d,k):a;return T(p,"ignoreTargetNode",g,k,c)}var k;return b.j(function(){var a=b.a.d(d)||[];"undefined"==typeof a.length&&(a=[a]);a=b.a.fa(a,function(a){return c.includeDestroyed||a===I||a===p||!b.a.d(a._destroy)});b.r.K(b.a.$a,p,[e,a,h,c,g])},p,{W:e})};b.c.template={init:function(a,d){var c=b.a.d(d());if("string"!=typeof c&&!c.name&&(1==a.nodeType||8==a.nodeType))c=1==a.nodeType?a.childNodes:b.e.childNodes(a),c=b.a.Hb(c),(new b.l.O(a)).nodes(c);return{controlsDescendantBindings:m}},update:function(a,
d,c,e,f){d=b.a.d(d());c={};e=m;var g,h=p;"string"!=typeof d&&(c=d,d=c.name,"if"in c&&(e=b.a.d(c["if"])),e&&"ifnot"in c&&(e=!b.a.d(c.ifnot)),g=b.a.d(c.data));"foreach"in c?h=b.Mb(d||a,e&&c.foreach||[],c,a,f):e?(f="data"in c?f.createChildContext(g,c.as):f,h=b.va(d||a,f,c,a)):b.e.Y(a);f=h;(g=b.a.f.get(a,"__ko__templateComputedDomDataKey__"))&&"function"==typeof g.B&&g.B();b.a.f.set(a,"__ko__templateComputedDomDataKey__",f&&f.pa()?f:I)}};b.g.Q.template=function(a){a=b.g.aa(a);return 1==a.length&&a[0].unknown||
b.g.Eb(a,"name")?p:"This template engine does not support anonymous templates nested within its templates"};b.e.I.template=m;b.b("setTemplateEngine",b.wa);b.b("renderTemplate",b.va);b.a.Ja=function(a,b,c){a=a||[];b=b||[];return a.length<=b.length?S(a,b,"added","deleted",c):S(b,a,"deleted","added",c)};b.b("utils.compareArrays",b.a.Ja);b.a.$a=function(a,d,c,e,f){function g(a,b){t=l[b];w!==b&&(z[a]=t);t.na(w++);M(t.M);s.push(t);A.push(t)}function h(a,c){if(a)for(var d=0,e=c.length;d<e;d++)c[d]&&b.a.o(c[d].M,
function(b){a(b,d,c[d].U)})}d=d||[];e=e||{};var k=b.a.f.get(a,"setDomNodeChildrenFromArrayMapping_lastMappingResult")===I,l=b.a.f.get(a,"setDomNodeChildrenFromArrayMapping_lastMappingResult")||[],n=b.a.V(l,function(a){return a.U}),q=b.a.Ja(n,d),s=[],v=0,w=0,B=[],A=[];d=[];for(var z=[],n=[],t,D=0,C,E;C=q[D];D++)switch(E=C.moved,C.status){case "deleted":E===I&&(t=l[v],t.j&&t.j.B(),B.push.apply(B,M(t.M)),e.beforeRemove&&(d[D]=t,A.push(t)));v++;break;case "retained":g(D,v++);break;case "added":E!==I?
g(D,E):(t={U:C.value,na:b.m(w++)},s.push(t),A.push(t),k||(n[D]=t))}h(e.beforeMove,z);b.a.o(B,e.beforeRemove?b.A:b.removeNode);for(var D=0,k=b.e.firstChild(a),H;t=A[D];D++){t.M||b.a.extend(t,ha(a,c,t.U,f,t.na));for(v=0;q=t.M[v];k=q.nextSibling,H=q,v++)q!==k&&b.e.Pa(a,q,H);!t.Ab&&f&&(f(t.U,t.M,t.na),t.Ab=m)}h(e.beforeRemove,d);h(e.afterMove,z);h(e.afterAdd,n);b.a.f.set(a,"setDomNodeChildrenFromArrayMapping_lastMappingResult",s)};b.b("utils.setDomNodeChildrenFromArrayMapping",b.a.$a);b.C=function(){this.allowTemplateRewriting=
r};b.C.prototype=new b.v;b.C.prototype.renderTemplateSource=function(a){var d=!(9>b.a.Z)&&a.nodes?a.nodes():p;if(d)return b.a.L(d.cloneNode(m).childNodes);a=a.text();return b.a.ta(a)};b.C.oa=new b.C;b.wa(b.C.oa);b.b("nativeTemplateEngine",b.C);b.qa=function(){var a=this.Db=function(){if("undefined"==typeof F||!F.tmpl)return 0;try{if(0<=F.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,c,e){e=e||{};2>a&&j(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."));
var f=b.data("precompiled");f||(f=b.text()||"",f=F.template(p,"{{ko_with $item.koBindingContext}}"+f+"{{/ko_with}}"),b.data("precompiled",f));b=[c.$data];c=F.extend({koBindingContext:c},e.templateOptions);c=F.tmpl(f,b,c);c.appendTo(y.createElement("div"));F.fragments={};return c};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){y.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(F.tmpl.tag.ko_code=
{open:"__.push($1 || '');"},F.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};b.qa.prototype=new b.v;w=new b.qa;0<w.Db&&b.wa(w);b.b("jqueryTmplTemplateEngine",b.qa)}"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?L(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],L):L(x.ko={});m;
})();

},{}],5:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.7 (callbacks) - DO NOT EDIT ***/
var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb,__trap=__rt.__trap,__construct=__rt.__construct;
(function main(_) {
  var __this = this;
  var __frame = {
    name: "main",
    line: 1
  };
  return __func(_, this, arguments, main, 0, __frame, function __$main() {
    return (function __1(_) {
      var AsapCreator, AsapListCreator, AsapListView, AsapListsList, AsapView, DropArea, Emitter, Flippable, InboxView, InfoClassListManager, InfoClassPicker, InfoList, InfoListManager, InfoView, ListManager, ListPicker, NewWindowSlotGenerator, NoteCreator, NoteView, ProjectCreator, ProjectPicker, ProjectView, ProjectsView, ReferenceList, Slot, SlotGenerator, TaskList, TaskView, TimePicker, Uploader, View, ViewModel, WindowSlot, WindowSlotGenerator, createInfoButton, defaultTo, id2label, id2viewname, info2label, info2viewname, ko, label, model, sec, util, viewname2info, win, _this, __hasProp, __extends, __indexOf;
      _this = __this;
      __hasProp = {
      }.hasOwnProperty;
      __extends = function(child, parent) {
        for (var key in parent) {
          if (__hasProp.call(parent, key)) {
            child[key] = parent[key];
          };
        };
        function ctor() {
          this.constructor = child;
        };
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      };
      __indexOf = ([].indexOf || function(item) {
        for (var i = 0, l = this.length; (i < l); i++) {
          if (((i in this) && (this[i] === item))) {
            return i
          };
        };
        return -1;
      });
      require("./vendor/jquery");
      require("./vendor/jquery.autosize");
      require("./vendor/date.extensions");
      ko = require("./vendor/knockout");
      sec = require("libsecretarius");
      util = sec.util;
      model = sec();
      defaultTo = function(obj, defaults) {
        var key, value, _results;
        _results = [];
        for (key in defaults) {
          value = defaults[key];
          if ((obj[key] == null)) {
            _results.push(obj[key] = value);
          }
           else {
            _results.push(void 0);
          }
        ;
        };
        return _results;
      };
      id2viewname = function id2viewname__1(_, id) {
        var __frame = {
          name: "id2viewname__1",
          line: 36
        };
        return __func(_, this, arguments, id2viewname__1, 0, __frame, function __$id2viewname__1() {
          return model.cache.getInformation(__cb(_, __frame, 1, 25, function ___(__0, __2) {
            var __1 = info2viewname(__2);
            return _(null, __1);
          }, true), id);
        });
      };
      viewname2info = function viewname2info__2(_, viewname) {
        var id, _ref;
        var __frame = {
          name: "viewname2info__2",
          line: 40
        };
        return __func(_, this, arguments, viewname2info__2, 0, __frame, function __$viewname2info__2() {
          return (function __$viewname2info__2(__then) {
            if (((id = (((_ref = /^\w*\/(.*)$/.exec(viewname)) != null) ? _ref[1] : void 0)) != null)) {
              return model.cache.getInformation(__cb(_, __frame, 3, 13, _, true), id);
            }
             else {
              return _(new Error(("No Infoview Name: " + viewname)));
            }
          ;
          })(_);
        });
      };
      info2label = function info2label__3(_, info) {
        var __frame = {
          name: "info2label__3",
          line: 49
        };
        return __func(_, this, arguments, info2label__3, 0, __frame, function __$info2label__3() {
          return label(__cb(_, __frame, 1, 11, _, true), info2viewname(info));
        });
      };
      info2viewname = function(info) {
        return ((("" + info.type) + "/") + info.id);
      };
      id2label = function id2label__4(_, id) {
        var __frame = {
          name: "id2label__4",
          line: 57
        };
        return __func(_, this, arguments, id2label__4, 0, __frame, function __$id2label__4() {
          return id2viewname(__cb(_, __frame, 1, 4, function __$id2label__4() {
            return label(__cb(_, __frame, 2, 11, _, true), viewname);
          }, true), id);
        });
      };
      label = function label__5(_, viewname) {
        var __frame = {
          name: "label__5",
          line: 62
        };
        return __func(_, this, arguments, label__5, 0, __frame, function __$label__5() {
          return View.getLabel(__cb(_, __frame, 1, 11, _, true), viewname);
        });
      };
      return (function __6(_) {
        function ViewModel(_) {
          var __this = this;
          var __frame = {
            name: "ViewModel",
            line: 68
          };
          return __func(_, this, arguments, ViewModel, 0, __frame, function __$ViewModel() {
            __this._connections = [];
            _();
          });
        };
        ViewModel.prototype.connect = function ViewModel_prototype_connect__1(_, obj, event, callback) {
          var cb, __this = this;
          var __frame = {
            name: "ViewModel_prototype_connect__1",
            line: 72
          };
          return __func(_, this, arguments, ViewModel_prototype_connect__1, 0, __frame, function __$ViewModel_prototype_connect__1() {
            cb = function(data) {
              var _this = this;
              return (function __1(_) {
                var __frame = {
                  name: "__1",
                  line: 76
                };
                return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return callback(__cb(_, __frame, 1, 17, _, true), data);
                });
              })(util.dummyCB);
            };
            cb.event = event;
            cb.obj = obj;
            __this._connections.push(cb);
            return _(null, obj.on(event, cb));
          });
        };
        return _(null, ViewModel);
      })(__cb(_, __frame, 87, 14, function ___(__0, __20) {
        ViewModel = __20;
        return (function __7(_) {
          var _views;
          function View() {
          
          };
          _views = [];
          View.registerView = function(regex, cls, label) {
            return _views.push({
              regex: regex,
              cls: cls,
              label: label
            });
          };
          View.getLabel = function View_getLabel__1(_, viewname) {
            var params, row, _ref, __this = this;
            var __frame = {
              name: "View_getLabel__1",
              line: 105
            };
            return __func(_, this, arguments, View_getLabel__1, 0, __frame, function __$View_getLabel__1() {
              _ref = __this._find(viewname), row = _ref[0], params = _ref[1];
              return (function __$View_getLabel__1(__then) {
                if (((((row != null) ? row.label : void 0)) != null)) {
                  return row.label(__cb(_, __frame, 4, 15, _, true), params);
                }
                 else {
                  return _(null, viewname);
                }
              ;
              })(_);
            });
          };
          View.create = function(viewname, slot) {
            var params, row, _ref;
            _ref = this._find(viewname), row = _ref[0], params = _ref[1];
            if ((row != null)) {
              return new row.cls(slot, params);
            }
          ;
          };
          View._find = function(viewname) {
            var params, row, _i, _len;
            for (_i = 0, _len = _views.length; (_i < _len); _i++) {
              row = _views[_i];
              params = row.regex.exec(viewname);
              if ((params != null)) {
                return [row,params,];
              }
            ;
            };
            return [null,null,];
          };
          View.test = function(viewname) {
            return (this._find(viewname)[0] != null);
          };
          return _(null, View);
        })(__cb(_, __frame, 140, 9, function ___(__0, __21) {
          View = __21;
          return (function __8(_) {
            function DropArea(contentNode, cb) {
              contentNode.bind("dragover", function(ev) {
                return ev.originalEvent.preventDefault();
              });
              contentNode.bind("drop", function(ev) {
                ev.originalEvent.preventDefault();
                return cb(ev.originalEvent.dataTransfer.getData("text/plain"));
              });
            };
            return _(null, DropArea);
          })(__cb(_, __frame, 156, 13, function ___(__0, __22) {
            DropArea = __22;
            return (function __9(_) {
              function Slot(contentNode, titleNode) {
                var _this = this;
                this.contentNode = contentNode;
                this.titleNode = titleNode;
                this.clear = function() {
                  return Slot.prototype.clear.apply(_this, arguments);
                };
                this.setView = function(viewname) {
                  return Slot.prototype.setView.apply(_this, arguments);
                };
                this.emitter = new Emitter(this.getTitleNode());
                this.clear();
              };
              Slot.prototype.setView = function(viewname) {
                if (View.test(viewname)) {
                  this.clear();
                  this.view = View.create(viewname, this);
                  return this.emitter.setViewName(viewname);
                }
              ;
              };
              Slot.prototype.setTitle = function(title) {
                return this.getTitleNode().html(title);
              };
              Slot.prototype.setContent = function(html) {
                return this.getContentNode().html(html);
              };
              Slot.prototype.getContentNode = function() {
                return this.contentNode;
              };
              Slot.prototype.getTitleNode = function() {
                return this.titleNode;
              };
              Slot.prototype.clear = function() {
                var _ref;
                if (((_ref = this.view) != null)) {
                  _ref["delete"]();
                }
              ;
                this.getContentNode().empty();
                return this.setTitle("Secretarius");
              };
              return _(null, Slot);
            })(__cb(_, __frame, 209, 16, function ___(__0, __23) {
              Slot = Slot = __23;
              return (function __10(_) {
                function Emitter(node, slotGenerator) {
                  var _ref, _this = this;
                  this.node = node;
                  this.slotGenerator = slotGenerator;
                  if (((_ref = this.slotGenerator) == null)) {
                    this.slotGenerator = SlotGenerator.getDefault();
                  }
                ;
                  this.node.attr("draggable", "true");
                  this.node.bind("dragstart", function(ev) {
                    ev.originalEvent.dataTransfer.setData("text/plain", _this.getViewName());
                    return ev.originalEvent.dataTransfer.setData("text/uri-list", ((("http://" + window.location.origin) + "#") + (_this.getViewName())));
                  });
                  this.node.click(function() {
                    return _this.slotGenerator.show(_this.getViewName());
                  });
                };
                Emitter.prototype.setViewName = function(viewName) {
                  this.viewName = viewName;
                };
                Emitter.prototype.getViewName = function() {
                  return this.viewName;
                };
                return _(null, Emitter);
              })(__cb(_, __frame, 241, 30, function ___(__0, __24) {
                exports.Emitter = Emitter = __24;
                return (function __11(_) {
                  var _default;
                  function SlotGenerator() {
                  
                  };
                  _default = null;
                  SlotGenerator.setDefault = function(generator) {
                    return _default = generator;
                  };
                  SlotGenerator.getDefault = function() {
                    return _default;
                  };
                  return _(null, SlotGenerator);
                })(__cb(_, __frame, 260, 42, function ___(__0, __25) {
                  exports.SlotGenerator = SlotGenerator = __25;
                  WindowSlotGenerator = (function(_super) {
                    __extends(WindowSlotGenerator, _super);
                    function WindowSlotGenerator() {
                      return WindowSlotGenerator.__super__.constructor.apply(this, arguments);
                    };
                    WindowSlotGenerator.prototype.show = function(viewname) {
                      return win.setView(window.location.hash = viewname);
                    };
                    WindowSlotGenerator.setDefault(new WindowSlotGenerator);
                    return WindowSlotGenerator;
                  })(SlotGenerator);
                  NewWindowSlotGenerator = (function(_super) {
                    __extends(NewWindowSlotGenerator, _super);
                    function NewWindowSlotGenerator() {
                      return NewWindowSlotGenerator.__super__.constructor.apply(this, arguments);
                    };
                    NewWindowSlotGenerator.prototype.show = function(viewname) {
                      return window.open(((("" + window.location.origin) + "#") + viewname), "", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no");
                    };
                    return NewWindowSlotGenerator;
                  })(SlotGenerator);
                  WindowSlot = (function(_super) {
                    __extends(WindowSlot, _super);
                    function WindowSlot(_) {
                      var clock, _this, __this = this;
                      var __frame = {
                        name: "WindowSlot",
                        line: 301
                      };
                      return __func(_, this, arguments, WindowSlot, 0, __frame, function __$WindowSlot() {
                        _this = __this;
                        __this.msg = ko.observableArray();
                        __this.clock = ko.observable("");
                        return (clock = function clock__1(_) {
                          var __frame = {
                            name: "clock__1",
                            line: 306
                          };
                          return __func(_, this, arguments, clock__1, 0, __frame, function __$clock__1() {
                            setTimeout((function() {
                              return clock(util.dummyCB);
                            }), (1000 - ((new Date().getTime() % 1000))));
                            return (model.inbox.getSize(__cb(_, __frame, 4, 76, function ___(__0, __2) {
                              var __1 = _this.clock(((("" + (new Date().toLocaleString())) + " Inbox:") + __2));
                              return _(null, __1);
                            }, true)));
                          });
                        })(__cb(_, __frame, 10, 6, _, true));
                      });
                    };
                    WindowSlot.prototype.showMessage = function WindowSlot_prototype_showMessage__1(_, msg, timeout) {
                      var _this, __this = this;
                      var __frame = {
                        name: "WindowSlot_prototype_showMessage__1",
                        line: 344
                      };
                      return __func(_, this, arguments, WindowSlot_prototype_showMessage__1, 0, __frame, function __$WindowSlot_prototype_showMessage__1() {
                        _this = __this;
                        if ((timeout == null)) {
                          timeout = 5000;
                        }
                      ;
                        __this.msg.push(msg);
                        return _(null, setTimeout((function() {
                          return _this.msg.shift();
                        }), timeout));
                      });
                    };
                    return WindowSlot;
                  })(Slot);
                  return (function __12(_) {
                    function Flippable(front, back) {
                      var _ref, _this = this;
                      this.front = front;
                      this.back = back;
                      this.toggle = function() {
                        return Flippable.prototype.toggle.apply(_this, arguments);
                      };
                      this.showFront = function() {
                        return Flippable.prototype.showFront.apply(_this, arguments);
                      };
                      this.showBack = function() {
                        return Flippable.prototype.showBack.apply(_this, arguments);
                      };
                      this.flipped = false;
                      if (((_ref = this.back) != null)) {
                        _ref.addClass("backside");
                      }
                    ;
                    };
                    Flippable.prototype.showBack = function() {
                      var _ref, _ref1;
                      if (((_ref = this.front) != null)) {
                        _ref.addClass("backside");
                      }
                    ;
                      return (((_ref1 = this.back) != null) ? _ref1.removeClass("backside") : void 0);
                    };
                    Flippable.prototype.showFront = function() {
                      var _ref, _ref1;
                      if (((_ref = this.front) != null)) {
                        _ref.removeClass("backside");
                      }
                    ;
                      return (((_ref1 = this.back) != null) ? _ref1.addClass("backside") : void 0);
                    };
                    Flippable.prototype.toggle = function() {
                      if (this.flipped = !this.flipped) {
                        return this.showBack();
                      }
                       else {
                        return this.showFront();
                      }
                    ;
                    };
                    Flippable.prototype.addToggler = function(toggler) {
                      var _this = this;
                      return toggler.click(function() {
                        _this.toggle();
                        return false;
                      });
                    };
                    return _(null, Flippable);
                  })(__cb(_, __frame, 470, 34, function ___(__0, __26) {
                    exports.Flippable = Flippable = __26;
                    return (function __13(_) {
                      var defaults;
                      function Uploader(node, options) {
                        var flip, links;
                        this.node = node;
                        this.options = ((options != null) ? options : {
                        });
                        defaultTo(this.options, defaults);
                        links = $("button", this.node);
                        flip = new Flippable(links.first(), $("form", this.node));
                        flip.addToggler(links);
                      };
                      defaults = {
                        upload: function() {
                        
                        },
                        name: "File"
                      };
                      return _(null, Uploader);
                    })(__cb(_, __frame, 492, 32, function ___(__0, __27) {
                      exports.Uploader = Uploader = __27;
                      return (function __14(_) {
                        var defaults, units;
                        function TimePicker(node, options) {
                          var unit, _this = this;
                          this.node = node;
                          this.options = options;
                          this.getDate = function() {
                            return TimePicker.prototype.getDate.apply(_this, arguments);
                          };
                          this.save = function() {
                            return TimePicker.prototype.save.apply(_this, arguments);
                          };
                          this.setDate = function(date) {
                            _this.date = date;
                            return TimePicker.prototype.setDate.apply(_this, arguments);
                          };
                          defaultTo(this.options, defaults);
                          this.node.addClass("timepicker");
                          this.outerFlip = new Flippable($(".front", this.node), $(".back", this.node), 0);
                          this.innerFlip = new Flippable($(".front > button", this.node), $(".front > span", this.node), 0);
                          this.outerFlip.addToggler($("button", this.node));
                          this.display = $("span.reltime", this.node);
                          for (unit in units) {
                            this[unit] = $((("input[name='" + unit) + "']"), this.node);
                          };
                          this.setDate(this.options.date);
                          $("button[name=delete]", this.node).click(function() {
                            _this.options.change(null);
                            _this.setDate(null);
                            return false;
                          });
                          $("button[name=save]", this.node).click(function() {
                            _this.save();
                            return false;
                          });
                        };
                        units = {
                          year: "FullYear",
                          month: "Month",
                          day: "Date",
                          minute: "Minutes",
                          hour: "Hours",
                          second: "Seconds"
                        };
                        defaults = {
                          change: function() {
                          
                          },
                          name: "Time"
                        };
                        TimePicker.prototype.setDate = function(date) {
                          var fn, unit, _results;
                          this.date = date;
                          date = this.date;
                          if ((this.date != null)) {
                            this.innerFlip.showBack();
                          }
                           else {
                            this.innerFlip.showFront();
                            date = new Date;
                          }
                        ;
                          this.display.attr("x-time", date);
                          _results = [];
                          for (unit in units) {
                            fn = units[unit];
                            _results.push(this[unit].val((date[("get" + fn)]() + (((unit === "month") ? 1 : 0)))));
                          };
                          return _results;
                        };
                        TimePicker.prototype.save = function() {
                          var date, fn, unit;
                          date = new Date;
                          try {
                            for (unit in units) {
                              fn = units[unit];
                              date[("set" + fn)]((this[unit].val() - (((unit === "month") ? 1 : 0))));
                            };
                          } catch (error) {
                            date = null;
                          };
                          this.options.change(date);
                          return this.setDate(date);
                        };
                        TimePicker.prototype.getDate = function() {
                          return this.date;
                        };
                        return _(null, TimePicker);
                      })(__cb(_, __frame, 587, 36, function ___(__0, __28) {
                        exports.TimePicker = TimePicker = __28;
                        return (function __15(_) {
                          function ListManager(_, creator) {
                            var _this, __this = this;
                            var __frame = {
                              name: "ListManager",
                              line: 592
                            };
                            return __func(_, this, arguments, ListManager, 0, __frame, function __$ListManager() {
                              _this = __this;
                              __this.creator = creator;
                              __this.setList = function() {
                                return ListManager.prototype.setList.apply(_this, arguments);
                              };
                              __this.array = ko.observableArray();
                              _();
                            });
                          };
                          ListManager.prototype.setList = function ListManager_prototype_setList__1(_, list) {
                            var id, ids, item, _i, _len, __this = this;
                            var __frame = {
                              name: "ListManager_prototype_setList__1",
                              line: 601
                            };
                            return __func(_, this, arguments, ListManager_prototype_setList__1, 0, __frame, function __$ListManager_prototype_setList__1() {
                              return (function __1(_) {
                                var _i, _len, _ref, _results;
                                _ref = __this.array();
                                _results = [];
                                for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
                                  item = _ref[_i];
                                  _results.push(item.id);
                                };
                                return _(null, _results);
                              })(__cb(_, __frame, 11, 12, function ___(__0, __2) {
                                ids = __2;
                                _i = 0;
                                _len = list.length;
                                var __6 = false;
                                return (function ___(__break) {
                                  var __more;
                                  var __loop = __cb(_, __frame, 0, 0, function __$ListManager_prototype_setList__1() {
                                    __more = false;
                                    if (__6) {
                                      _i++;
                                    }
                                     else {
                                      __6 = true;
                                    }
                                  ;
                                    var __5 = (_i < _len);
                                    if (__5) {
                                      id = list[_i];
                                      return (function __$ListManager_prototype_setList__1(__then) {
                                        if ((__indexOf.call(ids, id) < 0)) {
                                          return __this.creator(__cb(_, __frame, 15, 26, function ___(__0, __3) {
                                            __this.array.push(__3);
                                            __then();
                                          }, true), id);
                                        }
                                         else {
                                          __then();
                                        }
                                      ;
                                      })(function __$ListManager_prototype_setList__1() {
                                        while (__more) {
                                          __loop();
                                        };
                                        __more = true;
                                      });
                                    }
                                     else {
                                      __break();
                                    }
                                  ;
                                  });
                                  do {
                                    __loop();
                                  } while (__more);
                                  __more = true;
                                })(function __$ListManager_prototype_setList__1() {
                                  __this.array.remove(function(item) {
                                    var _ref;
                                    return _ref = !item.id, (__indexOf.call(list, _ref) >= 0);
                                  });
                                  return _(null, __this.array.sort(function(lhs, rhs) {
                                    var diff;
                                    diff = (list.indexOf(rhs.id) - list.indexOf(lhs.id));
                                    if ((diff < 0)) {
                                      return -1;
                                    }
                                     else if ((diff > 0)) {
                                      return 1;
                                    }
                                     else {
                                      return 0;
                                    }
                                    
                                  ;
                                  }));
                                });
                              }, true));
                            });
                          };
                          return _(null, ListManager);
                        })(__cb(_, __frame, 637, 30, function ___(__0, __29) {
                          ListManager = ListManager = __29;
                          exports.InfoListManager = InfoListManager = (function(_super) {
                            __extends(InfoListManager, _super);
                            function InfoListManager(_, node, creator) {
                              var __this = this;
                              var __frame = {
                                name: "InfoListManager",
                                line: 644
                              };
                              return __func(_, this, arguments, InfoListManager, 0, __frame, function __$InfoListManager() {
                                return InfoListManager.__super__.constructor.call(__this, __cb(_, __frame, 1, 6, _, true), node, function __1(_, id) {
                                  var info;
                                  var __frame = {
                                    name: "__1",
                                    line: 645
                                  };
                                  return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                    return model.cache.getInformation(__cb(_, __frame, 2, 15, function ___(__0, __1) {
                                      info = __1;
                                      return (function __$__1(__then) {
                                        if ((info != null)) {
                                          return creator(__cb(_, __frame, 4, 17, _, true), info);
                                        }
                                         else {
                                          __then();
                                        }
                                      ;
                                      })(_);
                                    }, true), id);
                                  });
                                });
                              });
                            };
                            return InfoListManager;
                          })(ListManager);
                          exports.createInfoButton = createInfoButton = function(info, type, del) {
                            var emitter, labelnode, setLabel;
                            if ((type == null)) {
                              type = false;
                            }
                          ;
                            labelnode = $(".label", domnode);
                            if ((del != null)) {
                              $("button", domnode).click(function(ev) {
                                ev.preventDefault();
                                ev.stopPropagation();
                                return del(info);
                              });
                            }
                          ;
                            info.onChanged(setLabel = function setLabel__1(info, _) {
                              var __frame = {
                                name: "setLabel__1",
                                line: 671
                              };
                              return __func(_, this, arguments, setLabel__1, 1, __frame, function __$setLabel__1() {
                                return exports.info2label(__cb(_, __frame, 1, 14, function ___(__0, __1) {
                                  label = __1;
                                  if (!type) {
                                    label = (label.split(":")).slice(1).join(":");
                                  }
                                ;
                                  return _(null, labelnode.html(label));
                                }, true), info);
                              });
                            });
                            setLabel(info);
                            emitter = new Emitter(domnode);
                            emitter.setViewName(exports.info2viewname(info));
                            return domnode;
                          };
                          exports.InfoList = InfoList = (function(_super) {
                            __extends(InfoList, _super);
                            function InfoList(_, node, type, del) {
                              var __this = this;
                              var __frame = {
                                name: "InfoList",
                                line: 688
                              };
                              return __func(_, this, arguments, InfoList, 0, __frame, function __$InfoList() {
                                if ((type == null)) {
                                  type = false;
                                }
                              ;
                                return InfoList.__super__.constructor.call(__this, __cb(_, __frame, 4, 6, _, true), node, function __1(_, reference) {
                                  var __frame = {
                                    name: "__1",
                                    line: 692
                                  };
                                  return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                    return _(null, createInfoButton(reference, type, del));
                                  });
                                });
                              });
                            };
                            return InfoList;
                          })(InfoListManager);
                          exports.ReferenceList = ReferenceList = (function(_super) {
                            __extends(ReferenceList, _super);
                            function ReferenceList(_, node, info) {
                              var __this = this;
                              var __frame = {
                                name: "ReferenceList",
                                line: 705
                              };
                              return __func(_, this, arguments, ReferenceList, 0, __frame, function __$ReferenceList() {
                                new DropArea(node, function __1(viewname, _) {
                                  var id, reference, _ref;
                                  var __frame = {
                                    name: "__1",
                                    line: 706
                                  };
                                  return __func(_, this, arguments, __1, 1, __frame, function __$__1() {
                                    return (function __$__1(__then) {
                                      if (((id = (((_ref = /^\w*:(.*)$/.exec(viewname)) != null) ? _ref[1] : void 0)) != null)) {
                                        return model.cache.getInformation(__cb(_, __frame, 3, 22, function ___(__0, __1) {
                                          reference = __1;
                                          return (function __$__1(__then) {
                                            if ((reference != null)) {
                                              return info.addReference(__cb(_, __frame, 5, 19, _, true), reference);
                                            }
                                             else {
                                              __then();
                                            }
                                          ;
                                          })(__then);
                                        }, true), id);
                                      }
                                       else {
                                        __then();
                                      }
                                    ;
                                    })(_);
                                  });
                                });
                                return ReferenceList.__super__.constructor.call(__this, __cb(_, __frame, 10, 6, _, true), node, true, function(reference) {
                                  return info.removeReference((function() {
                                  
                                  }), reference);
                                });
                              });
                            };
                            return ReferenceList;
                          })(InfoList);
                          exports.InfoClassListManager = InfoClassListManager = (function(_super) {
                            __extends(InfoClassListManager, _super);
                            function InfoClassListManager(_, node, cls, creator) {
                              var __this = this;
                              var __frame = {
                                name: "InfoClassListManager",
                                line: 728
                              };
                              return __func(_, this, arguments, InfoClassListManager, 0, __frame, function __$InfoClassListManager() {
                                return InfoClassListManager.__super__.constructor.call(__this, __cb(_, __frame, 1, 6, function __$InfoClassListManager() {
                                  cls.onChanged(__this.setList);
                                  return cls.getAllIDs(__cb(_, __frame, 3, 19, function ___(__0, __1) {
                                    __this.setList(__1);
                                    _();
                                  }, true));
                                }, true), node, creator);
                              });
                            };
                            return InfoClassListManager;
                          })(InfoListManager);
                          exports.AsapListsList = AsapListsList = (function(_super) {
                            __extends(AsapListsList, _super);
                            function AsapListsList(_, node) {
                              var __this = this;
                              var __frame = {
                                name: "AsapListsList",
                                line: 742
                              };
                              return __func(_, this, arguments, AsapListsList, 0, __frame, function __$AsapListsList() {
                                return AsapListsList.__super__.constructor.call(__this, __cb(_, __frame, 1, 6, _, true), node, model.AsapList, function __1(_, list) {
                                  var listnode;
                                  var __frame = {
                                    name: "__1",
                                    line: 743
                                  };
                                  return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                    listnode = $((("<button>" + list.name) + "</button>"));
                                    list.onChanged(function(list) {
                                      return listnode.html(list.name);
                                    });
                                    new Emitter(listnode).setViewName(("asaplist:" + list.id));
                                    return _(null, listnode);
                                  });
                                });
                              });
                            };
                            return AsapListsList;
                          })(InfoClassListManager);
                          exports.InfoClassPicker = InfoClassPicker = (function(_super) {
                            __extends(InfoClassPicker, _super);
                            function InfoClassPicker(node, cls, defaultoption, cb) {
                              this.select = null;
                              this.picker = $("<select />");
                              node.append(this.picker);
                              if ((defaultoption != null)) {
                                this.picker.append($(new Option(defaultoption, "")));
                              }
                            ;
                              InfoClassPicker.__super__.constructor.call(this, this.picker, cls, cb);
                            };
                            InfoClassPicker.prototype.sel = function(id) {
                              this.select = id;
                              if ((id in this.elements)) {
                                return this.elements[id].prop("selected", true);
                              }
                            ;
                            };
                            InfoClassPicker.prototype.getInfo = function InfoClassPicker_prototype_getInfo__1(_) {
                              var __this = this;
                              var __frame = {
                                name: "InfoClassPicker_prototype_getInfo__1",
                                line: 779
                              };
                              return __func(_, this, arguments, InfoClassPicker_prototype_getInfo__1, 0, __frame, function __$InfoClassPicker_prototype_getInfo__1() {
                                return model.cache.getInformation(__cb(_, __frame, 1, 13, _, true), __this.picker.val());
                              });
                            };
                            InfoClassPicker.prototype.onChanged = function InfoClassPicker_prototype_onChanged__2(_) {
                              var __this = this;
                              var __frame = {
                                name: "InfoClassPicker_prototype_onChanged__2",
                                line: 783
                              };
                              return __func(_, this, arguments, InfoClassPicker_prototype_onChanged__2, 0, __frame, function __$InfoClassPicker_prototype_onChanged__2() {
                                return __this.picker.change(__cb(_, __frame, 1, 6, function __$InfoClassPicker_prototype_onChanged__2() {
                                  return __this.getInfo(__cb(_, __frame, 2, 13, _, true));
                                }, true));
                              });
                            };
                            return InfoClassPicker;
                          })(InfoClassListManager);
                          exports.ProjectPicker = ProjectPicker = (function(_super) {
                            __extends(ProjectPicker, _super);
                            function ProjectPicker(node) {
                              ProjectPicker.__super__.constructor.call(this, node, model.Project, "No Project", function __1(_, project) {
                                var projectnode;
                                var __frame = {
                                  name: "__1",
                                  line: 797
                                };
                                return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                  projectnode = $(new Option(project.description, project.id));
                                  project.onChanged(function(project) {
                                    return projectnode.html(project.description);
                                  });
                                  return _(null, projectnode);
                                });
                              });
                            };
                            return ProjectPicker;
                          })(InfoClassPicker);
                          exports.ListPicker = ListPicker = (function(_super) {
                            __extends(ListPicker, _super);
                            function ListPicker(node) {
                              ListPicker.__super__.constructor.call(this, node, model.AsapList, null, function __1(_, list) {
                                var listnode;
                                var __frame = {
                                  name: "__1",
                                  line: 816
                                };
                                return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                  listnode = $(new Option(list.name, list.id));
                                  list.onChanged(function(list) {
                                    return listnode.html(list.name);
                                  });
                                  return _(null, listnode);
                                });
                              });
                            };
                            return ListPicker;
                          })(InfoClassPicker);
                          return (function __16(_) {
                            function AsapListCreator(node) {
                              var list;
                              list = $("input[name=list]", node);
                              $("form[name=list]").submit(function(ev) {
                                ev.preventDefault();
                                return new model.AsapList().create((function(error) {
                                  if ((error == null)) {
                                    return list.val("");
                                  }
                                ;
                                }), list.val());
                              });
                            };
                            return _(null, AsapListCreator);
                          })(__cb(_, __frame, 846, 46, function ___(__0, __30) {
                            exports.AsapListCreator = AsapListCreator = __30;
                            return (function __17(_) {
                              function NoteCreator(node) {
                                var content;
                                content = $("input[name=note]", node);
                                $("form[name=note]", node).submit(function(ev) {
                                  ev.preventDefault();
                                  return new model.Note().create((function(error) {
                                    if ((error == null)) {
                                      return content.val("");
                                    }
                                  ;
                                  }), content.val());
                                });
                              };
                              return _(null, NoteCreator);
                            })(__cb(_, __frame, 865, 38, function ___(__0, __31) {
                              exports.NoteCreator = NoteCreator = __31;
                              return (function __18(_) {
                                function AsapCreator(node, list, project, reference) {
                                  var desc, listPicker, projectPicker, _this = this;
                                  this.list = ((list != null) ? list : null);
                                  this.project = ((project != null) ? project : null);
                                  this.reference = ((reference != null) ? reference : null);
                                  desc = $("input[name=asap]");
                                  projectPicker = new ProjectPicker($(".projectsel", node));
                                  listPicker = new ListPicker($(".listsel", node));
                                  form.submit(function() {
                                    (function __1(_) {
                                      var __frame = {
                                        name: "__1",
                                        line: 880
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return (function __$__1(_) {
                                          var __1 = (_this.project != null);
                                          if (__1) {
                                            return _(null, _this.project);
                                          }
                                        ;
                                          return projectPicker.getInfo(__cb(_, __frame, 1, 60, _, true));
                                        })(__cb(_, __frame, -879, 7, function ___(__0, __3) {
                                          project = __3;
                                          return (function __$__1(_) {
                                            var __2 = (_this.list != null);
                                            if (__2) {
                                              return _(null, _this.list);
                                            }
                                          ;
                                            return listPicker.getInfo(__cb(_, __frame, 2, 51, _, true));
                                          })(__cb(_, __frame, -879, 7, function ___(__0, __4) {
                                            list = __4;
                                            return new model.Asap().create(__cb(_, __frame, 3, 10, function __$__1() {
                                              return _(null, desc.val(""));
                                            }, true), desc.val(), list, _this.reference, project);
                                          }, true));
                                        }, true));
                                      });
                                    })();
                                    return false;
                                  });
                                };
                                AsapCreator.prototype.setList = function(list) {
                                  this.list = list;
                                };
                                AsapCreator.prototype.setProject = function(project) {
                                  this.project = project;
                                };
                                AsapCreator.prototype.setReference = function(reference) {
                                  this.reference = reference;
                                };
                                return _(null, AsapCreator);
                              })(__cb(_, __frame, 903, 38, function ___(__0, __32) {
                                exports.AsapCreator = AsapCreator = __32;
                                return (function __19(_) {
                                  function ProjectCreator(node, parent, reference) {
                                    var desc, parentPicker, _this = this;
                                    this.node = node;
                                    this.parent = ((parent != null) ? parent : null);
                                    this.reference = ((reference != null) ? reference : null);
                                    desc = $("input[name=project]");
                                    parentPicker = new ProjectPicker($(".parentpicker", node));
                                    form.submit(function() {
                                      (function __1(_) {
                                        var __frame = {
                                          name: "__1",
                                          line: 917
                                        };
                                        return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                          return (function __$__1(_) {
                                            var __1 = (_this.parent != null);
                                            if (__1) {
                                              return _(null, _this.parent);
                                            }
                                          ;
                                            return parentPicker.getInfo(__cb(_, __frame, 1, 57, _, true));
                                          })(__cb(_, __frame, -916, 7, function ___(__0, __2) {
                                            parent = __2;
                                            return new model.Project().create(__cb(_, __frame, 2, 10, function __$__1() {
                                              return _(null, desc.val(""));
                                            }, true), desc.val(), _this.reference, parent);
                                          }, true));
                                        });
                                      })();
                                      return false;
                                    });
                                  };
                                  ProjectCreator.prototype.setParent = function(parent) {
                                    this.parent = parent;
                                  };
                                  ProjectCreator.prototype.setReference = function(reference) {
                                    this.reference = reference;
                                  };
                                  return _(null, ProjectCreator);
                                })(__cb(_, __frame, 935, 44, function ___(__0, __33) {
                                  exports.ProjectCreator = ProjectCreator = __33;
                                  InboxView = (function(_super) {
                                    __extends(InboxView, _super);
                                    InboxView.registerView(/^inbox$/, InboxView, function __1(_) {
                                      var __frame = {
                                        name: "__1",
                                        line: 942
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return _(null, "Inbox");
                                      });
                                    });
                                    function InboxView(_, slot) {
                                      var innerFlip, outerFlip, _this, __this = this;
                                      var __frame = {
                                        name: "InboxView",
                                        line: 946
                                      };
                                      return __func(_, this, arguments, InboxView, 0, __frame, function __$InboxView() {
                                        _this = __this;
                                        __this.slot = slot;
                                        __this.draw = function(values) {
                                          return InboxView.prototype.draw.apply(_this, arguments);
                                        };
                                        __this.size = __this.first = null;
                                        __this.context = __this.slot.getContentNode();
                                        __this.innerslot = new Slot($(".inboxinfo", __this.slot.getContentNode()).first(), $("h1", __this.slot.getContentNode()).first());
                                        model.inbox.onChanged(__this.draw);
                                        model.inbox.get(function(err, values) {
                                          if ((err == null)) {
                                            return _this.draw(values);
                                          }
                                        ;
                                        });
                                        innerFlip = new Flippable($(".newasap", __this.context), $(".newproject", __this.context), 0);
                                        outerFlip = new Flippable($(".front", __this.context), $(".back", __this.context), 500);
                                        outerFlip.addToggler($(".front > button", __this.context));
                                        outerFlip.addToggler($(".back > button", __this.context));
                                        $("button[name=asap]", __this.context).click(innerFlip.showFront);
                                        $("button[name=project]", __this.context).click(innerFlip.showBack);
                                        __this.asapCreator = new AsapCreator($(".newasap", __this.context));
                                        __this.projectCreator = new ProjectCreator($(".newproject", __this.context));
                                        _();
                                      });
                                    };
                                    InboxView.prototype["delete"] = function() {
                                      return model.inbox.removeCb("changed", this.draw);
                                    };
                                    InboxView.prototype.draw = function(values) {
                                      if ((this.size !== values.size)) {
                                        this.slot.setTitle((("Inbox (" + (this.size = values.size)) + ")"));
                                      }
                                    ;
                                      if ((this.first !== values.first)) {
                                        this.first = values.first;
                                        this.asapCreator.setReference(this.first);
                                        this.projectCreator.setReference(this.first);
                                        if ((this.first != null)) {
                                          return this.innerslot.setView(((("" + this.first.type) + ":") + this.first.id));
                                        }
                                         else {
                                          return this.innerslot.clear();
                                        }
                                      ;
                                      }
                                    ;
                                    };
                                    return InboxView;
                                  })(View);
                                  InfoView = (function(_super) {
                                    __extends(InfoView, _super);
                                    function InfoView(_, slot, match) {
                                      var info, _this, __this = this;
                                      var __frame = {
                                        name: "InfoView",
                                        line: 1000
                                      };
                                      return __func(_, this, arguments, InfoView, 0, __frame, function __$InfoView() {
                                        _this = __this;
                                        __this.slot = slot;
                                        __this.clean = function(force) {
                                          return InfoView.prototype.clean.apply(_this, arguments);
                                        };
                                        __this.dirty = function() {
                                          return InfoView.prototype.dirty.apply(_this, arguments);
                                        };
                                        __this.draw = function() {
                                          return InfoView.prototype.draw.apply(_this, arguments);
                                        };
                                        __this["delete"] = function() {
                                          return InfoView.prototype.delete.apply(_this, arguments);
                                        };
                                        __this.context = __this.slot.getContentNode();
                                        __this.id = match[1];
                                        __this.contentNode = $(".infocontent", __this.context);
                                        return model.cache.getInformation(__cb(_, __frame, 19, 18, function ___(__0, __1) {
                                          __this.info = __1;
                                          __this.info.onChanged(__this.draw);
                                          __this.info.onDeleted(__this.delcb = function() {
                                            return _this.slot.setView("")();
                                          });
                                          info = __this.info;
                                          $(".setStatus > button", __this.context).click(function(ev) {
                                            var status;
                                            ev.preventDefault();
                                            status = $(this).attr("name");
                                            if (!(((status === "delete") && !confirm("Really delete?")))) {
                                              return info.setStatus((function() {
                                              
                                              }), status);
                                            }
                                          ;
                                          });
                                          (__this.savebutton = $("button[name=save]", __this.context)).hide();
                                          __this.delayPicker = new TimePicker($(".delay"), {
                                            name: "Delay",
                                            change: function(date) {
                                              return info.setDelay((function() {
                                              
                                              }), date);
                                            }
                                          });
                                          __this.savebutton.click(function(ev) {
                                            ev.preventDefault();
                                            return _this.clean(true);
                                          });
                                          new Uploader($(".upload", __this.context));
                                          __this.refManager = new ReferenceList($(".references", __this.context), __this.info);
                                          __this.initContent();
                                          __this.draw();
                                          new Flippable($(".options", __this.context), null).addToggler($("button[name=options]", __this.context));
                                          _();
                                        }, true), __this.id);
                                      });
                                    };
                                    InfoView.prototype["delete"] = function() {
                                      this.info.removeCb("changed", this.draw);
                                      return this.info.removeCb("deleted", this.delcb);
                                    };
                                    InfoView.prototype.draw = function() {
                                      this.drawTitle();
                                      this.drawFrame();
                                      return this.drawContent();
                                    };
                                    InfoView.prototype.dirty = function() {
                                      this.dirtStamp = (new Date().getTime)();
                                      this.savebutton.show(400);
                                      return setTimeout(this.clean, 5000);
                                    };
                                    InfoView.prototype.clean = function(force) {
                                      if ((((this.dirtStamp != null)) && (((((new Date().getTime)() - this.dirtStamp) >= 5000) || force)))) {
                                        this.save();
                                        this.dirtStamp = null;
                                        return this.savebutton.hide(1000);
                                      }
                                    ;
                                    };
                                    InfoView.prototype.drawFrame = function() {
                                      $(".setStatus > button", this.context).removeClass("active");
                                      $(((".setStatus > button[name=" + this.info.status) + "]"), this.context).addClass("active");
                                      $("span.created_at", this.context).attr("x-time", this.info.createdAt);
                                      $("span.last_edited", this.context).attr("x-time", this.info.lastEdited);
                                      this.delayPicker.setDate(((this.info.delay != null) ? new Date(this.info.delay) : null));
                                      return this.refManager.setList(this.info.references);
                                    };
                                    return InfoView;
                                  })(View);
                                  NoteView = (function(_super) {
                                    __extends(NoteView, _super);
                                    function NoteView() {
                                      return NoteView.__super__.constructor.apply(this, arguments);
                                    };
                                    NoteView.registerView(/^note:(.*)$/, NoteView, function __1(_, match) {
                                      var __frame = {
                                        name: "__1",
                                        line: 1097
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return model.cache.getInformation(__cb(_, __frame, 1, 25, function ___(__0, __2) {
                                          var __1 = ("Note: " + (__2.content));
                                          return _(null, __1);
                                        }, true), match[1]);
                                      });
                                    });
                                    NoteView.prototype.drawTitle = function() {
                                      return this.slot.setTitle("Note");
                                    };
                                    NoteView.prototype.drawContent = function NoteView_prototype_drawContent__2(_) {
                                      var __this = this;
                                      var __frame = {
                                        name: "NoteView_prototype_drawContent__2",
                                        line: 1105
                                      };
                                      return __func(_, this, arguments, NoteView_prototype_drawContent__2, 0, __frame, function __$NoteView_prototype_drawContent__2() {
                                        __this.area.val(__this.info.content);
                                        return setTimeout(__cb(_, __frame, 2, 6, function __$NoteView_prototype_drawContent__2() {
                                          return _(null, __this.area.trigger("autosize"));
                                        }, true), 1);
                                      });
                                    };
                                    NoteView.prototype.initContent = function() {
                                      var _this = this;
                                      this.area = $("textarea", this.contentNode);
                                      this.area.autosize({
                                        append: "\n"
                                      });
                                      this.area.keyup(this.dirty);
                                      return this.area.change(function() {
                                        _this.dirty();
                                        return _this.clean(true);
                                      });
                                    };
                                    NoteView.prototype.save = function NoteView_prototype_save__3(_) {
                                      var msg, __this = this;
                                      var __frame = {
                                        name: "NoteView_prototype_save__3",
                                        line: 1124
                                      };
                                      return __func(_, this, arguments, NoteView_prototype_save__3, 0, __frame, function __$NoteView_prototype_save__3() {
                                        return (function __$NoteView_prototype_save__3(__then) {
                                          if ((__this.info.content !== __this.area.val())) {
                                            msg = message("Saving…");
                                            return __this.info.setContent(__cb(_, __frame, 4, 8, function __$NoteView_prototype_save__3() {
                                              if (((typeof error !== "undefined") && (error !== null))) {
                                                return _(null, msg.html("Save failed!"));
                                              }
                                               else {
                                                return _(null, msg.html("Saved!"));
                                              }
                                            ;
                                              __then();
                                            }, true), __this.area.val());
                                          }
                                           else {
                                            __then();
                                          }
                                        ;
                                        })(_);
                                      });
                                    };
                                    return NoteView;
                                  })(InfoView);
                                  AsapListView = (function(_super) {
                                    __extends(AsapListView, _super);
                                    function AsapListView() {
                                      return AsapListView.__super__.constructor.apply(this, arguments);
                                    };
                                    AsapListView.registerView(/^asaplist:(.*)$/, AsapListView, function __1(_, match) {
                                      var __frame = {
                                        name: "__1",
                                        line: 1149
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return model.cache.getInformation(__cb(_, __frame, 1, 30, function ___(__0, __2) {
                                          var __1 = ("ToDo List: " + (__2.name));
                                          return _(null, __1);
                                        }, true), match[1]);
                                      });
                                    });
                                    AsapListView.prototype.drawTitle = function() {
                                      return this.slot.setTitle(this.info.name);
                                    };
                                    AsapListView.prototype.drawContent = function AsapListView_prototype_drawContent__2(_) {
                                      var __this = this;
                                      var __frame = {
                                        name: "AsapListView_prototype_drawContent__2",
                                        line: 1157
                                      };
                                      return __func(_, this, arguments, AsapListView_prototype_drawContent__2, 0, __frame, function __$AsapListView_prototype_drawContent__2() {
                                        __this.newname.val(__this.info.name);
                                        return model.Asap.getAllIDs(__cb(_, __frame, 2, 6, function __$AsapListView_prototype_drawContent__2() {
                                          return _(null, __this.list.setList(__this.info.asaps));
                                        }, true));
                                      });
                                    };
                                    AsapListView.prototype.initContent = function() {
                                      var active, togglebutton, _this = this;
                                      this.contentNode.addClass("hideinactive");
                                      active = true;
                                      togglebutton = $("button[name=toggleshow]");
                                      togglebutton.click(function() {
                                        if (active) {
                                          active = false;
                                          togglebutton.html("Show only active");
                                          _this.contentNode.removeClass("hideinactive");
                                        }
                                         else {
                                          active = true;
                                          togglebutton.html("Show all");
                                          _this.contentNode.addClass("hideinactive");
                                        }
                                      ;
                                        return false;
                                      });
                                      this.newname = $("input[name=newname]", this.contentNode);
                                      $("form", this.contentNode).submit(function(ev) {
                                        ev.preventDefault();
                                        return _this.info.rename((function() {
                                        
                                        }), _this.newname.val());
                                      });
                                      new AsapCreator($(".newtodo", this.contentNode), this.info);
                                      return this.list = new InfoListManager($("tbody", this.contentNode), function(autocb, asap) {
                                        var create, deadlinePicker, delayPicker, delparent, descFlippable, descform, descinput, desclabel, donebox, last, listPicker, project, refManager, set;
                                        refManager = new ReferenceList($(".refs", entry), asap);
                                        delayPicker = new TimePicker($(".delay", entry), {
                                          name: "",
                                          change: function(date) {
                                            return asap.setDelay((function() {
                                            
                                            }), date);
                                          }
                                        });
                                        deadlinePicker = new TimePicker($(".deadline", entry), {
                                          name: "",
                                          change: function(date) {
                                            return asap.setDeadline((function() {
                                            
                                            }), date);
                                          }
                                        });
                                        listPicker = new ListPicker($("td.listsel", entry));
                                        listPicker.onChanged(function(list) {
                                          return asap.setList((function() {
                                          
                                          }), list);
                                        });
                                        donebox = $("input[type=checkbox]", entry);
                                        donebox.click(function() {
                                          if (donebox.is(":checked")) {
                                            return asap.done((function() {
                                            
                                            }));
                                          }
                                           else {
                                            return asap.undo((function() {
                                            
                                            }));
                                          }
                                        ;
                                        });
                                        desclabel = $(".desc > span", entry);
                                        descform = $(".desc > form", entry);
                                        descinput = $(".desc > form > input", entry);
                                        descform.submit(function(ev) {
                                          return (function __1(_) {
                                            var __frame = {
                                              name: "__1",
                                              line: 1218
                                            };
                                            return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                              ev.preventDefault();
                                              return asap.setDescription(__cb(_, __frame, 2, 12, function __$__1() {
                                                return _(null, descFlippable.showFront());
                                              }, true), descinput.val());
                                            });
                                          })();
                                        });
                                        descFlippable = new Flippable(desclabel, descform, 0);
                                        descFlippable.addToggler(desclabel);
                                        last = $(".last", entry);
                                        create = $(".create", entry);
                                        project = $(".project", entry);
                                        new DropArea(project, function __1(viewname, _) {
                                          var id, parent, _ref;
                                          var __frame = {
                                            name: "__1",
                                            line: 1229
                                          };
                                          return __func(_, this, arguments, __1, 1, __frame, function __$__1() {
                                            return (function __$__1(__then) {
                                              if (((id = (((_ref = /project:(.*)$/.exec(viewname)) != null) ? _ref[1] : void 0)) != null)) {
                                                return model.cache.getInformation(__cb(_, __frame, 3, 21, function ___(__0, __1) {
                                                  parent = __1;
                                                  if ((parent != null)) {
                                                    return _(null, asap.setParent((function() {
                                                    
                                                    }), parent));
                                                  }
                                                ;
                                                  __then();
                                                }, true), id);
                                              }
                                               else {
                                                __then();
                                              }
                                            ;
                                            })(_);
                                          });
                                        });
                                        $("td > button[name=delete]", entry).click(function() {
                                          if (confirm("Really delete?")) {
                                            return asap.setStatus((function() {
                                            
                                            }), "delete");
                                          }
                                        ;
                                        });
                                        delparent = function() {
                                          return asap.setParent((function() {
                                          
                                          }), null);
                                        };
                                        asap.onChanged(set = function set__2(asap, _) {
                                          var parent;
                                          var __frame = {
                                            name: "set__2",
                                            line: 1246
                                          };
                                          return __func(_, this, arguments, set__2, 1, __frame, function __$set__2() {
                                            if ((((asap.completed != null)) || !asap.active)) {
                                              entry.addClass("inactive");
                                            }
                                             else {
                                              entry.removeClass("inactive");
                                            }
                                          ;
                                            if ((((asap.completed == null)) && asap.overdue)) {
                                              $(".deadline", entry).addClass("overdue");
                                            }
                                             else {
                                              $(".deadline", entry).removeClass("overdue");
                                            }
                                          ;
                                            donebox.prop("checked", (asap.completed != null));
                                            desclabel.html(asap.description);
                                            descinput.val(asap.description);
                                            if ((asap.references != null)) {
                                              refManager.setList(asap.references);
                                            }
                                          ;
                                            return model.cache.getInformation(__cb(_, __frame, 18, 19, function ___(__0, __1) {
                                              parent = __1;
                                              project.html(((parent != null) ? createInfoButton(parent, false, delparent) : ""));
                                              delayPicker.setDate(((asap.delay != null) ? new Date(asap.delay) : null));
                                              deadlinePicker.setDate(((asap.deadline != null) ? new Date(asap.deadline) : null));
                                              last.attr("x-time", asap.lastEdited);
                                              create.attr("x-time", asap.createdAt);
                                              return _(null, listPicker.sel(asap.asaplist));
                                            }, true), asap.parent);
                                          });
                                        });
                                        set(asap);
                                        return entry;
                                      });
                                    };
                                    return AsapListView;
                                  })(InfoView);
                                  TaskList = (function(_super) {
                                    __extends(TaskList, _super);
                                    function TaskList(node) {
                                      TaskList.__super__.constructor.call(this, node, function(autocb, task) {
                                        var childrenList, collapsebutton, descFlippable, descform, descinput, desclabel, donebox, draw, drawboth, listid;
                                        $("button[name=delete]", entry).click(function() {
                                          if (confirm("Really delete?")) {
                                            return task.setStatus((function() {
                                            
                                            }), "delete");
                                          }
                                        ;
                                        });
                                        donebox = $("input[name=completed]", entry);
                                        donebox.click(function() {
                                          if (donebox.prop("checked")) {
                                            return task.done((function() {
                                            
                                            }));
                                          }
                                           else {
                                            return task.undo((function() {
                                            
                                            }));
                                          }
                                        ;
                                        });
                                        switch (task.type) {
                                        case "project":
                                          collapsebutton = $("button.collapse", entry);
                                          collapsebutton.click(function(ev) {
                                            ev.preventDefault();
                                            if (task.collapsed) {
                                              return task.uncollapse((function() {
                                              
                                              }));
                                            }
                                             else {
                                              return task.collapse((function() {
                                              
                                              }));
                                            }
                                          ;
                                          });
                                          childrenList = new TaskList($(".children", entry));
                                          desclabel = $("form > span.name", entry);
                                          descinput = $("form > input", entry);
                                          descform = $("form", entry);
                                          descform.submit(function(ev) {
                                            (function __1(_) {
                                              var __frame = {
                                                name: "__1",
                                                line: 1317
                                              };
                                              return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                                return (function __$__1(__then) {
                                                  if (descFlippable.flipped) {
                                                    return task.setDescription(__cb(_, __frame, 2, 18, __then, true), descinput.val());
                                                  }
                                                   else {
                                                    __then();
                                                  }
                                                ;
                                                })(function __$__1() {
                                                  return _(null, descFlippable.toggle());
                                                });
                                              });
                                            })();
                                            return false;
                                          });
                                          descFlippable = new Flippable(desclabel, descinput);
                                          draw = function(project) {
                                            collapsebutton.html((project.collapsed ? ">" : "v"));
                                            childrenList.setList(((project.collapsed || ((project.children == null))) ? [] : project.children));
                                            desclabel.html(project.description);
                                            return descinput.val(project.description);
                                          };
                                          new DropArea($(".projecthandle", entry), function __1(viewname, _) {
                                            var child, id, _ref;
                                            var __frame = {
                                              name: "__1",
                                              line: 1332
                                            };
                                            return __func(_, this, arguments, __1, 1, __frame, function __$__1() {
                                              return (function __$__1(__then) {
                                                if (((id = (((_ref = /(asap|project):(.*)$/.exec(viewname)) != null) ? _ref[2] : void 0)) != null)) {
                                                  return model.cache.getInformation(__cb(_, __frame, 3, 24, function ___(__0, __1) {
                                                    child = __1;
                                                    return (function __$__1(__then) {
                                                      if ((child != null)) {
                                                        return child.setParent(__cb(_, __frame, 5, 25, _, true), task);
                                                      }
                                                       else {
                                                        __then();
                                                      }
                                                    ;
                                                    })(__then);
                                                  }, true), id);
                                                }
                                                 else {
                                                  __then();
                                                }
                                              ;
                                              })(_);
                                            });
                                          });
                                          new Emitter(desclabel).setViewName(("project:" + task.id));
                                          break;
                                        case "asap":
                                          $("span.description", entry).html(createInfoButton(task));
                                          listid = null;
                                          draw = function draw__2(asap, _) {
                                            var list;
                                            var __frame = {
                                              name: "draw__2",
                                              line: 1346
                                            };
                                            return __func(_, this, arguments, draw__2, 1, __frame, function __$draw__2() {
                                              return (function __$draw__2(__then) {
                                                if (((listid !== asap.asaplist) && ((asap.asaplist != null)))) {
                                                  listid = asap.asaplist;
                                                  return model.cache.getInformation(__cb(_, __frame, 4, 23, function ___(__0, __1) {
                                                    list = __1;
                                                    return _(null, $("span.list", entry).html(createInfoButton(list)));
                                                  }, true), listid);
                                                }
                                                 else {
                                                  __then();
                                                }
                                              ;
                                              })(_);
                                            });
                                          };
                                        };
                                        drawboth = function(task) {
                                          donebox.prop("checked", (task.completed != null));
                                          if ((task.active && ((task.completed == null)))) {
                                            entry.removeClass("inactive");
                                          }
                                           else {
                                            entry.addClass("inactive");
                                          }
                                        ;
                                          if ((task.parent != null)) {
                                            return entry.addClass("hasparent");
                                          }
                                           else {
                                            return entry.removeClass("hasparent");
                                          }
                                        ;
                                        };
                                        task.onChanged(draw);
                                        task.onChanged(drawboth);
                                        draw(task);
                                        drawboth(task);
                                        return entry;
                                      });
                                    };
                                    return TaskList;
                                  })(InfoListManager);
                                  TaskView = (function(_super) {
                                    __extends(TaskView, _super);
                                    function TaskView() {
                                      return TaskView.__super__.constructor.apply(this, arguments);
                                    };
                                    TaskView.prototype.drawContent = function() {
                                    
                                    };
                                    TaskView.prototype.initContent = function() {
                                      var active, togglebutton, _this = this;
                                      this.contentNode.addClass("hideinactive");
                                      active = true;
                                      togglebutton = $("button[name=toggleshow]");
                                      togglebutton.click(function() {
                                        if (active) {
                                          active = false;
                                          togglebutton.html("Show only active");
                                          _this.contentNode.removeClass("hideinactive");
                                        }
                                         else {
                                          active = true;
                                          togglebutton.html("Show all");
                                          _this.contentNode.addClass("hideinactive");
                                        }
                                      ;
                                        return false;
                                      });
                                      new DropArea($(".root", this.contentNode), function __1(viewname, _) {
                                        var id, _ref;
                                        var __frame = {
                                          name: "__1",
                                          line: 1408
                                        };
                                        return __func(_, this, arguments, __1, 1, __frame, function __$__1() {
                                          return (function __$__1(__then) {
                                            if (((id = (((_ref = /(asap|project):(.*)$/.exec(viewname)) != null) ? _ref[2] : void 0)) != null)) {
                                              return model.cache.getInformation(__cb(_, __frame, 3, 16, function ___(__0, __1) {
                                                child(__1);
                                                if (!(((((typeof error !== "undefined") && (error !== null))) || (((typeof child === "undefined") || (child === null)))))) {
                                                  return _(null, child.setParent((function() {
                                                  
                                                  }), null));
                                                }
                                              ;
                                                __then();
                                              }, true), id);
                                            }
                                             else {
                                              __then();
                                            }
                                          ;
                                          })(_);
                                        });
                                      });
                                      return new TaskList($(".tasklist", this.contentNode)).setList([this.info.id,]);
                                    };
                                    return TaskView;
                                  })(InfoView);
                                  ProjectView = (function(_super) {
                                    __extends(ProjectView, _super);
                                    function ProjectView() {
                                      return ProjectView.__super__.constructor.apply(this, arguments);
                                    };
                                    ProjectView.registerView(/^project:(.*)$/, ProjectView, function __1(_, match) {
                                      var __frame = {
                                        name: "__1",
                                        line: 1432
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return model.cache.getInformation(__cb(_, __frame, 1, 28, function ___(__0, __2) {
                                          var __1 = ("Project: " + (__2.description));
                                          return _(null, __1);
                                        }, true), match[1]);
                                      });
                                    });
                                    ProjectView.prototype.drawTitle = function() {
                                      return this.slot.setTitle(("Project: " + this.info.description));
                                    };
                                    return ProjectView;
                                  })(TaskView);
                                  AsapView = (function(_super) {
                                    __extends(AsapView, _super);
                                    function AsapView() {
                                      return AsapView.__super__.constructor.apply(this, arguments);
                                    };
                                    AsapView.registerView(/^asap:(.*)$/, AsapView, function __1(_, match) {
                                      var __frame = {
                                        name: "__1",
                                        line: 1452
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return model.cache.getInformation(__cb(_, __frame, 1, 25, function ___(__0, __2) {
                                          var __1 = ("ToDo: " + (__2.description));
                                          return _(null, __1);
                                        }, true), match[1]);
                                      });
                                    });
                                    AsapView.prototype.drawTitle = function() {
                                      return this.slot.setTitle("To Do");
                                    };
                                    return AsapView;
                                  })(InfoView);
                                  ProjectsView = (function(_super) {
                                    __extends(ProjectsView, _super);
                                    ProjectsView.registerView(/^projects$/, ProjectsView, function __1(_) {
                                      var __frame = {
                                        name: "__1",
                                        line: 1468
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return _(null, "Projects");
                                      });
                                    });
                                    function ProjectsView(slot) {
                                      var active, creator, togglebutton, _this = this;
                                      this.slot = slot;
                                      this.contentNode = this.slot.getContentNode();
                                      this.slot.setTitle("Projects");
                                      this.contentNode.append(creator = $("<div/>"));
                                      new ProjectCreator(creator);
                                      this.contentNode.append(creator = $("<div/>"));
                                      new AsapCreator(creator);
                                      this.contentNode.append(creator = $("<div/>"));
                                      new AsapListCreator(creator);
                                      this.contentNode.addClass("hideinactive hidechildren");
                                      active = true;
                                      togglebutton = $("button[name=toggleshow]");
                                      togglebutton.click(function() {
                                        if (active) {
                                          active = false;
                                          togglebutton.html("Show only active");
                                          _this.contentNode.removeClass("hideinactive");
                                        }
                                         else {
                                          active = true;
                                          togglebutton.html("Show all");
                                          _this.contentNode.addClass("hideinactive");
                                        }
                                      ;
                                        return false;
                                      });
                                      this.projectList = new TaskList($(".tasklist", this.contentNode));
                                      new DropArea($(".root", this.contentNode), function __1(viewname, _) {
                                        var child, id, _ref;
                                        var __frame = {
                                          name: "__1",
                                          line: 1500
                                        };
                                        return __func(_, this, arguments, __1, 1, __frame, function __$__1() {
                                          return (function __$__1(__then) {
                                            if (((id = (((_ref = /(asap|project):(.*)$/.exec(viewname)) != null) ? _ref[2] : void 0)) != null)) {
                                              return model.cache.getInformation(__cb(_, __frame, 3, 18, function ___(__0, __1) {
                                                child = __1;
                                                return (function __$__1(__then) {
                                                  if ((child != null)) {
                                                    return child.setParent(__cb(_, __frame, 5, 19, _, true), null);
                                                  }
                                                   else {
                                                    __then();
                                                  }
                                                ;
                                                })(__then);
                                              }, true), id);
                                            }
                                             else {
                                              __then();
                                            }
                                          ;
                                          })(_);
                                        });
                                      });
                                      model.Project.getAllIDs(catchNull(this.projectList.setList));
                                      model.Project.onChanged(this.projectList.setList);
                                    };
                                    ProjectsView.prototype["delete"] = function() {
                                    
                                    };
                                    return ProjectsView;
                                  })(View);
                                  InboxView = (function(_super) {
                                    __extends(InboxView, _super);
                                    InboxView.registerView(/^$/, InboxView, function __1(_) {
                                      var __frame = {
                                        name: "__1",
                                        line: 1523
                                      };
                                      return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                                        return _(null, "Secretarius");
                                      });
                                    });
                                    function InboxView(slot) {
                                      this.slot = slot;
                                      new NoteCreator($(".newnote", this.contentNode));
                                      new AsapListsList($(".lists", this.contentNode));
                                      new AsapListCreator($(".newlist", this.contentNode));
                                    };
                                    InboxView.prototype["delete"] = function() {
                                    
                                    };
                                    return InboxView;
                                  })(View);
                                  return __construct(WindowSlot, 0)(__cb(_, __frame, NaN, NaN, function ___(__0, __34) {
                                    win = __34;
                                    $(function() {
                                      return ko.applyBindings(win);
                                    });
                                    return win.showMessage(__cb(_, __frame, 1545, 2, function __$__1() {
                                      return setTimeout(__cb(_, __frame, 1547, 2, function __$__1() {
                                        return win.showMessage(__cb(_, __frame, 1549, 2, function __$__1() {
                                          return setTimeout(__cb(_, __frame, 1551, 2, function __$__1() {
                                            return win.showMessage(__cb(_, __frame, 1553, 2, function __$__1() {
                                              return setTimeout(__cb(_, __frame, 1555, 2, function __$__1() {
                                                return win.showMessage(__cb(_, __frame, 1557, 2, function __$__1() {
                                                  return setTimeout(__cb(_, __frame, 1559, 2, function __$__1() {
                                                    return win.showMessage(__cb(_, __frame, 1561, 2, _, true), "Komisch");
                                                  }, true), 1000);
                                                }, true), "Aber");
                                              }, true), 1000);
                                            }, true), "Bist");
                                          }, true), 1000);
                                        }, true), "Du");
                                      }, true), 1000);
                                    }, true), "Hallo");
                                  }, true));
                                }, true));
                              }, true));
                            }, true));
                          }, true));
                        }, true));
                      }, true));
                    }, true));
                  }, true));
                }, true));
              }, true));
            }, true));
          }, true));
        }, true));
      }, true));
    })(__cb(_, __frame, 1563, 0, _, true));
  });
}).call(this, __trap);
})("/secretarius.js")
},{"./vendor/jquery":2,"./vendor/jquery.autosize":1,"./vendor/date.extensions":3,"./vendor/knockout":4,"streamline/lib/callbacks/runtime":6,"libsecretarius":7}],8:[function(require,module,exports){(function(global){/// !doc
/// 
/// # Container for global context
/// 
/// The `globals` module is a container for the global `context` object which is maintained across
/// asynchronous calls.
/// 
/// This context is very handy to store information that all calls should be able to access
/// but that you don't want to pass explicitly via function parameters. The most obvious example is
/// the `locale` that each request may set differently and that your low level libraries should
/// be able to retrieve to format messages.
/// 
/// `var globals = require('streamline/lib/globals')`
/// 
/// * `globals.context = ctx`
/// * `ctx = globals.context`  
///   sets and gets the context
/// 
/// Note: an empty context (`{}`) is automatically set by the server wrappers of the `streams` module,
/// before they dispatch a request. So, with these wrappers, each request starts with a fresh empty context.
// This module may be loaded several times so we need a true global (with a secret name!).
// This implementation also allows us to share the context between modules compiled in callback and fibers mode.
var glob = typeof global === "object" ? global : window;
var secret = "_20c7abceb95c4eb88b7ca1895b1170d1";
module.exports = (glob[secret] = (glob[secret] || {}));

})(window)
},{}],7:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function() {
  var util, __indexOf = ([].indexOf || function(item) {
    for (var i = 0, l = this.length; (i < l); i++) { if (((i in this) && (this[i] === item))) { return i }; }; return -1;
  }), __hasProp = { }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = function(host) {
    var Inbox, InfoCache, ModelObject, PGObject, getInfos, httprequest, inBrowser, model, port, r, request, updatecb, _this = this;

    if ((host == null)) {
      host = "http://localhost:3000"; } ;

    model = { };
    inBrowser = ((typeof window !== "undefined") && (window !== null));
    ModelObject = (function() {
      var cbs;

      function ModelObject() {
        var _this = this;
        this.emit = function(event, data) {
          return ModelObject.prototype.emit.apply(_this, arguments); }; };



      ModelObject.prototype.on = function(event, cb) {
        if ((this._cbs == null)) {
          this._cbs = { }; } ;

        if ((this._cbs[event] == null)) {
          this._cbs[event] = []; } ;

        if ((__indexOf.call(this._cbs[event], cb) < 0)) {
          return this._cbs[event].push(cb); } ; };



      ModelObject.prototype.emit = function(event, data) {
        var cb, _i, _len, _ref, _ref1, _results;
        if ((((((_ref = this._cbs) != null) ? _ref[event] : void 0)) != null)) {
          _ref1 = this._cbs[event];
          _results = [];
          for (_i = 0, _len = _ref1.length; (_i < _len); _i++) {
            cb = _ref1[_i];
            _results.push(cb.call(this, data)); };

          return _results; } ; };



      ModelObject.prototype.removeCb = function(event, cb) {
        var elem;
        this._cbs[event] = (function() {
          var _i, _len, _ref, _results;
          _ref = this._cbs[event];
          _results = [];
          for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
            elem = _ref[_i];
            if ((elem !== cb)) {
              _results.push(elem); } ; };


          return _results;
        }).call(this);
        if ((this._cbs[event] === [])) {
          delete this._cbs[event]; } ;

        return debug(event, "callback removed", this.constructor.name); };


      ModelObject.prototype.onChanged = function(cb) {
        return this.on("changed", cb); };


      ModelObject.prototype.onDeleted = function(cb) {
        return this.on("deleted", cb); };


      ModelObject.prototype.change = function(data) {
        return this.emit("changed", data); };


      ModelObject.prototype["delete"] = function() {
        return this.emit("deleted"); };


      cbs = { };

      ModelObject.on = function(event, cb) {
        var obj;
        if ((cbs[this.name] == null)) {
          cbs[this.name] = { }; } ;

        obj = cbs[this.name];
        if ((obj[event] == null)) {
          obj[event] = []; } ;

        if ((__indexOf.call(obj[event], cb) < 0)) {
          return obj[event].push(cb); } ; };



      ModelObject.emit = function(event, data) {
        var cb, _i, _len, _ref, _ref1, _results;
        if ((((((_ref = cbs[this.name]) != null) ? _ref[event] : void 0)) != null)) {
          _ref1 = cbs[this.name][event];
          _results = [];
          for (_i = 0, _len = _ref1.length; (_i < _len); _i++) {
            cb = _ref1[_i];
            _results.push(cb(data)); };

          return _results; } ; };



      ModelObject.removeCb = function(event, cb) {
        var elem;
        cbs[this.name][event] = (function() {
          var _i, _len, _ref, _results;
          _ref = cbs[this.name][event];
          _results = [];
          for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
            elem = _ref[_i];
            if ((elem !== cb)) {
              _results.push(elem); } ; };


          return _results;
        }).call(this);
        if ((cbs[this.name][event] === [])) {
          delete cbs[this.name][event]; } ;

        return debug(event, "callback removed", this.name); };


      ModelObject.onChanged = function(cb) {
        return this.on("changed", cb); };


      ModelObject.onDeleted = function(cb) {
        return this.on("deleted", cb); };


      ModelObject.change = function(data) {
        return this.emit("changed", data); };


      return ModelObject;

    })();
    InfoCache = (function() {

      function InfoCache() {
        this.infos = { }; };


      InfoCache.prototype.registerInfo = function(info) {
        return this.infos[info.id] = info; };


      InfoCache.prototype["delete"] = function(id) {
        if ((this.infos[id] != null)) {
          this.infos[id]["delete"]();
          return this.unregisterInfo(this.infos[id]); } ; };



      InfoCache.prototype.unregisterInfo = function(info) {
        if ((((info.id != null)) && ((this.infos[info.id] != null)))) {
          return delete this.infos[info.id]; } ; };



      InfoCache.prototype.updateInfo = function(values) {
        return this.storeInfo(values, true); };


      InfoCache.prototype.storeInfo = function(values, mustExist) {
        var info;
        if ((mustExist == null)) {
          mustExist = false; } ;

        if (!(((((info = this.infos[values.id]) != null)) || mustExist))) {
          info = new (util.findElement(values.type, model))(values.id);
          this.registerInfo(info); } ;

        return ((info != null) ? info._store(values) : void 0); };


      InfoCache.prototype.getInformation = util.singlify(function __1(_, id) { var __this = this; var __frame = { name: "__1", line: 189 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return (function __$__1(__then) {
            if ((((id != null)) && util.UUID_REG.test(id))) { return (function __$__1(__then) {
                if ((__this.infos[id] == null)) {
                  return new model.Information(id)._get(__cb(_, __frame, 3, 27, function ___(__0, __1) { __this.storeInfo(__1); __then(); }, true)); } else { __then(); } ; })(function __$__1() {

                return _(null, __this.infos[id]); }); } else {

              return _(null, null); } ; })(_); }); });



      return InfoCache;

    })();
    model.cache = new InfoCache;
    updatecb = function(data, name) {
      switch (name) {
      case "changed": return model.cache.updateInfo(data);
      case "inbox":
        return model.inbox._store((function() {
         }), data); case "deleted":
        model.cache["delete"](data.id);
        return util.findElement(data.type, model).deleted(data.id);
      case "new":
        return util.findElement(data.type, model)["new"](data.id);
      }; };


    if (inBrowser) {
      port = new SharedWorker("events.js").port;
      port.addEventListener("message", function(event) {
        return updatecb(event.data.data, event.data.name); });

      port.start(); }
     else {
      r = require;
      r("./events")(updatecb); } ;

    getInfos = function getInfos__1(_, cls, filter, params) { var list, values, _i, _len; var __frame = { name: "getInfos__1", line: 227 }; return __func(_, this, arguments, getInfos__1, 0, __frame, function __$getInfos__1() {

        if ((params == null)) {
          params = { }; } ;

        params.filter = filter;
        return new cls()._get(__cb(_, __frame, 6, 13, function ___(__0, __1) { list = __1;
          for (_i = 0, _len = list.length; (_i < _len); _i++) {
            values = list[_i];
            model.cache.storeInfo(values); };

          return _(null, list); }, true), params); }); };

    if (inBrowser) {
      request = function(cb, type, data, url) {
        var options;
        options = {
          url: url,
          type: type,
          success: util.addNull(cb),
          dataType: "json" };

        if ((data != null)) {
          request.data = data; } ;

        return $.ajax(options); }; }

     else {
      httprequest = r("request");
      request = function request__2(_, type, data, url) { var options; var __frame = { name: "request__2", line: 256 }; return __func(_, this, arguments, request__2, 0, __frame, function __$request__2() {

          options = {
            method: type.toUpperCase(),
            url: ((("" + host) + "/") + url),
            json: true,
            form: data };

          return httprequest(options, __cb(_, __frame, 8, 15, function ___(__0, __2) { var __1 = __2.body; return _(null, __1); }, true)); }); }; } ;


    PGObject = (function(_super) {

      __extends(PGObject, _super);

      function PGObject(id) {
        this.id = id; };


      PGObject.prototype._get = function PGObject_prototype__get__1(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__get__1", line: 275 }; return __func(_, this, arguments, PGObject_prototype__get__1, 0, __frame, function __$PGObject_prototype__get__1() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "get", data, url); }); };


      PGObject.prototype._put = function PGObject_prototype__put__2(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__put__2", line: 279 }; return __func(_, this, arguments, PGObject_prototype__put__2, 0, __frame, function __$PGObject_prototype__put__2() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "put", data, url); }); };


      PGObject.prototype._delete = function PGObject_prototype__delete__3(_, url) { var __this = this; var __frame = { name: "PGObject_prototype__delete__3", line: 283 }; return __func(_, this, arguments, PGObject_prototype__delete__3, 0, __frame, function __$PGObject_prototype__delete__3() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "delete", url); }); };


      PGObject.prototype._patch = function PGObject_prototype__patch__4(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__patch__4", line: 287 }; return __func(_, this, arguments, PGObject_prototype__patch__4, 0, __frame, function __$PGObject_prototype__patch__4() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "patch", data, url); }); };


      PGObject.prototype._post = function PGObject_prototype__post__5(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__post__5", line: 291 }; return __func(_, this, arguments, PGObject_prototype__post__5, 0, __frame, function __$PGObject_prototype__post__5() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "post", data, url); }); };


      PGObject.prototype._call = function PGObject_prototype__call__6(_, type, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__call__6", line: 295 }; return __func(_, this, arguments, PGObject_prototype__call__6, 0, __frame, function __$PGObject_prototype__call__6() {
          if ((url == null)) {
            url = __this._url(); } ;

          console.log((((((("" + (type.toUpperCase())) + " ") + url) + " (") + (((data != null) ? JSON.stringify(data) : ""))) + ")"));
          return request(__cb(_, __frame, 5, 15, _, true), type, data, url); }); };


      return PGObject;

    })(ModelObject);
    model.Information = (function(_super) {
      var ids;

      __extends(Information, _super);

      function Information(id) {
        var tempType;
        this.id = id;
        this.values = false;
        tempType = this.constructor.name.toLowerCase();
        if ((tempType !== "information")) {
          this.type = tempType; } ; };



      Information.prototype._create = function Information_prototype__create__1(_, args) { var __this = this; var __frame = { name: "Information_prototype__create__1", line: 321 }; return __func(_, this, arguments, Information_prototype__create__1, 0, __frame, function __$Information_prototype__create__1() {
          return __this._post(__cb(_, __frame, 1, 18, function ___(__0, __1) { __this.id = __1.id;
            model.cache.registerInfo(__this);
            return _(null, __this.id); }, true), args); }); };


      Information.prototype.addReference = function Information_prototype_addReference__2(_, reference) { var __this = this; var __frame = { name: "Information_prototype_addReference__2", line: 327 }; return __func(_, this, arguments, Information_prototype_addReference__2, 0, __frame, function __$Information_prototype_addReference__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "addReference",
            reference: reference.id }); }); };



      Information.prototype.removeReference = function Information_prototype_removeReference__3(_, reference) { var __this = this; var __frame = { name: "Information_prototype_removeReference__3", line: 334 }; return __func(_, this, arguments, Information_prototype_removeReference__3, 0, __frame, function __$Information_prototype_removeReference__3() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "removeReference",
            reference: reference.id }); }); };



      Information.prototype.getType = function Information_prototype_getType__4(_) { var __this = this; var __frame = { name: "Information_prototype_getType__4", line: 341 }; return __func(_, this, arguments, Information_prototype_getType__4, 0, __frame, function __$Information_prototype_getType__4() { return (function __$Information_prototype_getType__4(__then) {
            if ((__this.type == null)) {
              return __this._get(__cb(_, __frame, 2, 22, function ___(__0, __1) { __this.type = __1.type; __then(); }, true), {
                filter: "type" }); } else { __then(); } ; })(function __$Information_prototype_getType__4() {


            return _(null, __this.type); }); }); };


      Information.prototype.get = function Information_prototype_get__5(_) { var __this = this; var __frame = { name: "Information_prototype_get__5", line: 350 }; return __func(_, this, arguments, Information_prototype_get__5, 0, __frame, function __$Information_prototype_get__5() { return (function __$Information_prototype_get__5(__then) {
            if (!__this.values) {
              return __this._get(__cb(_, __frame, 2, 22, function ___(__0, __1) { __this._store(__1); __then(); }, true), values); } else { __then(); } ; })(function __$Information_prototype_get__5() { return _(null, __this); }); }); };




      Information.prototype.setStatus = function Information_prototype_setStatus__6(_, status) { var __this = this; var __frame = { name: "Information_prototype_setStatus__6", line: 357 }; return __func(_, this, arguments, Information_prototype_setStatus__6, 0, __frame, function __$Information_prototype_setStatus__6() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setStatus",
            status: status }); }); };



      Information.prototype.setDelay = function Information_prototype_setDelay__7(_, delay) { var __this = this; var __frame = { name: "Information_prototype_setDelay__7", line: 364 }; return __func(_, this, arguments, Information_prototype_setDelay__7, 0, __frame, function __$Information_prototype_setDelay__7() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setDelay",
            delay: delay }); }); };



      Information.prototype.attach = function Information_prototype_attach__8(_, file) { var __this = this; var __frame = { name: "Information_prototype_attach__8", line: 371 }; return __func(_, this, arguments, Information_prototype_attach__8, 0, __frame, function __$Information_prototype_attach__8() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "attach",
            file: file.id }); }); };



      Information.prototype.detach = function Information_prototype_detach__9(_, file) { var __this = this; var __frame = { name: "Information_prototype_detach__9", line: 378 }; return __func(_, this, arguments, Information_prototype_detach__9, 0, __frame, function __$Information_prototype_detach__9() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "detach",
            file: file.id }); }); };



      Information.prototype.getReferences = function Information_prototype_getReferences__10(_) { var __this = this; var __frame = { name: "Information_prototype_getReferences__10", line: 385 }; return __func(_, this, arguments, Information_prototype_getReferences__10, 0, __frame, function __$Information_prototype_getReferences__10() {
          return __this._get(__cb(_, __frame, 1, 15, _, true), {
            filter: "references" }); }); };



      Information.prototype._url = function() {
        return (("" + (((this.type != null) ? this.type : "information"))) + (((this.id != null) ? ("/" + this.id) : ""))); };


      Information.prototype._store = function(values) {
        var key, value;
        this.values = true;
        for (key in values) {
          value = values[key];
          this[key] = value; };

        return this.change(values); };


      Information.getAll = util.singlify(function __11(_) { var all, info, __this = this; var __frame = { name: "__11", line: 405 }; return __func(_, this, arguments, __11, 0, __frame, function __$__11() {

          return getInfos(__cb(_, __frame, 2, 14, function ___(__0, __2) { all = __2;








            return (function __1(_) { var _i, _len, _results; _results = []; for (_i = 0, _len = all.length; (_i < _len); _i++) { info = all[_i]; _results.push(info.id); }; return _(null, _results); })(__cb(_, __frame, 11, 32, function ___(__0, __4) { var __3 = ids[__this.name] = __4; return _(null, __3); }, true)); }, true), __this, "all"); }); });


      ids = [];

      Information.getAllIDs = util.singlify(function __12(_) { var __this = this; var __frame = { name: "__12", line: 421 }; return __func(_, this, arguments, __12, 0, __frame, function __$__12() { return (function __$__12(__then) {
            if ((ids[__this.name] == null)) {
              return __this.getAll(__cb(_, __frame, 2, 10, __then, true)); } else { __then(); } ; })(function __$__12() {

            return _(null, ids[__this.name]); }); }); });


      Information["new"] = function(id) {
        if (ids[this.name]) {
          ids[this.name].push(id);
          return this.change(ids[this.name]); } ; };



      Information.deleted = function(id) {
        var i;
        if (ids[this.name]) {
          ids[this.name] = (function() {
            var _i, _len, _ref, _results;
            _ref = ids[this.name];
            _results = [];
            for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
              i = _ref[_i];
              if ((i !== id)) {
                _results.push(i); } ; };


            return _results;
          }).call(this);
          return this.change(ids[this.name]); } ; };



      return Information;

    })(PGObject);
    "class File extends PGObject\n	create: (name) ->\n	getName: ->\n	delete: ->";
    model.Note = (function(_super) {

      __extends(Note, _super);

      function Note() {
        return Note.__super__.constructor.apply(this, arguments); };


      Note.prototype.create = function Note_prototype_create__1(_, content) { var __this = this; var __frame = { name: "Note_prototype_create__1", line: 466 }; return __func(_, this, arguments, Note_prototype_create__1, 0, __frame, function __$Note_prototype_create__1() {
          return __this._create(__cb(_, __frame, 1, 15, _, true), {
            content: content }); }); };



      Note.prototype.setContent = function Note_prototype_setContent__2(_, content) { var __this = this; var __frame = { name: "Note_prototype_setContent__2", line: 472 }; return __func(_, this, arguments, Note_prototype_setContent__2, 0, __frame, function __$Note_prototype_setContent__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setContent",
            content: content }); }); };



      return Note;

    })(model.Information);
    model.Task = (function(_super) {

      __extends(Task, _super);

      function Task() {
        return Task.__super__.constructor.apply(this, arguments); };


      Task.prototype.done = function Task_prototype_done__1(_) { var __this = this; var __frame = { name: "Task_prototype_done__1", line: 490 }; return __func(_, this, arguments, Task_prototype_done__1, 0, __frame, function __$Task_prototype_done__1() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "done" }); }); };



      Task.prototype.undo = function Task_prototype_undo__2(_) { var __this = this; var __frame = { name: "Task_prototype_undo__2", line: 496 }; return __func(_, this, arguments, Task_prototype_undo__2, 0, __frame, function __$Task_prototype_undo__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "undo" }); }); };



      Task.prototype.setParent = function Task_prototype_setParent__3(_, parent) { var __this = this; var __frame = { name: "Task_prototype_setParent__3", line: 502 }; return __func(_, this, arguments, Task_prototype_setParent__3, 0, __frame, function __$Task_prototype_setParent__3() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            parent: ((parent != null) ? parent.id : void 0),
            method: "setParent" }); }); };



      Task.prototype.setDeadline = function Task_prototype_setDeadline__4(_, deadline) { var __this = this; var __frame = { name: "Task_prototype_setDeadline__4", line: 509 }; return __func(_, this, arguments, Task_prototype_setDeadline__4, 0, __frame, function __$Task_prototype_setDeadline__4() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setDeadline",
            deadline: deadline }); }); };



      Task.prototype.setDescription = function Task_prototype_setDescription__5(_, description) { var __this = this; var __frame = { name: "Task_prototype_setDescription__5", line: 516 }; return __func(_, this, arguments, Task_prototype_setDescription__5, 0, __frame, function __$Task_prototype_setDescription__5() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setDescription",
            description: description }); }); };



      return Task;

    })(model.Information);
    model.Project = (function(_super) {

      __extends(Project, _super);

      function Project() {
        return Project.__super__.constructor.apply(this, arguments); };


      Project.prototype.create = function Project_prototype_create__1(_, description, referencing, parent) { var __this = this; var __frame = { name: "Project_prototype_create__1", line: 534 }; return __func(_, this, arguments, Project_prototype_create__1, 0, __frame, function __$Project_prototype_create__1() {
          if ((referencing == null)) {
            referencing = null; } ;

          if ((parent == null)) {
            parent = null; } ;

          return __this._create(__cb(_, __frame, 7, 15, _, true), {
            description: description,
            referencing: ((referencing != null) ? referencing.id : void 0),
            parent: ((parent != null) ? parent.id : void 0) }); }); };



      Project.prototype.collapse = function Project_prototype_collapse__2(_) { var __this = this; var __frame = { name: "Project_prototype_collapse__2", line: 548 }; return __func(_, this, arguments, Project_prototype_collapse__2, 0, __frame, function __$Project_prototype_collapse__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "collapse" }); }); };



      Project.prototype.uncollapse = function Project_prototype_uncollapse__3(_) { var __this = this; var __frame = { name: "Project_prototype_uncollapse__3", line: 554 }; return __func(_, this, arguments, Project_prototype_uncollapse__3, 0, __frame, function __$Project_prototype_uncollapse__3() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "uncollapse" }); }); };



      return Project;

    })(model.Task);
    model.Asap = (function(_super) {

      __extends(Asap, _super);

      function Asap() {
        return Asap.__super__.constructor.apply(this, arguments); };


      Asap.prototype.create = function Asap_prototype_create__1(_, description, list, referencing, project) { var __this = this; var __frame = { name: "Asap_prototype_create__1", line: 571 }; return __func(_, this, arguments, Asap_prototype_create__1, 0, __frame, function __$Asap_prototype_create__1() {
          if ((referencing == null)) {
            referencing = null; } ;

          if ((project == null)) {
            project = null; } ;

          return __this._create(__cb(_, __frame, 7, 15, _, true), {
            description: description,
            list: list.id,
            referencing: ((referencing != null) ? referencing.id : void 0),
            project: ((project != null) ? project.id : void 0) }); }); };



      Asap.prototype.setList = function Asap_prototype_setList__2(_, list) { var __this = this; var __frame = { name: "Asap_prototype_setList__2", line: 586 }; return __func(_, this, arguments, Asap_prototype_setList__2, 0, __frame, function __$Asap_prototype_setList__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            list: list.id,
            method: "setList" }); }); };



      return Asap;

    })(model.Task);
    model.AsapList = (function(_super) {

      __extends(AsapList, _super);

      function AsapList() {
        return AsapList.__super__.constructor.apply(this, arguments); };


      AsapList.prototype.create = function AsapList_prototype_create__1(_, name) { var __this = this; var __frame = { name: "AsapList_prototype_create__1", line: 604 }; return __func(_, this, arguments, AsapList_prototype_create__1, 0, __frame, function __$AsapList_prototype_create__1() {
          return __this._create(__cb(_, __frame, 1, 15, _, true), {
            name: name }); }); };



      AsapList.prototype.rename = function AsapList_prototype_rename__2(_, name) { var __this = this; var __frame = { name: "AsapList_prototype_rename__2", line: 610 }; return __func(_, this, arguments, AsapList_prototype_rename__2, 0, __frame, function __$AsapList_prototype_rename__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "rename",
            name: name }); }); };



      return AsapList;

    })(model.Information);
    "class model.SocialEntity extends model.Information\n	create: ->\n		\nclass Circle extends SocialEntity\n	create: (name) ->\n	@getByName: (name) =>\n	rename: (name) ->\n\nclass Contact extends SocialEntity\n	create: (nameMap) ->\n	setValues: (nameMap) ->\n	addAccount: (account, description=null, priority=0) ->\n	removeAccount: (account) ->\n	addAddress: (place, description=null) ->\n	removeAddress: (place) ->\n	enterCircle: (circle) ->\n	leaveCircle: (circle) ->\n\nclass Place extends Information\n\n	create: (valueMap) ->\n\n	setValues: (valueMap) ->\n	setParent: (place) ->\n	removeParent: ->\n\nclass Appointment extends Information\n\n	create: (description, date, time=null, length=null, referencing=null) ->\n\n	setValues: (valueMap) ->\n	\n	setPlace: (place) ->\n\n	addException: (appointment, exceptionMove='no') ->\n	removeException: (appointment) ->\n\n	addFilter: (type, value) ->\n	removeFilter: (type, value) ->\n\n	addParticipant: (participant) ->\n	removeParticipant: (participant) ->\n\nclass Protocol extends PGObject\n	@find: (name) ->\n	delete: ->\n\nclass Server extends PGObject\n	@find: (name, protocol) ->\n	delete: ->\n\nclass Communicator extends Information\n	create: (username, server) ->\n	changeServer: (server) ->\n	setValues: (valueMap) ->\n\nclass Account extends Communicator\n	create: (username, server) ->\n	@find: (username, server) ->\n	join: (room, role=null) ->\n	leave: (room, role=null) ->\n\nclass UserAccount extends Account\n	setValues: ->\n	create: (account) ->\n	downGrade: ->\n	@getAll: ->\n\nclass Room extends Communicator\n	create: (name) ->\n	setMOTD: (motd) ->\n\nclass Communication extends Information\n	create: (from, time=new Date()) ->\n	setSender: (from) ->\n	setTime: (time=new Date()) ->\n	send: ->\n	sent: ->\n	draft: ->\n	addRecipient: (recipient, mode, resource=null) ->\n	removeRecipient: (recipient, mode) ->\n	getToSend: (from) ->\n\nclass Message extends Communication\n	create: (from, subject=null, body=null, time=new Date()) ->\n	setValues: (valueMap) ->\n\nclass Presence extends Communication\n	create: (from, time=new Date()) ->\n	addResource: (resource) ->\n\nclass Resource extends PGObject\n	create: (name, status, message) ->\n	delete: ->\n\nclass Daemon extends PGObject\n	registrate: (name, status) ->\n	setStatus: (status) ->\n	setMessage: (message) ->\n	deregistrate: ->\n	@getAll: ->\n\nclass Maybe extends PGObject\n	getSize: ->\n	getList: ->";
    Inbox = (function(_super) {

      __extends(Inbox, _super);

      function Inbox() {
        return Inbox.__super__.constructor.apply(this, arguments); };


      Inbox.prototype.getSize = function Inbox_prototype_getSize__1(_) { var __this = this; var __frame = { name: "Inbox_prototype_getSize__1", line: 629 }; return __func(_, this, arguments, Inbox_prototype_getSize__1, 0, __frame, function __$Inbox_prototype_getSize__1() {
          return __this.get(__cb(_, __frame, 1, 15, function ___(__0, __2) { var __1 = __2.size; return _(null, __1); }, true)); }); };


      Inbox.prototype.getFirst = function Inbox_prototype_getFirst__2(_) { var __this = this; var __frame = { name: "Inbox_prototype_getFirst__2", line: 633 }; return __func(_, this, arguments, Inbox_prototype_getFirst__2, 0, __frame, function __$Inbox_prototype_getFirst__2() {
          return __this.get(__cb(_, __frame, 1, 15, function ___(__0, __2) { var __1 = __2.first; return _(null, __1); }, true)); }); };


      Inbox.prototype.get = util.singlify(function __3(_) { var __this = this; var __frame = { name: "__3", line: 637 }; return __func(_, this, arguments, __3, 0, __frame, function __$__3() { return (function __$__3(__then) {
            if ((__this.values == null)) {
              return __this._get(__cb(_, __frame, 2, 25, function ___(__0, __1) { return __this._store(__cb(_, __frame, 2, 10, __then, true), __1); }, true), null, "inbox"); } else { __then(); } ; })(function __$__3() {

            return _(null, __this.values); }); }); });


      Inbox.prototype._store = function Inbox_prototype__store__4(_, values) { var __this = this; var __frame = { name: "Inbox_prototype__store__4", line: 644 }; return __func(_, this, arguments, Inbox_prototype__store__4, 0, __frame, function __$Inbox_prototype__store__4() {
          __this.values = values; return (function __$Inbox_prototype__store__4(__then) {
            if ((__this.values.first != null)) {
              return model.cache.getInformation(__cb(_, __frame, 3, 30, function ___(__0, __1) { __this.values.first = __1; __then(); }, true), __this.values.first); } else { __then(); } ; })(function __$Inbox_prototype__store__4() {

            return _(null, __this.change(__this.values)); }); }); };


      return Inbox;

    })(PGObject);
    "class Urgent extends PGObject\n	 getSize: ->\n	 getList: ->";
    model.inbox = new Inbox;
    return model; };


  module.exports.util = util = require("./util");

}).call(this);
})("/../../../node_modules/libsecretarius/lib/index.js")
},{"./util":9,"streamline/lib/callbacks/runtime":10}],6:[function(require,module,exports){/**
 * Copyright (c) 2011 Bruno Jouhier <bruno.jouhier@sage.com>
 * MIT License
 */
(function(exports) {
	var __g = exports.globals || require("../globals");
	__g.context = __g.context || {};
	__g.depth = __g.depth || 0;

	__g.trampoline = (function() {
		var q = [];
		return {
			queue: function(fn) {
				q.push(fn);
			},
			flush: function() {
				__g.depth++;
				try {
					var fn;
					while (fn = q.shift()) fn();
				} finally {
					__g.depth--;
				}
			}
		}
	})();

	exports.runtime = function(filename) {
		function __func(_, __this, __arguments, fn, index, frame, body) {
			if (!_) {
				return __future.call(__this, fn, __arguments, index);
			}
			frame.file = filename;
			frame.prev = __g.frame;
			__g.frame = frame;
			__g.depth++;
			try {
				frame.active = true;
				body();
			} catch (e) {
				__setEF(e, frame.prev);
				__propagate(_, e);
			} finally {
				frame.active = false;
				__g.frame = frame.prev;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}

		return {
			__g: __g,
			__func: __func,
			__cb: __cb,
			__future: __future,
			__propagate: __propagate,
			__trap: __trap,
			__tryCatch: __tryCatch,
			__forIn: __forIn,
			__apply: __apply,
			__construct: __construct,
			__setEF: __setEF
		};
	}

	function __cb(_, frame, offset, col, fn, trampo) {
		frame.offset = offset;
		frame.col = col;
		var ctx = __g.context;
		return function ___(err, result) {
			var oldFrame = __g.frame;
			__g.frame = frame;
			__g.context = ctx;
			__g.depth++;
			try {
				if (trampo && frame.active && __g.trampoline) {
					__g.trampoline.queue(function() {
						return ___(err, result);
					});
				} else {
					if (err) {
						__setEF(err, frame);
						return _(err);
					}
					frame.active = true;
					return fn(null, result);
				}
			} catch (ex) {
				__setEF(ex, frame);
				return __propagate(_, ex);
			} finally {
				frame.active = false;
				__g.frame = oldFrame;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}
	}

	// unfortunately callee is gone. So we need to pass a function

	function __future(fn, args, i) {
		var err, result, done, q = [];
		args = Array.prototype.slice.call(args);
		args[i] = function(e, r) {
			err = e, result = r, done = true;
			q && q.forEach(function(f) {
				try {
					f(e, r);
				} catch (ex) {
					__trap(ex);
				}
			});
			q = null;
		};
		fn.apply(this, args);
		return function ___(_) {
			if (!_) return ___;
			if (done) _(err, result);
			else q.push(_)
		}
	}

	function __propagate(_, err) {
		try {
			_(err);
		} catch (ex) {
			__trap(ex);
		}
	}

	function __trap(err) {
		if (err) {
			if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err);
			else __g.trampoline.queue(function() {
				throw err;
			});
		}
	}

	__tryCatch: function __tryCatch(_, fn) {
		try {
			fn();
		} catch (e) {
			try {
				_(e);
			} catch (ex) {
				__trap(ex);
			}
		}
	}

	function __forIn(object) {
		var array = [];
		for (var obj in object) {
			array.push(obj);
		}
		return array;
	}

	function __apply(cb, fn, thisObj, args, index) {
		if (cb == null) return __future(__apply, arguments, 0);
		args = Array.prototype.slice.call(args, 0);
		args[index != null ? index : args.length] = cb;
		return fn.apply(thisObj, args);
	}

	function __construct(constructor, i) {
		var key = '__async' + i,
			f;
		return constructor[key] || (constructor[key] = function() {
			var args = arguments;

			function F() {
				var self = this;
				var cb = args[i];
				args[i] = function(e, r) {
					cb(e, self);
				}
				return constructor.apply(self, args);
			}
			F.prototype = constructor.prototype;
			return new F();
		});
	}

	function __setEF(e, f) {
		function formatStack(e, raw) {
			var s = raw,
				f, skip, skipFunc = 0;
			if (s) {
				var ff;
				s = s.split('\n').map(function(l) {
					// try to map firefox format to V8 format
					// ffOffset takes care of lines difference introduced by require.js script.
					var ffOffset = (typeof navigator === 'object' && typeof require === 'function' && require.async) ? 10 : 0;
					var m = /(^[^(]+)\([^@]*\@(.*)\:(\d+)$/.exec(l);
					l = m ? "    at " + m[1] + " (" + m[2] + ":" + (parseInt(m[3]) - ffOffset) + ":0)" : l;
					ff = ff || (m != null);
					var i = l.indexOf('__$');
					if (i >= 0 && !skip) {
						skip = true;
						return l.substring(0, i) + l.substring(i + 3) + '\n';
					}
					return skip ? '' : l + '\n';
				}).join('');
				if (ff) // firefox does not include message
				s = "Error: " + e.message + '\n' + s;
				for (var f = e.__frame; f; f = f.prev) {
					if (f.offset >= 0) s += "    at " + f.name + " (" + f.file + ":" + (f.line + f.offset) + ":" + f.col + ")\n"
				}
			}
			return s;
		};
		e.__frame = e.__frame || f;
		if (exports.stackTraceEnabled && e.__lookupGetter__ && e.__lookupGetter__("rawStack") == null) {
			var getter = e.__lookupGetter__("stack");
			if (!getter) { // FF or Safari case
				var raw = e.stack || "raw stack unavailable";
				getter = function() {
					return raw;
				}
			}
			e.__defineGetter__("rawStack", getter);
			e.__defineGetter__("stack", function() {
				return formatStack(e, getter());
			});
		}
	}

	/// * `runtime.stackTraceEnabled = true/false;`
	///   If true, `err.stack` returns the reconstructed _sync_ stack trace.
	///   Otherwise, it returns the _raw_ stack trace.
	///   The default is true, but you must require the flows module
	///   at least once to enable sync stack traces.
	exports.stackTraceEnabled = true;
	})(typeof exports !== 'undefined' ? exports : (window.StreamlineRuntime = window.StreamlineRuntime || {
	globals: {}
}));
require && require("streamline/lib/callbacks/builtins");
},{"../globals":8,"streamline/lib/callbacks/builtins":11}],9:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename); (function() {
  var arrayEqual, errString, __slice = [].slice;


  exports.UUID_REG = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

  exports.addNull = function(cb) {
    return function() {
      var args;
      args = ((1 <= arguments.length) ? __slice.call(arguments, 0) : []);
      return cb.apply(this, [null,].concat(args)); }; };



  exports.dummyCB = function(e) {
    if ((e != null)) {
      throw e; } ; };



  exports.findElement = function(name, obj) {
    var elem, name_;
    for (name_ in obj) {
      elem = obj[name_];
      if ((name_.toLowerCase() === name)) {
        return elem; } ; }; };




  arrayEqual = function(a, b) {
    var element, index, _i, _len;
    if ((a === b)) {
      return true; } ;

    if ((a.length !== b.length)) {
      return false; } ;

    for (index = _i = 0, _len = a.length; (_i < _len); index = ++_i) {
      element = a[index];
      if ((element !== b[index])) {
        return false; } ; };


    return true; };


  exports.singlify = function(func) {
    var calls;
    calls = [];
    return function() {
      var args, call, caller, cb, _i, _len;
      cb = arguments[0], args = ((2 <= arguments.length) ? __slice.call(arguments, 1) : []);
      for (_i = 0, _len = calls.length; (_i < _len); _i++) {
        call = calls[_i];
        if ((arrayEqual(args, call.args) && (call.context === this))) {
          return call.cbs.push(cb); } ; };


      calls.push(call = {
        args: args,
        cbs: [cb,],
        context: this });

      caller = function() {
        var args, cl, _j, _len1, _ref, _results;
        args = ((1 <= arguments.length) ? __slice.call(arguments, 0) : []);
        calls = (function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = calls.length; (_j < _len1); _j++) {
            cl = calls[_j];
            if ((cl !== call)) {
              _results.push(cl); } ; };


          return _results;
        })();
        _ref = call.cbs;
        _results = [];
        for (_j = 0, _len1 = _ref.length; (_j < _len1); _j++) {
          cb = _ref[_j];
          _results.push(cb.apply(this, args)); };

        return _results; };

      return func.apply(this, [caller,].concat(args)); }; };



  exports.debugOn = false;

  exports.enableDebugMode = function() {
    return exports.debugOn = true; };


  errString = function() {
    var b, e, file, func, i, line, s, time, _i, _len, _ref;
    b = Error.prepareStackTrace;
    Error.prepareStackTrace = function(a, stack) {
      return stack; };

    e = new Error;
    Error.captureStackTrace(e, this);
    s = e.stack;
    Error.prepareStackTrace = b;
    time = new Date().toString().match(/\d+:\d+:\d+/)[0];
    file = s[2].getFileName().match(/\/(\w*).\w*$/)[1];
    line = s[2].getLineNumber();
    _ref = s.slice(2);
    for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
      i = _ref[_i];
      func = i.getFunctionName();
      if ((((func != null)) && !/throw2cb/.test(func))) {
        break; } ; };


    func = func.replace(/module.exports./, "");
    return ((((((("" + time) + " ") + func) + " in ") + file) + " at ") + line); };


  exports.debug = function() {
    var args;
    args = ((1 <= arguments.length) ? __slice.call(arguments, 0) : []);
    if (!exports.debugOn) {
      return; } ;

    return console.log.apply(null, [errString(),].concat(args)); };


}).call(this);
})("/../../../node_modules/libsecretarius/lib/util.js")
},{"streamline/lib/callbacks/runtime":10}],12:[function(require,module,exports){(function(global){/// !doc
/// 
/// # Container for global context
/// 
/// The `globals` module is a container for the global `context` object which is maintained across
/// asynchronous calls.
/// 
/// This context is very handy to store information that all calls should be able to access
/// but that you don't want to pass explicitly via function parameters. The most obvious example is
/// the `locale` that each request may set differently and that your low level libraries should
/// be able to retrieve to format messages.
/// 
/// `var globals = require('streamline/lib/globals')`
/// 
/// * `globals.context = ctx`
/// * `ctx = globals.context`  
///   sets and gets the context
/// 
/// Note: an empty context (`{}`) is automatically set by the server wrappers of the `streams` module,
/// before they dispatch a request. So, with these wrappers, each request starts with a fresh empty context.
// This module may be loaded several times so we need a true global (with a secret name!).
// This implementation also allows us to share the context between modules compiled in callback and fibers mode.
var glob = typeof global === "object" ? global : window;
var secret = "_20c7abceb95c4eb88b7ca1895b1170d1";
module.exports = (glob[secret] = (glob[secret] || {}));

})(window)
},{}],10:[function(require,module,exports){/**
 * Copyright (c) 2011 Bruno Jouhier <bruno.jouhier@sage.com>
 * MIT License
 */
(function(exports) {
	var __g = exports.globals || require("../globals");
	__g.context = __g.context || {};
	__g.depth = __g.depth || 0;

	__g.trampoline = (function() {
		var q = [];
		return {
			queue: function(fn) {
				q.push(fn);
			},
			flush: function() {
				__g.depth++;
				try {
					var fn;
					while (fn = q.shift()) fn();
				} finally {
					__g.depth--;
				}
			}
		}
	})();

	exports.runtime = function(filename) {
		function __func(_, __this, __arguments, fn, index, frame, body) {
			if (!_) {
				return __future.call(__this, fn, __arguments, index);
			}
			frame.file = filename;
			frame.prev = __g.frame;
			__g.frame = frame;
			__g.depth++;
			try {
				frame.active = true;
				body();
			} catch (e) {
				__setEF(e, frame.prev);
				__propagate(_, e);
			} finally {
				frame.active = false;
				__g.frame = frame.prev;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}

		return {
			__g: __g,
			__func: __func,
			__cb: __cb,
			__future: __future,
			__propagate: __propagate,
			__trap: __trap,
			__tryCatch: __tryCatch,
			__forIn: __forIn,
			__apply: __apply,
			__construct: __construct,
			__setEF: __setEF
		};
	}

	function __cb(_, frame, offset, col, fn, trampo) {
		frame.offset = offset;
		frame.col = col;
		var ctx = __g.context;
		return function ___(err, result) {
			var oldFrame = __g.frame;
			__g.frame = frame;
			__g.context = ctx;
			__g.depth++;
			try {
				if (trampo && frame.active && __g.trampoline) {
					__g.trampoline.queue(function() {
						return ___(err, result);
					});
				} else {
					if (err) {
						__setEF(err, frame);
						return _(err);
					}
					frame.active = true;
					return fn(null, result);
				}
			} catch (ex) {
				__setEF(ex, frame);
				return __propagate(_, ex);
			} finally {
				frame.active = false;
				__g.frame = oldFrame;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}
	}

	// unfortunately callee is gone. So we need to pass a function

	function __future(fn, args, i) {
		var err, result, done, q = [];
		args = Array.prototype.slice.call(args);
		args[i] = function(e, r) {
			err = e, result = r, done = true;
			q && q.forEach(function(f) {
				try {
					f(e, r);
				} catch (ex) {
					__trap(ex);
				}
			});
			q = null;
		};
		fn.apply(this, args);
		return function ___(_) {
			if (!_) return ___;
			if (done) _(err, result);
			else q.push(_)
		}
	}

	function __propagate(_, err) {
		try {
			_(err);
		} catch (ex) {
			__trap(ex);
		}
	}

	function __trap(err) {
		if (err) {
			if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err);
			else __g.trampoline.queue(function() {
				throw err;
			});
		}
	}

	__tryCatch: function __tryCatch(_, fn) {
		try {
			fn();
		} catch (e) {
			try {
				_(e);
			} catch (ex) {
				__trap(ex);
			}
		}
	}

	function __forIn(object) {
		var array = [];
		for (var obj in object) {
			array.push(obj);
		}
		return array;
	}

	function __apply(cb, fn, thisObj, args, index) {
		if (cb == null) return __future(__apply, arguments, 0);
		args = Array.prototype.slice.call(args, 0);
		args[index != null ? index : args.length] = cb;
		return fn.apply(thisObj, args);
	}

	function __construct(constructor, i) {
		var key = '__async' + i,
			f;
		return constructor[key] || (constructor[key] = function() {
			var args = arguments;

			function F() {
				var self = this;
				var cb = args[i];
				args[i] = function(e, r) {
					cb(e, self);
				}
				return constructor.apply(self, args);
			}
			F.prototype = constructor.prototype;
			return new F();
		});
	}

	function __setEF(e, f) {
		function formatStack(e, raw) {
			var s = raw,
				f, skip, skipFunc = 0;
			if (s) {
				var ff;
				s = s.split('\n').map(function(l) {
					// try to map firefox format to V8 format
					// ffOffset takes care of lines difference introduced by require.js script.
					var ffOffset = (typeof navigator === 'object' && typeof require === 'function' && require.async) ? 10 : 0;
					var m = /(^[^(]+)\([^@]*\@(.*)\:(\d+)$/.exec(l);
					l = m ? "    at " + m[1] + " (" + m[2] + ":" + (parseInt(m[3]) - ffOffset) + ":0)" : l;
					ff = ff || (m != null);
					var i = l.indexOf('__$');
					if (i >= 0 && !skip) {
						skip = true;
						return l.substring(0, i) + l.substring(i + 3) + '\n';
					}
					return skip ? '' : l + '\n';
				}).join('');
				if (ff) // firefox does not include message
				s = "Error: " + e.message + '\n' + s;
				for (var f = e.__frame; f; f = f.prev) {
					if (f.offset >= 0) s += "    at " + f.name + " (" + f.file + ":" + (f.line + f.offset) + ":" + f.col + ")\n"
				}
			}
			return s;
		};
		e.__frame = e.__frame || f;
		if (exports.stackTraceEnabled && e.__lookupGetter__ && e.__lookupGetter__("rawStack") == null) {
			var getter = e.__lookupGetter__("stack");
			if (!getter) { // FF or Safari case
				var raw = e.stack || "raw stack unavailable";
				getter = function() {
					return raw;
				}
			}
			e.__defineGetter__("rawStack", getter);
			e.__defineGetter__("stack", function() {
				return formatStack(e, getter());
			});
		}
	}

	/// * `runtime.stackTraceEnabled = true/false;`
	///   If true, `err.stack` returns the reconstructed _sync_ stack trace.
	///   Otherwise, it returns the _raw_ stack trace.
	///   The default is true, but you must require the flows module
	///   at least once to enable sync stack traces.
	exports.stackTraceEnabled = true;
	})(typeof exports !== 'undefined' ? exports : (window.StreamlineRuntime = window.StreamlineRuntime || {
	globals: {}
}));
require && require("streamline/lib/callbacks/builtins");
},{"../globals":12,"streamline/lib/callbacks/builtins":13}],11:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.7 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function(exports) {








  "use strict";
  var VERSION = 3;

  var future = function(fn, args, i) {
    var err, result, done, q = [], self = this;

    args = Array.prototype.slice.call(args);
    args[i] = function(e, r) {
      err = e, result = r, done = true;
      (q && q.forEach(function(f) {
        f.call(self, e, r); }));

      q = null; };

    fn.apply(this, args);
    return function F(cb) {
      if (!cb) { return F };
      if (done) { cb.call(self, err, result); } else {
        q.push(cb); }; }; };




  exports.funnel = function(max) {
    max = ((max == null) ? -1 : max);
    if ((max === 0)) { max = funnel.defaultSize; };
    if ((typeof max !== "number")) { throw new Error(("bad max number: " + max)) };
    var queue = [], active = 0, closed = false;



    var fun = function(callback, fn) {
      if ((callback == null)) { return future(fun, arguments, 0) };

      if (((max < 0) || (max == Infinity))) { return fn(callback) };

      queue.push({
        fn: fn,
        cb: callback });


      function _doOne() {
        var current = queue.splice(0, 1)[0];
        if (!current.cb) { return current.fn() };
        active++;
        current.fn(function(err, result) {
          active--;
          if (!closed) {
            current.cb(err, result);
            while (((active < max) && (queue.length > 0))) { _doOne();; }; } ; }); };




      while (((active < max) && (queue.length > 0))) { _doOne();; }; };

    fun.close = function() {
      queue = [], closed = true; };

    return fun; };

  var funnel = exports.funnel;
  funnel.defaultSize = 4;

  function _parallel(options) {
    if ((typeof options === "number")) { return options };
    if ((typeof options.parallel === "number")) { return options.parallel };
    return (options.parallel ? -1 : 1); };


  if ((Array.prototype.forEach_ && (Array.prototype.forEach_.version_ >= VERSION))) { return };


  try {
    Object.defineProperty({ }, "x", { });
  } catch (e) {
    return; };


  var has = Object.prototype.hasOwnProperty;

























  delete Array.prototype.forEach_;
  Object.defineProperty(Array.prototype, "forEach_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__1(_, options, fn, thisObj) { var par, len, i, __this = this; var __frame = { name: "value__1", line: 120 }; return __func(_, this, arguments, value__1, 0, __frame, function __$value__1() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__1(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __2 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__1() { __more = false; if (__2) { i++; } else { __2 = true; } ; var __1 = (i < len); if (__1) { return (function __$value__1(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 7, 28, __then, true), __this[i], i); } else { __then(); } ; })(function __$value__1() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            return __this.map_(__cb(_, __frame, 10, 4, __then, true), par, fn, thisObj); } ; })(function __$value__1() { return _(null, __this); }); }); } });




  Array.prototype.forEach_.version_ = VERSION;


  delete Array.prototype.map_;
  Object.defineProperty(Array.prototype, "map_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__2(_, options, fn, thisObj) { var par, len, result, i, fun, __this = this; var __frame = { name: "value__2", line: 143 }; return __func(_, this, arguments, value__2, 0, __frame, function __$value__2() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__2(__then) {

          if (((par === 1) || (len <= 1))) {
            result = new Array(len);
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 9, 40, function ___(__0, __1) { result[i] = __1; __then(); }, true), __this[i], i); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            result = __this.map(function(elt, i) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 157 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt, i); }); }); });


            i = 0; var __7 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__7) { i++; } else { __7 = true; } ; var __6 = (i < len); if (__6) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return result[i](__cb(_, __frame, 19, 40, function ___(__0, __2) { result[i] = __2; __then(); }, true)); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__2() {


          return _(null, result); }); }); } });




  delete Array.prototype.filter_;
  Object.defineProperty(Array.prototype, "filter_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__3(_, options, fn, thisObj) { var par, result, len, i, elt, __this = this; var __frame = { name: "value__3", line: 175 }; return __func(_, this, arguments, value__3, 0, __frame, function __$value__3() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        result = [];
        len = __this.length; return (function __$value__3(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__3() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__3(__then) {
                    if (has.call(__this, i)) {
                      elt = __this[i];
                      return fn.call(thisObj, __cb(_, __frame, 10, 10, function ___(__0, __2) { return (function __$value__3(__then) { if (__2) { result.push(elt); __then(); } else { __then(); } ; })(__then); }, true), elt); } else { __then(); } ; })(function __$value__3() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {



            return __this.map_(__cb(_, __frame, 14, 4, __then, true), par, function __1(_, elt) { var __frame = { name: "__1", line: 189 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                return fn.call(thisObj, __cb(_, __frame, 1, 9, function ___(__0, __1) { return (function __$__1(__then) { if (__1) { result.push(elt); __then(); } else { __then(); } ; })(_); }, true), elt); });
            }, thisObj); } ; })(function __$value__3() {

          return _(null, result); }); }); } });




  delete Array.prototype.every_;
  Object.defineProperty(Array.prototype, "every_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__4(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__4", line: 203 }; return __func(_, this, arguments, value__4, 0, __frame, function __$value__4() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__4(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__4(_) {

                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 8, 31, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true), __this[i]); })(__cb(_, __frame, -202, 17, function ___(__0, __3) { return (function __$value__4(__then) { if (__3) { return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 216 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__4(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 18, 31, function ___(__0, __4) { var __3 = !__4; return _(null, __3); }, true)); })(__cb(_, __frame, -202, 17, function ___(__0, __4) { return (function __$value__4(__then) { if (__4) {
                        fun.close();
                        return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__4() {



          return _(null, true); }); }); } });




  delete Array.prototype.some_;
  Object.defineProperty(Array.prototype, "some_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__5(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__5", line: 237 }; return __func(_, this, arguments, value__5, 0, __frame, function __$value__5() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__5(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__5(_) {
                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 7, 30, _, true), __this[i]); })(__cb(_, __frame, -236, 17, function ___(__0, __3) { return (function __$value__5(__then) { if (__3) { return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 249 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__5(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 17, 30, _, true)); })(__cb(_, __frame, -236, 17, function ___(__0, __4) { return (function __$value__5(__then) { if (__4) {
                        fun.close();
                        return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__5() {



          return _(null, false); }); }); } });




  delete Array.prototype.reduce_;
  Object.defineProperty(Array.prototype, "reduce_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__6(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__6", line: 270 }; return __func(_, this, arguments, value__6, 0, __frame, function __$value__6() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = 0; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__6() { __more = false; if (__3) { i++; } else { __3 = true; } ; var __2 = (i < len); if (__2) { return (function __$value__6(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__6() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__6() {

          return _(null, v); }); }); } });




  delete Array.prototype.reduceRight_;
  Object.defineProperty(Array.prototype, "reduceRight_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__7(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__7", line: 286 }; return __func(_, this, arguments, value__7, 0, __frame, function __$value__7() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = (len - 1); var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__7() { __more = false; if (__3) { i--; } else { __3 = true; } ; var __2 = (i >= 0); if (__2) { return (function __$value__7(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__7() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__7() {

          return _(null, v); }); }); } });






  delete Array.prototype.sort_;
  Object.defineProperty(Array.prototype, "sort_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__8(_, compare, beg, end) { var array, __this = this;




      function _qsort(_, beg, end) { var tmp, mid, o, nbeg, nend; var __frame = { name: "_qsort", line: 309 }; return __func(_, this, arguments, _qsort, 0, __frame, function __$_qsort() {
          if ((beg >= end)) { return _(null); } ; return (function __$_qsort(__then) {

            if ((end == (beg + 1))) {
              return compare(__cb(_, __frame, 4, 9, function ___(__0, __2) { var __1 = (__2 > 0); return (function __$_qsort(__then) { if (__1) {
                    tmp = array[beg];
                    array[beg] = array[end];
                    array[end] = tmp; __then(); } else { __then(); } ; })(function __$_qsort() { return _(null); }); }, true), array[beg], array[end]); } else { __then(); } ; })(function __$_qsort() {




            mid = Math.floor((((beg + end)) / 2));
            o = array[mid];
            nbeg = beg;
            nend = end; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false;

                var __4 = (nbeg <= nend); if (__4) { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                          var __1 = (nbeg < end); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 18, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), array[nbeg], o); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __5) { if (__5) { nbeg++; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                            var __1 = (beg < nend); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 19, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), o, array[nend]); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __7) { if (__7) { nend--; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() {

                      if ((nbeg <= nend)) {
                        tmp = array[nbeg];
                        array[nbeg] = array[nend];
                        array[nend] = tmp;
                        nbeg++;
                        nend--; } ; while (__more) { __loop(); }; __more = true; }); }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function __$_qsort(__then) {



                if ((nbeg < end)) { return _qsort(__cb(_, __frame, 30, 20, __then, true), nbeg, end); } else { __then(); } ; })(function __$_qsort() { return (function __$_qsort(__then) {
                  if ((beg < nend)) { return _qsort(__cb(_, __frame, 31, 20, __then, true), beg, nend); } else { __then(); } ; })(_); }); }); }); }); }; var __frame = { name: "value__8", line: 304 }; return __func(_, this, arguments, value__8, 0, __frame, function __$value__8() { array = __this; beg = (beg || 0); end = ((end == null) ? (array.length - 1) : end);

        return _qsort(__cb(_, __frame, 38, 3, function __$value__8() {
          return _(null, array); }, true), beg, end); }); } });











  delete Function.prototype.apply_;
  Object.defineProperty(Function.prototype, "apply_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function(callback, thisObj, args, index) {
      args = Array.prototype.slice.call(args, 0);
      args.splice((((index != null) && (index >= 0)) ? index : args.length), 0, callback);
      return this.apply(thisObj, args); } });


})(((typeof exports !== "undefined") ? exports : (window.StreamlineBuiltins = (window.StreamlineBuiltins || {}))));
})("/../../../node_modules/streamline/lib/callbacks/builtins.js")
},{"streamline/lib/callbacks/runtime":6}],13:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.7 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function(exports) {








  "use strict";
  var VERSION = 3;

  var future = function(fn, args, i) {
    var err, result, done, q = [], self = this;

    args = Array.prototype.slice.call(args);
    args[i] = function(e, r) {
      err = e, result = r, done = true;
      (q && q.forEach(function(f) {
        f.call(self, e, r); }));

      q = null; };

    fn.apply(this, args);
    return function F(cb) {
      if (!cb) { return F };
      if (done) { cb.call(self, err, result); } else {
        q.push(cb); }; }; };




  exports.funnel = function(max) {
    max = ((max == null) ? -1 : max);
    if ((max === 0)) { max = funnel.defaultSize; };
    if ((typeof max !== "number")) { throw new Error(("bad max number: " + max)) };
    var queue = [], active = 0, closed = false;



    var fun = function(callback, fn) {
      if ((callback == null)) { return future(fun, arguments, 0) };

      if (((max < 0) || (max == Infinity))) { return fn(callback) };

      queue.push({
        fn: fn,
        cb: callback });


      function _doOne() {
        var current = queue.splice(0, 1)[0];
        if (!current.cb) { return current.fn() };
        active++;
        current.fn(function(err, result) {
          active--;
          if (!closed) {
            current.cb(err, result);
            while (((active < max) && (queue.length > 0))) { _doOne();; }; } ; }); };




      while (((active < max) && (queue.length > 0))) { _doOne();; }; };

    fun.close = function() {
      queue = [], closed = true; };

    return fun; };

  var funnel = exports.funnel;
  funnel.defaultSize = 4;

  function _parallel(options) {
    if ((typeof options === "number")) { return options };
    if ((typeof options.parallel === "number")) { return options.parallel };
    return (options.parallel ? -1 : 1); };


  if ((Array.prototype.forEach_ && (Array.prototype.forEach_.version_ >= VERSION))) { return };


  try {
    Object.defineProperty({ }, "x", { });
  } catch (e) {
    return; };


  var has = Object.prototype.hasOwnProperty;

























  delete Array.prototype.forEach_;
  Object.defineProperty(Array.prototype, "forEach_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__1(_, options, fn, thisObj) { var par, len, i, __this = this; var __frame = { name: "value__1", line: 120 }; return __func(_, this, arguments, value__1, 0, __frame, function __$value__1() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__1(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __2 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__1() { __more = false; if (__2) { i++; } else { __2 = true; } ; var __1 = (i < len); if (__1) { return (function __$value__1(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 7, 28, __then, true), __this[i], i); } else { __then(); } ; })(function __$value__1() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            return __this.map_(__cb(_, __frame, 10, 4, __then, true), par, fn, thisObj); } ; })(function __$value__1() { return _(null, __this); }); }); } });




  Array.prototype.forEach_.version_ = VERSION;


  delete Array.prototype.map_;
  Object.defineProperty(Array.prototype, "map_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__2(_, options, fn, thisObj) { var par, len, result, i, fun, __this = this; var __frame = { name: "value__2", line: 143 }; return __func(_, this, arguments, value__2, 0, __frame, function __$value__2() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__2(__then) {

          if (((par === 1) || (len <= 1))) {
            result = new Array(len);
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 9, 40, function ___(__0, __1) { result[i] = __1; __then(); }, true), __this[i], i); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            result = __this.map(function(elt, i) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 157 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt, i); }); }); });


            i = 0; var __7 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__7) { i++; } else { __7 = true; } ; var __6 = (i < len); if (__6) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return result[i](__cb(_, __frame, 19, 40, function ___(__0, __2) { result[i] = __2; __then(); }, true)); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__2() {


          return _(null, result); }); }); } });




  delete Array.prototype.filter_;
  Object.defineProperty(Array.prototype, "filter_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__3(_, options, fn, thisObj) { var par, result, len, i, elt, __this = this; var __frame = { name: "value__3", line: 175 }; return __func(_, this, arguments, value__3, 0, __frame, function __$value__3() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        result = [];
        len = __this.length; return (function __$value__3(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__3() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__3(__then) {
                    if (has.call(__this, i)) {
                      elt = __this[i];
                      return fn.call(thisObj, __cb(_, __frame, 10, 10, function ___(__0, __2) { return (function __$value__3(__then) { if (__2) { result.push(elt); __then(); } else { __then(); } ; })(__then); }, true), elt); } else { __then(); } ; })(function __$value__3() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {



            return __this.map_(__cb(_, __frame, 14, 4, __then, true), par, function __1(_, elt) { var __frame = { name: "__1", line: 189 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                return fn.call(thisObj, __cb(_, __frame, 1, 9, function ___(__0, __1) { return (function __$__1(__then) { if (__1) { result.push(elt); __then(); } else { __then(); } ; })(_); }, true), elt); });
            }, thisObj); } ; })(function __$value__3() {

          return _(null, result); }); }); } });




  delete Array.prototype.every_;
  Object.defineProperty(Array.prototype, "every_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__4(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__4", line: 203 }; return __func(_, this, arguments, value__4, 0, __frame, function __$value__4() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__4(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__4(_) {

                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 8, 31, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true), __this[i]); })(__cb(_, __frame, -202, 17, function ___(__0, __3) { return (function __$value__4(__then) { if (__3) { return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 216 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__4(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 18, 31, function ___(__0, __4) { var __3 = !__4; return _(null, __3); }, true)); })(__cb(_, __frame, -202, 17, function ___(__0, __4) { return (function __$value__4(__then) { if (__4) {
                        fun.close();
                        return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__4() {



          return _(null, true); }); }); } });




  delete Array.prototype.some_;
  Object.defineProperty(Array.prototype, "some_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__5(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__5", line: 237 }; return __func(_, this, arguments, value__5, 0, __frame, function __$value__5() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__5(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__5(_) {
                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 7, 30, _, true), __this[i]); })(__cb(_, __frame, -236, 17, function ___(__0, __3) { return (function __$value__5(__then) { if (__3) { return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 249 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__5(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 17, 30, _, true)); })(__cb(_, __frame, -236, 17, function ___(__0, __4) { return (function __$value__5(__then) { if (__4) {
                        fun.close();
                        return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__5() {



          return _(null, false); }); }); } });




  delete Array.prototype.reduce_;
  Object.defineProperty(Array.prototype, "reduce_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__6(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__6", line: 270 }; return __func(_, this, arguments, value__6, 0, __frame, function __$value__6() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = 0; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__6() { __more = false; if (__3) { i++; } else { __3 = true; } ; var __2 = (i < len); if (__2) { return (function __$value__6(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__6() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__6() {

          return _(null, v); }); }); } });




  delete Array.prototype.reduceRight_;
  Object.defineProperty(Array.prototype, "reduceRight_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__7(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__7", line: 286 }; return __func(_, this, arguments, value__7, 0, __frame, function __$value__7() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = (len - 1); var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__7() { __more = false; if (__3) { i--; } else { __3 = true; } ; var __2 = (i >= 0); if (__2) { return (function __$value__7(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__7() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__7() {

          return _(null, v); }); }); } });






  delete Array.prototype.sort_;
  Object.defineProperty(Array.prototype, "sort_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__8(_, compare, beg, end) { var array, __this = this;




      function _qsort(_, beg, end) { var tmp, mid, o, nbeg, nend; var __frame = { name: "_qsort", line: 309 }; return __func(_, this, arguments, _qsort, 0, __frame, function __$_qsort() {
          if ((beg >= end)) { return _(null); } ; return (function __$_qsort(__then) {

            if ((end == (beg + 1))) {
              return compare(__cb(_, __frame, 4, 9, function ___(__0, __2) { var __1 = (__2 > 0); return (function __$_qsort(__then) { if (__1) {
                    tmp = array[beg];
                    array[beg] = array[end];
                    array[end] = tmp; __then(); } else { __then(); } ; })(function __$_qsort() { return _(null); }); }, true), array[beg], array[end]); } else { __then(); } ; })(function __$_qsort() {




            mid = Math.floor((((beg + end)) / 2));
            o = array[mid];
            nbeg = beg;
            nend = end; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false;

                var __4 = (nbeg <= nend); if (__4) { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                          var __1 = (nbeg < end); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 18, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), array[nbeg], o); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __5) { if (__5) { nbeg++; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                            var __1 = (beg < nend); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 19, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), o, array[nend]); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __7) { if (__7) { nend--; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() {

                      if ((nbeg <= nend)) {
                        tmp = array[nbeg];
                        array[nbeg] = array[nend];
                        array[nend] = tmp;
                        nbeg++;
                        nend--; } ; while (__more) { __loop(); }; __more = true; }); }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function __$_qsort(__then) {



                if ((nbeg < end)) { return _qsort(__cb(_, __frame, 30, 20, __then, true), nbeg, end); } else { __then(); } ; })(function __$_qsort() { return (function __$_qsort(__then) {
                  if ((beg < nend)) { return _qsort(__cb(_, __frame, 31, 20, __then, true), beg, nend); } else { __then(); } ; })(_); }); }); }); }); }; var __frame = { name: "value__8", line: 304 }; return __func(_, this, arguments, value__8, 0, __frame, function __$value__8() { array = __this; beg = (beg || 0); end = ((end == null) ? (array.length - 1) : end);

        return _qsort(__cb(_, __frame, 38, 3, function __$value__8() {
          return _(null, array); }, true), beg, end); }); } });











  delete Function.prototype.apply_;
  Object.defineProperty(Function.prototype, "apply_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function(callback, thisObj, args, index) {
      args = Array.prototype.slice.call(args, 0);
      args.splice((((index != null) && (index >= 0)) ? index : args.length), 0, callback);
      return this.apply(thisObj, args); } });


})(((typeof exports !== "undefined") ? exports : (window.StreamlineBuiltins = (window.StreamlineBuiltins || {}))));
})("/../../../node_modules/libsecretarius/node_modules/streamline/lib/callbacks/builtins.js")
},{"streamline/lib/callbacks/runtime":10}]},{},[5]);