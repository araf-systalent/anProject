(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScenarioAnalysis', ScenarioAnalysis);

        ScenarioAnalysis.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationService'];
    function ScenarioAnalysis(UserService, $rootScope,$scope,$http,RunSimulationService) {
        $rootScope.pageHeader="Scenario Anlysis";
    }
    
    })();