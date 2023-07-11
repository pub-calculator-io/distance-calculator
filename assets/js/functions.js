window.setValue = function (inputId, value, index){
	_(inputId).value = value;
	_(inputId).index = index;
}

window.switcher = function(button, id, action) {
	$('#' + id).value = button.value;
	$('#' + id).onchange && $('#' + id).onchange(button.value);
	$('#' + id + '-a')?.classList.remove("button-switcher--active");
	$('#' + id + '-b')?.classList.remove("button-switcher--active");
	$('#' + id + '-c')?.classList.remove("button-switcher--active");
	$('#' + id + '-d')?.classList.remove("button-switcher--active");
	$('#' + id + '-e')?.classList.remove("button-switcher--active");
	button.classList.add("button-switcher--active");
	toggleRelatedInputs(button, id, action);
}

window.toggleRelatedInputs = function(element, id, action){
	// Применяя toggleRelatedInputs к выпдающим спискам, в element передается event
	// Если в element передается event, то функция не отрабатывает
	// Сделал првоерку на тип элемента и в случае если element === Event, то передается element.target
	element = element instanceof Event ? element.target : element
	id = id ?? element.id;
	let value = element.value;
	if(element.type == 'select-one') value = element.selectedIndex;
	$$('.' + id).forEach(element => {
		if(action === "disabled") {
			element.classList.remove("disabled");
		} else if (action === "finding") {
			element.classList.remove("disabled");
			if(element.querySelector('.input-field__input').value === "finding...") {
				element.querySelector('.input-field__input').value = ""
			}
		} else {
			element.classList.add("related-item-hidden");
		}
	});
	$$('.related-to-' + id + '-' + value)?.forEach(element => {
		if(action === "disabled") {
			element.classList.add("disabled");
		} else if (action === "finding") {
			element.querySelector('.input-field__input').value = "finding..."
			element.classList.add("disabled");
		} else {
			element.classList.remove("related-item-hidden");
		}
	});
}

window.switch_data_tab = function(owner, index, value){
	$$('[data-tab]')?.forEach(element => {
		if(element.getAttribute('data-tab') == index) {
			element.classList.add('tab--active');
			owner.classList.add('tab--active');
		} else {
			element.classList.remove('tab--active');
		}
	});
}

window.isMetricSystem = function() {
	return $('.system-switcher').classList.contains('system-switcher--active');
}

window.setSystem = function(system) {
	const add = (system == "metric" ? ".imperial-system-item" : ".metric-system-item");
	$$(".system-item-hidden").forEach(element => {
		element.classList.remove("system-item-hidden");
	});
	$$(add).forEach(element => {
		element.classList.add("system-item-hidden");
	});
	localStorage.setItem("system", system);
}

window.toggleSystem = function(button) {
	button.classList.toggle('system-switcher--active');
	if(button.classList.contains('system-switcher--active')) {
		return setSystem('metric');
	}
	return setSystem('imperial');
}

window.isHidden = function(element) {
	const styles = window.getComputedStyle(element);
	return styles.display === 'none' || styles.visibility === 'hidden';
}

window.output = {
	value: null,
	val: function(value){
		this.value = value;
		return this;
	},
	replace: function(search, replacement) {
		this.value = this.value.replace(search, replacement);
		return this;
	},
	set: function(elementId){
		_(elementId).innerHTML = this.value;
		return this;
	}
};

// check erroneous result of expression (or if it's not string - check itself)
// usefull in cases when erroneous values of input fields are unknown
window.calc = (expression) => {
	let result = expression;
	if(typeof expression == 'string'){
		result = math.evaluate(expression); // can throw error as well
	}
	if(isNaN(result)||result==Infinity||result==-Infinity||result.im) {
		throw new Error(`result is ${result}.`);
	}
	return result;
};

window.input = {
	box: $('#error-box'),
	list: $('#error-list'),
	value: null,
	elementId: null,
	shown: false,
	processed: false,
	silent: false,
	reset: function(){
		this.shown = false;
		this.box.classList.remove('calculator-result--error-active');
		$$('.input-field--error')?.forEach(el => el.classList.remove('input-field--error'))
		$$('.calculator-result:not(.calculator-result--error)').forEach(el => el.classList.remove('calculator-result--hidden'))
	},
	error: function (inputId, message = `Incorrect value for "${inputId}"`, last = false) {
		if(this.silent) return;
		if(this.processed) this.reset();
		if(!Array.isArray(inputId)) inputId = [inputId];
		for(const inputIdItem of inputId) _(inputIdItem).parentNode.classList.add('input-field--error');
		if(!this.shown){
			this.processed = false;
			this.shown = true;
			this.list.innerHTML = '';
			this.box.classList.add('calculator-result--error-active');
			$$('.calculator-result:not(.calculator-result--error)').forEach(el => el.classList.add('calculator-result--hidden'))
		}
		const element = document.createElement('p');
		element.classList.add('calculator-error__item');
		element.innerHTML = message;
		this.list.append(element);
		if(last) this.processed = true;
	},
	exception(inputId, message){
		if(typeof message != 'string'){
			let error = '';
			if(message instanceof Error){
				error = message.toString();
			}
			// default message
			message = `Value${Array.isArray(inputId)?'s':` "${this.get(inputId).value}"`} of "${inputId}" ${Array.isArray(inputId)?'are':'is'} invalid.<br/>${error}`;
		}
		return this.error(inputId, message, true);
	},
	valid: function(){
		if(!this.shown || this.processed) this.reset();
		this.processed = true;
		this.silent = false;
		return !this.shown;
	},
	get: function(elementId){
		this.elementId = elementId;
		let element = _(elementId);
		this.value = element.value;
		this.silent = false;
		for (; element && element !== document; element = element.parentNode ) {
			if(element.classList.contains('related-item-hidden')) this.silent = true;
		}
		return this;
	},
	index: function(){
		this.value = _(this.elementId).selectedIndex;
		return this;
	},
	checked: function(elementId){
		this.value = _(this.elementId).checked;
		return this;
	},
	split: function(separator){
		this.value = this.value.split(separator);
		return this;
	},
	replace: function(pattern, replacement){
		this.value = this.value.replace(pattern, replacement);
		return this;
	},
	default: function(value){
		if(!this.value) this.value = value;
		return this;
	},
	optional: function(value){
		if(!this.value) this.silent = true;
		return this;
	},
	gt: function(compare = 0, errorText = `The ${this.elementId} must be greater than ${compare}.`){
		if (this.value instanceof Date) {
			compare = compare instanceof Date ? compare : new Date(_(compare).value);
			if (this.value.getTime() <= compare.getTime()) this.error(this.elementId, errorText);
		} else {
			compare = isNaN(compare) ? Number(_(compare).value) : compare;
			if(this.value === '' || isNaN(Number(this.value))) 
				this.error(this.elementId, `The ${this.elementId} must be a number.`); 
			else
				if (Number(this.value) <= compare) this.error(this.elementId, errorText);
		}
		return this;
	},
	gte: function(compare = 0, errorText = `The ${this.elementId} must be greater than or equal to ${compare}.`){
		if (this.value instanceof Date) {
			compare = compare instanceof Date ? compare : new Date(_(compare).value);
			if (this.value.getTime() < compare.getTime()) this.error(this.elementId, errorText);
		} else {
			compare = isNaN(compare) ? Number(_(compare).value) : compare;
			if(this.value === '' || isNaN(Number(this.value))) 
				this.error(this.elementId, `The ${this.elementId} must be a number.`); 
			else
				if (Number(this.value) < compare) this.error(this.elementId, errorText);
		}
		return this;
	},
	lt: function(compare = 0, errorText = `The ${this.elementId} must be less than ${compare}.`){
		if (this.value instanceof Date) {
			compare = compare instanceof Date ? compare : new Date(_(compare).value);
			if (this.value.getTime() >= compare.getTime()) this.error(this.elementId, errorText);
		} else {
			compare = isNaN(compare) ? Number(_(compare).value) : compare;
			if(this.value === '' || isNaN(Number(this.value))) 
				this.error(this.elementId, `The ${this.elementId} must be a number.`); 
			else
				if (Number(this.value) >= compare) this.error(this.elementId, errorText);
		}
		return this;
	},
	lte: function(compare = 0, errorText = `The ${this.elementId} must be less than or equal to ${compare}.`){
		if (this.value instanceof Date) {
			compare = compare instanceof Date ? compare : new Date(_(compare).value);
			if (this.value.getTime() > compare.getTime()) this.error(this.elementId, errorText);
		} else {
			compare = isNaN(compare) ? Number(_(compare).value) : compare;
			if(this.value === '' || isNaN(Number(this.value))) 
				this.error(this.elementId, `The ${this.elementId} must be a number.`); 
			else
				if (Number(this.value) > compare) this.error(this.elementId, errorText);
		}
		return this;
	},
	integer: function(errorText = `The ${this.elementId} must be integer number (-3, -2, -1, 0, 1, 2, 3, ...).`){
		if (!this.value.match(/^-?(0|[1-9]\d*)$/)) this.error(this.elementId, errorText);
		return this;
	},
	_naturalRegexp: /^([1-9]\d*)$/,
	natural: function(errorText = `The ${this.elementId} must be a natural number (1, 2, 3, ...).`){
		if (!this.value.match(this._naturalRegexp)) this.error(this.elementId, errorText);
		return this;
	},
	natural_numbers: function(errorText = `The ${this.elementId} must be a set of natural numbers (1, 2, 3, ...).`){
		this.split(/[ ,]+/);
		if (!this.value.every(value=>value.match(this._naturalRegexp))) this.error(this.elementId, errorText);
		return this;
	},
	_mixedRegexp: /^(0|-?[1-9]\d*|-?[1-9]\d*\/[1-9]\d*|-?[1-9]\d*\s[1-9]\d*\/[1-9]\d*)$/,
	mixed: function(errorText = `The ${this.elementId} must be an integer/fraction/mixed number (1, 2/3, 4 5/6, ...).`){
		if (!this.value.match(this._mixedRegexp)) this.error(this.elementId, errorText);
		return this;
	},
	mixed_numbers: function(errorText = `The ${this.elementId} must be a set of integer/fraction/mixed numbers (1, 2/3, 4 5/6, ...).`){
		this.split(/,\s*/);
		if (!this.value.every(value=>value.match(this._mixedRegexp))) this.error(this.elementId, errorText);
		return this;
	},
	number: function(errorText = `The "${this.elementId}" must be a number.`){
		if(this.value === '' || isNaN(Number(this.value))) this.error(this.elementId, errorText);
		return this;
	},
	numbers: function(errorText = `The ${this.elementId} must be a set of numbers.`){
		if (this.value.filter(value => isNaN(Number(value))).length) this.error(this.elementId, errorText);
		return this;
	},
	whole: function(errorText = `The ${this.elementId} must be a whole number.`){
		if (!this.value.match(/^(0|[1-9]\d*)$/)) this.error(this.elementId, errorText);
		return this;
	},
	positive: function(errorText = `The ${this.elementId} must be greater than 0.`){
		this.gt(0, errorText);
		return this;
	},
	nonZero: function(errorText = `The ${this.elementId} must be non-zero.`){
		if(this.value === '' || isNaN(Number(this.value))) 
			this.error(this.elementId, `The ${this.elementId} must be a number.`); 
		else
			if(Number(this.value) == 0) this.error(this.elementId, errorText);
		return this;
	},
	nonNegative: function(errorText = `The ${this.elementId} must be greater than or equal to 0.`){
		this.gte(0, errorText);
		return this;
	},
	negative: function(errorText = `The ${this.elementId} must be less than 0.`){
		this.lt(0, errorText);
		return this;
	},
	scientific: function(errorText = `The ${this.elementId} must be in scientific notation.`){
		if (!this.value.match(/^(-|\+)?((0|[1-9]\d*)(\.\d*)?|(\.\d+))((e|\s?(\*|x)\s?10\^)(-|\+)?(0|[1-9]\d*))?$/i)) this.error(this.elementId, errorText);
		return this;
	},
	periodic: function(errorText = `The ${this.elementId} must be regular or periodic number.`){
		if (this.value === '' || isNaN(Number(this.value)) && !this.value.match(/\.\d*\(\d+\)$/)) this.error(this.elementId, errorText);
		return this;
	},
	time: function(format = 'hh:mm:ss', errorText = `The ${this.elementId} must be in format ${format}.`){
		let regex = new RegExp("^" + format.replace(/[\:\-\/\\]/g, '\\$&').replace(/h|m|s/g, '\\d') + "$");
		if (!this.value.match(regex) || isNaN(this.value = new Date(`1900-01-01 ${this.value}`))) this.error(this.elementId, errorText);
		return this;
	},
	date: function(format = 'yyyy-mm-dd', errorText = `The ${this.elementId} is required field.`){
		let regex = new RegExp("^" + format.replace(/[\:\-\/\\]/g, '\\$&').replace(/y|m|d|h|s/g, '\\d') + "$");
		if (!this.value.match(regex) || isNaN(this.value = new Date(this.value))) this.error(this.elementId, errorText);
		return this;
	},
	bool: function(){
		return !!this.value;
	},
	val: function(){
		if(this.value === '') return null;
		return Number(this.value);
	},
	vals: function(){
		return this.value.map(value => Number(value));
	},
	raw: function(){
		return this.value;
	},
	group(name,ids){
		const result = ids.split('|')
			.reduce((result,ids)=>{
				const obj = ids.split('.').every(id=>_(name+id.match(/^[_a-zA-Z]+/)[0]).value) ?
					ids.split('.').reduce((obj,id)=>{
						let type = 'number';
						let getter = 'val';
						switch((id.match(/[^_a-zA-Z]+$/)||[])[0]){
							case '+': type = 'positive'; break;
							case '!0': type = 'nonZero'; break;
							case '#': getter = 'raw'; break;
							default: /* custom modificator */; break;
						}
						id = id.match(/^[_a-zA-Z]+/)[0];
						return {...obj, ...{ 
							[id]: input.get(name+id)[type]()[getter]()
						}};
					}, {}) : null;
				if(!result && !obj) return null;
				return {...result,...obj};					
			}, null);
		return result;
	},
}

window.sysnumconv = function(element){
	const id = element.dataset.target;
	const metric = _(id);
	const imperial = _(id + "_imperial");
	if(window.isMetricSystem()){
		let value = metric.value;
		imperial.value = eval(imperial.dataset.formula).toFixed(2);
	} else {
		let value = imperial.value;
		metric.value = eval(metric.dataset.formula).toFixed(2);
	}
};

window.updateHeight = function(element){
	var id = element.dataset.target;
	var cm = _(id);
	var feet = _(id + "_ft");
	var inches = _(id + "_in");
	if(window.isMetricSystem()){
		feet.value = Math.floor(cm.value * 0.393701 / 12);
		inches.value = (cm.value * 0.393701 % 12).toFixed(2);
	} else {
		cm.value = ((feet.value * 30.48) + (inches.value * 2.54)).toFixed(2);
	}
};

window.setDate = function (id, suffix) {
	var date = new Date();
	var date_m = _(id);
	var date_us = _(id + "_us");
	date.setDate(date.getDate() + suffix);
	date_us.value = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' + date.getFullYear();
	date_m.value = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
}

window.updateDate = function(element){
	var id = element.dataset.target;
	var date_m = _(id);
	var date_us = _(id + "_us");
	if(window.isMetricSystem()){
		let date = new Date(Date.parse(date_m.value));
		date_us.value = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' + date.getFullYear();
	} else {
		let date = new Date(Date.parse(date_us.value));
		date_m.value = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
	}
};

window.switchTab = function (event, index) {
	if(index !== undefined && index !== null) {
		if(event.target.classList.contains('tab-item'))	 {
			$$(`.${event.target.classList[0]}`).forEach((tab, i) => {
				if(index === i) {
					tab.classList.add('tab-item--active')
				} else {
					tab.classList.remove('tab-item--active')
				}
			})
		}
	}
	$$(`[data-tab]`).forEach(element => {
		if(element.dataset.tab == event.selectedIndex || element.dataset.tab == index) {
			element.classList.add('tab--active')
		} else {
			element.classList.remove('tab--active')
		}
	})
}

window.setMaxLength = function(element, maxLength) {
	if(getComputedStyle(element).getPropertyValue('--fontStep') !== '') {
		element.style = `--maxWidth: ${Number(getComputedStyle(element).getPropertyValue('--fontStep').replace(/px/gi, '')) * (element.value.length === 0 ? 1 : element.value.length > maxLength ? maxLength : element.value.length) }px`
	}
	if(element.value.length > maxLength) {
		element.value = element.value.substring(0, maxLength);
	}
}

window.relatedToggle = function(element, related, action) {
	if(action === "disabled") {
		if(element.target.checked) {
			$$(`.related-to-${related}`)?.forEach(el => el.classList.remove('disabled'))
		} else {
			$$(`.related-to-${related}`)?.forEach(el => el.classList.add('disabled'))
		}
	} else {
		if(element.target.checked) {
			$$(`.related-to-${related}-a`)?.forEach(el => el.classList.add('related-item-hidden'))
			$$(`.related-to-${related}-b`)?.forEach(el => el.classList.remove('related-item-hidden'))
		} else {
			$$(`.related-to-${related}-a`)?.forEach(el => el.classList.remove('related-item-hidden'))
			$$(`.related-to-${related}-b`)?.forEach(el => el.classList.add('related-item-hidden'))
		}
	}
}

window.roundTo = function (num, decimals = 5) {
	if (typeof num !== 'number' || !isFinite(num)) return num;
	if (num.toString().includes('e')) {
		const splitted = num.toString().split('e');
		return roundTo(+splitted[0], decimals) + `e${splitted[1]}`;
	};
	return +(Math.round(num + `e+${decimals}`) + `e-${decimals}`);
}
