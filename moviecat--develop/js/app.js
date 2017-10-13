
angular.module('movieCat',['ui.router','route','commonModule','coming_soonModule','in_theatersModule','searchModule'])
    .controller('navBarCtrl',['$scope','$location',function($scope,$location){
        $scope.search=function(){
            $location.path('/search/1/'+$scope.keyword);
            $scope.keyword='';
        }
    }]);
   



