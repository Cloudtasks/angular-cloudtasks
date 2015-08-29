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
            photoWidths: [7680, 4096, 3840, 3600, 3072, 2560, 2500, 2048, 2000, 1920, 1856, 1824, 1792, 1600, 1536, 1520, 1440, 1400, 1366, 1365, 1360, 1280, 1152, 1080, 1024, 960, 896, 856, 832, 800, 768, 729, 720, 704, 640, 544, 512, 480, 468, 460, 400, 392, 384, 352, 320, 256, 234, 192, 180, 176, 160, 128, 88, 64, 32, 16, 8],
            photoHeights: [4320, 4096, 3600, 3072, 2613, 2400, 2252, 2048, 1600, 1536, 1440, 1392, 1368, 1344, 1340, 1280, 1200, 1152, 1128, 1120, 1080, 1050, 1024, 992, 960, 900, 870, 864, 856, 854, 800, 788, 768, 766, 720, 624, 600, 576, 540, 486, 484, 483, 480, 400, 384, 372, 350, 348, 342, 320, 300, 288, 256, 240, 200, 192, 144, 135, 132, 120, 96, 72, 64, 60, 55, 32, 31, 16, 8]
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
								for (var x = 0; x < $cloudtasks.photoWidths.length; x++) {
									if ($cloudtasks.photoWidths[x] < width) {
										calc = $cloudtasks.photoWidths[x-1] ? $cloudtasks.photoWidths[x-1] : $cloudtasks.photoWidths[x];

										break;
									}
								}
							}

							if (height) {
								for (var y = 0; y < $cloudtasks.photoHeights.length; y++) {
									if ($cloudtasks.photoHeights[y] < height) {
										calc = calc +'x'+ $cloudtasks.photoHeights[y-1] ? $cloudtasks.photoHeights[y-1] : $cloudtasks.photoHeights[y];

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
