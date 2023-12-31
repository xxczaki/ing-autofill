(() => {
	console.log('%cING Autofill is active', 'background-color: #ED6C2D; color: white; font-size: 16px');

	const observer = new MutationObserver(() => {
		const loginInput = document.querySelector('#login-input');

		if (loginInput) {
			// Make password manager suggestion pop up when clicking the input
			loginInput.setAttribute('autocomplete', 'username');
		}

		const fields = document.querySelectorAll('[id^=mask-]');

		if (fields.length > 0) {
			for (const field of fields) {
				field.setAttribute('readonly', 'true');
			}
		}

		/*
			ING actually has an autocomplete catcher to prevent password managers
			from messing up the form
		*/
		const autocompleteCatcher = document.querySelector('#input-id');

		if (autocompleteCatcher) {
			autocompleteCatcher.addEventListener('change', event => {
				const password = event.target.value;

				for (const field of fields) {
					const characterNumber = Number.parseInt(field.id.split('-')[1], 10) - 1;

					field.value = password[characterNumber];
					// This is needed to "enable" the login button
					field.dispatchEvent(new KeyboardEvent('keyup', {bubbles: true, key: 'Enter'}));
					field.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: 'Enter'}));
				}

				observer.disconnect();
			}, {once: true});
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
})();