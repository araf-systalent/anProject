(function () {
    'use strict';

    angular
        .module('app')
        .controller('RunSimulation', RunSimulation);

        RunSimulation.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationService','dropDownresponse'];
    function RunSimulation(UserService, $rootScope,$scope,$http,RunSimulationService,dropDownresponse) {
        $rootScope.pageHeader="Run simulation";
    }
    
    })();