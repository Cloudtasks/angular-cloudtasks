(function (factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['angular'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('angular'));
	} else {
		// Browser globals
		factory(angular);
	}
}(function (angular) {
	'use strict';

	function canUseWebP() {
		var elem = document.createElement('canvas');

		if (!!(elem.getContext && elem.getContext('2d'))) {
			// was able or not to get WebP representation
			return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
		} else {
			// very old browser like IE 8, canvas not supported
			return false;
		}
	}

	var module = angular.module('cloudtasks', []);

	module.provider('$cloudtasks', [ function () {
		var settings = {
			clientId: false,
			options: {},
			photoSizesWidths: [
				1280,
				920,
				800,
				720,
				500,
				400,
				250,
				100
			],
			photoSizesHeights: [
				720,
				520,
				450,
				405,
				281,
				225,
				150,
				56
			]
		};

		if (canUseWebP()) {
			settings.options.convert = 'webp';
		}

		var provider = {
			$get: function() { return settings; },
			settings: settings
		};

		return provider;
	}]);

	module.directive('ctSrc', ['$cloudtasks', '$location', '$timeout', '$http', function($cloudtasks, $location, $timeout, $http) {
		return {
			restrict: 'A',
			scope: {},
			link: function(scope, element, attrs) {
				if (!$cloudtasks.clientId) {
					console.log('You need to configure your clientId');
					return;
				}

				//element.css('min-width', '100%');

				$timeout(function () {
					var width = element.width() ? element.width() : element.parent().width();
					var height = element.height();

					if (attrs.ctSrc.indexOf('http') === -1) {
						attrs.ctSrc = $location.protocol() +':'+ attrs.ctSrc;
					}

					var optionsString = '/';
					var options = angular.copy($cloudtasks.options);

					if (attrs.ctOptions) {
						options = angular.extend(options, scope.$eval(attrs.ctOptions));
					}

					angular.forEach(options, function (value, key) {
						if (value) {
							if (typeof value === 'string') {
								optionsString = optionsString + key +':'+ value +'/';
							} else {
								optionsString = optionsString + key +'/';
							}
						}
					});

					var calc = '';

					if (attrs.ctSize) {
						calc = attrs.ctSize;
					} else {
						if (!attrs.ctForceSize) {
							if (width) {
								for (var x = 0; x < $cloudtasks.photoSizesWidths.length; x++) {
									if ($cloudtasks.photoSizesWidths[x] < width) {
										calc = $cloudtasks.photoSizesWidths[x-1] ? $cloudtasks.photoSizesWidths[x-1] : $cloudtasks.photoSizesWidths[x];

										break;
									}
								}
							}

							if (height) {
								for (var y = 0; y < $cloudtasks.photoSizesHeights.length; y++) {
									if ($cloudtasks.photoSizesHeights[y] < height) {
										calc = calc +'x'+ $cloudtasks.photoSizesHeights[y-1] ? $cloudtasks.photoSizesHeights[y-1] : $cloudtasks.photoSizesHeights[y];

										break;
									}
								}
							}

						} else {
							if (width) {
								calc = width;
							}

							if (height) {
								calc = calc +'x'+ height;
							}
						}

						if (!calc) {
							calc = 'origxorig';
						} else if (calc.toString().indexOf('x') === -1) {
							calc = calc +'x';
						}
					}

					if (attrs.ctDefault || $cloudtasks.defaultImage) {
						element.css('background-image', 'url(//images.cloudtasks.io/'+ $cloudtasks.clientId + optionsString + calc +'/'+ encodeURIComponent(decodeURIComponent((attrs.ctDefault || $cloudtasks.defaultImage))) +')');
						element.bind('error', function() {
							element.unbind( "error" );
							element.attr('src', '//images.cloudtasks.io/'+ $cloudtasks.clientId + optionsString + calc +'/'+ encodeURIComponent(decodeURIComponent((attrs.ctDefault || $cloudtasks.defaultImage))));
						});
					}

					element.attr('src', '//images.cloudtasks.io/'+ $cloudtasks.clientId + optionsString + calc +'/'+ encodeURIComponent(decodeURIComponent(attrs.ctSrc)));
				}, 0);
			}
		};
	}]);

	return module;

}));
