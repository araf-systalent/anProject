(function () {
    'use strict';

    angular
        .module('app')
        .factory('LoggedUserService', LoggedUserService);

        LoggedUserService.$inject = ['$rootScope','$http'];
    function LoggedUserService($rootScope,$http) {
        var service = {};

       service.intiateLoggedUserSession=intiateLoggedUserSession;

       

        return service;

        function loadLoggedUserInformations(loggedUserJson){
            var userInfo={userName:loggedUserJson.user,
            name:loggedUserJson.name};
            $rootScope.userInfo=userInfo;
        }

        function intiateLoggedUserSession(){
            var loggedUserJson= $rootScope.globals.authResult;
            setLoggedUserHttpAuthHeader(loggedUserJson.token);
            setLoggedUserMenuList(loggedUserJson.menu);
            loadLoggedUserInformations(loggedUserJson)
        }

        function setLoggedUserMenuList(menuLsit){
            $rootScope.menuLsit=menuLsit;
        }

        function setLoggedUserHttpAuthHeader(authToken){
            $http.defaults.headers.common['Authorization'] = 'Bearer '+authToken;
        }

    }

})();