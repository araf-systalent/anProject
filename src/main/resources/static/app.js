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
                controller: 'RunSimulation',
                templateUrl: 'app/view/RunSimulation.view.html',
                controllerAs: 'vm',
                resolve:{
                    dropDownresponse:function(RunSimulationService){
                        return RunSimulationService.runSimulationDropdownData()
                        .then(function (data) {
                           return data;
                        });
                    }
                }
            })
            .when('/simulation', {
                controller: 'RunSimulation',
                templateUrl: 'app/view/RunSimulation.view.html',
                controllerAs: 'vm',
                resolve:{
                    dropDownresponse:function(RunSimulationService){
                        return RunSimulationService.runSimulationDropdownData()
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
                templateUrl: 'app/view/strategic.view.html',
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


           
            .otherwise({ redirectTo: '/login' });

    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http','UserService','LoggedUserService','site.config'];
    function run($rootScope, $location, $cookies, $http,UserService,LoggedUserService,SiteConfig) {
        // keep user logged in after page refresh
        $rootScope.ApiBaseUrl=SiteConfig.SIMULATION_API_BASE;
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