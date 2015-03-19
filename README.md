# [angular-cloudtasks](https://cloudtasks.io)
![Bower version](https://img.shields.io/bower/v/angular-cloudtasks.svg?style=flat)
[![npm version](https://img.shields.io/npm/v/angular-cloudtasks.svg?style=flat)](https://www.npmjs.com/package/angular-cloudtasks)
[![Build Status](https://img.shields.io/travis/twbs/angular-cloudtasks/master.svg?style=flat)](https://travis-ci.org/twbs/angular-cloudtasks)
[![devDependency Status](https://img.shields.io/david/dev/jonnybgod/angular-cloudtasks.svg?style=flat)](https://david-dm.org/jonnybgod/angular-cloudtasks#info=devDependencies)
[![Codacy Badge](https://www.codacy.com/project/badge/556dd3b19d804062a653336f35987384)](https://www.codacy.com/public/jonnybgod/angular-cloudtasks)

Deliver images with the right size

angular-cloudtasks helps using [Cloudtasks.io](https://cloudtasks.io) image processing task by substituting your images sources with the processing URL.

With this you can process your images on the fly applying resize, trim, and even filters to your images. In the end you will save a lot of bandwidth for you and your users as well as improve the overall user experience.

You will need a [Cloudtasks.io](https://cloudtasks.io) account to be able to use this module;

## Install

```sh
$ bower install --save angular-cloudtasks
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

	$cloudtasksProvider.settings.options = {
		trim: false
	}

	$cloudtasksProvider.settings.defaultImage = "http://example.com/defaultImage.jpg";
}])
```

### per image options

```html
<img data-ct-src="{{imgUrl}}" data-ct-options="{trim: true, smart: true}" data-ct-default="http://example.com/defaultImage.jpg"/>
```

## Option list

 - trim (remove color frame)
 - smart (use smart detection for crop and resize)
 - fit_in
 	- adaptive
 	- full
 - filters (apply any imagemagic supported filter)

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
