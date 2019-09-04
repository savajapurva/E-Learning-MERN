"use strict";
$(document).ready(function(){

    /*=============================================
    =            menu sticky and scroll to top            =
    =============================================*/
    
	/*----------  Menu sticky ----------*/

	var windows = $(window);
	var screenSize = windows.width();
	var sticky = $('.header-sticky');
	var stickyAbsolute = $('.header-sticky--absolute');
	var $body = $('body');


	windows.on('scroll', function () {
		var scroll = windows.scrollTop();
		var headerHeight = sticky.height();
		var headerHeightAbsolute = stickyAbsolute.height();

		if (screenSize >= 992) {
			if (scroll < headerHeight) {
				sticky.removeClass('is-sticky');
			} else {
				sticky.addClass('is-sticky');
            }
            
			if (scroll < headerHeightAbsolute) {
				stickyAbsolute.removeClass('is-sticky--absolute');
			} else {
				stickyAbsolute.addClass('is-sticky--absolute');
			}
		}

    });
    




	/*----------  Scroll to top  ----------*/

    function scrollToTop() {
        var $scrollUp = $('#scroll-top'),
            $lastScrollTop = 0,
            $window = $(window);

        $window.on('scroll', function () {
            var st = $(this).scrollTop();
            if (st > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 200) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = st;
        });

        $scrollUp.on('click', function (evt) {
            $('html, body').animate({scrollTop: 0}, 600);
            evt.preventDefault();
        });
    }

    scrollToTop();

    
    /*=====  End of menu sticky and scroll to top  ======*/


    
    /*=============================================
    =            menu active            =
    =============================================*/
    
    var pageUrl = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    
    $('.header-navigation__nav nav ul li a').each(function() {
        if ($(this).attr('href') === '/'+pageUrl || $(this).attr('href') === '') {
            $(this).closest('li').addClass('active');
            $(this).parents('li.has-children').addClass('active');
        }
     
    });
    
    /*=====  End of menu active  ======*/
    
    

    
    /*=============================================
    =            mobile menu active            =
    =============================================*/
    
    $('#mobile-menu-trigger').on('click', function(){
        $('#mobile-menu-overlay').addClass('active');
        $body.addClass('no-overflow');
    });
    
    $('#mobile-menu-close-trigger').on('click', function(){
        $('#mobile-menu-overlay').removeClass('active');
        $body.removeClass('no-overflow');
    });
    
    /*=====  End of mobile menu active  ======*/
    
    
    
    /*=============================================
    =            offcanvas mobile menu            =
    =============================================*/
    
        
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
    
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });
    
    
    /*=====  End of offcanvas mobile menu  ======*/

    
    
    /*=============================================
    =            landing page            =
    =============================================*/
        
        /*--
        Menu Sticky
    -----------------------------------*/
            var $window = $(window);
            $window.on('scroll', function() {
                var scroll = $window.scrollTop();
                if (scroll < 300) {
                    $(".sticker").removeClass("stick");
                }else{
                    $(".sticker").addClass("stick");
                }
            });

                
            $('.landing-page-wrapper a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                scrollTop: target.offset().top - 75
                }, 1000);
                return false;
            }
            }
        });
    
    /*=====  End of landing page  ======*/

});

$(window).on('load', function(){
    /*=============================================
    =            preloader active            =
    =============================================*/
    $('.preloader-activate').removeClass('preloader-active');
    /*=====  End of preloader active  ======*/
});
