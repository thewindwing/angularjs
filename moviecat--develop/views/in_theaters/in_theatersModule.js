angular.module('in_theatersModule',[])
    .controller('in_theatersCtrl',['$scope','myService','$location','$stateParams',function($scope,myService,$location,$stateParams){
        /*  $http({
         url:'./js/in_theaters.json',
         method:'get'
         }).then(function(res){
         console.log(res);
         $scope.result=res.data;
         });*/
        console.log($stateParams);
        var page=$stateParams.page;
        var count=10;
        var start=(page-1)*count;
        var totalPage=0;
        myService.myJsonp('https://api.douban.com/v2/movie/in_theaters',{
            count:count,
            start:start
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
            //跳转页面
            $location.path('/in_theaters/'+page);
        };

    }])