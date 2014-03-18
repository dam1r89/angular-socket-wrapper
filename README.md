#AngularSocketWrapper

Wrapper for Socket.io

##Configuration

	angular.module('yourApp', ['AngularSocketWrapper'])
		.config(function($socketProvider){

			$socketProvider.options({
				port: 8080
				// ... and other socket.io options
			});

			// without port number
			// defaults to current host
			$socketProvider.host('http://example.com');

		});



##Methods

`$socket.bind($scope)` - transfer all events to the scope.

Example:

	$socket.bind($scope);

	$scope.$on('message', function(){
		...
	});


`$socket.$on('event', function(data){})`

`$socket.$emit('event', data)`
