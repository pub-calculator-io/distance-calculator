const OPTIONS = document.querySelectorAll('.calculator-content--options')

OPTIONS.forEach(option => {
	const OPTION_HEAD = option.querySelector('.calculator-content-head')
	
	OPTION_HEAD.addEventListener('click', (event) => {

		if(!event.composedPath().includes($('.js-add-button'))) {
			option.classList.toggle('calculator-content--active')
		}
	})
})