(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','$rootscope'];
    function UserService($http) {
        var service = {};

        return service;

    }

})();
