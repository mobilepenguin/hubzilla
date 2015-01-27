!function($,t,i,s){"use strict";var o=function(){return this.init.apply(this,arguments)};o.prototype={defaults:{onstatechange:function(){},isRange:!1,showLabels:!0,showScale:!0,step:1,format:"%s",theme:"theme-green",width:300,minRange:0,maxRange:"auto"},template:'<div class="slider-container">			<div class="back-bar">                <div class="selected-bar"></div>                <div class="pointer low"></div><div class="pointer-label">123456</div>                <div class="pointer high"></div><div class="pointer-label">456789</div>                <div class="clickable-dummy"></div>            </div>            <div class="scale"></div>		</div>',init:function(t,i){this.options=$.extend({},this.defaults,i),this.inputNode=$(t),this.options.value=this.inputNode.val()||(this.options.isRange?this.options.from+","+this.options.from:this.options.from),this.domNode=$(this.template),this.domNode.addClass(this.options.theme),this.inputNode.after(this.domNode),this.domNode.on("change",this.onChange),this.pointers=$(".pointer",this.domNode),this.lowPointer=this.pointers.first(),this.highPointer=this.pointers.last(),this.labels=$(".pointer-label",this.domNode),this.lowLabel=this.labels.first(),this.highLabel=this.labels.last(),this.scale=$(".scale",this.domNode),this.bar=$(".selected-bar",this.domNode),this.clickableBar=this.domNode.find(".clickable-dummy"),this.interval=this.options.to-this.options.from,this.render()},render:function(){return 0!==this.inputNode.width()||this.options.width?(this.domNode.width(this.options.width||this.inputNode.width()),this.inputNode.hide(),this.isSingle()&&(this.lowPointer.hide(),this.lowLabel.hide()),this.options.showLabels||this.labels.hide(),this.attachEvents(),this.options.showScale&&this.renderScale(),void this.setValue(this.options.value)):void console.log("jRange : no width found, returning")},isSingle:function(){return"number"==typeof this.options.value?!0:-1!==this.options.value.indexOf(",")||this.options.isRange?!1:!0},attachEvents:function(){this.clickableBar.click($.proxy(this.barClicked,this)),this.pointers.mousedown($.proxy(this.onDragStart,this)),this.pointers.bind("dragstart",function(t){t.preventDefault()})},onDragStart:function(t){if(1===t.which){t.stopPropagation(),t.preventDefault();var s=$(t.target);this.pointers.removeClass("last-active"),s.addClass("focused last-active"),this[(s.hasClass("low")?"low":"high")+"Label"].addClass("focused"),$(i).on("mousemove.slider",$.proxy(this.onDrag,this,s)),$(i).on("mouseup.slider",$.proxy(this.onDragEnd,this))}},onDrag:function(t,i){i.stopPropagation(),i.preventDefault();var s=i.clientX-this.domNode.offset().left;this.domNode.trigger("change",[this,t,s])},onDragEnd:function(){this.pointers.removeClass("focused"),this.labels.removeClass("focused"),$(i).off(".slider"),$(i).off(".slider")},barClicked:function(t){var i=t.pageX-this.clickableBar.offset().left;if(this.isSingle())this.setPosition(this.pointers.last(),i,!0,!0);else{var s=Math.abs(parseInt(this.pointers.first().css("left"),10)-i+this.pointers.first().width()/2)<Math.abs(parseInt(this.pointers.last().css("left"),10)-i+this.pointers.first().width()/2)?this.pointers.first():this.pointers.last();this.setPosition(s,i,!0,!0)}},onChange:function(t,i,s,o){var e,n;i.isSingle()?(e=0,n=i.domNode.width()):(e=s.hasClass("high")?i.lowPointer.position().left+i.lowPointer.width()/2:0,n=s.hasClass("low")?i.highPointer.position().left+i.highPointer.width()/2:i.domNode.width());var h=Math.min(Math.max(o,e),n);i.setPosition(s,h,!0)},setPosition:function(t,i,s,o){var e,n=this.lowPointer.position().left,h=this.highPointer.position().left,a=this.highPointer.width()/2;s||(i=this.prcToPx(i)),t[0]===this.highPointer[0]?h=Math.round(i-a):n=Math.round(i-a),t[o?"animate":"css"]({left:Math.round(i-a)}),e=this.isSingle()?0:n+a,this.bar[o?"animate":"css"]({width:Math.round(h+a-e),left:e}),this.showPointerValue(t,i,o)},setValue:function(t){var i=t.toString().split(",");this.options.value=t;var s=this.valuesToPrc(2===i.length?i:[0,i[0]]);this.isSingle()?this.setPosition(this.highPointer,s[1]):(this.setPosition(this.lowPointer,s[0]),this.setPosition(this.highPointer,s[1]))},renderScale:function(){for(var t=this.options.scale||[this.options.from,this.options.to],i=Math.round(100/(t.length-1)*10)/10,s="",o=0;o<t.length;o++)s+='<span style="left: '+o*i+'%">'+("|"!=t[o]?"<ins>"+t[o]+"</ins>":"")+"</span>";this.scale.html(s),$("ins",this.scale).each(function(){$(this).css({marginLeft:-$(this).outerWidth()/2})})},getBarWidth:function(){var t=this.options.value.split(",");return t.length>1?parseInt(t[1],10)-parseInt(t[0],10):parseInt(t[0],10)},showPointerValue:function(t,i,o){var e=$(".pointer-label",this.domNode)[t.hasClass("low")?"first":"last"](),n,h=this.positionToValue(i);if($.isFunction(this.options.format)){var a=this.isSingle()?s:t.hasClass("low")?"low":"high";n=this.options.format(h,a)}else n=this.options.format.replace("%s",h);var r=e.html(n).width(),l=i-r/2;l=Math.min(Math.max(l,0),this.options.width-r),e[o?"animate":"css"]({left:l}),this.setInputValue(t,h)},valuesToPrc:function(t){var i=100*(t[0]-this.options.from)/this.interval,s=100*(t[1]-this.options.from)/this.interval;return[i,s]},prcToPx:function(t){return this.domNode.width()*t/100},positionToValue:function(t){var i=t/this.domNode.width()*this.interval;return i+=this.options.from,Math.round(i/this.options.step)*this.options.step},setInputValue:function(t,i){if(this.isSingle())this.options.value=i.toString();else{var s=this.options.value.split(",");this.options.value=t.hasClass("low")?i+","+s[1]:s[0]+","+i}this.inputNode.val()!==this.options.value&&(this.inputNode.val(this.options.value),this.options.onstatechange.call(this,this.options.value))},getValue:function(){return this.options.value}};var e="jRange";$.fn[e]=function(t){var i=arguments,s;return this.each(function(){var n=$(this),h=$.data(this,"plugin_"+e),a="object"==typeof t&&t;h||n.data("plugin_"+e,h=new o(this,a)),"string"==typeof t&&(s=h[t].apply(h,Array.prototype.slice.call(i,1)))}),s||this}}(jQuery,window,document);