'use strict'

const setSelect = (list, index) => {
	list.forEach(item => {
		item.classList.remove('dropdown-select--selected')
	})
	list[index].classList.add('dropdown-select--selected')
}

const setValue = (input, value, index) => {
	if(index !== undefined) {
		setTab(index)
	}
	input.innerHTML = value
}

const setTab = (index) => {
	document.querySelectorAll(`[data-tab]`)?.forEach(element => {
		if(element.getAttribute('data-tab') == index) {
			element.classList.add('tab--active');
		} else {
			element.classList.remove('tab--active');
			element.classList.remove('tab--active')
		}
	})
}

const DROPDOWN_WRAPPER = document.querySelectorAll('.dropdown-wrapper')


DROPDOWN_WRAPPER.forEach(wrapper => {
	// CLOSE DROPDOWN WHEN CLICK OUTSIDE
	window.addEventListener('click', (e) => {
		if(!(e.composedPath().includes(wrapper))) {
			wrapper.classList.remove('dropdown-wrapper--active')
		}
	})

	const DROPDOWN_FIELD = wrapper.querySelector('.input-field')
	const DROPDOWN_VALUE = wrapper.querySelector('.input-field__text')
	const DROPDOWN_SELECTS = wrapper.querySelectorAll('.dropdown-select')
	// DEFAULT TAB
	setTab(0)

	// OPEN DROPDOWN WHEN CLICK ON INPUT
	DROPDOWN_FIELD.addEventListener('click', () => {
		// CLOSE OTHERS DROPDOWN
		if(!wrapper.classList.contains('dropdown-wrapper--active')) {
			DROPDOWN_WRAPPER.forEach(wrapper => {wrapper.classList.remove('dropdown-wrapper--active')})
		}
		// OPEN THIS DROPDOWN
		wrapper.classList.toggle('dropdown-wrapper--active')
	})

	// SET EVENT LISTENERS FOR SELECT 
	DROPDOWN_SELECTS.forEach((select, index) => {
		const SELECT_VALUE = select.innerHTML
		select.addEventListener('click', () => {
			wrapper.classList.remove('dropdown-wrapper--active')

			// SET SELECT FOR DROPDOWN
			setSelect(DROPDOWN_SELECTS, index)

			// SET VALUE FOR DROPDOWN
			if(select.classList.contains('dropdown-select--tab')) {
				// IF DROPDOWN IS DROPDOWN TAB : example due-date-calculator dropdown "Calculate based on"
				setValue(DROPDOWN_VALUE,SELECT_VALUE, index)
			} else {
				setValue(DROPDOWN_VALUE,SELECT_VALUE)
			}
		})
	})
})