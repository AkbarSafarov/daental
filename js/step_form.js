document.addEventListener('DOMContentLoaded', function(){
	let allResultstemp = document.querySelector('.all_results_temp');

	if (allResultstemp) {
		let allResults = allResultstemp.textContent;

		if(document.querySelector('.testing_block__link a')) {
			document.querySelector('.testing_block__link a').addEventListener('click', function(e){
				e.preventDefault()
				document.querySelector('.popup_step_form').classList.add('active')
				document.querySelector('html').classList.add('oveflowHidden')
			})
		}

		document.addEventListener('click', function(e){
			if(e.target.classList.contains('popup_step_form')) {
				document.querySelector('.popup_step_form').classList.remove('active')
				document.querySelector('html').classList.remove('oveflowHidden')
				setTimeout(function(){
					document.querySelector('.popup_step_form__item.active').classList.remove('active')
					document.querySelector('.popup_step_form__item').classList.add('active')
					document.querySelectorAll('.popup_step_form .popup_step_form__item div').forEach(item => item.classList.remove('active'))
					document.querySelectorAll('.popup_step_form__btn a').forEach(item => item.classList.add('disabled'))
				}, 1000)
			}
		})

		
		document.querySelectorAll('.popup_step_form__visible-item').forEach(function(item) {

			item.addEventListener('click', function(){
				item.classList.toggle('active')
				document.querySelectorAll('.popup_step_form__item').forEach(function(item) {
					if(item.classList.contains('active') && document.querySelectorAll('.popup_step_form__visible-item.active').length > 0) {
						item.querySelector('.popup_step_form__btn a').classList.remove('disabled')
					} else {
						item.querySelector('.popup_step_form__btn a').classList.add('disabled')
					}
				})
			})
		})

		function getSiblings(element) {
		    var siblings = [];
		    var sibling = element.parentNode.firstChild;

		    while (sibling) {
		        if (sibling.nodeType === 1 && sibling !== element) {
		            siblings.push(sibling);
		        }
		        sibling = sibling.nextSibling;
		    }

		    return siblings;
		}

		
		document.querySelector('.step1 .popup_step_form__btn a').addEventListener('click', function(){
			let visibleValues = [],
				firstStepValue = document.querySelector('.step1 .popup_step_form__title').textContent+': ';
			document.querySelectorAll('.popup_step_form__visible-item.active').forEach(function(item) {
				visibleValues.push(item.querySelector('.visible-item__title').textContent);
			})
			allResults = firstStepValue + visibleValues+'; ';
		})

		document.querySelectorAll('.choose_answer__item').forEach(function(item) {
			
			item.addEventListener('click', function(){
				//document.querySelectorAll('.choose_answer__item').forEach(item => item.classList.remove('active'))
		        let siblings = getSiblings(this);
		        siblings.forEach(function(sibling) {
		            sibling.classList.remove('active');
		        });
				item.classList.add('active');
				document.querySelectorAll('.popup_step_form__item').forEach(function(item) {
					if(item.classList.contains('active')) {
						item.querySelector('.popup_step_form__btn a').classList.remove('disabled')
					}
				})
				if(item.classList.contains('hidden_value')) {
					item.nextElementSibling.classList.add('active')
					document.querySelectorAll('.popup_step_form__item').forEach(function(item) {
						if(item.classList.contains('active')) {
							item.querySelector('.popup_step_form__btn a').classList.add('disabled')
						}
					})
				} else {
					document.querySelector('.hidden_value-wr').classList.remove('active')
				}
				
			})
			
		})

		document.querySelector('.step2 .popup_step_form__btn a').addEventListener('click', function(){
			let stepValueTitle = document.querySelector('.step2 .popup_step_form__title').textContent+': ',
				activeValue = document.querySelector('.active .choose_answer__item.active').dataset.value + '; ';
			allResults = allResults + stepValueTitle + activeValue;
		})

		document.querySelectorAll('.hidden_value-wr input').forEach(function(item) {
			item.addEventListener('keyup', function() {
				if(this.value.length > 2) {
					item.parentNode.parentNode.querySelector('.hidden_value').dataset.value = item.value;
					document.querySelectorAll('.popup_step_form__item').forEach(function(item) {
						if(item.classList.contains('active')) {
							item.querySelector('.popup_step_form__btn a').classList.remove('disabled')
						}
					})
				} else {
					document.querySelectorAll('.popup_step_form__item').forEach(function(item) {
						if(item.classList.contains('active')) {
							item.querySelector('.popup_step_form__btn a').classList.add('disabled')
						}
					})
				}
			})
		})

		document.querySelector('.step3 .popup_step_form__btn a').addEventListener('click', function(){
			let stepValueTitle = document.querySelector('.step3 .popup_step_form__title').textContent+': ',
				activeValue = document.querySelector('.active .choose_answer__item.active').dataset.value + '; ';
			allResults = allResults + stepValueTitle + activeValue;
		})

		document.querySelector('.step4 .popup_step_form__btn a').addEventListener('click', function(){
			let stepValueTitle = document.querySelector('.step4 .popup_step_form__title').textContent+': ',
				activeValue = document.querySelector('.active .choose_answer__item.active').dataset.value + '; ';
			allResults = allResults + stepValueTitle + activeValue;
		})

		document.querySelectorAll('.popup_step_form__btn a').forEach(function(item) {
			item.addEventListener('click', function(e) {
				e.preventDefault()
				document.querySelector('.popup_step_form__item.active').nextElementSibling.classList.add('active')
				document.querySelector('.popup_step_form__item.active').classList.remove('active')
				document.querySelector('.active .popup_step_form__btn a').classList.remove('disabled')
			})
		})
	}
})