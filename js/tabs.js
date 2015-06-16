define(["jquery","jquery.ui.tabs","render","dataAccess","imageSlider"],
function($,       $tabs,            render,  dataAccess, imageSlider) {
	
	var renderMenu = function() {
		var tabs = function() {
			return tabs = [
			{
				name:'home',
				image: 'images/home.png',
				data : dataAccess.blogPosts()
			},
			{
				name:'classes',
				label: 'Classes',
				data : dataAccess.classes()
			},
			{
				name:'teams',
				label: 'Teams',
				data : dataAccess.teams()
			},
			{
				name:'faqs',
				label: 'F.A.Qs',
				data : dataAccess.faqs()
			},
			{
				name:'aboutUs',
				label: 'About Us',
			}
			];
		};
	
		var promos = function() {
			return [
			/*{
				name:'cartwheel',
				image:'images/cartwheel.png'
			},*/
			{
				name:'openGym',
				image:'images/promo-image-open-gym.png'
			},
			{
				name:'birthdays',
				image:'images/birthday-white.png'
			},
			{
				name:'hiringDetails',
				image : 'images/promo-image-pno.png',
				standAlone : true
			}
			];
		};
		
		//// Start
		$('#tabs-parent').html(render.tabsMenu({tabs: tabs().reverse(), promos: promos()}));
		
		$('#enrollment-details,.promodiv').hide();
		
		$('#enrollment-details-call').html(render.enrollmentDetailsCallClosed());
		
		$('#motivation').hide();
		
		$('#motivation-button').click(function() {
			var $motivation = $('#motivation');
			
			if($motivation.is(':hidden')) {
				$motivation.show();
			} else {
				$motivation.hide();
			}
		});

		
		$('#tabs-parent').on('click', '#enrollment-details-target', function() {
			var $inlay = $('#enrollment-details');
			
			if($inlay.is(':hidden')) {
				$inlay.show();
				$('#enrollment-important').hide();
				$('#enrollment-details-call').html(render.enrollmentDetailsCallOpen());
			} else {
				$inlay.hide();
				$('#enrollment-important').show();
				$('#enrollment-details-call').html(render.enrollmentDetailsCallClosed());
			}
		});
		
		/*$('#tabs-parent').on('click', '.tab-button', function() {
			imageSlider.stop();
		});*/
		
		$('#tabs-parent').on('click', '#home-tabnav', function() {
			imageSlider.start('#slider-container', 4000);
		});
		
		$('#promos-container').html(render.promosMenu({promos: promos()}));
		
		$('.promo.button,.tab-button').click((function() {
			var $this = $(this);
			$('.button.promo.selected').removeClass('selected');
			
			if($this.is('.promo')) {
				$('#tabs-parent').tabs('selected', -1);
				$(".ui-tabs-selected:not(#registrationInfo .ui-tabs-selected)").removeClass("ui-state-active").removeClass("ui-tabs-selected");
				
				$this.addClass('selected');
			}
			
			$('.tabdiv').hide();
			$('#' + $this.attr('data-display')).show();	
			
			return false;	
		}));
		
		$("#tabs-parent").tabs();
		$('#registrationInfo').tabs();
		
		$('li a[href="#continuousEnrollmentDetails"]').click();
		$('#home-tabnav').click();
	};
	
	return {
		renderMenu: renderMenu
	};
});