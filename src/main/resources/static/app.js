(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm',
                resolve:{
                    dropDownresponse:function(RunSimulationDropdownService){
                        return RunSimulationDropdownService.runSimulationDropdownData()
                        .then(function (data) {
                           return data;
                        });
                    }
                }
            })
            .when('/simulation', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm',
                resolve:{
                    dropDownresponse:function(RunSimulationDropdownService){
                        return RunSimulationDropdownService.runSimulationDropdownData()
                        .then(function (data) {
                           return data;
                        });
                    }
                }
            })
            
            .when('/sim-analysis', {
                controller: 'SimulationAnlysis',
                templateUrl: 'app/view/simulationAnalysis.view.html',
                controllerAs: 'vm'
            })
            .when('/strategic-analysis', {
                controller: 'StrategicAnalysis',
                templateUrl: 'app/view/simulationAnalysis.view.html',
                controllerAs: 'vm'
            })
            .when('/scenarios', {
                controller: 'ScenarioAnalysis',
                templateUrl: 'app/view/scenario.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/view/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http','UserService','LoggedUserService'];
    function run($rootScope, $location, $cookies, $http,UserService,LoggedUserService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Bearer '+$rootScope.globals.authResult.token;
            LoggedUserService.intiateLoggedUserSession();
        }
        
        $rootScope.isLogged=isLogged;
        function isLogged() {
            var cookies=$cookies.getObject('globals') || {};
            if(cookies.currentUser){
                return true;
            }
            else{
                return false;
            }
        }
          
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();