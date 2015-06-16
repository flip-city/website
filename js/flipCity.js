requirejs.config({
	baseUrl: 'js/lib',
	shim : {
		'jquery' : {
			exports: '$'
		},
		'underscore' : {
			exports: '_'
		},
		'jquery.aviaSlider' : ['jquery'],
		'jquery.prettyPhoto' : ['jquery'],
		'jquery.ui.button' : ['jquery','jquery.ui.core','jquery.ui.widget'],
		'jquery.ui.core' : ['jquery'],
		'jquery.ui.tabs' : ['jquery','jquery.ui.widget','jquery.ui.core','jquery.ui.button'],
		'jquery.ui.widget' : ['jquery','jquery.ui.core'],
	},
	
    paths: {
		'render': '../render',
		'dataAccess': '../dataAccess',
		'tabs': '../tabs',
		'imageSlider': '../imageSlider'
	}
});

requirejs(["jquery","imageSlider","underscore","render","tabs", "dataAccess"],
function(   $,       slider,               _,           render,  tabs,   dataAccess) {
$(document).ready(function() {

var main = function() {
	tabs.renderMenu();
	_.each(dataAccess.blogPosts().blogPosts, function(post) {
		var $blog = $('#blog');
		$blog.append(render.blogPost({post : post}));
		var $postBody = $('#blog').find('.body:last');
		
		_.each(post.body, function(line) {
			$postBody.append('<p>' + line + '</p>');
	});
		});
		
	
	
	slider.start('#slider-container', 9000);
};

var preLoadLatch = function(callback) {
	return function() {
		if(dataAccess.dataLoaded() && 
		   render.templatesLoaded()) {
		   	
		   	callback();
		 }
	};
};

// DEBUG
$.ajaxSetup({
	error: function(jqXHR,textStatus,errorThrown){
		console.log(textStatus);
	}
});

dataAccess.loadData(preLoadLatch(main));
render.loadTemplates(preLoadLatch(main));

	
});		
},
function(err) {
	 var failedId = err.requireModules && err.requireModules[0];
	 
	 console.log(failedId);
});
