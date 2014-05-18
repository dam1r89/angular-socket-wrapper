io = window.io = {};
describe('Testing wrapper', function() {


    var $socket,
        ioSocket = {
            on: angular.noop,
            removeListener: angular.noop,
            emit: angular.noop
        };


    beforeEach(angular.mock.module('SocketWrapper', function($socketProvider){
        $socketProvider._io({
            connect: function(){
                return ioSocket;
            }
        });
    }));

    beforeEach(angular.mock.inject(function(_$socket_){
        $socket = _$socket_;

        spyOn(ioSocket, 'on');
        spyOn(ioSocket, 'removeListener');
        spyOn(ioSocket, 'emit');

    }));

    it('should initialise socket', function(){
        expect($socket).not.toBe(undefined);

    });

    it('should call emit when socket.$emit is called', function(){

        $socket.$emit('message', {});

        expect(ioSocket.emit).toHaveBeenCalled();
        expect(ioSocket.on).not.toHaveBeenCalled();
        expect(ioSocket.removeListener).not.toHaveBeenCalled();

    });


});