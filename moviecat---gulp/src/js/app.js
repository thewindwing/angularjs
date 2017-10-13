angular.module('movieCat',['ui.router','route','commonModule','in_theatersModule','coming_soonModule','searchModule'])

	.controller('navBarCtrl',['$scope','$location',function($scope,$location){

		$scope.search = function(){

			// alert($scope.keyword)
			$location.path('/search/1/'+$scope.keyword);

			$scope.keyword = "";

		}

	}])

	

