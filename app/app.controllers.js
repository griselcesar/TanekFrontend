let url_api = location.origin+":3520/";
angular.module('tanek')


	.controller('home', ['$scope','$http','$location', function($scope,$http,$location){
		
		$scope.titulo = "Sección de Clientes"	;
		let {token,usuario} = localStorage;
		
		if (token) {

			$scope.usuario = usuario;

			function obtenerClientes(){
				let req = {
					url:url_api+"clientes",
					method: 'GET',
					headers: {
						"authorization":`${token}`
					}
				};

				$http(req).then(
					res => {
						let {clientes} = res.data;
						$scope.clientes = clientes;
					},
					err => {
						console.log(err);
					});
			}

			obtenerClientes();

			$scope.Nuevo = () => {
				$location.path('/nuevo');
			};

			$scope.Eliminar = (id) => {
				
				let req = {
					url:url_api+"clientes/"+id,
					method: 'DELETE',
					headers: {
						"authorization":`${token}`
					}
				};

				$http(req)
					.then(
						res => {
							obtenerClientes();
						},
						err => {});
			};

			$scope.Salir = () => {
				localStorage.clear();
				$location.path('/login');
			};

		}else{
			$location.path('/login');
		}

	}])


	.controller('login', ['$scope','$http','$location', function($scope,$http,$location){

		$scope.titulo = "Entrar al Sistema"	;
		let {token,usuario} = localStorage;
		$http.get(url_api).then(res => {},err => {});

		if (token) {
			$location.path('/');
		}
		
		
		$scope.Entrar = () => {
			$http.post(url_api,$scope.user)
				.then(
					res => {
						let {mensaje, token, usuario} = res.data;
						localStorage.setItem('token',`Bearer ${token}`);
						localStorage.setItem('usuario',usuario);
						$location.path('/');
					}, 
					err => {
						let {mensaje} = err.data;
						console.log(mensaje);
						$scope.info = mensaje;
					});
		};

	}])

	
	.controller('nuevo', ['$scope','$http','$location', function($scope,$http,$location){
		let {usuario,token} = localStorage;
		$scope.titulo = "Agregar Cliente";

		if (token) {

			$scope.Guardar = () => {

				console.log($scope.cliente);

				let req = {
					url:url_api+"clientes",
					method: 'POST',
					headers: {
						"authorization":`${token}`
					},
					data:$scope.cliente
				};

				$http(req).then(
					res => {
						console.log(res.data);
						$location.path('/');
					},
					err => {
						let {mensaje} = err.data;
						$scope.info = mensaje;
					});

			};

			$scope.Cancelar = () => {
				$location.path('/');
			};

		}else{
			$location.path('/login');
		}

	}])
	;