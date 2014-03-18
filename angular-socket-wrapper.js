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

            host = host || ($location.protocol() + ':\\' + $location.host());
            return new Socket(options);

        }];


        function Socket(options){

            if (!io) return console.error('Socket.io is not found. Did you include script? It should be included before this script.')
            this.socket = io.connect(host, options);

        }

        Socket.prototype = {
            bind: function (scope){
                var socket = this,
                    origOn, origEmit;

                // pass through already assigned listeners
                angular.forEach(scope.$$listeners, function(listener, name){
                    socket.bind(name, listener);
                });

                angular.forEach(['$on', '$emit'], function(key){
                    var fn = scope[key];
                    scope[key] = function(){
                        socket[key](name, listener);
                        fn.apply(scope, arguments);
                    }
                });

            },
            $on: function(name, listener){
                // TODO: Check where to put $apply
                this.socket.on(name, listener);
            },
            $emit: function(name, args){
                this.socket.emit(name, args);
            },
            $send:function(message){
                this.socket.send(message);
            }

        };


    });
})(window, window.angular, window.io);