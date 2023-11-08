'use strict'

window._ = document.getElementById.bind(document);
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

console.log('Script is OK! ༼ つ ◕_◕ ༽つ')
// IS MAIN PAGE
// if(window.location.pathname === '/') document.body.classList.add('isMainPage')

// DIALOG TABLE
if(document.querySelector('.result-table__dialog')) {
	import('./dialog-table.js').then(e => {
		console.log("Dialog table loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, dialog tables not loaded (ಥ﹏ಥ)", e)
	})
}
// MASK
if(document.querySelector('[data-inputmask]')) {
	import('./mask.js').then(e => {
		console.log("Mask loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, masks not loaded (ಥ﹏ಥ)", e)
	})
}
// DATEPICKER
if(document.querySelector('.datepicker')) {
	import('./datepicker.js').then(e => {
		console.log("Datepicker loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, datepicker not loaded (ಥ﹏ಥ)", e)
	})
}
// TIMEPICKER
if(document.querySelector('.timepicker-input')) {
	import('./timepicker.js').then(e => {
		console.log("Timepicker loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, timepicker not loaded (ಥ﹏ಥ)", e)
	})
}
// HOURPICKER
if(document.querySelector('.hourpicker-input')) {
	import('./hourpicker.js').then(e => {
		console.log("Hourpicker loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, Hourpicker not loaded (ಥ﹏ಥ)", e)
	})
}
// OPTIONS
if(document.querySelector('.calculator-content--options')) {
	import('./options.js').then(e => {
		console.log("Options loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, options not loaded (ಥ﹏ಥ)", e)
	})
}
// ICON DROPDOWN
if(document.querySelector('.dropdown-icon')) {
	import('./dropdown-icon.js').then(e => {
		console.log("Dropdown-icon loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, dropdown-icon not loaded (ಥ﹏ಥ)", e)
	})
}

// MODAL
const MODAL_OPENERS = document.querySelectorAll('.js-modal-open')
const MODAL_CLOSERS = document.querySelectorAll('.js-modal-close')
const MODAL_WINDOW = document.querySelector('.modal-window')

let currentShare = 0
let isOpenPopupHeader = false;
let focusedElement = 0;

const closeAll = () => {
	MODAL_SEARCH.value = ''
	MODAL_SEARCH_LIST.classList.remove('modal-search__list--error')
	MODAL_SEARCH_LIST.classList.remove('modal-search__list--active')
	MODAL_OPENERS.forEach(MODAL_OPENER => {
		const MODAL_ID = MODAL_OPENER.getAttribute('data-modal')
		const MODAL = document.querySelector(`.modal-${MODAL_ID}`)
		MODAL.classList.remove(`modal-${MODAL_ID}--active`)
	})
}

window.addEventListener('click', (e) => {
	let controllerTheme = document.querySelector('#popup-theme')
	let controllerLang = document.querySelector('#popup-lang')
	if(isOpenPopupHeader && !(e.composedPath().includes(controllerLang) || e.composedPath().includes(controllerTheme))) {
		isOpenPopupHeader = false
		document.querySelector('.modal-lang--active')?.classList.remove(`modal-lang--active`)
		document.querySelector('.modal-theme--active')?.classList.remove(`modal-theme--active`)
	}
})

window.addEventListener('keydown', (e) => {
	if(e.key === 'Escape') {
		MODAL_WINDOW.classList.remove('modal-window--active')
		closeAll()
	}

	if((e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
		closeAll();
		$('.modal-search__input').focus();
		MODAL_WINDOW.classList.add(`modal-window--active`)
		$('.modal-search').classList.toggle(`modal-search--active`);
	}

	if(!MODAL_WINDOW) return;

	if(e.key === 'ArrowUp') {
		let listItem = [...MODAL_SEARCH_LIST_CONTENT.children]
		if(focusedElement - 1 < 0) {
			focusedElement = listItem.length - 1
		} else {
			focusedElement--
		}
		listItem[focusedElement]?.focus()
		// listItem[focusedElement].scrollIntoView(true)
	}

	if(e.key === 'ArrowDown') {
		let listItem = [...MODAL_SEARCH_LIST_CONTENT.children]
		listItem[focusedElement]?.focus()
		if(focusedElement + 1 > listItem.length - 1) {
			focusedElement = 0
		} else {
			focusedElement++
		}
	}
})

if(MODAL_WINDOW) {
	MODAL_WINDOW.addEventListener('click', (e) => {
		if(e.target.classList.contains('modal-window')) {
			MODAL_WINDOW.classList.remove(`modal-window--active`)
			MODAL_WINDOW.classList.remove(`modal-window--active-mini`)
			closeAll()
		}
	})
}
if(MODAL_OPENERS.length > 0) {
	MODAL_OPENERS.forEach(MODAL_OPENER => {
		MODAL_OPENER.addEventListener('click', () => {
			const MODAL_ID = MODAL_OPENER.getAttribute('data-modal')
			const MODAL = document.querySelector(`.modal-${MODAL_ID}`)

			closeAll();

			if(MODAL_ID !== 'lang' && MODAL_ID !== 'theme') MODAL_WINDOW.classList.toggle(`modal-window--active`)
			else isOpenPopupHeader = true

			if(MODAL_ID === 'search') document.querySelector('.modal-search__input').focus()
			if(MODAL_ID === 'share') {
				console.log($('.modal-share__textarea').value)
				$$('.modal-share__textarea')[currentShare].focus()
				$$('.modal-share__textarea')[currentShare].setSelectionRange(0, $$('.modal-share__textarea')[currentShare].value.length)
			}

			MODAL.classList.toggle(`modal-${MODAL_ID}--active`)
		})
	})
}
if(MODAL_CLOSERS.length > 0) {
	MODAL_CLOSERS.forEach(MODAL_CLOSER => {
		MODAL_CLOSER.addEventListener('click', () => {
			const MODAL_ID = MODAL_CLOSER.getAttribute('data-modal')
			const MODAL = document.querySelector(`.modal-${MODAL_ID}`)

			closeAll();

			if(MODAL_ID !== 'lang' && MODAL_ID !== 'theme') MODAL_WINDOW.classList.toggle(`modal-window--active`)
			else isOpenPopupHeader = true

			MODAL.classList.remove(`modal-${MODAL_ID}--active`)
		})
	})
}

// THEME
const light = document.querySelectorAll('.light-theme');
const dark = document.querySelectorAll('.dark-theme');
const system = document.querySelectorAll('.system-theme');

light.forEach((i) =>
	i.addEventListener('click', () => {
		document.documentElement.classList = '';
		localStorage.setItem('theme', 'light');
		setActiveThemeButton('light')
		if(switchTheme !== null) {
			if(typeof switchTheme === 'object') {
				switchTheme.forEach(element => element('light'))
			} else {
				switchTheme('light')
			}
		}
	}),
);
dark.forEach((i) =>
	i.addEventListener('click', () => {
		document.documentElement.classList = 'dark';
		localStorage.setItem('theme', 'dark');
		setActiveThemeButton('dark')
		if(switchTheme !== null) {
			if(typeof switchTheme === 'object') {
				switchTheme.forEach(element => element('dark'))
			} else {
				switchTheme('dark')
			}
		}
	}),
);
system.forEach((i) =>
	i.addEventListener('click', () => {
		document.documentElement.classList = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '';
		localStorage.setItem('theme', 'system');
		setActiveThemeButton('system')
		if(switchTheme !== null) {
			if(typeof switchTheme === 'object') {
				switchTheme.forEach(element => element(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
			} else {
				switchTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
			}
		}
	}),
);

// SEARCH
const JSON_CALCULATORS = allCalculators;

const MODAL_SEARCH = document.querySelector('.modal-search__input')
const MODAL_SEARCH_LIST = document.querySelector('.modal-search__list')
const MODAL_SEARCH_LIST_CONTENT = document.querySelector('.modal-search__list-content')

MODAL_SEARCH.addEventListener('input', (e) => {
	focusedElement = 0
	if(e.target.value.length > 0) {
		const FILTERED_JSON = JSON_CALCULATORS.filter(CALCULATOR => {
			return (CALCULATOR.description.toLowerCase().match(e.target.value.toLowerCase()) !== null) ||
				CALCULATOR.title.toLowerCase().match(e.target.value.toLowerCase()) !== null;
		})
		if(FILTERED_JSON.length > 0) {
			MODAL_SEARCH_LIST.classList.remove('modal-search__list--error')
			MODAL_SEARCH_LIST.classList.add('modal-search__list--active')
			MODAL_SEARCH_LIST_CONTENT.innerHTML = ''
			FILTERED_JSON.forEach(CALCULATOR => {
				let calculatorWrapper = document.createElement('a')
				calculatorWrapper.classList.add('modal-search-item')
				calculatorWrapper.href = CALCULATOR.uri

				let calculatorImg = document.createElement('img')
				calculatorImg.classList.add('modal-search-item__img')
				calculatorImg.src = CALCULATOR.image

				let calculatorTitle = document.createElement('span')
				calculatorTitle.classList.add('modal-search-item__text')
				calculatorTitle.innerText = CALCULATOR.title

				calculatorWrapper.append(calculatorImg, calculatorTitle)
				MODAL_SEARCH_LIST_CONTENT.append(calculatorWrapper)
			})
		} else {
			MODAL_SEARCH_LIST_CONTENT.innerHTML = ''
			MODAL_SEARCH_LIST.classList.remove('modal-search__list--active')
			MODAL_SEARCH_LIST.classList.add('modal-search__list--error')
		}
	} else {
		MODAL_SEARCH_LIST_CONTENT.innerHTML = ''
		MODAL_SEARCH_LIST.classList.remove('modal-search__list--active')
		MODAL_SEARCH_LIST.classList.remove('modal-search__list--error')
	}
})

// LANG
const LANG_SELECTS = document.querySelectorAll('.header-lang__select')

let langIsEng = true

for (const LANG_SELECT of LANG_SELECTS) {
	if(LANG_SELECT.innerText !== 'ENG' && window.location.href.match(LANG_SELECT.href) !== null) {
		LANG_SELECT.classList.add('header-lang__select--active')
		langIsEng = false
	}
}

if(langIsEng) LANG_SELECTS[0].classList.add('header-lang__select--active')

// SHARE
$$('.modal-share__button').forEach((button,index) => {
	button.addEventListener('click', () => {
		$$('.modal-share__button').forEach(i => i.classList.remove('modal-share__button--active'))
		$$('.modal-share__content').forEach(i => i.classList.remove('modal-share__content--active'))
		button.classList.add('modal-share__button--active')
		$$('.modal-share__content')[index].classList.add('modal-share__content--active')
		$$('.modal-share__textarea')[index].setSelectionRange(0, $$('.modal-share__textarea')[index].value.length)
		currentShare = index
	})
})

window.copyWidget = function (button) {
	button.classList.add('button--copy-active')
	navigator.clipboard.writeText($$('.modal-share__textarea')[currentShare].value)
	setTimeout(() => {
		button.classList.remove('button--copy-active')
	}, 1000)
}

window.now = function (suffix = 0){
	let date = new Date();
	date.setDate(date.getDate() + suffix);
	return ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2)
}

if(window.innerWidth < 1024){
	$$('.calculator-content .button--primary').forEach((button) => {
		button.addEventListener('click', () => {
			let scrollValue = _('result-container').offsetTop;
			window.scrollTo({ top: scrollValue, behavior: 'smooth'});
		})
	});
}
