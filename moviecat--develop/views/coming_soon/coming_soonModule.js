angular.module('coming_soonModule',[])
    .controller('coming_soonCtrl',['$scope','$location','myService','$stateParams',function($scope,$location,myService,$stateParams){
        var page=$stateParams.page;
        var count=10;
        var start=(page-1)*count;
        var totalPage=0;
        myService.myJsonp('https://api.douban.com/v2/movie/coming_soon',{
            start:start,
            count:count
        },function(res){
            console.log(res);
            $scope.result=res;
            totalPage=Math.ceil(res.total/count);
            $scope.$apply();
        });
        $scope.changePage=function(type){
            if(type=='prv'){
                page--;
                if(page<1){
                    page=1;
                }
            }else if(type=='next'){
                page++;
                if(page>totalPage){
                    page=totalPage;
                }
            }
            $location.path('/coming_soon/'+page);
        }

    }])