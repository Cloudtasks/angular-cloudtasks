# [angular-cloudtasks](https://cloudtasks.io)
![Bower version](https://img.shields.io/bower/v/angular-cloudtasks.svg?style=flat)
[![npm version](https://img.shields.io/npm/v/angular-cloudtasks.svg?style=flat)](https://www.npmjs.com/package/angular-cloudtasks)
[![Build Status](https://img.shields.io/travis/twbs/angular-cloudtasks/master.svg?style=flat)](https://travis-ci.org/twbs/angular-cloudtasks)
[![devDependency Status](https://img.shields.io/david/dev/twbs/angular-cloudtasks.svg?style=flat)](https://david-dm.org/twbs/angular-cloudtasks#info=devDependencies)
[![Build Status][travis-image]][travis-url]

TODO: Description

## Install

```sh
$ bower install --save angular-cloudtasks
```

```javascript
angular.module('myModule', ['cloudtasks']);
```

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
}])
```

### per image options

```html
<img data-ct-src="{{imgUrl}}" data-ct-options="{trim: true, smart: true}"/>
```

## Option list

 - trim
 - smart

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
