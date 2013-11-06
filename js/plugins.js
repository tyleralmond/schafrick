// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Place any jQuery/helper plugins in here.


/*PRELOADER*/

/*
* jPreLoader - jQuery plugin
* Create a Loading Screen to preload images and content for you website
*
* Name:         jPreLoader.js
* Author:       Kenny Ooi - http://www.inwebson.com
* Date:         July 11, 2012       
* Version:      2.1
* Example:      http://www.inwebson.com/demo/jpreloader-v2/
*   
*/

(function($) {
    var items = new Array(),
        errors = new Array(),
        onComplete = function() {},
        current = 0;
    
    var jpreOptions = {
        splashVPos: '35%',
        loaderVPos: '0%',
        splashID: '#jpreContent',
        showSplash: true,
        showPercentage: false,
        autoClose: true,
        closeBtnText: 'Start!',
        onetimeLoad: false,
        debugMode: false,
        splashFunction: function() {}
    }
    
    //cookie
    var getCookie = function() {
        if( jpreOptions.onetimeLoad ) {
            var cookies = document.cookie.split('; ');
            for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
                if ((parts.shift()) === "jpreLoader") {
                    return (parts.join('='));
                }
            }
            return false;
        } else {
            return false;
        }
        
    }
    var setCookie = function(expires) {
        if( jpreOptions.onetimeLoad ) {
            var exdate = new Date();
            exdate.setDate( exdate.getDate() + expires );
            var c_value = ((expires==null) ? "" : "expires=" + exdate.toUTCString());
            document.cookie="jpreLoader=loaded; " + c_value;
        }
    }
    
    //create jpreLoader UI
    var createContainer = function() {
        
        jOverlay = $('<div></div>')
        .attr('id', 'jpreOverlay')
        .css({
            position: "fixed",
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999999
        })
        .appendTo('body');
        
        if(jpreOptions.showSplash) {
            jContent = $('<div></div>')
            .attr('id', 'jpreSlide')
            .appendTo(jOverlay);
            
            var conWidth = $(window).width() - $(jContent).width();
            $(jContent).css({
                position: "absolute",
                top: jpreOptions.splashVPos,
                left: Math.round((50 / $(window).width()) * conWidth) + '%'
            });
            $(jContent).html($(jpreOptions.splashID).wrap('<div/>').parent().html());
            $(jpreOptions.splashID).remove();
            jpreOptions.splashFunction()            
        }
        
        jLoader = $('<div></div>')
        .attr('id', 'jpreLoader')
        .appendTo(jOverlay);
        
        var posWidth = $(window).width() - $(jLoader).width();
        $(jLoader).css({
            position: 'absolute',
            top: jpreOptions.loaderVPos,
            left: Math.round((50 / $(window).width()) * posWidth) + '%'
        });
        
        jBar = $('<div></div>')
        .attr('id', 'jpreBar')
        .css({
            width: '0%',
            height: '100%'
        })
        .appendTo(jLoader);
        
        if(jpreOptions.showPercentage) {
            jPer = $('<div></div>')
            .attr('id', 'jprePercentage')
            .css({
                position: 'relative',
                height: '100%'
            })
            .appendTo(jLoader)
            .html('Loading...');
        }
        if( !jpreOptions.autoclose ) {
            jButton = $('<div></div>')
            .attr('id', 'jpreButton')
            .on('click', function() {
                loadComplete();
            })
            .css({
                position: 'relative',
                height: '100%'
            })
            .appendTo(jLoader)
            .text(jpreOptions.closeBtnText)
            .hide();
        }
    }
    
    //get all images from css and <img> tag
    var getImages = function(element) {
        $(element).find('*:not(script)').each(function() {
            var url = "";

            if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
                url = $(this).css('background-image');
                if(url.indexOf('url') != -1) {
                    var temp = url.match(/url\((.*?)\)/);
                    url = temp[1].replace(/\"/g, '');
                }
            } else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
                url = $(this).attr('src');
            }
            
            if (url.length > 0) {
                items.push(url);
            }
        });
    }
    
    //create preloaded image
    var preloading = function() {
        for (var i = 0; i < items.length; i++) {
            if(loadImg(items[i]));
        }
    }
    var loadImg = function(url) {
        var imgLoad = new Image();
        $(imgLoad)
        .load(function() {
            completeLoading();
        })
        .error(function() {
            errors.push($(this).attr('src'));
            completeLoading();
        })
        .attr('src', url);
    }
    
    //update progress bar once image loaded
    var completeLoading = function() {
        current++;

        var per = Math.round((current / items.length) * 100);
        $(jBar).stop().animate({
            width: per + '%'
        }, 500, 'linear');
        
        if(jpreOptions.showPercentage) {
            $(jPer).text(per+"%");
        }
        
        //if all images loaded
        if(current >= items.length) {
            current = items.length;
            setCookie();    //create cookie
            
            if(jpreOptions.showPercentage) {
                $(jPer).text("100%");
            }
            
            //fire debug mode
            if (jpreOptions.debugMode) {
                var error = debug();
            }
            
            
            //max progress bar
            $(jBar).stop().animate({
                width: '100%'
            }, 500, 'linear', function() {
                //autoclose on
                if( jpreOptions.autoClose )
                    loadComplete();
                else
                    $(jButton).fadeIn(1000);
            }); 
        }   
    }
    
    //triggered when all images are loaded
    var loadComplete = function() {
        $(jOverlay).fadeOut(800, function() {
            $(jOverlay).remove();
            onComplete();   //callback function
        });
    }
    
    //debug mode
    var debug = function() {
        if(errors.length > 0) {
            var str = 'ERROR - IMAGE FILES MISSING!!!\n\r'
            str += errors.length + ' image files cound not be found. \n\r'; 
            str += 'Please check your image paths and filenames:\n\r';
            for (var i = 0; i < errors.length; i++) {
                str += '- ' + errors[i] + '\n\r';
            }
            return true;
        } else {
            return false;
        }
    }
    
    $.fn.jpreLoader = function(options, callback) {
        if(options) {
            $.extend(jpreOptions, options );
        }
        if(typeof callback == 'function') {
            onComplete = callback;
        }
        
        //show preloader once JS loaded
        $('body').css({
            'display': 'block'
        });
        
        return this.each(function() {
            if( !(getCookie()) ) {
                createContainer();
                getImages(this);
                preloading();
            }
            else {  //onetime load / cookie is set
                $(jpreOptions.splashID).remove();
                onComplete();
            }
        });
    };

})(jQuery);



/*iOS OREINTATION CHANGE FIX*/

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
*/
(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );



/*COUNTDOWN*/

/*
 * jQuery The Final Countdown plugin v1.0.0 beta
 * http://github.com/hilios/jquery.countdown
 *
 * Copyright (c) 2011 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(h){h.fn.countdown=function(a,l){function m(a,d){return function(){return d.call(a)}}var k="seconds minutes hours days weeks daysLeft".split(" ");return this.each(function(){function j(){if(0===e.closest("html").length)clearInterval(f),d("removed");else{c--;0>c&&(c=0);g={seconds:c%60,minutes:Math.floor(c/60)%60,hours:Math.floor(c/60/60)%24,days:Math.floor(c/60/60/24),weeks:Math.floor(c/60/60/24/7),daysLeft:Math.floor(c/60/60/24)%7};for(var a=0;a<k.length;a++){var b=k[a];i[b]!=g[b]&&(i[b]=g[b],d(b))}0==c&&(clearInterval(f),d("finished"))}}function d(d){var b=h.Event(d);b.date=new Date((new Date).valueOf()+c);b.value=i[d]||"0";b.toDate=a;b.lasting=g;switch(d){case "seconds":case "minutes":case "hours":b.value=10>b.value?"0"+b.value.toString():b.value.toString();break;default:b.value&&(b.value=b.value.toString())}l.call(e,b)}if(!(a instanceof Date))if(String(a).match(/^[0-9]*$/))a=new Date(a);else if(a.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/)||a.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/))a=new Date(a);else if(a.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/)||a.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})/))a=new Date(a);else throw Error("Doesn't seen to be a valid date object or string");var e=h(this),i={},g={},f=e.data("countdownInterval"),c=Math.floor((a.valueOf()-(new Date).valueOf())/1E3);j();f&&clearInterval(f);e.data("countdownInterval",setInterval(m(e,j),1E3));f=e.data("countdownInterval")})}})(jQuery);



/*CAROUSEL - PORTFOLIO*/

/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.23",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;

/*
 * Hammer.JS
 * version 0.6.1
 * author: Eight Media
 * https://github.com/EightMedia/hammer.js
 */
function Hammer(l,r,j){var g=this;var x={prevent_default:false,css_hacks:true,cancel_event:true,swipe:true,swipe_time:200,swipe_min_distance:20,drag:true,drag_vertical:true,drag_horizontal:true,drag_min_distance:20,transform:true,scale_treshold:0.1,rotation_treshold:15,tap:true,tap_double:true,tap_max_interval:300,tap_max_distance:10,tap_double_distance:20,hold:true,hold_timeout:500};r=A(x,r);(function(){if(!r.css_hacks){return false;}var P=["webkit","moz","ms","o",""];var M={userSelect:"none",touchCallout:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"};var O="";for(var L=0;L<P.length;L++){for(var N in M){O=N;if(P[L]){O=P[L]+O.substring(0,1).toUpperCase()+O.substring(1);}l.style[O]=M[N];}}})();var G=0;var q=0;var H=0;var v={};var I=0;var i=false;var e=null;var d=null;var p=null;var z={x:0,y:0};var b=null;var y=null;var J={};var a=false;var h;var c;var w;var E=("ontouchstart" in window);this.option=function(L,M){if(M!=j){r[L]=M;}return r[L];};this.getDirectionFromAngle=function(N){var O={down:N>=45&&N<135,left:N>=135||N<=-135,up:N<-45&&N>-135,right:N>=-45&&N<=45};var M,L;for(L in O){if(O[L]){M=L;break;}}return M;};function s(L){return L.touches?L.touches.length:1;}function K(O){O=O||window.event;if(!E){var Q=document,M=Q.body;return[{x:O.pageX||O.clientX+(Q&&Q.scrollLeft||M&&M.scrollLeft||0)-(Q&&Q.clientLeft||M&&Q.clientLeft||0),y:O.pageY||O.clientY+(Q&&Q.scrollTop||M&&M.scrollTop||0)-(Q&&Q.clientTop||M&&Q.clientTop||0)}];}else{var S=[],R,P=O.touches.length>0?O.touches:O.changedTouches;for(var N=0,L=P.length;N<L;N++){R=P[N];S.push({x:R.pageX,y:R.pageY});}return S;}}function m(M,L){return Math.atan2(L.y-M.y,L.x-M.x)*180/Math.PI;}function n(M,N){if(M.length==2&&N.length==2){var L,Q;L=M[0].x-M[1].x;Q=M[0].y-M[1].y;var O=Math.sqrt((L*L)+(Q*Q));L=N[0].x-N[1].x;Q=N[0].y-N[1].y;var P=Math.sqrt((L*L)+(Q*Q));return P/O;}return 0;}function k(N,O){if(N.length==2&&O.length==2){var M,Q;M=N[0].x-N[1].x;Q=N[0].y-N[1].y;var P=Math.atan2(Q,M)*180/Math.PI;M=O[0].x-O[1].x;Q=O[0].y-O[1].y;var L=Math.atan2(Q,M)*180/Math.PI;return L-P;}return 0;}function F(L,M){M.touches=K(M.originalEvent);M.type=L;if(o(g["on"+L])){g["on"+L].call(g,M);}}function B(L){if(!r.cancel_event){return;}L=L||window.event;if(L.preventDefault){L.preventDefault();L.stopPropagation();}else{L.returnValue=false;L.cancelBubble=true;}}function C(){v={};i=false;I=0;G=0;q=0;e=null;}var u={hold:function(L){if(r.hold){e="hold";clearTimeout(y);y=setTimeout(function(){if(e=="hold"){F("hold",{originalEvent:L,position:v.start});}},r.hold_timeout);}},swipe:function(R){if(!v.move){return;}var P=v.move[0].x-v.start[0].x;var O=v.move[0].y-v.start[0].y;G=Math.sqrt(P*P+O*O);var N=new Date().getTime();var Q=N-p;if(r.swipe&&(r.swipe_time>Q)&&(G>r.swipe_min_distance)){q=m(v.start[0],v.move[0]);H=g.getDirectionFromAngle(q);e="swipe";var M={x:v.move[0].x-J.left,y:v.move[0].y-J.top};var L={originalEvent:R,position:M,direction:H,distance:G,distanceX:P,distanceY:O,angle:q};F("swipe",L);}},drag:function(R){var P=v.move[0].x-v.start[0].x;var O=v.move[0].y-v.start[0].y;G=Math.sqrt(P*P+O*O);if(r.drag&&(G>r.drag_min_distance)||e=="drag"){q=m(v.start[0],v.move[0]);H=g.getDirectionFromAngle(q);var Q=(H=="up"||H=="down");if(((Q&&!r.drag_vertical)||(!Q&&!r.drag_horizontal))&&(G>r.drag_min_distance)){return;}var S=m(v.interim||v.start[0],v.move[0]),N=g.getDirectionFromAngle(S);v.interim=v.move[0];e="drag";var M={x:v.move[0].x-J.left,y:v.move[0].y-J.top};var L={originalEvent:R,position:M,direction:H,distance:G,distanceX:P,distanceY:O,angle:q,interim_angle:S,interim_direction:N};if(i){F("dragstart",L);i=false;}F("drag",L);B(R);}},transform:function(N){if(r.transform){if(s(N)!=2){return false;}var M=k(v.start,v.move);var O=n(v.start,v.move);if(e!="drag"&&(e=="transform"||Math.abs(1-O)>r.scale_treshold||Math.abs(M)>r.rotation_treshold)){e="transform";v.center={x:((v.move[0].x+v.move[1].x)/2)-J.left,y:((v.move[0].y+v.move[1].y)/2)-J.top};var L={originalEvent:N,position:v.center,scale:O,rotation:M};if(i){F("transformstart",L);i=false;}F("transform",L);B(N);return true;}}return false;},tap:function(P){var M=new Date().getTime();var O=M-p;if(r.hold&&!(r.hold&&r.hold_timeout>O)){return;}var N=(function(){if(z&&r.tap_double&&d=="tap"&&(p-b)<r.tap_max_interval){var S=Math.abs(z[0].x-v.start[0].x);var R=Math.abs(z[0].y-v.start[0].y);return(z&&v.start&&Math.max(S,R)<r.tap_double_distance);}return false;})();if(N){e="double_tap";b=null;F("doubletap",{originalEvent:P,position:v.start});B(P);}else{var Q=(v.move)?Math.abs(v.move[0].x-v.start[0].x):0;var L=(v.move)?Math.abs(v.move[0].y-v.start[0].y):0;G=Math.max(Q,L);if(G<r.tap_max_distance){e="tap";b=M;z=v.start;if(r.tap){F("tap",{originalEvent:P,position:v.start});B(P);}}}}};function t(M){switch(M.type){case"mousedown":case"touchstart":v.start=K(M);p=new Date().getTime();I=s(M);i=true;h=M;var L=l.getBoundingClientRect();var R=l.clientTop||document.body.clientTop||0;var Q=l.clientLeft||document.body.clientLeft||0;var O=window.pageYOffset||l.scrollTop||document.body.scrollTop;var P=window.pageXOffset||l.scrollLeft||document.body.scrollLeft;J={top:L.top+O-R,left:L.left+P-Q};a=true;u.hold(M);if(r.prevent_default){B(M);}break;case"mousemove":case"touchmove":if(!a){return false;}c=M;v.move=K(M);if(!u.transform(M)){u.drag(M);}break;case"mouseup":case"mouseout":case"touchcancel":case"touchend":if(!a||(e!="transform"&&M.touches&&M.touches.length>0)){return false;}a=false;w=M;var N=e=="drag";u.swipe(M);if(N){F("dragend",{originalEvent:M,direction:H,distance:G,angle:q});}else{if(e=="transform"){F("transformend",{originalEvent:M,position:v.center,scale:n(v.start,v.move),rotation:k(v.start,v.move)});}else{u.tap(h);}}d=e;F("release",{originalEvent:M,gesture:e});C();break;}}if(E){f(l,"touchstart touchmove touchend touchcancel",t);}else{f(l,"mouseup mousedown mousemove",t);f(l,"mouseout",function(L){if(!D(l,L.relatedTarget)){t(L);}});}function D(L,N){if(!N&&window.event&&window.event.toElement){N=window.event.toElement;}if(L===N){return true;}if(N){var M=N.parentNode;while(M!==null){if(M===L){return true;}M=M.parentNode;}}return false;}function A(N,M){var L={};if(!M){return N;}for(var O in N){if(O in M){L[O]=M[O];}else{L[O]=N[O];}}return L;}function o(L){return Object.prototype.toString.call(L)=="[object Function]";}function f(O,N,P){N=N.split(" ");for(var M=0,L=N.length;M<L;M++){if(O.addEventListener){O.addEventListener(N[M],P,false);}else{if(document.attachEvent){O.attachEvent("on"+N[M],P);}}}}}

/*jslint nomen: true, browser: true */
/*global Modernizr, Hammer, jQuery */
/*properties
    Widget, _animate, _clearInterval, _create, _doArrowBeingClicked, _dragEvents,
    _getPrefix, _setArrowEvents, _setArrowVisibility, _setTargetWidth,
    _setUnitWidth, abs, animate, arrowLeft, arrowLeftVisible, arrowRight,
    arrowRightVisible, attr, call, charAt, clearInterval, clearTimeout,
    computeAdjust, createElement, css, cssAnimations, csstransitions,
    currentSlide, data, 'data-slide', destroy, direction, distance, drag,
    dragEvents, drag_horizontal, drag_min_distance, drag_vertical, each, element,
    eq, find, firstMouseClick, floor, get, getCurrentSlide, getTime, goToSlide,
    hasOwnProperty, height, hide, hold, innerWidth, internal,
    isArrowBeingClicked, isFunction, left, length, mask, nudgeDirection,
    nudgeThreshold, on, onRedraw, onShift, ondrag, ondragend, ondragstart,
    options, outerHeight, outerWidth, parent, parents, position, prefix,
    preventDefault, prototype, redraw, responsiveStep, responsiveUnitSize,
    setInterval, setTimeout, show, slice, slideBumped, slideShowActive,
    slideSpeed, slideTimer, speed, step, stop, style, tap, tap_double, target,
    targetBackupCopy, targetLeft, targetOuterHeight, targetOuterWidth,
    targetParentInnerWidth, targetParentMarginLeft, targetParentOuterHeight,
    targetParentOuterWidth, targetWidth, thenDo, time, timer, toLowerCase,
    toUpperCase, toggleSlideShow, top, transform, unbind, unitElement, unitWidth,
    wait, widget, width
*/
/*!
 * responsiveCarousel
 * A responsive carousel that works in desktop browsers, ipad, iphone, and even
 * most Androids.  It uses css3 animations with a jquery animation fallback for
 * greater speed.  The code was optimized to minimize page reflows to further
 * enhance the overall speed.
 *
 * This is a jQuery UI Widget
 *
 * @version 0.3.0
 * @releaseDate 9/6/2012
 * @author Matthew Toledo
 * @url https://github.com/mrbinky3000/responsive_carousel
 * @requires jQuery, jQuery UI (only the Core and Widget Factory), modernizr (only css3 transitions test, touch test optional), hammer.js
 */
(function ($, window, document) {
    "use strict";
    var busy = false;



    $.widget("ri.responsiveCarousel", {

        //Options to be used as defaults
        options: {
            arrowLeft: '.arrow-left a',
            arrowRight: '.arrow-right a',
            target: '.slider-target',
            mask: '.slider-mask',
            unitElement: 'li',
            unitWidth: 'compute',
            responsiveUnitSize: null,
            onRedraw: null,
            dragEvents: false,
			speed: 400,
			slideSpeed: 2500,
			step: -1,
			responsiveStep: null,
		    onShift: null,
            // cssAnimations: Modernizr.csstransitions,
            nudgeThreshold: 10
        },

        // a place to store internal vars used only by this instance of the widget
        internal: {
			currentSlide: 0,
            left: 0,
            targetWidth: 0,
            unitWidth: 0,
            targetOuterWidth: 0,
            targetOuterHeight: 0,
            targetParentOuterWidth: 0,
            targetParentInnerWidth: 0,
            targetParentOuterHeight: 0,
            targetParentMarginLeft: 0,
            targetBackupCopy: null,
            isArrowBeingClicked: false,
            arrowLeftVisible: true,  // when page first loads, both arrows are visible until _setArrowVisibility() called
            arrowRightVisible: true,
            targetLeft: 0,
            timer: null,
            firstMouseClick: false,
            prefix: null,
			slideShowActive: false,
			slideTimer: null,
			slideBumped: false,
            nudgeDirection: null
        },

        // Execute a callback only after a series of events are done being triggered.
        // prevents runaway conditions (like during a window resize)
        wait: function () {
            var t, _d = function (callback, ms) {
                if ('undefined' !== typeof t) {
                    window.clearTimeout(t);
                }
                t = window.setTimeout(callback, ms);
            };
            return {
                thenDo : function (callback, ms) {
                    _d(callback, ms);
                }
            };
        },

        _getPrefix: function (prop) {
            var prefixes = ['Moz', 'Webkit', 'Khtml', '0', 'ms'],
                elem = document.createElement('div'),
                upper = prop.charAt(0).toUpperCase() + prop.slice(1),
                pref = "",
                len = prefixes.length;

            while (len > -1) {
                if (elem.style.hasOwnProperty(prefixes[len] + upper)) {
                    pref = (prefixes[len]);
                }
                len = len - 1;
            }

            if (elem.style.hasOwnProperty(prop)) {
                pref = (prop);
            }

            return '-' + pref.toLowerCase() + '-';

        },



        /**
         * A proxy function that should be called to animate stuff instead of using jQuery's $.animate() function.
         * If the user's browser supports CSS3 Transitions, we use them since they are faster.  If they don't support
         * Transitions, we jQuery's default $.animate() method which is fast on newer computers, but slower on some
         * under-powered mobile devices.  $.animate() also causes page reflows, which we are trying to avoid.
         *
         * TODO:  make this support more than one type of easing.
         *
         * @param $target
         * @param props object The css attributes to animate
         * @param speed integer Speed in milliseconds
         * @param callback function A function to call after the animateion is done
         * @return {*} This is chainable.
         * @private
         */
        _animate: function ($target, props, speed, callback) {
            var options = this.options,
                internal = this.internal;



            return $target.each(function () {
                var $this = $(this),
                    prefix = (internal.prefix);

                if (options.cssAnimations) {
                    $this.css(prefix + 'transition', 'all ' + speed / 1000 + 's ease-in-out').css(props);
                    window.setTimeout(function () {
                        $this.css(prefix + 'transition', '');
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    }, speed);
                } else {
                    $this.animate(props, speed, function () {
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    });
                }
            });
        },



        /**
         * Compute the new width for the target element (the element that holds all the things
         * that slide). Store the new width in our internal object.  Finally, assign the target
         * the new width.
         *
         * @param string caller Optional string used for debugging.
         * @return void
         * @private
         */
        _setTargetWidth: function (caller) {
            var internal = this.internal,
                options = this.options,
                $el = $(this.element),
                $target = $(this.element).find(options.target);

            caller = ' ' + caller; // shut up jsLint

            internal.targetWidth =  $target.find(options.unitElement).length * internal.unitWidth;
            $el.find(options.target).width(internal.targetWidth);
            internal.targetOuterWidth = $target.outerWidth();
            internal.targetOuterHeight = $target.outerHeight();
            internal.targetParentOuterWidth = $target.parent().outerWidth();
            internal.targetParentInnerWidth = $target.parent().innerWidth();
            internal.targetParentOuterHeight = $target.parent().outerHeight();
            internal.targetParentMarginLeft = parseInt($target.parents().css('marginLeft'), 10);
            if (isNaN(internal.targetParentMarginLeft)) {
                internal.targetParentMarginLeft = 0;
            }
        },

        /**
         * Set the visibility of the left and right scroll arrows.  Also computes the number of
		 * the left-most visible slide.
         * @private
         * @return void
         */
        _setArrowVisibility: function () {

            var options = this.options,
                internal = this.internal,
                $target = $(this.element).find(options.target),
                currentLeft  = $target.position().left,
                currentRight = internal.targetOuterWidth + currentLeft,
                $arrowLeft = $(this.element).find(options.arrowLeft),
                $arrowRight = $(this.element).find(options.arrowRight),
                maskLeft = 0,
                maskRight = internal.targetParentOuterWidth;

			// right arrow
            if (currentRight <= maskRight) {
                $arrowRight.hide();
                if (internal.isArrowBeingClicked === true) {
                    this._clearInterval();
                }
                internal.arrowRightVisible = internal.isArrowBeingClicked = false;
            } else {
                if (false === internal.arrowRightVisible) {
                    $arrowRight.show();
                    internal.arrowRightVisible = true;
                }
            }

			// left arrow
            if (currentLeft >= maskLeft) {
                $arrowLeft.hide();
                if (internal.isArrowBeingClicked === true) {
                    this._clearInterval();
                }
                internal.arrowLeftVisible = internal.isArrowBeingClicked  = false;
            } else {
                if (false === internal.arrowLeftVisible) {
                    $arrowLeft.show();
                    internal.arrowLeftVisible = true;
                }
            }


			// determine number of left-most visible slide
			internal.currentSlide = $($target.find(options.unitElement)[Math.abs(currentLeft / internal.unitWidth)]).data('slide');
			if ($.isFunction(options.onShift)) {
				options.onShift(internal.currentSlide);
			}

        },


        _clearInterval : function () {
            var internal = this.internal,
                options = this.options,
                $target = $(this.element).find(options.target);

            if ('number' === typeof internal.timer) {
                internal.isArrowBeingClicked  = false;
                window.clearInterval(internal.timer);
            }
            if (false === busy) {
                busy = true;
                this._animate($target, {left: this.computeAdjust($target) }, options.speed, function () {
                    busy = false;
                });
            }
        },

		/**
		 * Handles when one of navigation arrows is being pressed with a finger or the mouse.
		 * @private
		 * @return void
		 */
		_doArrowBeingClicked: function (direction) {

            var that = this,
                internal = this.internal,
                options = this.options,
                $target = $(this.element).find(options.target),
                currLeft = $target.position().left,
                parentLeftOffset = internal.targetParentMarginLeft,
                newLeft;

            if (busy === true) {
                return;
            }



            if (direction === "left") {
                newLeft =  currLeft - parentLeftOffset + internal.unitWidth;
            } else if (direction === "right") {
                newLeft =  currLeft - parentLeftOffset - internal.unitWidth;
            } else {
                throw new Error("unknown direction");
            }


            // do the animation here
            busy = true;
            this._animate($target, {left: newLeft}, options.speed, function () {
                that._setArrowVisibility();
                busy = false;
                // image count
                matchimage();
            });

        },

        /**
         * Initialize the left and right arrow events.
         * @private
         * @return void
         */
        _setArrowEvents: function () {

            var that = this,
                options = this.options,
                internal = this.internal,
                $arrowLeft = $(this.element).find(options.arrowLeft),
                $arrowRight = $(this.element).find(options.arrowRight),
                eventStringDown = "",
                eventStringUp = "";


            // discard click on left arrow
            $arrowLeft.on('click.responsiveCarousel', function (ev) {
                ev.preventDefault();
            });

            // discard click on right arrow
            $arrowRight.on('click.responsiveCarousel', function (ev) {
                ev.preventDefault();
            });

            // type of events depend on touch or not.
            if (options.dragEvents === true) {
                eventStringDown = 'mousedown.responsiveCarousel touchstart.responsiveCarousel';
                eventStringUp = 'mouseup.responsiveCarousel touchend.responsiveCarousel';
            } else {
                eventStringDown = 'mousedown.responsiveCarousel';
                eventStringUp = 'mouseup.responsiveCarousel';
            }

            // left arrow, move left
            $arrowLeft.on(eventStringDown, function (ev) {
                ev.preventDefault();
                if (busy === false) {
                    internal.isArrowBeingClicked = internal.firstMouseClick = true;
                    internal.timer = window.setInterval(function () {that._doArrowBeingClicked('left'); }, 10);
                    if (internal.slideTimer) {
                        window.clearInterval(internal.slideTimer);
                        internal.slideShowActive = false;
                    }
                }
            });


            // right arrow, move right
            $arrowRight.on(eventStringDown, function () {

                if (busy === false) {
                    internal.isArrowBeingClicked = internal.firstMouseClick = true;
                    internal.timer = window.setInterval(function () {that._doArrowBeingClicked('right'); }, 10);
					if (internal.slideTimer) {
                        window.clearInterval(internal.slideTimer);
                        internal.slideShowActive = false;
                    }
                }
            });

            // mouse is up / touch is over?
            $(this.element).on(eventStringUp, function () {
                if (internal.isArrowBeingClicked === true) {
                    that._clearInterval();
                }
            });



        },

        /**
         * Figure out the width of each slider element (usually an li)
         *
         * "inherit"
         * ---------
         * If options.unitWidth is set to the string 'inherit', use the current width of the
         * slide unit (the blocks that go inside the slide target, like LI elements, for example)
         *
         * "compute"
         * --------
         * If options.unitWidth is set to the string 'compute', use an external callback to
         * dynamically determine the width based on any function you create.  that function
         * must return an integer with the new unit width.
         *
         * integer
         * -------
         * If options.unitWidth is an integer, it is converted to a pixel width.
         *
         * @private
         * @return void
         */
        _setUnitWidth: function () {

            var w, m,
                that = this,
                internal = this.internal,
                options = this.options,
                $target = $(this.element).find(options.target),
                $el = $(this.element),
                $firstUnit = $target.find(options.unitElement).eq(0),
                delay = new this.wait(),


                _importWidthFromDOM = function () {
                    internal.unitWidth = $firstUnit.outerWidth();
                },

                _setResponsiveUnitWidth = function () {
                    var maskInnerWidth = $el.find(options.mask).innerWidth();
                    m = options.responsiveUnitSize($el, internal, options);
                    if ('number' !== typeof m || m < 1) {
                        throw new Error("The responsiveUnitSize callback must return a whole number greater than 0");
                    }
                    w = maskInnerWidth / m;
                    w = Math.floor(w);
                    $target.find(options.unitElement).css('width', w);
                    internal.unitWidth = w;
                };



            if (options.unitWidth === 'inherit') {

                // first visit to page
                _importWidthFromDOM();


                // If the target has images in it's child elements, these images
                // can cause the widths to change as the page is updated. To counter
                // this, we'll re-run _importWidthFromDom after each image load in the
                // target or it's child elements.
                $target.find('img').on('load.responsiveCarousel', function () {
                    // fire the responsiveUnitSize callback
                    _importWidthFromDOM();
                    that._setTargetWidth('inherit');
                    that._setArrowVisibility();
                    if ($.isFunction(options.onRedraw)) {
                        options.onRedraw($el, internal, options);
                    }

                });


            } else if (options.unitWidth === 'compute') {

                // first visit to page
                _importWidthFromDOM();

                if ($.isFunction(options.responsiveUnitSize)) {
                    _setResponsiveUnitWidth();
                    _importWidthFromDOM();
                }
                if ($.isFunction(options.onRedraw)) {
                    options.onRedraw($el, internal, options);
                }

                // If the target has images in it's child elements, these images
                // can cause the widths to change as the page is updated. To counter
                // this, we'll re-run _importWidthFromDom after each image load in the
                // target or it's child elements.
                $target.find('img').on('load', function () {
                    // fire the responsiveUnitSize callback
                    if ($.isFunction(options.responsiveUnitSize)) {
                        _setResponsiveUnitWidth();
                    }
                    _importWidthFromDOM();
                    that._setTargetWidth('compute');
                    that._setArrowVisibility();
                    if ($.isFunction(options.onRedraw)) {
                        options.onRedraw($el, internal, options);
                    }
                });


                // re-import the width every time the page is re-sized.
                $(window).on('resize.responsiveCarousel', function () {
                    delay.thenDo(function () {
                        var adjust;

                        // fire the responsiveUnitSize callback
                        if ($.isFunction(options.responsiveUnitSize)) {
                            _setResponsiveUnitWidth();
                        }

                        // get the new width from the dom and store internally
                        _importWidthFromDOM();
                        that._setTargetWidth('compute (window resize)');

                        // keep the left-most fully visible object prior to the resize
                        // in the left-most slot after the resize
                        adjust = internal.currentSlide * -1 * internal.unitWidth;


                        // if we are not animating a transition, update the scroll arrows
                        $target.css({left: adjust});
                        that._setArrowVisibility();

                        if ($.isFunction(options.onRedraw)) {
                            options.onRedraw($el, internal, options);
                        }

                    }, 100);
                });


            } else {

                internal.unitWidth = options.unitWidth;
            }
        },

        /**
         * Handle optional drag events.  Works on touch and non-touch screens via mouse drag.
         *
         * @param jQuery container The object (usually a UL) that contains the elements that scroll, (usually LI's)
         * @private
         * @return void
         */
        _dragEvents: function () {

            var that = this,
                options = this.options,
                internal = this.internal,
                $target = $(this.element).find(options.target),
                $mask = $target.parent(),
                content = $target,
                hammer = new Hammer($mask.get(0), {
                    drag: true,
                    drag_vertical: false,
                    drag_horizontal: true,
                    drag_min_distance: 0,
                    transform: false,
                    tap: false,
                    tap_double: false,
                    hold: false
                }),
                scroll_start = {},
                scroll_dim = {},
                content_dim = {},

                getScrollPosition = function () {
                    return {
                        top: parseInt(content.css('top'), 10),
                        left: parseInt(content.css('left'), 10)
                    };
                };


            hammer.ondragstart = function () {

                if (true === internal.isArrowBeingClicked || true === busy) {
                    // prevent jitters due to fat fingers touching scroll arrow and carousel at same time.
                    // if we're already busy, ignore
                    return {};
                }

                busy = true;

                scroll_start = getScrollPosition();
                scroll_start.time = new Date().getTime();
                scroll_dim = {
                    width: internal.targetParentOuterWidth,
                    height: internal.targetParentOuterHeight
                };
                content_dim = {
                    width: internal.targetOuterWidth,
                    height: internal.targetOuterHeight
                };
            };

            hammer.ondrag = function (ev) {

                if (true === internal.isArrowBeingClicked) {
                    // prevent jitters due to fat fingers touching scroll arrow and carousel at same time.
                    return;
                }

				var delta = 1, left;

                internal.nudgeDirection = null;

				if (ev.direction === 'up' || ev.direction === 'left') {
					ev.distance = -ev.distance;
                    if (Math.abs(ev.distance) > options.nudgeThreshold && Math.abs(ev.distance) < internal.unitWidth / 2) {
                        internal.nudgeDirection = 'left';
                    }
				} else {
                    if (ev.distance > options.nudgeThreshold && ev.distance < internal.unitWidth / 2) {
                        internal.nudgeDirection = 'right';
                    }
                }

                left = scroll_start.left + ev.distance * delta;
                internal.left = left;
				content.css('left', left);

            };

            hammer.ondragend = function () {
                $target.stop(true, false);
                that._animate($target, {left: that.computeAdjust($target)}, options.speed, function () {
                    that._setArrowVisibility();
                    busy = false;
                });
            };

        },



        /**
         * Setup widget (eg. element creation, apply theming, bind events etc.)
         * @private
         * @return Void
         */
        _create: function () {

            // _create will automatically run the first time
            // this widget is called. Put the initial widget
            // setup code here, then you can access the element
            // on which the widget was called via this.element.
            // The options defined above can be accessed
            // via this.options this.element.addStuff();

            var options = this.options,
                internal = this.internal,
                $el = $(this.element),
                $target = $(this.element).find(options.target);




            // --------------------
            // _create MAIN FLOW
            // --------------------
            // backup original target element
            this.internal.targetBackupCopy = this.element;
            // if we are using css3 animations, determine the browser specific prefix (-ie,-moz,-webkit, etc)
            if (this.options.cssAnimations) {
                this.internal.prefix = this._getPrefix('transition');
            }
            // init the target DOM element's css
            $target.css({
                'position': 'relative',
                'left': 0
            });

            //number all the unitElements
            $target.find(options.unitElement).each(function (i) {
                $(this).attr({"data-slide": i});
            });

            // init touch events if applicable
            if (options.dragEvents === true) {
                this._dragEvents();
            }

            this._setArrowEvents();
            this._setUnitWidth();
            this._setTargetWidth('first load');
            this._setArrowVisibility();

            if ($.isFunction(options.onRedraw)) {
                options.onRedraw($el, internal, options);
            }


        },


        /**
         * Force a redraw of the carousel.
         * @public
         * @return void
         */
        redraw: function () {
            var that = this,
                internal = this.internal,
                options = this.options,
                $el = $(this.element);

            this._setUnitWidth();
            this._setTargetWidth('_redraw');
            this._setArrowVisibility();
            if ($.isFunction(this.options.onRedraw)) {
                that.options.onRedraw($el, internal, options);
            }
        },

        /**
         * return the number of the current slide.  numbering starts at zero.
         * @public
         * @return integer
         */
		getCurrentSlide: function () {
			return this.internal.currentSlide;
		},

        /**
         * Make a specified slide the left-most visible slide in the slider
         * @public
         */
		goToSlide: function (i) {
            var that = this,
                internal = this.internal,
				options = this.options,
				$target = $(this.element).find(options.target),
				newLeft;

			this._setUnitWidth();
			newLeft = i * internal.unitWidth * -1;
			busy = true;
			this._animate($target, {'left': newLeft}, options.speed, function () {
				busy = false;
				that._setArrowVisibility();
			});

		},

        /**
         * Activate / Deactivate slide show mode.
         * @public
         */
		toggleSlideShow: function () {


			var that = this,
				internal = this.internal,
				options = this.options,
				$target = $(this.element).find(options.target),


                _stopSlideShow = function () {
                    if (true === internal.slideShowActive) {
                        internal.slideShowActive = false;
                        window.clearInterval(internal.slideTimer);
                    }
                },

                _step = function (i) {
                    var width = internal.targetParentInnerWidth,
                        left = $target.position().left,
                        right = left + internal.targetWidth,
                        newLeft = left + i * internal.unitWidth,
                        newRight = right + i * internal.unitWidth,
                        adjustedLeft = newLeft;



                    if (internal.slideBumped === false) {

                        // too far left
                        if (newRight <= width) {
                            adjustedLeft = newLeft + width - newRight;
                            internal.slideBumped = 'left';
                        }

                        // too far right
                        if (newLeft >= 0) {
                            internal.slideBumped = 'right';
                            adjustedLeft = 0;
                        }

                    } else {

                        if ('left' === internal.slideBumped) {
                            adjustedLeft = 0;
                        }

                        if ('right' === internal.slideBumped) {
                            adjustedLeft = left + width - right;
                        }

                        internal.slideBumped = false;

                    }

                    // do the animation
                    busy = true;
                    that._animate($target, {'left': adjustedLeft}, options.speed, function () {
                        busy = false;
                        that._setArrowVisibility();
                    });

                };


			if (false === internal.slideShowActive) {
				internal.slideShowActive = true;
				internal.slideTimer = window.setInterval(function () {
					_step(options.step);
				}, options.slideSpeed);
			} else {
				_stopSlideShow();
			}

		},

        /**
         * Destroy this plugin and clean up modifications the widget has made to the DOM
         * @public
         * @return void
         */
        destroy: function () {

            // remove events created by this instance
            $(window).unbind('.responsiveCarousel');
            $(this.element).find(this.options.arrowLeft).unbind('.responsiveCarousel');
            $(this.element).find(this.options.arrowRight).unbind('.responsiveCarousel');

            // restore the element to it's original pristine state
            this.element = this.internal.targetBackupCopy;

            // For UI 1.8, destroy must be invoked from the base widget
            $.Widget.prototype.destroy.call(this);
            // For UI 1.9, define _destroy instead and don't worry about calling the base widget
        },


        /**
         * Try to keep the leftmost visible element (usually an LI) flush against the left border.
         * Use this to prevent on fractions of elements from being visible.
         * @param jQuery $target
         * @return integer
         * @public
         */
        computeAdjust : function ($target) {


            var internal = this.internal,
                left = $target.position().left,
                right,
                mod,
                thresh = internal.unitWidth / -2,
                width = internal.targetParentInnerWidth,
                newLeft,
                direction = internal.nudgeDirection,
                unitWidth = internal.unitWidth;


            // nudged with finger or mouse past the threshold level
            if (direction !== null) {
                if (direction === 'left') {
                    newLeft = left - unitWidth;
                }
                if (direction === 'right') {
                    newLeft = left + unitWidth;
                }
                left = newLeft;
            }

            // entire slider is too far left
            right = left + internal.targetWidth;
            if (right < width) {
                newLeft = left + width - right;
                left = newLeft;
            }

            // entire slider is too far right
            if (left > 0) {
                left = newLeft = 0;
            }


            // keep left most fully visible object aligned with left border

            mod = left % this.internal.unitWidth;

            if (mod !== 0) {

                if (mod < thresh) {
                    newLeft =  left - (this.internal.unitWidth + mod);
                }
                if (mod > thresh) {
                    newLeft = left - mod;
                }
            }

            // compute the number of the left-most slide and store the number of the left-most slide
            return newLeft;
        }


    });

}(jQuery, window, document));



/*FITVIDS - SHOW REEL*/

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
})( jQuery );




