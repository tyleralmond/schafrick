(!window.console||!console.log)&&function(){for(var c=function(){},g="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,markTimeline,table,time,timeEnd,timeStamp,trace,warn".split(","),j=g.length,i=window.console={};j--;)i[g[j]]=c}();
(function(c){var g=[],j=[],i=function(){},a=0,b={splashVPos:"35%",loaderVPos:"0%",splashID:"#jpreContent",showSplash:!0,showPercentage:!1,autoClose:!0,closeBtnText:"Start!",onetimeLoad:!1,debugMode:!1,splashFunction:function(){}},d=function(a){if(b.onetimeLoad){var c=new Date;c.setDate(c.getDate()+a);a=a==null?"":"expires="+c.toUTCString();document.cookie="jpreLoader=loaded; "+a}},e=function(){jOverlay=c("<div></div>").attr("id","jpreOverlay").css({position:"fixed",top:0,left:0,width:"100%",height:"100%",
zIndex:9999999}).appendTo("body");if(b.showSplash){jContent=c("<div></div>").attr("id","jpreSlide").appendTo(jOverlay);var a=c(window).width()-c(jContent).width();c(jContent).css({position:"absolute",top:b.splashVPos,left:Math.round(50/c(window).width()*a)+"%"});c(jContent).html(c(b.splashID).wrap("<div/>").parent().html());c(b.splashID).remove();b.splashFunction()}jLoader=c("<div></div>").attr("id","jpreLoader").appendTo(jOverlay);a=c(window).width()-c(jLoader).width();c(jLoader).css({position:"absolute",
top:b.loaderVPos,left:Math.round(50/c(window).width()*a)+"%"});jBar=c("<div></div>").attr("id","jpreBar").css({width:"0%",height:"100%"}).appendTo(jLoader);b.showPercentage&&(jPer=c("<div></div>").attr("id","jprePercentage").css({position:"relative",height:"100%"}).appendTo(jLoader).html("Loading..."));b.autoclose||(jButton=c("<div></div>").attr("id","jpreButton").on("click",function(){m()}).css({position:"relative",height:"100%"}).appendTo(jLoader).text(b.closeBtnText).hide())},f=function(b){c(b).find("*:not(script)").each(function(){var b=
"";c(this).css("background-image").indexOf("none")==-1&&c(this).css("background-image").indexOf("-gradient")==-1?(b=c(this).css("background-image"),b.indexOf("url")!=-1&&(b=b.match(/url\((.*?)\)/)[1].replace(/\"/g,""))):c(this).get(0).nodeName.toLowerCase()=="img"&&typeof c(this).attr("src")!="undefined"&&(b=c(this).attr("src"));b.length>0&&g.push(b)})},k=function(b){var a=new Image;c(a).load(function(){h()}).error(function(){j.push(c(this).attr("src"));h()}).attr("src",b)},h=function(){a++;var e=
Math.round(a/g.length*100);c(jBar).stop().animate({width:e+"%"},500,"linear");b.showPercentage&&c(jPer).text(e+"%");if(a>=g.length)a=g.length,d(),b.showPercentage&&c(jPer).text("100%"),b.debugMode&&w(),c(jBar).stop().animate({width:"100%"},500,"linear",function(){b.autoClose?m():c(jButton).fadeIn(1E3)})},m=function(){c(jOverlay).fadeOut(800,function(){c(jOverlay).remove();i()})},w=function(){if(j.length>0){var b="ERROR - IMAGE FILES MISSING!!!\n\r";b+=j.length+" image files cound not be found. \n\r";
b+="Please check your image paths and filenames:\n\r";for(var a=0;a<j.length;a++)b+="- "+j[a]+"\n\r";return!0}else return!1};c.fn.jpreLoader=function(a,d){a&&c.extend(b,a);typeof d=="function"&&(i=d);c("body").css({display:"block"});return this.each(function(){var a;a:{if(b.onetimeLoad){a=document.cookie.split("; ");for(var d=0,h;h=a[d]&&a[d].split("=");d++)if(h.shift()==="jpreLoader"){a=h.join("=");break a}}a=!1}if(a)c(b.splashID).remove(),i();else{e();f(this);for(a=0;a<g.length;a++)k(g[a])}})}})(jQuery);
(function(c){function g(){i.setAttribute("content",b);d=!0}var j=navigator.userAgent;if(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(j)&&j.indexOf("AppleWebKit")>-1&&(j=c.document,j.querySelector)){var i=j.querySelector("meta[name=viewport]"),j=i&&i.getAttribute("content"),a=j+",maximum-scale=1",b=j+",maximum-scale=10",d=!0,e,f,k,h;i&&(c.addEventListener("orientationchange",g,!1),c.addEventListener("devicemotion",function(b){h=b.accelerationIncludingGravity;
e=Math.abs(h.x);f=Math.abs(h.y);k=Math.abs(h.z);(!c.orientation||c.orientation===180)&&(e>7||(k>6&&f<8||k<8&&f>6)&&e>5)?d&&(i.setAttribute("content",a),d=!1):d||g()},!1))}})(this);
(function(c){c.fn.countdown=function(g,j){function i(b,a){return function(){return a.call(b)}}var a="seconds minutes hours days weeks daysLeft".split(" ");return this.each(function(){function b(){if(0===e.closest("html").length)clearInterval(h),d("removed");else{m--;0>m&&(m=0);k={seconds:m%60,minutes:Math.floor(m/60)%60,hours:Math.floor(m/60/60)%24,days:Math.floor(m/60/60/24),weeks:Math.floor(m/60/60/24/7),daysLeft:Math.floor(m/60/60/24)%7};for(var b=0;b<a.length;b++){var c=a[b];f[c]!=k[c]&&(f[c]=
k[c],d(c))}0==m&&(clearInterval(h),d("finished"))}}function d(b){var a=c.Event(b);a.date=new Date((new Date).valueOf()+m);a.value=f[b]||"0";a.toDate=g;a.lasting=k;switch(b){case "seconds":case "minutes":case "hours":a.value=10>a.value?"0"+a.value.toString():a.value.toString();break;default:a.value&&(a.value=a.value.toString())}j.call(e,a)}if(!(g instanceof Date))if(String(g).match(/^[0-9]*$/))g=new Date(g);else if(g.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/)||
g.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/))g=new Date(g);else if(g.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/)||g.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})/))g=new Date(g);else throw Error("Doesn't seen to be a valid date object or string");var e=c(this),f={},k={},h=e.data("countdownInterval"),m=Math.floor((g.valueOf()-(new Date).valueOf())/1E3);b();h&&clearInterval(h);e.data("countdownInterval",setInterval(i(e,b),1E3));h=e.data("countdownInterval")})}})(jQuery);
(function(c,g){function j(a,b){var d=a.nodeName.toLowerCase();if("area"===d){var d=a.parentNode,e=d.name,f;return!a.href||!e||d.nodeName.toLowerCase()!=="map"?!1:(f=c("img[usemap=#"+e+"]")[0],!!f&&i(f))}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&i(a)}function i(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version)c.extend(c.ui,{version:"1.8.23",
keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),c.fn.extend({propAttr:c.fn.prop||c.fn.attr,_focus:c.fn.focus,focus:function(a,b){return typeof a=="number"?this.each(function(){var d=
this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;return c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?a=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):a=this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,
"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==g)return this.css("zIndex",a);if(this.length)for(var a=c(this[0]),b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed")if(b=parseInt(a.css("zIndex"),10),!isNaN(b)&&b!==0)return b;a=a.parent()}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+
".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),c("<a>").outerWidth(1).jquery||c.each(["Width","Height"],function(a,b){function d(a,b,d,f){return c.each(e,function(){b-=parseFloat(c.curCSS(a,"padding"+this,!0))||0;d&&(b-=parseFloat(c.curCSS(a,"border"+this+"Width",!0))||0);f&&(b-=parseFloat(c.curCSS(a,"margin"+this,!0))||0)}),b}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],f=b.toLowerCase(),k={innerWidth:c.fn.innerWidth,
innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(a){return a===g?k["inner"+b].call(this):this.each(function(){c(this).css(f,d(this,a)+"px")})};c.fn["outer"+b]=function(a,e){return typeof a!="number"?k["outer"+b].call(this,a):this.each(function(){c(this).css(f,d(this,a,!0,e)+"px")})}}),c.extend(c.expr[":"],{data:c.expr.createPseudo?c.expr.createPseudo(function(a){return function(b){return!!c.data(b,a)}}):function(a,b,d){return!!c.data(a,
d[3])},focusable:function(a){return j(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,"tabindex"),d=isNaN(b);return(d||b>=0)&&j(a,!d)}}),c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"}),c.curCSS||(c.curCSS=c.css),c.extend(c.ui,{plugin:{add:function(a,
b,d){var a=c.ui[a].prototype,e;for(e in d)a.plugins[e]=a.plugins[e]||[],a.plugins[e].push([b,d[e]])},call:function(a,b,c){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return!1;var d=b&&b==="left"?"scrollLeft":"scrollTop",e;return a[d]>0?!0:(a[d]=1,e=
a[d]>0,a[d]=0,!1)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(a,b,d,e,f,g){return c.ui.isOverAxis(a,d,f)&&c.ui.isOverAxis(b,e,g)}})})(jQuery);
(function(c,g){if(c.cleanData){var j=c.cleanData;c.cleanData=function(a){for(var b=0,d;(d=a[b])!=null;b++)try{c(d).triggerHandler("remove")}catch(e){}j(a)}}else{var i=c.fn.remove;c.fn.remove=function(a,b){return this.each(function(){return b||(!a||c.filter(a,[this]).length)&&c("*",this).add([this]).each(function(){try{c(this).triggerHandler("remove")}catch(a){}}),i.call(c(this),a,b)})}}c.widget=function(a,b,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;d||(d=b,b=c.Widget);c.expr[":"][f]=
function(b){return!!c.data(b,a)};c[e]=c[e]||{};c[e][a]=function(a,b){arguments.length&&this._createWidget(a,b)};b=new b;b.options=c.extend(!0,{},b.options);c[e][a].prototype=c.extend(!0,b,{namespace:e,widgetName:a,widgetEventPrefix:c[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);c.widget.bridge(a,c[e][a])};c.widget.bridge=function(a,b){c.fn[a]=function(d){var e=typeof d=="string",f=Array.prototype.slice.call(arguments,1),k=this;return d=!e&&f.length?c.extend.apply(null,[!0,d].concat(f)):
d,e&&d.charAt(0)==="_"?k:(e?this.each(function(){var b=c.data(this,a),e=b&&c.isFunction(b[d])?b[d].apply(b,f):b;if(e!==b&&e!==g)return k=e,!1}):this.each(function(){var e=c.data(this,a);e?e.option(d||{})._init():c.data(this,a,new b(d,this))}),k)}};c.Widget=function(a,b){arguments.length&&this._createWidget(a,b)};c.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(a,b){c.data(b,this.widgetName,this);this.element=c(b);this.options=c.extend(!0,{},
this.options,this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return c.metadata&&c.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+
"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,b){var d=a;if(arguments.length===0)return c.extend({},this.options);if(typeof a=="string"){if(b===g)return this.options[a];d={};d[a]=b}return this._setOptions(d),this},_setOptions:function(a){var b=this;return c.each(a,function(a,c){b._setOption(a,c)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",
b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(a,b,d){var e,f=this.options[a];d=d||{};b=c.Event(b);b.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();b.target=this.element[0];a=b.originalEvent;if(a)for(e in a)e in b||(b[e]=a[e]);return this.element.trigger(b,d),!(c.isFunction(f)&&f.call(this.element[0],b,d)===!1||b.isDefaultPrevented())}}})(jQuery);
function Hammer(c,g,j){var i,a,b,d,e,f;function k(a){a=a||window.event;if(D){for(var b=[],c=a.touches.length>0?a.touches:a.changedTouches,d=0,e=c.length;d<e;d++)a=c[d],b.push({x:a.pageX,y:a.pageY});return b}else return b=document,c=b.body,[{x:a.pageX||a.clientX+(b&&b.scrollLeft||c&&c.scrollLeft||0)-(b&&b.clientLeft||c&&b.clientLeft||0),y:a.pageY||a.clientY+(b&&b.scrollTop||c&&c.scrollTop||0)-(b&&b.clientTop||c&&b.clientTop||0)}]}function h(a,b){return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI}function m(a,
b){if(a.length==2&&b.length==2){var c,d;c=a[0].x-a[1].x;d=a[0].y-a[1].y;var e=Math.sqrt(c*c+d*d);c=b[0].x-b[1].x;d=b[0].y-b[1].y;return Math.sqrt(c*c+d*d)/e}return 0}function w(a,b){if(a.length==2&&b.length==2){var c,d;c=a[0].x-a[1].x;d=a[0].y-a[1].y;var e=Math.atan2(d,c)*180/Math.PI;c=b[0].x-b[1].x;d=b[0].y-b[1].y;return Math.atan2(d,c)*180/Math.PI-e}return 0}function l(a,b){b.touches=k(b.originalEvent);b.type=a;Object.prototype.toString.call(s["on"+a])=="[object Function]"&&s["on"+a].call(s,b)}
function o(a){if(g.cancel_event)a=a||window.event,a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0)}function A(h){switch(h.type){case "mousedown":case "touchstart":b=k(h);y=(new Date).getTime();t=!0;E=h;var x=c.getBoundingClientRect(),j=c.clientLeft||document.body.clientLeft||0,H=window.pageXOffset||c.scrollLeft||document.body.scrollLeft;i=x.top+(window.pageYOffset||c.scrollTop||document.body.scrollTop)-(c.clientTop||document.body.clientTop||0);a=x.left+
H-j;z=!0;u.hold(h);g.prevent_default&&o(h);break;case "mousemove":case "touchmove":if(!z)return!1;d=k(h);u.transform(h)||u.drag(h);break;case "mouseup":case "mouseout":case "touchcancel":case "touchend":if(!z||n!="transform"&&h.touches&&h.touches.length>0)return!1;z=!1;x=n=="drag";u.swipe(h);x?l("dragend",{originalEvent:h,direction:r,distance:p,angle:q}):n=="transform"?l("transformend",{originalEvent:h,position:e,scale:m(b,d),rotation:w(b,d)}):u.tap(E);F=n;l("release",{originalEvent:h,gesture:n});
b=void 0;d=void 0;e=void 0;f=void 0;t=!1;q=p=0;n=null}}function B(a,b,c){for(var b=b.split(" "),d=0,e=b.length;d<e;d++)a.addEventListener?a.addEventListener(b[d],c,!1):document.attachEvent&&a.attachEvent("on"+b[d],c)}var s=this,g=function(a,b){var c={};if(!b)return a;for(var d in a)c[d]=d in b?b[d]:a[d];return c}({prevent_default:!1,css_hacks:!0,cancel_event:!0,swipe:!0,swipe_time:200,swipe_min_distance:20,drag:!0,drag_vertical:!0,drag_horizontal:!0,drag_min_distance:20,transform:!0,scale_treshold:0.1,
rotation_treshold:15,tap:!0,tap_double:!0,tap_max_interval:300,tap_max_distance:10,tap_double_distance:20,hold:!0,hold_timeout:500},g);(function(){if(!g.css_hacks)return!1;for(var a=["webkit","moz","ms","o",""],b={userSelect:"none",touchCallout:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"},d="",e=0;e<a.length;e++)for(var f in b)d=f,a[e]&&(d=a[e]+d.substring(0,1).toUpperCase()+d.substring(1)),c.style[d]=b[f]})();var p=0,q=0,r=0;b=void 0;d=void 0;e=void 0;f=void 0;var t=!1,n=null,F=null,
y=null,v={x:0,y:0},C=null,G=null;i=void 0;a=void 0;var z=!1,E,D="ontouchstart"in window;this.option=function(a,b){b!=j&&(g[a]=b);return g[a]};this.getDirectionFromAngle=function(a){var a={down:a>=45&&a<135,left:a>=135||a<=-135,up:a<-45&&a>-135,right:a>=-45&&a<=45},b,c;for(c in a)if(a[c]){b=c;break}return b};var u={hold:function(a){g.hold&&(n="hold",clearTimeout(G),G=setTimeout(function(){n=="hold"&&l("hold",{originalEvent:a,position:b})},g.hold_timeout))},swipe:function(c){if(d){var e=d[0].x-b[0].x,
f=d[0].y-b[0].y;p=Math.sqrt(e*e+f*f);var k=(new Date).getTime()-y;g.swipe&&g.swipe_time>k&&p>g.swipe_min_distance&&(q=h(b[0],d[0]),r=s.getDirectionFromAngle(q),n="swipe",l("swipe",{originalEvent:c,position:{x:d[0].x-a,y:d[0].y-i},direction:r,distance:p,distanceX:e,distanceY:f,angle:q}))}},drag:function(c){var e=d[0].x-b[0].x,k=d[0].y-b[0].y;p=Math.sqrt(e*e+k*k);if(g.drag&&p>g.drag_min_distance||n=="drag"){q=h(b[0],d[0]);r=s.getDirectionFromAngle(q);var j=r=="up"||r=="down";if(!((j&&!g.drag_vertical||
!j&&!g.drag_horizontal)&&p>g.drag_min_distance)){var j=h(f||b[0],d[0]),m=s.getDirectionFromAngle(j);f=d[0];n="drag";e={originalEvent:c,position:{x:d[0].x-a,y:d[0].y-i},direction:r,distance:p,distanceX:e,distanceY:k,angle:q,interim_angle:j,interim_direction:m};t&&(l("dragstart",e),t=!1);l("drag",e);o(c)}}},transform:function(c){if(g.transform){if((c.touches?c.touches.length:1)!=2)return!1;var f=w(b,d),h=m(b,d);if(n!="drag"&&(n=="transform"||Math.abs(1-h)>g.scale_treshold||Math.abs(f)>g.rotation_treshold))return n=
"transform",e={x:(d[0].x+d[1].x)/2-a,y:(d[0].y+d[1].y)/2-i},f={originalEvent:c,position:e,scale:h,rotation:f},t&&(l("transformstart",f),t=!1),l("transform",f),o(c),!0}return!1},tap:function(a){var c=(new Date).getTime(),e=c-y;if(!g.hold||g.hold&&g.hold_timeout>e)if(function(){if(v&&g.tap_double&&F=="tap"&&y-C<g.tap_max_interval){var a=Math.abs(v[0].x-b[0].x),c=Math.abs(v[0].y-b[0].y);return v&&b&&Math.max(a,c)<g.tap_double_distance}return!1}())n="double_tap",C=null,l("doubletap",{originalEvent:a,
position:b}),o(a);else{var e=d?Math.abs(d[0].x-b[0].x):0,f=d?Math.abs(d[0].y-b[0].y):0;p=Math.max(e,f);p<g.tap_max_distance&&(n="tap",C=c,v=b,g.tap&&(l("tap",{originalEvent:a,position:b}),o(a)))}}};D?B(c,"touchstart touchmove touchend touchcancel",A):(B(c,"mouseup mousedown mousemove",A),B(c,"mouseout",function(a){var b;a:{b=a.relatedTarget;if(!b&&window.event&&window.event.toElement)b=window.event.toElement;if(c===b)b=!0;else{if(b)for(b=b.parentNode;b!==null;){if(b===c){b=!0;break a}b=b.parentNode}b=
!1}}b||A(a)}))}
(function(c,g,j){var i=!1;c.widget("ri.responsiveCarousel",{options:{arrowLeft:".arrow-left a",arrowRight:".arrow-right a",target:".slider-target",mask:".slider-mask",unitElement:"li",unitWidth:"compute",responsiveUnitSize:null,onRedraw:null,dragEvents:!1,speed:400,slideSpeed:2500,step:-1,responsiveStep:null,onShift:null,nudgeThreshold:10},internal:{currentSlide:0,left:0,targetWidth:0,unitWidth:0,targetOuterWidth:0,targetOuterHeight:0,targetParentOuterWidth:0,targetParentInnerWidth:0,targetParentOuterHeight:0,
targetParentMarginLeft:0,targetBackupCopy:null,isArrowBeingClicked:!1,arrowLeftVisible:!0,arrowRightVisible:!0,targetLeft:0,timer:null,firstMouseClick:!1,prefix:null,slideShowActive:!1,slideTimer:null,slideBumped:!1,nudgeDirection:null},wait:function(){var a;return{thenDo:function(b,c){"undefined"!==typeof a&&g.clearTimeout(a);a=g.setTimeout(b,c)}}},_getPrefix:function(a){for(var b=["Moz","Webkit","Khtml","0","ms"],c=j.createElement("div"),e=a.charAt(0).toUpperCase()+a.slice(1),f="",g=b.length;g>
-1;)c.style.hasOwnProperty(b[g]+e)&&(f=b[g]),g-=1;c.style.hasOwnProperty(a)&&(f=a);return"-"+f.toLowerCase()+"-"},_animate:function(a,b,d,e){var f=this.options,k=this.internal;return a.each(function(){var a=c(this),i=k.prefix;f.cssAnimations?(a.css(i+"transition","all "+d/1E3+"s ease-in-out").css(b),g.setTimeout(function(){a.css(i+"transition","");c.isFunction(e)&&e()},d)):a.animate(b,d,function(){c.isFunction(e)&&e()})})},_setTargetWidth:function(){var a=this.internal,b=this.options,d=c(this.element),
e=c(this.element).find(b.target);a.targetWidth=e.find(b.unitElement).length*a.unitWidth;d.find(b.target).width(a.targetWidth);a.targetOuterWidth=e.outerWidth();a.targetOuterHeight=e.outerHeight();a.targetParentOuterWidth=e.parent().outerWidth();a.targetParentInnerWidth=e.parent().innerWidth();a.targetParentOuterHeight=e.parent().outerHeight();a.targetParentMarginLeft=parseInt(e.parents().css("marginLeft"),10);if(isNaN(a.targetParentMarginLeft))a.targetParentMarginLeft=0},_setArrowVisibility:function(){var a=
this.options,b=this.internal,d=c(this.element).find(a.target),e=d.position().left,f=b.targetOuterWidth+e,g=c(this.element).find(a.arrowLeft),h=c(this.element).find(a.arrowRight);if(f<=b.targetParentOuterWidth)h.hide(),b.isArrowBeingClicked===!0&&this._clearInterval(),b.arrowRightVisible=b.isArrowBeingClicked=!1;else if(!1===b.arrowRightVisible)h.show(),b.arrowRightVisible=!0;if(e>=0)g.hide(),b.isArrowBeingClicked===!0&&this._clearInterval(),b.arrowLeftVisible=b.isArrowBeingClicked=!1;else if(!1===
b.arrowLeftVisible)g.show(),b.arrowLeftVisible=!0;b.currentSlide=c(d.find(a.unitElement)[Math.abs(e/b.unitWidth)]).data("slide");if(c.isFunction(a.onShift))a.onShift(b.currentSlide)},_clearInterval:function(){var a=this.internal,b=this.options,d=c(this.element).find(b.target);if("number"===typeof a.timer)a.isArrowBeingClicked=!1,g.clearInterval(a.timer);!1===i&&(i=!0,this._animate(d,{left:this.computeAdjust(d)},b.speed,function(){i=!1}))},_doArrowBeingClicked:function(a){var b=this,d=this.internal,
e=this.options,f=c(this.element).find(e.target),g=f.position().left,h=d.targetParentMarginLeft;if(i!==!0){if(a==="left")a=g-h+d.unitWidth;else if(a==="right")a=g-h-d.unitWidth;else throw Error("unknown direction");i=!0;this._animate(f,{left:a},e.speed,function(){b._setArrowVisibility();i=!1;matchimage()})}},_setArrowEvents:function(){var a=this,b=this.options,d=this.internal,e=c(this.element).find(b.arrowLeft),f=c(this.element).find(b.arrowRight),k="",h="";e.on("click.responsiveCarousel",function(a){a.preventDefault()});
f.on("click.responsiveCarousel",function(a){a.preventDefault()});b.dragEvents===!0?(k="mousedown.responsiveCarousel touchstart.responsiveCarousel",h="mouseup.responsiveCarousel touchend.responsiveCarousel"):(k="mousedown.responsiveCarousel",h="mouseup.responsiveCarousel");e.on(k,function(b){b.preventDefault();if(i===!1&&(d.isArrowBeingClicked=d.firstMouseClick=!0,d.timer=g.setInterval(function(){a._doArrowBeingClicked("left")},10),d.slideTimer))g.clearInterval(d.slideTimer),d.slideShowActive=!1});
f.on(k,function(){if(i===!1&&(d.isArrowBeingClicked=d.firstMouseClick=!0,d.timer=g.setInterval(function(){a._doArrowBeingClicked("right")},10),d.slideTimer))g.clearInterval(d.slideTimer),d.slideShowActive=!1});c(this.element).on(h,function(){d.isArrowBeingClicked===!0&&a._clearInterval()})},_setUnitWidth:function(){var a,b,d=this,e=this.internal,f=this.options,k=c(this.element).find(f.target),h=c(this.element),i=k.find(f.unitElement).eq(0),j=new this.wait,l=function(){e.unitWidth=i.outerWidth()},
o=function(){var c=h.find(f.mask).innerWidth();b=f.responsiveUnitSize(h,e,f);if("number"!==typeof b||b<1)throw Error("The responsiveUnitSize callback must return a whole number greater than 0");a=c/b;a=Math.floor(a);k.find(f.unitElement).css("width",a);e.unitWidth=a};if(f.unitWidth==="inherit")l(),k.find("img").on("load.responsiveCarousel",function(){l();d._setTargetWidth("inherit");d._setArrowVisibility();if(c.isFunction(f.onRedraw))f.onRedraw(h,e,f)});else if(f.unitWidth==="compute"){l();c.isFunction(f.responsiveUnitSize)&&
(o(),l());if(c.isFunction(f.onRedraw))f.onRedraw(h,e,f);k.find("img").on("load",function(){c.isFunction(f.responsiveUnitSize)&&o();l();d._setTargetWidth("compute");d._setArrowVisibility();if(c.isFunction(f.onRedraw))f.onRedraw(h,e,f)});c(g).on("resize.responsiveCarousel",function(){j.thenDo(function(){c.isFunction(f.responsiveUnitSize)&&o();l();d._setTargetWidth("compute (window resize)");k.css({left:e.currentSlide*-1*e.unitWidth});d._setArrowVisibility();if(c.isFunction(f.onRedraw))f.onRedraw(h,
e,f)},100)})}else e.unitWidth=f.unitWidth},_dragEvents:function(){var a=this,b=this.options,d=this.internal,e=c(this.element).find(b.target),f=e.parent(),f=new Hammer(f.get(0),{drag:!0,drag_vertical:!1,drag_horizontal:!0,drag_min_distance:0,transform:!1,tap:!1,tap_double:!1,hold:!1}),g;f.ondragstart=function(){if(!0===d.isArrowBeingClicked||!0===i)return{};i=!0;parseInt(e.css("top"),10);g=parseInt(e.css("left"),10);(new Date).getTime()};f.ondrag=function(a){if(!0!==d.isArrowBeingClicked){d.nudgeDirection=
null;if(a.direction==="up"||a.direction==="left"){if(a.distance=-a.distance,Math.abs(a.distance)>b.nudgeThreshold&&Math.abs(a.distance)<d.unitWidth/2)d.nudgeDirection="left"}else if(a.distance>b.nudgeThreshold&&a.distance<d.unitWidth/2)d.nudgeDirection="right";a=g+a.distance*1;d.left=a;e.css("left",a)}};f.ondragend=function(){e.stop(!0,!1);a._animate(e,{left:a.computeAdjust(e)},b.speed,function(){a._setArrowVisibility();i=!1})}},_create:function(){var a=this.options,b=this.internal,d=c(this.element),
e=c(this.element).find(a.target);this.internal.targetBackupCopy=this.element;if(this.options.cssAnimations)this.internal.prefix=this._getPrefix("transition");e.css({position:"relative",left:0});e.find(a.unitElement).each(function(a){c(this).attr({"data-slide":a})});a.dragEvents===!0&&this._dragEvents();this._setArrowEvents();this._setUnitWidth();this._setTargetWidth("first load");this._setArrowVisibility();if(c.isFunction(a.onRedraw))a.onRedraw(d,b,a)},redraw:function(){var a=this.internal,b=this.options,
d=c(this.element);this._setUnitWidth();this._setTargetWidth("_redraw");this._setArrowVisibility();if(c.isFunction(this.options.onRedraw))this.options.onRedraw(d,a,b)},getCurrentSlide:function(){return this.internal.currentSlide},goToSlide:function(a){var b=this,d=this.internal,e=this.options,f=c(this.element).find(e.target);this._setUnitWidth();a=a*d.unitWidth*-1;i=!0;this._animate(f,{left:a},e.speed,function(){i=!1;b._setArrowVisibility()})},toggleSlideShow:function(){var a=this,b=this.internal,
d=this.options,e=c(this.element).find(d.target),f=function(c){var f=b.targetParentInnerWidth,g=e.position().left,j=g+b.targetWidth,l=g+c*b.unitWidth,c=j+c*b.unitWidth,o=l;if(b.slideBumped===!1){if(c<=f)o=l+f-c,b.slideBumped="left";if(l>=0)b.slideBumped="right",o=0}else"left"===b.slideBumped&&(o=0),"right"===b.slideBumped&&(o=g+f-j),b.slideBumped=!1;i=!0;a._animate(e,{left:o},d.speed,function(){i=!1;a._setArrowVisibility()})};if(!1===b.slideShowActive)b.slideShowActive=!0,b.slideTimer=g.setInterval(function(){f(d.step)},
d.slideSpeed);else if(!0===b.slideShowActive)b.slideShowActive=!1,g.clearInterval(b.slideTimer)},destroy:function(){c(g).unbind(".responsiveCarousel");c(this.element).find(this.options.arrowLeft).unbind(".responsiveCarousel");c(this.element).find(this.options.arrowRight).unbind(".responsiveCarousel");this.element=this.internal.targetBackupCopy;c.Widget.prototype.destroy.call(this)},computeAdjust:function(a){var b=this.internal,a=a.position().left,c=b.unitWidth/-2,e=b.targetParentInnerWidth,f,g=b.nudgeDirection,
h=b.unitWidth;g!==null&&(g==="left"&&(f=a-h),g==="right"&&(f=a+h),a=f);b=a+b.targetWidth;b<e&&(a=f=a+e-b);a>0&&(a=f=0);b=a%this.internal.unitWidth;b!==0&&(b<c&&(f=a-(this.internal.unitWidth+b)),b>c&&(f=a-b));return f}})})(jQuery,window,document);
(function(c){c.fn.fitVids=function(g){var j={customSelector:null},i=document.createElement("div"),a=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];i.className="fit-vids-style";i.innerHTML="&shy;<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>";a.parentNode.insertBefore(i,
a);g&&c.extend(j,g);return this.each(function(){var a=["iframe[src*='player.vimeo.com']","iframe[src*='www.youtube.com']","iframe[src*='www.kickstarter.com']","object","embed"];j.customSelector&&a.push(j.customSelector);c(this).find(a.join(",")).each(function(){var a=c(this);if(!(this.tagName.toLowerCase()==="embed"&&a.parent("object").length||a.parent(".fluid-width-video-wrapper").length)){var b=this.tagName.toLowerCase()==="object"||a.attr("height")&&!isNaN(parseInt(a.attr("height"),10))?parseInt(a.attr("height"),
10):a.height(),f=!isNaN(parseInt(a.attr("width"),10))?parseInt(a.attr("width"),10):a.width();b/=f;a.attr("id")||(f="fitvid"+Math.floor(Math.random()*999999),a.attr("id",f));a.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",b*100+"%");a.removeAttr("height").removeAttr("width")}})})}})(jQuery);
