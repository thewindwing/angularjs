angular.module('in_theatersModule',[])

	.controller('in_theatersCtrl',['$scope','$http','myService','$stateParams','$location',function($scope,$http,myService,$stateParams,$location){

		/*$http({
			url:'./js/in_theaters.json',
			method:'get'
		}).then(function(res){
			console.log(res.data);
			$scope.result = res.data;
		})*/

		/*
			angularjs认为jsonp请求一律都是不安全的 需要配置白名单 告诉angularjs哪些地址是安全的

			angular.callbacks._0
			angular.callbacks._1

			豆瓣接口不支持函数名带点的形式
	
			https://api.douban.com/v2/movie/in_theaters

			start	起始元素
			count	返回结果的数量

			1 10 0~9
			2 10 10~19
			3 10 20~29

		*/
		
		// 当前页
		var page = $stateParams['page'];
		// 每次请求数据的条数
		var count = 10;
		// 从第几条数据开始取
		var start = (page - 1) * count;
		// 总页数
		var totalPage = 0;

		myService.myJsonp('https://api.douban.com/v2/movie/in_theaters',{
			count:count,
			start:start
		},function(res){

			console.log(res);
			$scope.result = res;

			totalPage = Math.ceil(res.total/count);

			// 通知angularjs更新HTML页面
			$scope.$apply();

		})

		$scope.changePage = function(type){

			if(type == 'next'){

				// 下一页
				page++;

				if(page > totalPage){

					page = totalPage

				}

			}else if(type == 'prev'){

				// 上一页
				page--;

				if(page < 1){
					page = 1;
				}

			}

			// 跳转页面
			$location.path('/in_theaters/'+page);

		}



	}])