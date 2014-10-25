'use strict';

/**
 * @ngdoc function
 * @name imgurrandomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imgurrandomApp
 */

var subreddit = 'cats';
var imageArray;
var currentPage = 1;
var testing;
var sortOrder = 'top';

//ajax call for imgur api to get the gallery needed, temporary
function ajaxCall(page) {
	$.ajax({
	authorization: '8c4fdcec50df594',
	type: 'GET',
	dataType: 'json',
	headers: {
		Authorization: 'Client-ID ' + '8c4fdcec50df594',
		Accept: 'application/json'
	},
	url: 'https://api.imgur.com/3/gallery/r/' + subreddit + '/' + sortOrder + '/page/' + page + '.json',
	data: {

	},
	success: function(json){
		imageArray = [];
		for (var i = 0; i < 60; i++) {		
			imageArray[i] = 'http://i.imgur.com/' + json.data[i].id + 'm.png';
			// testing = 'http://i.imgur.com/' + imageArray[i] + 'm.png';
			// imageArray[i] = imageArray[i].replace(/"/g, "");
			$('#imageContainer').append('<img style = "margin: 5px; height: auto; width: 200px" id = "galleryImages" src =' + imageArray[i] + '>');
		}
	},
	error: function() {
				alert('error');
			}
	});
}


angular.module('imgurRandomApp')

//controls all input relating to searching: subreddit, new/top, order
	.controller('SearchCtrl',['$scope', function ($scope) {
		$scope.enterSubreddit = function () {
			subreddit = $scope.subreddit;
			currentPage = 0;
			ajaxCall(currentPage);
			$scope.imageArray = ['test', '1', '3'];
			console.log($scope.imageArray);
		};

		$scope.subredditSort = function() {
			sortOrder = $scope.sortBy;
		}
	}]);


angular.module('imgurRandomApp')

//controls moving forward/back through pages
	.controller('PageCtrl', ['$scope', function ($scope) {
		$scope.loadMore = function () {
			currentPage = currentPage + 1;
			ajaxCall(currentPage);

		};
		$scope.loadPrevious = function() {
			if (currentPage === 0) {
				alert('Already on First Page! Click Next!');
			}
			else {
				currentPage = currentPage - 1;
				ajaxCall(currentPage);
			}
		};
	}]);
