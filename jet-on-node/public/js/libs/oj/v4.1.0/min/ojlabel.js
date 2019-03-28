/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","hammerjs","ojs/ojjquery-hammer","ojs/ojcomponentcore","ojs/ojpopup"],function(a,g,c){(function(){a.hb("oj.ojLabel",g.oj.baseComponent,{version:"1.0.0",defaultElement:"\x3clabel\x3e",widgetEventPrefix:"oj",options:{"for":null,help:{definition:null,source:null},labelId:null,showRequired:!1,rootAttributes:null},cb:{xfa:"tooltipHelp",yfa:"tooltipRequired"},widget:function(){return this.Us},refresh:function(){this._super();this.Ge();this.bqa();this.Tfa()},Ah:function(a,c){this._super(a,
c);this.oi=this.Y();this.CIa()},qc:function(){this._super();this.xU=this.eventNamespace+"TouchEatClick";this.mta=this.eventNamespace+"TouchEatContextMenu";this.uS=this.eventNamespace+"HelpDefPopup";this.ew=a.T.ke();this.xLa()},cI:function(a){this.Y()||(this.sL=a.attr("class"))},fD:function(){this.Y()||(this.sL?this.element.attr("class",this.sL):this.element.removeAttr("class"))},Ch:function(){this._superApply(arguments);this.P3()},pp:function(){this._superApply(arguments);this.P3()},QH:function(){return"oj-ojLabel"},
xLa:function(){var a=null;this.Fc?(this.Us=g(this.Fc).append(this.element.wrap(this.eia()).parent()),this.Us.addClass("oj-label oj-component")):this.Us=this.element.wrap(this.mKa()).closest(".oj-component");this.Tfa();a=this.element[0].id;this.gW=a+"_helpIcon";this.HN=a+"_requiredIcon";this.oi||this.MTa();this.options.showRequired&&(this.mia(),this.oi&&this.Yfa());this.oi&&this.aqa();this.dpa()&&(a=this.i1(this.gW,!0),this.$ha(a),this.oi&&this.Sfa(this.gW))},uka:function(){var a,c=null;if(!this.oi)return null;
c=this.Ika();null==c&&(this.Fc&&(a=this.Fc.id),c=this.bS("labelled-by",a),null==c&&(c=this.bS("aria-labelledby",this.options.labelId)));return c},Yfa:function(){var a;this.Fc&&(a=this.Fc.id);(a=this.bS("labelled-by",a))&&this.Zna(a)&&this.Qfa(a,this.HN,"described-by")},jWa:function(){var a;this.Fc&&(a=this.Fc.id);(a=this.bS("labelled-by",a))&&this.Zna(a)&&this.vqa(a,this.HN,"described-by")},Sfa:function(a){var c,e=this.uka();e&&(c=this.Zja(e),this.Qfa(e,a,c))},WVa:function(a){var c,e=this.uka();e&&
(c=this.Zja(e),this.vqa(e,a,c))},Zja:function(a){return this.Yna(a)?"described-by":"group"===a.getAttribute("role")?"aria-labelledby":"aria-describedby"},Ika:function(){return document.getElementById(this.options["for"])},bS:function(a,c){return c?document.querySelector("["+a+"~\x3d'"+c+"']"):null},Yna:function(b){return b?null!=a.aa.yB(b.tagName):!1},Zna:function(a){var c=["oj-radioset","oj-checkboxset"],e=c.length,f;if(a){f=a.tagName.toLowerCase();for(var g=0;g<e;g++)if(a=c[g],0===f.indexOf(a))return!0}return!1},
Qfa:function(a,c,e){var f=a.getAttribute(e),f=f?f.split(/\s+/):[];-1===g.inArray(c,f)&&f.push(c);c=g.trim(f.join(" "));a.setAttribute(e,c)},vqa:function(a,c,e){var f=a.getAttribute(e),f=f?f.split(/\s+/):[];c=g.inArray(c,f);-1!==c&&f.splice(c,1);(c=g.trim(f.join(" ")))?a.setAttribute(e,c):a.setAttribute(e,"")},MGa:function(a){var c=this.element[0],e=this.options["for"];this.Yna(a)?c.setAttribute("for",e+"|input"):c.setAttribute("for",e)},$ha:function(a){var c=this.SJa(this.options.help.definition,
this.options.help.source);g(a).prepend(c);this.KHa();this._focusable({element:c,applyHighlight:!0})},mia:function(){this.i1(this.HN,!1).appendChild(this.lKa())},CIa:function(){var a=this.options.showRequired;if(null!==a&&"boolean"!==typeof a)throw Error("Option 'showRequired' has invalid value set: "+a);},Tfa:function(){this.oi&&this.cqa();null==this.element.attr("id")&&this.element.uniqueId()},MTa:function(){if(!this.oi){var a;a=this.element.attr("class");var c,e;if(a&&(a=a.split(/\s+/),null!=a)){e=
a.length;for(var f=0;f<e;f++)c=a[f],0<c.indexOf("-label")&&(this.Us.addClass(c),this.element.removeClass(c))}}},i1:function(a,c){var e,f=document.createElement("span");f.setAttribute("id",a);c?(e=this.Us.find(".oj-label-group"),e.prepend(f)):this.element.before(f);return f},mKa:function(){var a,c=this.options.rootAttributes,e="oj-label oj-component";c&&(a=c["class"]);a&&(e=e+" "+a);a=document.createElement("div");a.className=e;a.appendChild(this.eia());return a},eia:function(){var a;a=document.createElement("div");
a.className="oj-label-group";return a},lKa:function(){var a=this.R(this.cb.yfa),c=document.createElement("span");c.className="oj-label-required-icon oj-component-icon";c.setAttribute("role","img");c.setAttribute("title",a);c.setAttribute("aria-label",a);return c},SJa:function(b,c){var e;e=document.createElement("a");e.setAttribute("tabindex","0");e.setAttribute("target","_blank");e.className="oj-label-help-icon-anchor oj-label-help-icon oj-component-icon oj-clickable-icon-nocontext";if(c)try{a.T.z6a(c),
e.setAttribute("href",c)}catch(f){throw Error(f+". The source option ("+c+") is invalid.");}else e.setAttribute("role","img");b?e.setAttribute("aria-label",b):e.setAttribute("aria-label",this.R(this.cb.xfa));return e},KHa:function(){var a,c,e,f=this;c=this.widget().find(".oj-label-help-icon-anchor");0!==c.length&&(a=this.RJa(),this.ew&&(this.N1&&this.widget().off(this.xU),this.N1=function(){return!1},this.mja=function(){return!1},c.on("contextmenu"+this.mta,this.mja)),this.CE||(this.CE=function(e){f.zQa(e,
a,c)}),this.W0||(this.W0=function(){f.P3()}),this.cHa(c),e={my:"start bottom",at:"end top",collision:"flipcenter",of:c},a.ojPopup({position:e,modality:"modeless",animation:{open:null,close:null}}))},RJa:function(){var a,c,e=this.options.help.definition,f;a=e?e:this.R(this.cb.xfa);if(this.jA){if(f=g(document.getElementById(this.jA)))c=f.find(".oj-help-popup-container").first(),c.text(a)}else e=document.createElement("div"),e.className="oj-help-popup",e.style.display="none",f=g(e),f.uniqueId(),this.jA=
f.prop("id"),c=document.createElement("div"),c.className="oj-help-popup-container",e.appendChild(c),c=g(c),c.text(a),a=document.getElementsByTagName("body")[0],a.appendChild(e);return f},cHa:function(b){var d;b.on("focusin"+this.uS+" mouseenter"+this.uS,this.CE);b.on("mouseleave"+this.uS,this.W0);this.ew&&(this.options.help.source?(d={recognizers:[[c.Press,{time:a.T.EC}]]},b.Tg(d),this._on(b,{press:this.CE})):(d={recognizers:[[c.Tap],[c.Press,{time:a.T.EC}]]},b.Tg(d),this._on(b,{press:this.CE,tap:this.CE})))},
zQa:function(b,c,e){if(!c.ojPopup("isOpen"))if(this.ew){if("press"===b.type){var f=this.widget();f.on("click"+this.xU,this.N1);var g=this;c.on("ojclose",function(){f.off(g.xU)})}else c.off("ojclose");"press"!==b.type&&"tap"!==b.type&&(a.T.K4a()||"focusin"!==b.type&&"mouseenter"!==b.type)||c.ojPopup("open",e)}else c.ojPopup("open",e)},P3:function(){var a;null!=this.jA&&(a=g(document.getElementById(this.jA)),a.ojPopup("close"))},yqa:function(a){this.ew&&(this.widget().off(this.xU),a.off(this.mta),this.mja=
this.N1=null,a.Tg("destroy"));a.off(this.uS);this.W0=this.CE=null},zqa:function(){var a;if(null!=this.jA){if(a=g(document.getElementById(this.jA)))a.ojPopup("destroy"),a.remove();this.jA=null}},dpa:function(){var a=this.options,c=a.help.source,c=""!==c&&null!=c;c||(a=a.help.definition,c=""!==a&&null!=a);return c},bqa:function(){var a=this.gW,c;c=this.Us.find(".oj-label-help-icon");1===c.length&&(this.yqa(c),this.zqa(),c.remove());c=document.getElementById(a);this.dpa()?(null==c&&(c=this.i1(a,!0)),
this.$ha(c),this.oi&&this.Sfa(a)):null!==c&&(c.parentNode.removeChild(c),this.oi&&this.WVa(a))},Ge:function(){var a;a=this.HN;var c;c=document.getElementById(a);this.options.showRequired?c?(c=this.R(this.cb.yfa),a=this.Us.find(".oj-label-required-icon"),a.attr("title",c)):(this.mia(),this.oi&&this.Yfa()):(c=document.getElementById(a),null!==c&&c.parentNode.removeChild(c),this.oi&&this.jWa())},aqa:function(){var a;this.oi&&(a=this.Ika())&&this.MGa(a)},cqa:function(){var a;this.oi&&((a=this.options.labelId)?
this.element.attr("id",a):(a=this.Us.attr("id"))&&this.element.attr("id",a+"|label"))},_setOption:function(a,c){this._superApply(arguments);switch(a){case "showRequired":this.Ge();break;case "help":this.bqa();break;case "for":this.oi&&this.aqa();break;case "labelId":this.oi&&this.cqa()}},getNodeBySubId:function(a){var c;c=this._super(a);c||(a=a.subId,"oj-label-help-icon"===a&&(c=this.widget().find(".oj-label-help-icon")[0]));return c||null},getSubIdByNode:function(a){var c=null;null!=a&&a===this.widget().find(".oj-label-help-icon")[0]&&
(c={subId:"oj-label-help-icon"});return c||this._superApply(arguments)},_destroy:function(){var b=this.Us.find(".oj-label-help-icon");this.yqa(b);this.zqa();this.oi=this.HN=this.gW=null;a.T.unwrap(this.element,this.Us);return this._super()}})})();a.J.Ua("oj-label","baseComponent",{properties:{help:{type:"Object",properties:{definition:{type:"string"},source:{type:"string"}}},showRequired:{type:"boolean"},labelId:{type:"string"},"for":{type:"string"}},extension:{Dj:"label",Xa:"ojLabel",XC:["accesskey"]}});
a.J.register("oj-label",{metadata:a.J.getMetadata("oj-label")})});