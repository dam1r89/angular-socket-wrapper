(function(window, angular, io, undefined) {'use strict';

angular.module('SocketWrapper', [])
    .provider('$socket', function $socketProvider() {

        var options = {
            'force new connection': true,
            port: 8010
        },
        host;


        this.options = function(_options){
            angular.extend(options, _options);
        };

        this.host = function(_host){
            host = _host;
        };

        this.$get = ['$location', function($location){

            host = host || ($location.protocol() + '://' + $location.host());
            return new SocketWrapper(options);

        }];


        function SocketWrapper(options){

            if (!io) return console.error('Socket.io is not found. Did you include script? It should be included before this script.')
            this.socket = io.connect(host, options);

        }

        SocketWrapper.prototype = {
            bind: function (scope){
                var wrapper = this,
                    socket = wrapper.socket,
                    socketListeners = [];


                // add listeners for already attached events on scope
                angular.forEach(scope.$$listeners, function(listeners, name){
                    angular.forEach(listeners, function(listener){
                        socketListeners.push({
                            name: name,
                            fn: listener
                        });
                        socket.on(name, listener);
                    });
                });

                scope.$on('$destroy', removeListeners);

                // override scope methods to catch binidngs
                angular.forEach(['$on', '$emit'], function(method){
                    var fn = angular.bind(scope, scope[method]);

                    // scope.$on('$destroy')
                    scope[method] = function(name, listener){

                        socketListeners.push({
                            name: name,
                            fn: listener
                        });
                        wrapper[method].call(wrapper, name, listener);
                        fn.apply(scope, arguments);
                    }
                });

                function removeListeners(){
                    angular.forEach(socketListeners, function(val){
                        wrapper.$off(val.name, val.fn);
                    });
                }


            },
            $off: function(name, listener){

                this.socket.removeListener(name, listener);
            },
            $on: function(name, listener){

                this.socket.on(name, listener);
            },
            $emit: function(name, args){

                this.socket.emit(name, args);
            }

        };


    });
})(window, window.angular, window.io);