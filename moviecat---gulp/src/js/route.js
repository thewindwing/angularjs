angular.module('route',[])

	.config(['$stateProvider','$urlRouterProvider','$sceDelegateProvider',function($stateProvider,$urlRouterProvider,$sceDelegateProvider){

		$stateProvider
			.state({
				url:'/in_theaters/:page',
				templateUrl:'./views/in_theaters/in_theaters.html',
				name:'in_theaters',
				controller:'in_theatersCtrl'
			})
			.state({
				url:'/coming_soon/:page',
				templateUrl:'./views/coming_soon/coming_soon.html',
				name:'coming_soon',
				controller:'coming_soonCtrl'
			})
			.state({
				url:'/search/:page/:keyword',
				templateUrl:'./views/search/search.html',
				name:'search',
				controller:'searchCtrl'
			})

		$urlRouterProvider.otherwise('/in_theaters/1');

		/*$sceDelegateProvider.resourceUrlWhitelist([
		   // Allow same origin resource loads.
		   'self',
		   // Allow loading from our assets domain.  Notice the difference between * and **.
		   'https://sug.so.360.cn/suggest?word=a'
		 ]);*/

	}])