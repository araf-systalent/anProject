(function () {
    'use strict';

    angular
        .module('app')
        .controller('SimulationAnlysis', ScenarioAnalysis);

        ScenarioAnalysis.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationDropdownService'];
    function ScenarioAnalysis(UserService, $rootScope,$scope,$http,RunSimulationDropdownService) {
        $rootScope.pageHeader="Simulation Anlysis";
    }
    
    })();