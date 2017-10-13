angular.module('searchModule',[])

	.controller('searchCtrl',['$scope','$stateParams','myService','$location',function($scope,$stateParams,myService,$location){

		// 用户输入的关键字
		var keyword = $stateParams.keyword;
		// 当前页
		var page = $stateParams['page'];
		// 每次请求数据的条数
		var count = 10;
		// 从第几条数据开始取
		var start = (page - 1) * count;
		// 总页数
		var totalPage = 0;

		myService.myJsonp('https://api.douban.com/v2/movie/search',{
			q:keyword,
			count:count,
			start:start
		},function(res){

			$scope.result = res;

			totalPage = Math.ceil(res.total/count);

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
			$location.path('/search/'+page+'/'+keyword);

		}

	}])