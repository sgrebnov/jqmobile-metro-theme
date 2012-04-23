/*
 * Global Stylesheet jQuery Plugin
 * Version: 0.1
 * 
 * Enables CSS modification that uses a 'global' stylesheet, rather than inline CSS.
 *
 * Copyright (c) 2009 Jeremy Shipman (http://www.burnbright.co.nz)
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * INSTRUCTIONS:
 * use in the same way as the jQuery css function. Eg:
 *  $("some selector").globalcss("style","value");
 *
 * use the globalsetylesheet.print() function to return a string of the global stylesheet
 */
(function($) {

	//global singleton class for 
	globalstylesheet = new function globalStylesheet(){
		if(!document.styleSheets){
			alert("document.Stylesheets not found");
			return false;
		}
		
		var sheet = null;
		var setrules = Array(); // rule cache
		
		//set up a dummy noded
		var cssNode = document.createElement('style');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.media = 'screen';
		cssNode.title = 'globalStyleSheet';
		document.getElementsByTagName("head")[0].appendChild(cssNode);
		
		//find the newly created stylesheet and store reference
		for(var i = 0; i < document.styleSheets.length; i++){
			if(document.styleSheets[i].title == "globalStyleSheet"){
				sheet = document.styleSheets[i];
			}
		}
		
		//set a CSS rule
		this.setRule = function setRule(selector,ruleText){
			if(setrules[selector] != undefined){
				return setrules[selector];
			}else{
				if(sheet.addRule){ // IE
					sheet.addRule(selector,ruleText,0);
				}else{
					sheet.insertRule(selector+'{'+ruleText+'}',0);
				}
				setrules[selector] = this.getRule(selector);
			}
			return setrules[selector];
		}
		
		//get a saved CSS rule
		this.getRule = function getRule(selector){
			if(setrules[selector] != undefined){
				return setrules[selector];
			}else{
				var rules = allRules();
				for(var i = 0; i < rules.length; i++){
					if(rules[i].selectorText == selector){
						return rules[i];
					}
				}
			}
			return false;
		}
		
		//helper function to get all rules
		function allRules(){
			if(sheet.cssRules){ //IE
				return sheet.cssRules;
			}else{
				return sheet.rules;
			}
		}
		
		//print out the stylesheet
		this.print = function print(){
			var styleinfo = "";
			var rules = allRules();
			for(var i = 0; i < rules.length; i++){
				styleinfo+= rules[i].cssText+"\n"
			}
			return styleinfo;
		}
		
		//use jQuery's css selector function to set the style object
		this.css = function css(jquery,key,value){
			rule = this.setRule(jquery.selector,key+":"+value+";");
			jQuery(rule).css(key,value); 
		}
	}
	
	//hook new function into jQuery
	jQuery.fn.extend({
		globalcss : function globalcss(key,value){
			globalstylesheet.css(this,key,value);
		}
	});

})(jQuery);