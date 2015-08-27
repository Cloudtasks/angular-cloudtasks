# [angular-cloudtasks](https://cloudtasks.io)
[![Bower version](https://img.shields.io/bower/v/angular-cloudtasks.svg?style=flat)]()
[![npm version](https://img.shields.io/npm/v/angular-cloudtasks.svg?style=flat)](https://www.npmjs.com/package/angular-cloudtasks)
[![Build Status](https://img.shields.io/travis/twbs/angular-cloudtasks/master.svg?style=flat)](https://travis-ci.org/twbs/angular-cloudtasks)
[![Codacy Badge](https://www.codacy.com/project/badge/556dd3b19d804062a653336f35987384)](https://www.codacy.com/public/jonnybgod/angular-cloudtasks)

[![Github Releases](https://img.shields.io/github/downloads/Cloudtasks/angular-cloudtasks/latest/total.svg)]()

Allow you to serve highly optimized images to your client apps.

angular-cloudtasks helps using [Cloudtasks.io](https://cloudtasks.io) image processing task by substituting your images sources with the processing URL.

With this you can process your images on the fly applying resize, trim, and even filters to your images. In the end you will save a lot of bandwidth for you and your users as well as improve the overall user experience.

You will need a [Cloudtasks.io](https://cloudtasks.io) account to be able to use this module;

## Install

```sh
$ bower install --save angular-cloudtasks
```

Include angular-cloudtasks module script on your page:

```html
<script src="bower_components/angular-cloudtasks/dist/ng-cloudtasks.min.js"></script>
```

add cloudtasks to your AngularJs module:

```javascript
angular.module('myModule', ['cloudtasks']);
```

Configure with your [Cloudtasks.io](https://cloudtasks.io) client id:

```javascript
.config(['$cloudtasksProvider', function ($cloudtasksProvider) {
	$cloudtasksProvider.settings.clientId = 'YOUR_CLIENT_ID';
}])
```

## Usage

```html
<img data-ct-src="{{imgUrl}}"/>
```

## Options (optional)

### default options

```javascript
.config(['$cloudtasksProvider', function ($cloudtasksProvider) {
	$cloudtasksProvider.settings.clientId = 'YOUR_CLIENT_ID';

	$cloudtasksProvider.settings.options.trim = false;

	$cloudtasksProvider.settings.defaultImage = "http://example.com/defaultImage.jpg";
}])
```

### per image options

```html
<img data-ct-src="{{imgUrl}}" data-ct-options="{trim: true, smart: 'face', filters: 'blur(10):flip()'}" data-ct-default="http://example.com/defaultImage.jpg" data-ct-force-size="">
```

See [Image transformations documentation](https://cloudtasks.io/docs/image/#image) for all available options.

Use data-ct-force-size to force using the actual size of the container. (Prevents approximation to the sizes matrix)

## License

(The MIT License)

Copyright (c) 2015 [Reality Connect](http://reality-connect.pt)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-url]: https://npmjs.org/package/angular-cloudtasks
[npm-image]: https://badge.fury.io/js/angular-cloudtasks.svg
[travis-url]: https://travis-ci.org/Cloudtasks/angular-cloudtasks
[travis-image]: https://travis-ci.org/Cloudtasks/angular-cloudtasks.svg?branch=master
