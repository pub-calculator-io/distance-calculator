'use strict'

$$('.result-table__dialog').forEach(element => {
	const ELEMENT_OPEN = element.querySelector('.result-table__open');
	ELEMENT_OPEN.addEventListener('click', () => {
		element.classList.toggle('result-table__dialog--active');
	})
})