# ING Autofill

> Make password managers autofill the masked password on ING bank's website automagically

## Why?

As a 1Password user, I hated the fact that my bank uses a masked password strategy — it renders the autofill functionality useless and forces me to use the "Show in Large Type" functionality.

When I first realized that my password manager does not support autofilling masked passwords, I stumbled upon some threads on the 1Password forum. I did not, however, search for any existing solutions to this problem at that time, nor before starting coding this utility a few years later.

Out of pure Sunday boredom, I gave myself an hour to create the simplest Chrome extension that would fix this annoying issue.

After making something that works as expected, I searches for some alternatives and found:
- https://github.com/piotr-sarna/ING-Password-Filler
- https://chrome.google.com/webstore/detail/ing-%20-1password-autofill/heagjbohbnbaioaiekgioabidmgoihdc?hl=pl

I did not bother trying them, but a first glance instantly revealed some issues:
- the former project seems overly complex; using Svelte to inject another form into the login page 🤔
- the latter is not open-source and only available via the Chrome Web Store; this is a no-go for security-focused utilities in my opinion, especially when it comes to online banking

Therefore, I felt happy with what I came up with.

## Highlights
- Simple (one file, <50 LOC, pure JavaScript, easy to understand)
- Uses Manifest V3, with a minimal amount of permissions

## Supported password managers
- 1Password

*Other managers may work as well; this list includes those which were tested and confirmed to be working.*

## Installation

1. Download this repository into a folder somewhere on your computer.
2. Enter `chrome://extensions/` in Google Chrome's address bar.
3. At the top right, turn on **Developer mode**.
4. Click **Load unpacked**.
5. Select the folder from step 1.

## License

MIT

