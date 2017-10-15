angular.module('todo',[])

	.directive('autoFocus',['$timeout',function($timeout){

		return {
			restrict:'A',
			link:function(scope,element,attributes){

				scope.$watch('item.isEditing',function(newValue){

					if(newValue){

						$timeout(function(){
							element[0].focus();
						},0)
						
					}

				})

			}
		}

	}])

	.controller('todoCtrl',['$scope',function($scope){

		$scope.taskList = [];

		GetData();

		function GetData(){

			if(localStorage.getItem('taskList')){

				$scope.taskList = angular.fromJson(localStorage.getItem('taskList'));

			}

		}

		/*
			添加任务
				1.获取用户输入的内容
				2.判断用户是否敲击了回车
				3.准备一个任务列表
				4.将用户输入的内容添加到任务列表中
				5.利用ng-repeat指令将任务渲染到页面中
		*/

	
		$scope.addTask = function(e){

			// 当用户敲击了回车
			if(e.keyCode == 13){

				// 当用户输入内容的时候
				if($scope.task){

					// 添加任务
					$scope.taskList.push({
						name:$scope.task,
						isCompleted:false,
						isEditing:false
					})

					// 清空文本框
					$scope.task = "";

				}

			}

		}


		/*
			更改任务状态
				
				1.如何更改样式
				2.需要一个数据代表任务状态

		 */

		/*
			删除任务

				1.为删除按钮添加点击事件
				2.找到要删除的任务
				3.删除

		 */
		
		$scope.deleteTask = function(task){

			$scope.taskList.splice($scope.taskList.indexOf(task),1);

		}

		/*
			计算未完成任务的数量

				1.循环任务列表
				2.判断当前任务是否是未完成的
				3.累加
				4.返回数据

			只要页面中的数据(任何数据)发生变化的时候,angularjs就会重新渲染模板

		*/
	
		$scope.unCompletedTasks = function(){

			/*var num = 0;

			angular.forEach($scope.taskList,function(item,index){

				if(!item.isCompleted){

					num++;

				}

			})

			return num;*/

			// filter方法 可以根据过滤条件对数组中的数据进行过滤 将符合条件的数据以一个新数组的形式返回
			/*var newArr = $scope.taskList.filter(function(item){

				return !item.isCompleted

			});

			return newArr.length;*/

			return $scope.taskList.filter(item => !item.isCompleted).length;


		}

		/*
			任务筛选

				1.给ng-repeat指令添加filter过滤器
				2.为过滤器提供过滤条件
				3.为筛选按钮添加点击事件
				4.更改筛选条件

		*/

		$scope.condition = "";

		$scope.isSelected = "All"

		$scope.filterTask = function(type){

			switch(type){

				case 'All':

					$scope.condition = "";

					$scope.isSelected = "All"

					break;

				case 'Active':

					$scope.condition = false;

					$scope.isSelected = "Active"

					break;

				case 'Completed':

					$scope.condition = true;

					$scope.isSelected = "Completed"

					break;
			}

		}


		/*
			清空已完成

				1.给清空已完成按钮添加点击事件
				2.循环数据
				3.判断当前任务是否是已完成的
				4.删除
			
			  true   true     false
			["吃饭","睡觉","打豆豆"]
				0      1       2

			  true     false
			["睡觉","打豆豆"]
				0      1     

		*/
	
		$scope.clearCompletedTasks = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				if($scope.taskList[i].isCompleted){

					$scope.taskList.splice(i,1);

					i--;

				}

			}

		}

		$scope.abc = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				if($scope.taskList[i].isCompleted){

					return true;

				}

			}

		}


		/*
			批量更改任务状态

		 */

		$scope.changeStatus = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				$scope.taskList[i].isCompleted = $scope.status;
				
			}

		}


		$scope.updateStatus = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				if(!$scope.taskList[i].isCompleted){

					$scope.status = false;

					return;

				}
				
			}

			$scope.status = true;

		}

		/*
			更改任务名字

				1.给任务名字添加双击事件 dblclick
				2.更改当前任务的isEding字段为true
				3.根据isEditing字段来决定是否添加类名
				4.显示当前要修改的任务的名字

		*/
	
		$scope.modifyName = function(task){

			$scope.taskList.forEach(function(item){
				item.isEditing = false;
			})

			task.isEditing = true;

		}

		$scope.cancelModify = function(task){

			task.isEditing = false;

		}

		$scope.$watch('taskList',function(){

			localStorage.setItem('taskList',angular.toJson($scope.taskList))

		},true);

		// true 深度监听



	}])