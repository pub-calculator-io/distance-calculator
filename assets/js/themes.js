const setActiveThemeButton = (theme) => {
	document.querySelectorAll('.header-popup__button').forEach(button => {
		if(button.classList.contains(`${theme}-theme`)) button.classList.add('header-popup__button--active')
		else button.classList.remove('header-popup__button--active')
	})
} 

switch (localStorage.getItem('theme')) {
	case 'light':
		document.documentElement.classList = '';
		console.log('Theme: Light');
		localStorage.setItem('theme', 'light');
		window.addEventListener('DOMContentLoaded', () => {
			setActiveThemeButton('light')
		}) 
		break;
	case 'dark':
		document.documentElement.classList = 'dark';
		console.log('Theme: Dark');
		localStorage.setItem('theme', 'dark');
		window.addEventListener('DOMContentLoaded', () => {
			setActiveThemeButton('dark')
		})
		break;
	case 'system':
	default:
		document.documentElement.classList = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '';
		console.log('Theme: System');
		localStorage.setItem('theme', 'system');
		window.addEventListener('DOMContentLoaded', () => {
			setActiveThemeButton('system')
		})
}