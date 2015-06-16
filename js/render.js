define(["jquery", "underscore"],
function($,        _) {
	
	var renderFunctions = {},
		_templates = {},
		loadTemplates,
		templatesLoaded = false,
		templateModules = [
			{
				id: "blog"
			},
			{
				id: "main"
			},
			{
				id: "tab-content"
			}
		];
		
	var addRenderFunctions = function() {
		
		
		
		
		$('script[type="text/template"]').each(function() {
			var $this = $(this),
				id = $this.attr('id');
			
			try {	
				_templates[id] = _.template($this.html());
			} catch(e) {
				console.log(e.message);
				console.log($("<div/>").html(e.source).text());
			};
			
			var renderFunction = function(data) {
				var result = "",
					dataObj = data;
					
				if(data instanceof Array) {
					_.each(data, function(next, i) {
						dataObj = _.extend(next,{render : function(){return renderFunctions;}, count: i});
						result = result + _templates[id](dataObj);
					});
						
				} else {
					dataObj = data ? data : {};
					_.extend(dataObj,{render : function(){return renderFunctions;}});
					
					result = _templates[id](dataObj);
				}
					
				return result;
			};
			
			renderFunctions[id.substring(1)] = renderFunction;
		});
	};

	var loadTemplates = function(callback) {
	
		$(document).ajaxStop(function() {
    		if(_.every(templateModules, function(module){return module.loaded;})) {
    			$(this).unbind('ajaxStop');
    			templatesLoaded = true;
    			
    			addRenderFunctions();
    			
    			callback();
    		}
  		});
	
		_.each(templateModules, function(module) {
			var $head = $('head');
			$.get('res/_templates/' + module.id + '.html', function(data) {
				$head.append(data);
				module.loaded = true;
			});
		});
	};
	
	var createRenderModuleFunction = function() {
		return _.extend(renderFunctions,
		{
			loadTemplates : loadTemplates,
			templatesLoaded : function(){return templatesLoaded;}
		});
	};
	
	return createRenderModuleFunction();
});
