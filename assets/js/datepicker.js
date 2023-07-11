document.querySelectorAll('.datepicker_us').forEach((datepicker) => {
	new AirDatepicker(datepicker, {
		dateFormat: 'MM/dd/yyyy',
		autoClose: true,
		onSelect: function(event){
			return updateDate(event.datepicker.$el);
		},
		// visible: true,
		prevHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		nextHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		locale: {
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			daysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			daysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		},
	});
});

document.querySelectorAll('.datepicker').forEach((datepicker) => {
	new AirDatepicker(datepicker, {
		dateFormat: 'yyyy-MM-dd',
		autoClose: true,
		onSelect: function(event){
			return updateDate(event.datepicker.$el);
		},
		// visible: true,
		prevHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		nextHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		locale: {
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			daysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			daysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		},
	});
});