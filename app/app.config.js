angular.module('tanek',["ngRoute"])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl:"app/templates/home.html",
				controller:"home"
			})
			.when('/login',{
				templateUrl:"app/templates/login.html",
				controller:"login"
			})
			.when('/nuevo',{
				templateUrl:"app/templates/nuevo.html",
				controller:"nuevo"
			})
			.otherwise('/');
	}]);