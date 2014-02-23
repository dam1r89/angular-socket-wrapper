#AngularSocketWrapper

Wrapper for Socket.io

##Using

angular.module('yourApp', ['AngularSocketWrapper'])
	.config(function($socketProvider){

		$socketProvider.options({
				port: 8080 // and other socket.io options
			});

		$socketProvider.host('http://example.com'); // without port number
	})



##Methods

`$socket.bind($scope)` - transfer all events to the scope.

Example:

	$socket.bind($scope);

	$scope.$on('message', function(){
		...
	});


`$socket.$on('event', function(data){})`

`$socket.$emit('event', data)`
