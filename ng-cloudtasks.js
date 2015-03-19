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

	var module = angular.module('cloudtasks', []);

	function encodeRFC5987ValueChars (str) {
		return encodeURIComponent(str).
			// Note that although RFC3986 reserves "!", RFC5987 does not,
			// so we do not need to escape it
			replace(/['()]/g, escape). // i.e., %27 %28 %29
			replace(/\*/g, '%2A').
			// The following are not required for percent-encoding per RFC5987, 
			//  so we can allow for a little better readability over the wire: |`^
			replace(/%(?:7C|60|5E|2F)/g, unescape);
	}

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

		var provider = {
			$get: function() { return settings; },
			settings: settings
		};

		return provider;
	}]);

	module.directive('ctSrc', ['$cloudtasks', '$location', '$timeout', function($cloudtasks, $location, $timeout) {
		return {
			restrict: 'A',
			scope: {},
			link: function(scope, element, attrs) {
				if (!$cloudtasks.clientId) {
					console.log('You need to configure your clientId');
					return;
				}

				$timeout(function () {
					var width = element.width();
					var height = element.height();

					if (attrs.ctSrc.indexOf('http') === -1) {
						attrs.ctSrc = $location.protocol() +':'+ attrs.ctSrc;
					}

					var optionsString = '/';
					var options = $cloudtasks.options;

					if (attrs.ctOptions) {
						options = angular.extend(options, scope.$eval(attrs.ctOptions));
					}

					angular.forEach(options, function (value, key) {
						if (value) {
							optionsString = optionsString + key +'/';
						}
					});

					for (var x = 0; x < $cloudtasks.photoSizesWidths.length; x++) {
						if ($cloudtasks.photoSizesWidths[x] < width) {
							for (var y = 0; y < $cloudtasks.photoSizesHeights.length; y++) {
								if ($cloudtasks.photoSizesHeights[y] < height) {
									var calc = ($cloudtasks.photoSizesWidths[x-1] ? $cloudtasks.photoSizesWidths[x-1] : $cloudtasks.photoSizesWidths[x]) +'x'+ ($cloudtasks.photoSizesHeights[y-1] ? $cloudtasks.photoSizesHeights[y-1] : $cloudtasks.photoSizesHeights[y]);
									
									if (attrs.ctDefault || $cloudtasks.defaultImage) {
										element.css('background-image', 'url(//images.cloudtasks.io/'+ $cloudtasks.clientId + optionsString + calc +'/'+ encodeRFC5987ValueChars(decodeURIComponent((attrs.ctDefault || $cloudtasks.defaultImage))) +')');
										element.bind('error', function() {
											element.unbind( "error" );
											element.attr('src', '//images.cloudtasks.io/'+ $cloudtasks.clientId + optionsString + calc +'/'+ encodeRFC5987ValueChars(decodeURIComponent((attrs.ctDefault || $cloudtasks.defaultImage))));
										});
									}

									element.attr('src', '//images.cloudtasks.io/'+ $cloudtasks.clientId + optionsString + calc +'/'+ encodeRFC5987ValueChars(decodeURIComponent(attrs.ctSrc)));
									
									y = $cloudtasks.photoSizesHeights.length + 1;
								}
							}
							x = $cloudtasks.photoSizesWidths.length + 1;
						}
					}
				}, 0);
			}
		};
	}]);

	return module;

}));
