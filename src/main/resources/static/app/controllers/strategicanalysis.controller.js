(function () {
    'use strict';

    angular
        .module('app')
        .controller('StrategicAnalysis', StrategicAnalysis);

        StrategicAnalysis.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationDropdownService'];
    function StrategicAnalysis(UserService, $rootScope,$scope,$http,RunSimulationDropdownService) {
        $rootScope.pageHeader="Strategic Anlysis";
    }
    
    })();