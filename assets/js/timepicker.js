const INPUTS = $$('.timepicker-input');
let timepickerFormat = true
let currentInput = {
	input: null,
	hour: null,
	minute: null,
	second: null,
}

function createTimepicker() {
	const TIMEPICKER = document.createElement('div');
	const {top, left} = currentInput.input.getBoundingClientRect()
	const {offsetHeight} = currentInput.input
	const VALUE = currentInput.input.value.split(':')
	
	TIMEPICKER.classList.add('timepicker');
	TIMEPICKER.innerHTML = `
		<div class="timepicker__wrapper">
			<div class="timepicker__inputs row">
				<div class="input-wrapper">
					<p class="input-field__hint">Hour</p>
					<input type="number" placeholder="00" value="${VALUE[0] > 0 ? VALUE[0] : ''}" class="timepicker__input" id="timepicker_hour">
				</div>
				<p class="timepicker__dotted">:</p>
				<div class="input-wrapper">
					<p class="input-field__hint">Minute</p>
					<input type="number" placeholder="00" value="${VALUE[1] > 0 ? VALUE[1] : ''}" class="timepicker__input" id="timepicker_minute">
				</div>
				<p class="timepicker__dotted">:</p>
				<div class="input-wrapper">
					<p class="input-field__hint">Second</p>
					<input type="number" placeholder="00" value="${VALUE[2] > 0 ? VALUE[2] : ''}" class="timepicker__input" id="timepicker_second">
				</div>
			</div>
			<div class="timepicker__format col" style="display: ${timepickerFormat ? 'flex' : 'none'}" id="timepicker_format">
				<button class="button-switcher button-switcher--top button-switcher--active" id="switch_to_am">
					<p class="button-switcher__text button-switcher__text--active">AM</p>
				</button>
				<button class="button-switcher button-switcher--bottom" id="switch_to_pm">
					<p class="button-switcher__text">PM</p>
				</button>
			</div>
		</div>
	
		<div class="timepicker__footer">
			<label class="checkbox">
				<input type="checkbox" class="checkbox__input" id="timepicker_format_switcher" ${timepickerFormat ? '' : 'checked'} />
				<span class="checkbox__box"></span>
					<span class="checkbox__title">24-Hour Time</span>
			</label>
			<button class="button button--white ml-auto" id="timepicker_cancel">Cancel</button>
			<button class="button button--primary" id="timepicker_done">OK</button>
		</div>
	`
	document.body.appendChild(TIMEPICKER);
	TIMEPICKER.style.top = top + window.scrollY + 9 + offsetHeight + 'px';
	TIMEPICKER.style.left = left - 13 + 'px';
	TIMEPICKER.classList.add('timepicker--active');
	
	const TIMEPICKER_DONE = document.getElementById('timepicker_done')
	const TIMEPICKER_CANCEL = document.getElementById('timepicker_cancel')
	const TIMEPICKER_HOUR = document.getElementById('timepicker_hour')
	const TIMEPICKER_MINUTE = document.getElementById('timepicker_minute')
	const TIMEPICKER_SECOND = document.getElementById('timepicker_second')
	const TIMEPICKER_FORMAT_SWITCHER = document.getElementById('timepicker_format_switcher')
	const TIMEPICKER_FORMAT = document.getElementById('timepicker_format')
	const SWITCH_TO_AM = document.getElementById('switch_to_am')
	const SWITCH_TO_PM = document.getElementById('switch_to_pm')

	SWITCH_TO_AM.addEventListener('click', () => {
		SWITCH_TO_PM.classList.remove('button-switcher--active')
		SWITCH_TO_AM.classList.add('button-switcher--active')
	})
	
	SWITCH_TO_PM.addEventListener('click', () => {
		SWITCH_TO_AM.classList.remove('button-switcher--active')
		SWITCH_TO_PM.classList.add('button-switcher--active')
	})

	TIMEPICKER_HOUR.addEventListener('input', (event) => {
		limitLengthHandler(event.target, 2)
		currentInput.hour = event.target.value
		if(event.target.value.length === 2) TIMEPICKER_MINUTE.focus()
	})
	TIMEPICKER_MINUTE.addEventListener('input', (event) => {
		limitLengthHandler(event.target, 2)
		currentInput.minute = event.target.value
		if(event.target.value.length === 2) TIMEPICKER_SECOND.focus()
	})
	TIMEPICKER_SECOND.addEventListener('input', (event) => {
		currentInput.second = event.target.value
		limitLengthHandler(event.target, 2)
	})

	TIMEPICKER_FORMAT_SWITCHER.addEventListener('input', (event) => {
		if(event.target.checked) {
			TIMEPICKER_FORMAT.style.display = 'none'
			timepickerFormat = false
		}
		else {
			TIMEPICKER_FORMAT.style.display = 'flex'
			timepickerFormat = true
		}
	})

	TIMEPICKER_DONE.addEventListener('click', onDoneTimepicker)
	window.addEventListener('keydown', onDoneTimepickerEnter)

	TIMEPICKER_CANCEL.addEventListener('click', () => {
		onCloseTimepicker();
	})
}

function limitLengthHandler(input, limit) {
	if(input.value.length > limit) {
		input.value = input.value.slice(0, limit);
	}
	return input.value;
}

function onDoneTimepickerEnter (event) {
	if(event.key === 'Enter') {
		onDoneTimepicker();
	}
}

function onDoneTimepicker () {
	let hours = currentInput.hour < 10 ? '0' + currentInput.hour : currentInput.hour
	let minutes = currentInput.minute < 10 ? '0' + currentInput.minute : currentInput.minute
	let seconds = currentInput.second < 10 ? '0' + currentInput.second : currentInput.second

	currentInput.input.value = `${hours > 0 ? hours : '00'}:${minutes > 0 ? minutes : '00'}:${seconds > 0 ? seconds : '00'}`
	onCloseTimepicker();
	window.removeEventListener('keydown', onDoneTimepickerEnter)
	window.removeEventListener('click', onCloseTimepickerOutside)
}

function onCloseTimepicker() {
	currentInput.input = null
	document.body.removeChild($('.timepicker'));
	window.removeEventListener('click', onCloseTimepickerOutside)
}

function onCloseTimepickerOutside(event) {
	if($('.timepicker') && !(event.composedPath().includes($('.timepicker')) || event.composedPath().includes(currentInput.input))) {
		onCloseTimepicker();
	}
}

window.timepicker = (event) => {
	if($('.timepicker')) {
		onCloseTimepicker();
	} else {
		currentInput.input = event.target
		createTimepicker()
		window.addEventListener('click', onCloseTimepickerOutside)
	}
}
