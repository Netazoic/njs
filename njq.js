//thanks Bob Cherry! http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html


var njq = (function (parent, $) {
	var my = parent || {};


	my.errHdlr =  function(jqXHR, status, err) {
		// var test = $.parseJSON(jqXHR.responseText);
		var msg = err;
		msg += jqXHR.responseText;
		alert(msg);
	};
	
	my.createDiv = function(id,parent){
		return my.createEl(id,"div",parent);
	}
	my.createEl = function(id,type,parent){
		var e = $(document.createElement(type));
		e.attr("id",id);
		if(parent) e.appendTo(parent);
		e = $("#" + id);
		return e;
	}
	my.createHidden = function(id,parent){
		var e = my.createEl(id,"input",parent);
		e.attr("type","hidden");
		return e;
	}
	
	my.get = function (url, params, callback) {
		// ok, so I'm cheating a bit :)
		return $.getJSON(url, params, callback);
	};
	
	my.getData = function(url){
		var fLoad = function(data){
			return data;
		}
		this.jqGet(url,true,fLoad);
	}
	
	
	my.getOptions = function(url,ctp,keyFld,valFld){
	    var opts = {};
	    var optsSize = 0;
	    // var url="/news?pAction=GetRecords";
	    // url += "&dpAction=cnit";
	     url +="&q=" + ctp;
	     var fLoad = function(data){
	         for(idx in data){
	             rec = data[idx];
	             var key = rec[keyFld];
	             var val = rec[valFld];
	             opts[key] = val;
	             optsSize++;
	         }
	     }
	     this.jqGet(url,true,fLoad);
         if(optsSize>1) opts[0] = '--select--';
	     return opts;
	};
	
	my.getPageCode = function(){
		var pgCode = location.pathname.match(/\/(.*)\/?/)[1];
		return pgCode;
	}
	
	my.isString = function(val){
		return (val instanceof String || typeof val == 'string')
	};

	my.jqGet = function(myURL, flgSync, fLoad, fErr, dataType) {
		if (dataType == null)
			dataType = 'json';
		if (fErr == null)
			fErr = my.errHdlr;
		if (fLoad == null)
			fLoad = function(data) {
				// console.debug(data);
				return (data);
			}
		var jqxhr = $.ajax({
			type : "GET",
			url : myURL,
			async : !flgSync,
			success : fLoad,
			dataType : dataType
		}).fail(fErr);

	};
	my.jqSubmit = function(f, flgSync, fLoad, fErr, dataType) {

		if (dataType == null)
			dataType = 'json';
		if (fErr == null)
			fErr = my.errHdlr;
		var jqxhr = $.ajax({
			type : "POST",
			url : f.action,
			data : $("#" + f.id).serialize(),
			async : !flgSync,
			success : fLoad,
			dataType : dataType
		}).done(function() {
			// alert( "second success" );
		}).fail(fErr).always(function() {
			// alert( "finished" );
		});
	};
	my.popWindow = function(url, id, h, w, screenX, screenY, location, statusbar) {
		day = new Date();
		if (id == null) {
			id = day.getTime();
		}
		pageID = "page" + id;
		var s = "window.open(url, '"
				+ id
				+ "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,titlebar=1"
				+ ",width=" + w + ",height=" + h + ",left=" + screenX + ",top="
				+ screenY + "');";
		// console.debug(s);
		// eval(pageID + " = " + s);
		var newWin = eval(s);
		if(!newWin){
			//alert("Could not open a new window. Please allow your browser to open pop-up windows for this website.");
			return false;
		}
		newWin.focus();
		return newWin;
	};
	my.qsVal = function(key) {
		//Thanks http://stackoverflow.com/users/361684/gilly3
		key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
	    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
	    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
	}


	my.setOptions = function(sel,newOptions,selectedVal,flgKeepFirst){
		//Thanks to CMS on http://stackoverflow.com/questions/1801499/how-to-change-options-of-select-with-jquery
		//Set options in an HTML select input
		//New options is a set of options in the form key:val, where key is the id and val is the display value ("name")
		/*var newOptions = {"Option 1": "value1",
				  "Option 2": "value2",
				  "Option 3": "value3"
				};
		*/
		var $el, selID;
		if(sel instanceof jQuery) $el = sel;
		else if(this.isString(sel))  $el = $("#" + sel);
		else if(sel.id) $el = $("#" + sel.id);
		else if(sel[0] && sel[0].id) $el = $("#" + sel[0].id);
		if(!$el || !$el[0]){
			alert("NJQ: couldn't figure out where you wanted to create the select. was trying to use " + sel);
			return;
		}
		selID = $el.attr("id");
		if(!flgKeepFirst)$el.empty(); // remove old options
		else $('#' + selID + ' option:gt(0)').remove(); // remove all options, but not the first
	 	$.each(newOptions, function(key, name) {
 			if(name && name != "undefined"){
			  $el.append($("<option></option>")
			     .attr("value", key).text(name));
 			}
		});
	 	
	 	if(selectedVal)	$el.val(selectedVal);
	 	else  $el[0].selectedIndex = 0;
	};

	return parent;
}(njq || {}, jQuery));
