'use strict';

/**
 * @ngdoc function
 * @name imgurrandomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imgurrandomApp
 */

//global variable default init
var subreddit = 'cats';
var imageArray;
var currentPage = 0;
var pagePlusOne;
var testing;
var sortOrder = 'top';

angular.module('imgurRandomApp')

//controls all input relating to searching: subreddit, new/top, order, page switch, and the api call
	.controller('SearchCtrl',['$scope', '$http', function ($scope, $http) {		

		$scope.apiCall = function() {
			pagePlusOne = currentPage + 1;
			$scope.page = 'Page ' + pagePlusOne;
			$http.defaults.headers.common['Authorization'] = 'Client-ID 8c4fdcec50df594';
			$http.get('https://api.imgur.com/3/gallery/r/' + subreddit + '/' + sortOrder + '/page/' + currentPage + '.json', {headers: {'Authorization': 'Client-ID ' + '8c4fdcec50df594'}}).
			success (function(json) {
				imageArray = [];
				for (var i = 0; i < 60; i++) {		
					imageArray[i] = 'http://i.imgur.com/' + json.data[i].id + 'm.png';
					$scope.imageArray = imageArray;

				}
			}).
			error (function() {
				alert('error');

			})
		};

		$scope.enterSubreddit = function () {
			subreddit = $scope.subreddit;
			currentPage = 0;
			$scope.apiCall();			
		};

		$scope.subredditSort = function() {
			sortOrder = $scope.sortBy;
		};

		$scope.loadMore = function () {
			currentPage = currentPage + 1;
			$scope.apiCall();
		};
		$scope.loadPrevious = function() {
			if (currentPage === 0) {
				alert('Already on First Page! Click Next!');
			}
			else {
				currentPage = currentPage - 1;
				$scope.apiCall();			}
		};

	}]);
