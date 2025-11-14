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
				'ing-button[type="submit"]',
			) as HTMLButtonElement;

			loginInput.value = value;
			loginInput.dispatchEvent(new Event('input', { bubbles: true }));

			submitButton.click();

			// Clean-up
			loginCatcher.remove();
		},
		{ once: true },
	);

	let password: string;

	passwordCatcher.addEventListener(
		'change',
		(event) => {
			password = (event.target as HTMLInputElement).value;

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

			const fields = querySelectorAll('ing-pin-field');

			for (const field of fields) {
				const input = field.lastElementChild as HTMLInputElement;
				const positionDiv = Array.from(field.children).find(
					(child) => child.getAttribute('slot') === 'after',
				) as HTMLDivElement;
				const position = Number.parseInt(positionDiv?.textContent?.trim() || '0', 10);

				if (input && position > 0) {
					input.value = password[position - 1];
					input.dispatchEvent(new Event('input', { bubbles: true }));
				}
			}
		}
	});

	observer.observe(document, {
		childList: true,
		subtree: true,
	});
})();
