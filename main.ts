(async () => {
	// Kagekiri allows us to easily query elements located inside the Shadow DOM.
	// ING's newest websites heavily uses web components.
	const { querySelector, querySelectorAll } = await import('kagekiri');

	console.log(
		'%cING autofill is active',
		'background-color: #ED6C2D; color: white; font-size: 16px',
	);

	const loginCatcher = document.createElement('input');

	loginCatcher.autocomplete = 'username';
	loginCatcher.style.position = 'absolute';
	loginCatcher.style.left = '-10000px';

	const passwordCatcher = document.createElement('input');

	passwordCatcher.type = 'password';
	passwordCatcher.autocomplete = 'current-password';
	passwordCatcher.style.position = 'absolute';
	passwordCatcher.style.left = '-10000px';

	document.body.prepend(loginCatcher, passwordCatcher);

	loginCatcher.addEventListener(
		'change',
		(event) => {
			const value = (event.target as HTMLInputElement).value;

			const loginInput = querySelector(
				'input[name="login"]',
			) as HTMLInputElement;
			const submitButton = querySelector(
				'button[type="submit"]',
			) as HTMLButtonElement;

			loginInput.value = value;
			loginInput.dispatchEvent(new Event('input', { bubbles: true }));

			submitButton.click();

			// Clean-up
			loginCatcher.remove();
		},
		{ once: true },
	);

	let value: string;

	passwordCatcher.addEventListener(
		'change',
		(event) => {
			value = (event.target as HTMLInputElement).value;

			// Clean-up
			passwordCatcher.remove();
		},
		{ once: true },
	);

	const observer = new MutationObserver(() => {
		const loginInput = querySelector('input[name="login"]') as HTMLInputElement;

		if (loginInput) {
			loginInput.placeholder = 'ING autofill is active';
		}

		if (querySelector('[name="password"]')) {
			// Clean-up
			observer.disconnect();

			const fields = querySelectorAll(
				'input[name^=pin-]:enabled',
			) as HTMLInputElement[];
			const submitButton = querySelector(
				'button[type="submit"]',
			) as HTMLButtonElement;

			for (const field of fields) {
				const characterNumber =
					Number.parseInt(field.name.split('-')[1], 10) - 1;

				field.disabled = true;
				field.value = value[characterNumber];

				field.dispatchEvent(new Event('input', { bubbles: true }));
			}

			submitButton.click();
		}
	});

	observer.observe(document, {
		childList: true,
		subtree: true,
	});
})();
