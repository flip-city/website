define(["jquery"], 
function($) {
	var classes,
		teams,
		faqs,
		blogPosts,
		
		loadData,
		dataLoaded = false,
		
		basePath = 'res/data/';
	
	loadData = function(callback) {
		$(document).ajaxStop(function() {
    		if(classes && teams && faqs) {
    			$(this).unbind("ajaxStop");
    			dataLoaded = true;
    			
    			callback();
    		}
  		});
		
		$.getJSON(basePath + "classes.json", function( classesData ) {
			classes = classesData;
		});
	
		$.getJSON(basePath + "teams.json", function( teamsData ) {
			teams = teamsData;
		});
		
		$.getJSON(basePath + "faqs.json", function( faqData ) {
			faqs = faqData;
		});
		
		$.getJSON(basePath + "blog.json", function( blogPostsData ) {
			blogPosts = blogPostsData;
		});
	};
	
	return {
		classes : function(){return classes;},
		teams : function(){return teams;},
		faqs : function(){return faqs;},
		blogPosts : function(){
			return blogPosts;
			},
		loadData : loadData,
		dataLoaded : function(){return dataLoaded;}
	};
});
