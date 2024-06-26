# ING Autofill

> Make password managers autofill work on the ING bank's website.

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

In May 2024, I updated the extension so that it works on ING's new website.

## Highlights
- Simple (a single file, <100 LOC, easy to understand)
- Uses Manifest V3, with a minimal amount of permissions

## Supported password managers
- 1Password
- Bitwarden

*Other managers may work as well; this list includes those which were tested and confirmed to be working.*

## Automatic installation

- [**Chrome Web Store**](https://chrome.google.com/webstore/detail/ing-autofill/lkaklgijolidfahcedddhaaedbbaiomo)
- [**Firefox Add-ons**](https://addons.mozilla.org/en-US/firefox/addon/ing-autofill/)

## Manual installation

### Chromium-based browsers

1. Clone or download this repository into a folder somewhere on your computer.
2. Enter `chrome://extensions/` in the address bar.
3. At the top right, turn on **Developer mode**.
4. Click **Load unpacked**.
5. Select the folder from step 1.

### Firefox-based browsers

1. Download this repository into a folder somewhere on your computer.
2. Enter `about:debugging#/runtime/this-firefox` in the address bar.
3. Click **Load Temporary Add-on…**.
4. Select the `manifest.json` file located in the folder you created in step 1.
5. Go to ING's login page and, from the extensions menu, make sure to grant the extension access to the page:

![Screenshot showing how to grant the extension access to the page](/assets/firefox-help.png)

*Note: temporary add-ons are removed when Firefox is restarted.*

## License

MIT

