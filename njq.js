//thanks Bob Cherry! http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html


var njq = (function (parent, $) {
	var my = parent || {};


	my.errHdlr =  function(jqXHR, status, err) {
		// var test = $.parseJSON(jqXHR.responseText);
		var msg = err;
		msg += jqXHR.responseText;
		alert(msg);
	};
	
	my.get = function (url, params, callback) {
		// ok, so I'm cheating a bit :)
		return $.getJSON(url, params, callback);
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
			fErr = errHdlr;
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
	
	my.qsVal = function(key) {
		//Thanks http://stackoverflow.com/users/361684/gilly3
		key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
	    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
	    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
	}


	my.setOptions = function(selID,newOptions,selectedVal,flgKeepFirst){
		//Thanks to CMS on http://stackoverflow.com/questions/1801499/how-to-change-options-of-select-with-jquery
		//Set options in an HTML select input
		//New options is a set of options in the form key:val, where key is the diplay and val is the actual value
		/*var newOptions = {"Option 1": "value1",
				  "Option 2": "value2",
				  "Option 3": "value3"
				};
		*/
		var $el = $("#" + selID);
		if(!flgKeepFirst)$el.empty(); // remove old options
		else $('#' + selID + ' option:gt(0)').remove(); // remove all options, but not the first
	 	$.each(newOptions, function(key, value) {
 			if(key && key != "undefined"){
			  $el.append($("<option></option>")
			     .attr("value", value).text(key));
 			}
		});
	 	
	 	if(selectedVal)	$el.val(selectedVal);
	};

	return parent;
}(njq || {}, jQuery));