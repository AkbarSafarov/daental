
$(function(){

	
	var $body = $(document.body),
      	$html = $(document.documentElement);

 //  function formPopup($btn,$wrap){

 //    var closeForm = $('.formExtraWrapper .close-form'),
 //        formWrap = $($wrap),
 //        formBtn = $($btn),
 //        formOpened = 'opened',
 //        overflowHidden = 'oveflowHidden';

 //    closeForm.on('click', function() {
 //        formWrap.removeClass(formOpened);
 //        $html.removeClass(overflowHidden);
 //    });
 //    formBtn.on('click', function(event) {
 //        formWrap.addClass(formOpened);
 //        $html.toggleClass(overflowHidden);
 //        event.preventDefault();
 //    });

 //    $html.on('keyup', function(event) {
 //        if (formWrap.hasClass(formOpened) && event.keyCode == 27) {
 //            formWrap.removeClass(formOpened);
 //            $html.removeClass(overflowHidden);
 //        }
 //    });
 //    $body.on('click touchstart', function(a) {
 //        if ($(a.target).closest('.formExtraWrapper').length || $(a.target).closest(formBtn).length) return;
 //        if (formWrap.hasClass(formOpened)) {
 //            formWrap.removeClass(formOpened);
 //            $html.removeClass(overflowHidden);
 //        }
 //    });
 //  }

	// formPopup('.contacts_btn','.contacts_popup');

    var menuBtn = $('.burger'),
        menuWrapper = $('.menu_burger'),
        menuClose = $('.menuClose'),        
        openedMenu = 'opened',
        overflowHidden = 'oveflowHidden';

    menuBtn.on("click", function(event) {
        menuWrapper.toggleClass(openedMenu);
        menuBtn.toggleClass(openedMenu);
        $html.toggleClass(overflowHidden);
        $html.toggleClass('open_menu');
    });
    menuClose.on("click", function(event) {
        menuWrapper.removeClass(openedMenu);
        menuBtn.removeClass(openedMenu);
        $html.removeClass(overflowHidden);
        $html.removeClass('open_menu');
    });

    $(document).on('click touchstart', function(e){
        if( $(e.target).closest(menuBtn).length || $(e.target).closest(menuWrapper).length) 
          return;
        if (menuBtn.hasClass(openedMenu)){
            menuWrapper.removeClass(openedMenu);
            menuBtn.removeClass(openedMenu);
            $html.removeClass(overflowHidden);
            $html.removeClass('open_menu');
        }
    });

    

    function swiperProducts() {
      	let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");

      	$('.swiper-sldier-block').each(function(){
			const sliderId = $(this).data('id');
			const sliderClass = '.' + sliderId;
			const arrow = $(this).data('arrow');	
			let initSlider = false;
			let newProductsSwiper;

	      	if (!mobile.matches) {
	      		newProductsSwiper = new Swiper(sliderClass, {
			        loop: true,
			        slidesPerView: "auto",
			        loopedSlides: 4,
				    breakpoints: {
					    0: {
					    	slidesPerView: 2,
					      	spaceBetween: 6
					    },
					    700: {
					      	spaceBetween: 6,
					      	slidesPerView: 2
					    },
					    1000: {
					      	spaceBetween: 18,
					      	slidesPerView: 3
					    },
					    1100: {
					      	spaceBetween: 30,
					      	slidesPerView: 4
					    }
					},
					navigation: {
			          nextEl: '.swiper-' + arrow + '-next',
			          prevEl: '.swiper-' + arrow + '-prev',
			        },
					lazy: true
				});	
			} 
		})
	}

	swiperProducts();
	window.addEventListener("resize", swiperProducts);

	$('.input-file input[type=file]').on('change', function(){
		let file = this.files[0];
		$(this).closest('.input-file').find('.input-file-text').html(file.name);
	});

	$('input.phone_input').on('blur', function(){
        let phoneWrapper = $(this).parents('.field'),
            thisNumber = $(this).val().split(''),
            lastIndex = thisNumber.length-1,
            lastItem = thisNumber[lastIndex];
        if (isNaN(lastItem)){
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Введите номер телефона полностью </div>');
            }
            //$(this).val('');
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.removeClass('error');
            phoneWrapper.find('.empty_number').remove();
        }
    });

    $('input').on('blur', function(){
    	if ($(this).parents('.field').hasClass('error')){
    		$(this).parents('.field').removeClass('error');
    		$(this).parents('.field').find('.error_text').remove();
    	}
    })

    $('.phone_input').inputmask("+7 (999) 999-99-99");

    $('input[type="checkbox"]').on('change', function (event) {

        if (!$(this).closest('.field.required').hasClass('no_checked') && !$(this).is(":checked")) {
            $(this).closest('.field.required').addClass('no_checked');
        } else {
            $(this).closest('.field.required').removeClass('no_checked');
        }
    })

    $('.email_input').on('blur', function () {
        let phoneWrapper = $(this).parents('.field');
        let email = $(this).val();

        if (email.length > 0
            && (email.match(/.+?\@.+/g) || []).length !== 1) {
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Вы ввели некорректный e-mail</div>');
            }
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.remove('empty_number');
        }
    });

    $('.form_button').on('click', function(e){
        $(this).parents('form').find('.field').each(function(){

            var valueInput = $(this).find('input').val();
            if ($(this).hasClass('required') && valueInput == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            var valueTextarea = $(this).find('textarea').val();
            if ($(this).hasClass('required') && valueTextarea == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            if ($(this).hasClass('no_checked')) {
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            var value = $(this).find('select').val();
            var selectedOptionText = $(this).find('select option:selected').text();
            var check = value  != selectedOptionText;

            $(this).find('select option').each(function() {

                if (check == false) {
                    $(this).parents('.field').addClass('error');
                    if (!$(this).parents('.field').find('.error_text').length) {
                        $(this).parents('.field').append('<div class="error_text">это поле обязательно для заполнения</div>');
                    }
                } else {
                    if ($(this).parents('.field').find('.error_text').length) {
                        $(this).parents('.field').removeClass('error');
                        $(this).parents('.field').find('.error_text').remove();
                    }
                }
            });
        })

        if ($(this).closest('form').find('.field').hasClass('incorrect-phone') || $(this).closest('form').find('.field').hasClass('error')){
            e.preventDefault();
        } else {
        	e.preventDefault();
        	$(this).closest('form').addClass('send_done');
        }
    });
});

$(document).ready(function() {

	let swiper = new Swiper(".mySwiper", {
		loop: false,
		slidesPerView: "auto",
      	spaceBetween: 0,	
      	slidesPerView: 1,
	    pagination: {
	        el: ".swiper-pagination",
	        clickable: true,
	    },
	    navigation: {
          	nextEl: ".swiper-main-next",
          	prevEl: ".swiper-main-prev",
        },
		lazy: true,
		
	});

	let swiperClinic = new Swiper(".clinic_swiper", {
		loop: true,
      	spaceBetween: 0,	
      	slidesPerView: 1,
	    navigation: {
          	nextEl: ".swiper-clinic-next",
          	prevEl: ".swiper-clinic-prev",
        },
		lazy: true,
		
	});

	let mySwiperPreim
    let init = false;
    let sliderWr = document.querySelector('.buy_productSwiper');

    function swiperCard() {
      	let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");

      	if (mobile.matches) {
      		mySwiperPreim.destroy();
		    init = false;
        	
		} else{
		    if (!init) {
        		init = true;

				mySwiperPreim = new Swiper(".buy_productSwiper", {
			        spaceBetween: 30,
			        loop: true,
			    	centeredSlides: false,			
			        slidesPerView: 4,
				    breakpoints: {
					    0: {
					    	slidesPerView: 2,
					      	spaceBetween: 6
					    },
					    700: {
					      	spaceBetween: 6,
					      	slidesPerView: 2
					    },
					    1000: {
					      	spaceBetween: 18,
					      	slidesPerView: 3
					    },
					    1100: {
					      	spaceBetween: 30,
					      	slidesPerView: 4
					    }
					},
			        navigation: {
			          nextEl: ".swiper-buy-next",
			          prevEl: ".swiper-buy-prev",
			        },
					lazy: true
			    });
			}	
	  	}
	}

	if (sliderWr){
		swiperCard();
		window.addEventListener("resize", swiperCard);
	}

	let brandSwiper = new Swiper(".brand_swiper", {
		loop: true,
      	spaceBetween: 62,	
      	slidesPerView: 6,
	    navigation: {
          	nextEl: ".swiper-brand-next",
          	prevEl: ".swiper-brand-prev",
        },
		lazy: true,
		breakpoints: {
		    0: {
		    	slidesPerView: "auto",
		      	spaceBetween: 48
		    },
		    700: {
		      	spaceBetween: 48,
		      	slidesPerView: "auto"
		    },
		    1000: {
		      	spaceBetween: 48,
		      	slidesPerView: "auto"
		    },
		    1020: {
		      	spaceBetween: 62,
		      	slidesPerView: 6
		    }
		}
	});
});
