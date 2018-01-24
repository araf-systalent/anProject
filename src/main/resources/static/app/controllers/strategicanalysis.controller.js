(function () {
    'use strict';

    angular
        .module('app')
        .controller('StrategicAnalysis', StrategicAnalysis);

        StrategicAnalysis.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationService'];
    function StrategicAnalysis(UserService, $rootScope,$scope,$http,RunSimulationService) {
        $rootScope.pageHeader="Strategic Anlysis";
    }
    
    })();