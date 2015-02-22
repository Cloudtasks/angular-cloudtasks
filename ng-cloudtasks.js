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

	module.provider('$cloudtasks', [ function () {
		var settings = {
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
				$timeout(function () {
					var width = element.width();
					var height = element.height();

					if (attrs.ctSrc.indexOf('http') === -1) {
						attrs.ctSrc = $location.protocol() +':'+ attrs.ctSrc;
					}

					for (var x = 0; x < $cloudtasks.photoSizesWidths.length; x++) {
						if ($cloudtasks.photoSizesWidths[x] < width) {
							for (var y = 0; y < $cloudtasks.photoSizesHeights.length; y++) {
								if ($cloudtasks.photoSizesHeights[y] < height) {
									var calc = ($cloudtasks.photoSizesWidths[x-1] ? $cloudtasks.photoSizesWidths[x-1] : $cloudtasks.photoSizesWidths[x]) +'x'+ ($cloudtasks.photoSizesHeights[y-1] ? $cloudtasks.photoSizesHeights[y-1] : $cloudtasks.photoSizesHeights[y]);
									
									element.attr('src', '//images.cloudtasks.io/' + (attrs.trim ? 'trim/': '') + calc + (attrs.smart ? '/smart': '') +'/'+ attrs.ctSrc);
									
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