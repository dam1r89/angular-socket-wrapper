#AngularSocketWrapper

Wrapper for Socket.io

##Configuration

	angular.module('yourApp', ['SocketWrapper'])
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

	$scope.$on('message', function listener(){
		...
	});

	listener will be automatically removed when scope is destroyed


If event is added manually it should be unbinded when appropriate.

	var listener = function(data){
		// ...
	}

	$socket.$on('event', listener);

	$socket.$emit('event', data);

	$socket.$off('event', listener);

