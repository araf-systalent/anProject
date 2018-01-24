(function () {
    'use strict';

    angular
        .module('app')
        .controller('SimulationAnlysis', ScenarioAnalysis);

        ScenarioAnalysis.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationService'];
    function ScenarioAnalysis(UserService, $rootScope,$scope,$http,RunSimulationService) {
        $rootScope.pageHeader="Simulation Anlysis";
    }
    
    })();