User Avatars
====================

![author](https://img.shields.io/badge/author-Kevin%20Jantzer-blue.svg)
![since](https://img.shields.io/badge/since-2018--11-blue.svg)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-green.svg)

> A custom html element to create colored user avatars with initials or image with from a url or gravatar GUID.

![preview](./preview.png)

The avatars use [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and are rendered in SVG.

Note: custom elements are only supported in cutting edge browsers like Chrome and Firefox.

# Install

`npm install user-avatars`

# Using

Import the avatar package and optionally update the bgd colors

```js
const UserAvatarElement = require('user-avatars')

// Optional: you can override the default colors or extend them if you wish
UserAvatarElement.bgdColors = [/*....*/]
```

Then begin using

```html
<user-avatar initials="KJ">
<user-avatar initials="KJ" bgd="#E91E63" size="40">
<user-avatar gravatar="6bd69795f929a40746cdf026a03b703e">
<user-avatar url="http://url-to-img">
```

# Options

- `initials` - will display a dash if not set
- `bgd` - defaults to selecting a color keyed from the initials
- `color` - text color, defaults to white
- `size` - default: 24
- `gravatar` - the GUID of a [gravatar](https://en.gravatar.com/) account
- `url` - specific a custom image to use

# TODO

- Support border radius option

# Changelog

#### v1.0.0
- Initial release

# License

MIT © [Kevin Jantzer](https://twitter.com/kjantzer) – Blackstone Publishing