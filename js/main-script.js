$(function(){

	let productTabs = $('#initProductTabs');
	
	productTabs.responsiveTabs({
	    rotate: false,
	    startCollapsed: 'accordion',
	    collapsible: 'accordion',
	    setHash: false,
	    scrollToAccordion: false
	});



	$('.product__left-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		draggable: false,
		asNavFor: '.product__left-slider-thumbs',
		responsive: [
			{
				breakpoint: 768
			}
		]
	});

	$('.product__left-slider-thumbs').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: '.product__left-slider',
		dots: false,
		autoplay:false,
		autoplaySpeed:1500,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 639,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true
				}
			}
		]
	});

	$('.product__left-slider').lightGallery({
		thumbnail: false,
	    download: true,
	    loop: false,
	    counter: false,
	    getCaptionFromTitleOrAlt: true,
		selector: '.product__left-slider-image a'
    });

    $('.product__links-first').click(function() {
		$('.form_wrapper').addClass('opened');
		return false;
	});
	$('.form_wrapper__icon-close').click(function() {
		$('.form_wrapper').removeClass('opened');
		return false;
	});
	$(document).click( function(event){
	    if( $(event.target).closest('.form_wrapper__inner').length ) 
	      return;
	    $('.form_wrapper').removeClass('opened');
	    event.stopPropagation();
	})
    $(document).keydown(function(event){
        if (event.which == 27) {
            $('.form_wrapper').removeClass('opened');
        }
    });

    if (window.matchMedia("(max-width: 769px)").matches) {
    	$('.product__left').insertBefore('.product__additional');
    	$('.brands_block').insertBefore('.product__reviews');
    	$('.product__sell').insertBefore('.product__buttons');
    }
})

const accor = document.querySelector('.questions_block__accordion');

if (accor){
	new Accordion('.questions_block__accordion');
}

$(function(){
	$('.accordion-opener-js').on('click', function(){
		$(this).toggleClass('active')
		$(this).next().slideToggle()
		$(window).trigger('resize')
	})
})
