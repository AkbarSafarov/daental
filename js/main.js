
$(function(){

	
	var $body = $(document.body),
      	$html = $(document.documentElement);

	  

    function thModal(){
    	$('.th_modal_block').addClass('opened');
    	$('html').removeClass('oveflowHidden');
    	$('.form-popup-wrapper').removeClass('opened');

    	if ($('.form_wrapper').hasClass('opened')){
    		$('.form_wrapper').removeClass('opened');
    	}

    	if ($('.popup_step_form').hasClass('active')){
    		$('.popup_step_form').removeClass('active');
    	}

    	$('.btn_close').on('click', function(){
    		if ($('.th_modal_block').hasClass('opened')){
    			$('.th_modal_block').removeClass('opened');
    		}
    	})
    }

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

    $('.catalog_btn').on('click', function(){
    	$('.mobile_menu_container').toggleClass('loaded');
    	$(this).toggleClass('opened');
    });

    $(document).on("click", ".mobile_menu_container .parent > .arrow", function(e) {
        e.preventDefault();
        $(".mobile_menu_container .activity").removeClass("activity");
        $(this).parent('a').siblings("ul").addClass("loaded").addClass("activity");
    });
    $(document).on("click", ".mobile_menu_container .back", function(e) {
        e.preventDefault();
        $(".mobile_menu_container .activity").removeClass("activity");
        $(this).parent().parent().removeClass("loaded");
        $(this).parent().parent().parent().parent().addClass("activity");
    });

    $('.mobile_menu_content li a').each(function(){
        if ($(this).parent().find('ul').length) {
            var thisLink = $(this).attr('href'),
                thisText = $(this).text(); 

            $(this).addClass('parent');
			$(this).parent('li').addClass('parent-li');
			$(this).prepend('<span class="arrow"></span>')
			
            $(this).next().prepend("<li class='back_btn'><a href='#' class='back'>" + thisText + "</a></li>");
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
        	thModal();
        }
    });

    let stepsSlider = document.getElementById('steps-slider');

    if (stepsSlider){
		let inputMin = $('#input-with-keypress-min');
		let inputMax = $('#input-with-keypress-max');
		let inputs = [inputMin, inputMax];
		let rangeMin = +inputMin.data('min');
		let rangeMax = +inputMax.data('max');
		let valueMin = +inputMin.val().replace(' руб.', '');
		let valueMax = +inputMax.val().replace(' руб.', '');

		noUiSlider.create(stepsSlider, {
		    start: [valueMin, valueMax],
		    connect: true,
		    range: {
		        'min': rangeMin,
		        'max': rangeMax
		    },
		    format: wNumb({
				decimals: 0,
				thousand: ' ',
			})
		});

		stepsSlider.noUiSlider.on('update', function (values, handle) {
			inputs[handle].val(`${values[handle]} руб.`)
		});
	}

	$('.filter_field .field_name').on('click', function(){
		$(this).parent().toggleClass('opened');
	});

	$('.filter_field').each(function(){
		const checkLength = $(this).find('.checkbox_field ul li').length;

		if (checkLength > 12){
			$(this).find('.checkbox_field ul li:gt(11)').addClass('hide');
			$(this).find('.field_body').append(`<div class="show_more_check">Показать еще ${checkLength - 12}</div>`);
		}
	});

	$(document).on('click', '.show_more_check', function(){
		const checkLength = $(this).parents('.filter_field').find('.checkbox_field ul li').length;

		if ($(this).hasClass('active')){
			$(this).removeClass('active');			
			$(this).parents('.filter_field').find('.checkbox_field ul li:gt(11)').addClass('hide');
			$(this).text(`Показать еще ${checkLength - 12}`);
		} else {
			$(this).addClass('active');
			$(this).parents('.filter_field').find('.checkbox_field ul li').removeClass('hide');
			$(this).text(`Скрыть ${checkLength - 12}`);
		}
	});

	$('.dropDownList .dropDownSelected').on('click', function(){
		$(this).parents('.dropDownList').toggleClass('opened');
	});

	$('.dropDownList .dropDownItems .dropDownItem').on('click', function(){
		const name = $(this).text();

		$(this).siblings('.dropDownItem').removeClass('active');
		$(this).addClass('active');
		$(this).parents('.dropDownList').find('.dropDownSelected').text(name);
		$(this).parents('.dropDownList').removeClass('opened');
	});

	$('.view_btn').on('click', function(){
		$(this).siblings('.view_btn').removeClass('active');
		$(this).addClass('active');

		if ($(this).hasClass('btn_simple')){
			$('.list_products .product_item').addClass('simple_product');
		} else {
			$('.list_products .product_item').removeClass('simple_product');
		}
	});

	$('.filter_panel .name_filter').on('click', function(){
		$(this).parent().toggleClass('oped');
	});

	$('.catecor_menu li a').each(function(){
        if ($(this).parent().find('ul').length) {
            $(this).append('<span class="arrow"></span>');
        }
    });
        
    $('.catecor_menu li').find('a .arrow').on('click', function(event){
        $(this).parents('li:first').siblings().removeClass('opened');
        $(this).parents('li:first').toggleClass('opened');
        return false;
    });

    $('.links_block .last').on('click', function(){
		if ($(this).hasClass('active')){
			$(this).siblings().removeClass('show');
			$(this).removeClass('active');
			$(this).text('Показать еще');
		} else {
			$(this).addClass('active');
			$(this).text('Скрыть');
    		$(this).siblings().addClass('show');
    	}
    });

	const link_top = $('.link_top');
	const root = $('html, body');

	link_top.on('click', function(){
		if (!root.is(':animated')) {
			root.animate({'scrollTop':0}, 700);
		}
		return false
	});

	$(window).scroll(function(){
      	if (($(window).scrollTop() > 800)) {
        	link_top.addClass('show'); 
      	} else {
        	link_top.removeClass('show');
      	};
    }); 
});

// Calculator

$(function(){

	function formPopup($btn,$wrap){
		let $body = $(document.body),
      		$html = $(document.documentElement),
	    	closeForm = $('.formExtraWrapper .close-form'),
	        formWrap = $($wrap),
	        formBtn = $($btn),
	        formOpened = 'opened',
	        overflowHidden = 'oveflowHidden';

	    closeForm.on('click', function() {
	        formWrap.removeClass(formOpened);
	        $html.removeClass(overflowHidden);
	    });
	    formBtn.on('click', function(event) {
	        formWrap.addClass(formOpened);
	        $html.toggleClass(overflowHidden);
	        event.preventDefault();

	        const price = $('#price-slider').find('.noUi-tooltip').text();
	        const payment = $('#payment-slider').find('.noUi-tooltip').text();
	        const term = $('#term-slider').find('.noUi-tooltip').text();
	        const result = $('.result_main').text();
	        const resultStr = `Стоимость оборудования - ${price}\nАвансовый платеж - ${payment}\nСрок займа - ${term}\nЕжемесячный платёж - ${result}`;

	        $('.rusult_textarea').val(resultStr);
	    });

	    $html.on('keyup', function(event) {
	        if (formWrap.hasClass(formOpened) && event.keyCode == 27) {
	            formWrap.removeClass(formOpened);
	            $html.removeClass(overflowHidden);
	        }
	    });
	    $body.on('click touchstart', function(a) {
	        if ($(a.target).closest('.formExtraWrapper').length || $(a.target).closest(formBtn).length) return;
	        if (formWrap.hasClass(formOpened)) {
	            formWrap.removeClass(formOpened);
	            $html.removeClass(overflowHidden);
	        }
	    });
	}

	formPopup('.calc_result_btn','.form_calc');

	if ($('.calc_slider').length){
		const monthlyInterestRate  = $('.calculator_block').data('percent');
		let payment;

		function calculateLeasingPayment() {
			const equipmentPrice = +$('#price-slider').find('.noUi-handle').attr('aria-valuenow').replace(' ', '') || +$('#price-slider').data('value');
			const paymentPercentage  = +$('#payment-slider').find('.noUi-handle').attr('aria-valuenow') || +$('#payment-slider').data('value');
			const termMonths = +$('#term-slider').find('.noUi-handle').attr('aria-valuenow') || +$('#term-slider').data('value');

			const downPayment = (paymentPercentage / 100) * equipmentPrice;
        	const remainingAmount = equipmentPrice - downPayment;

        	payment = downPayment;

        	const monthlyPayment = (remainingAmount * (monthlyInterestRate / 12)) /
            (1 - Math.pow(1 + (monthlyInterestRate / 12), -termMonths));

            let buyoutPrice = (remainingAmount * (1 + monthlyInterestRate * (termMonths / 12))) / termMonths;

            buyoutPrice = buyoutPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
			
			$('.result_main').text(`${buyoutPrice} ₽`);
		}

		

		$('.calc_slider').each(function(){
			const $this = $(this);
			const min = +$this.data('min');
			const max = +$this.data('max');
			const start = +$this.data('start');
			const stepSlider = +$this.data('step');
			let prefix = $this.data('prefix');

			if (prefix !== '%') {
				prefix = ' ' + prefix
			}

			const slider = noUiSlider.create($this[0], {
			   	start: [ start ],
				connect: [true, false],
				step: stepSlider,
				range: {
					'min': [ min ],
					'max': [ max ]
				},
				tooltips: true,
				format: wNumb({
					decimals: 0,
					thousand: ' ',
				})
			});

			
	        let tooltip = $this.find('.noUi-tooltip');
	        
	        
	        slider.on('update', function (values) {
	            tooltip.text(values[0] + prefix);
	            $this.attr('data-value', values[0]);

	            calculateLeasingPayment();

	            if(prefix == '%') {
		            const tooltipPay = $('#payment-slider').find('.noUi-tooltip').text();
	        		$('#payment-slider').find('.noUi-tooltip').html(`${tooltipPay} или ${payment.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽` );
	        	}
	        });
		})

		calculateLeasingPayment();
	}	

	var tmenu = $('.header_bot_menu'),
        tmenuOffset = tmenu.offset();
    $(window).scroll(function(){
      	if (($(window).scrollTop() > tmenuOffset.top + 20)) {
        	$('.header').addClass('fixed'); 
      	} else {
        	$('.header').removeClass('fixed');
      	};
    }); 

    $('.qv_button').on('click', function(){
    	let pageLink = window.location.href;
    	let resultQv = pageLink + '\n';

    	$('.popup_step_form .popup_step_form__item:not(.active)').each(function(){
    		const titleText = $(this).find('.popup_step_form__title').text();
    		const item = $(this).find('.qv_item.active');
    		let textItem;

    		if (item.find('.visible-item__title').length){
    			textItem =  titleText + ' - ' + item.find('.visible-item__title').text() + '\n';
    		} else {
    			textItem =  titleText + ' - ' + item.text() + '\n';
    		}

    		resultQv += textItem;
    	}) 
    	
    	$('.result_form textarea').val(resultQv)
    });
})

// Slider

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

	let swiperSale = new Swiper(".sale_Swiper", {
		loop: false,
		slidesPerView: "auto",
      	spaceBetween: 0,	
      	slidesPerView: 1,
	    pagination: {
	        el: ".swiper-pagination-sale",
	        clickable: true,
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
    let sliderWr = document.querySelector('.buy_productSwiper');

    function swiperCard() {
      	let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");

      	if (!mobile.matches) {
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

	let reviewsSlider = new Swiper(".reviews_block__items-wrap", {
		loop: false,
      	spaceBetween: 62,	
      	slidesPerView: 2,
	    navigation: {
          	nextEl: ".swiper-brand-next",
          	prevEl: ".swiper-brand-prev",
        },
		lazy: true,
		breakpoints: {
		    0: {
		      	spaceBetween: 48,
		      	slidesPerView: 1
		    },
		    769: {
		      	spaceBetween: 48,
		      	slidesPerView: 2
		    }
		}
	});

	const quantityInput = document.getElementById("product-quantity");
	const minusButton = document.querySelector(".product__amount-minus");
	const plusButton = document.querySelector(".product__amount-plus");

	minusButton.addEventListener("click", () => {
		let currentValue = parseInt(quantityInput.value);

		if (currentValue > 1) {
		  	quantityInput.value = currentValue - 1;
		}
	});

	plusButton.addEventListener("click", () => {
		let currentValue = parseInt(quantityInput.value);
		quantityInput.value = currentValue + 1;
	});

	quantityInput.addEventListener("input", () => {
		let currentValue = parseInt(quantityInput.value);
		if (isNaN(currentValue) || currentValue < 1) {
		  	quantityInput.value = 1;
		}
	});
});
