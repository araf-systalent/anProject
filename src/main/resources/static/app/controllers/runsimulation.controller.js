(function () {
    'use strict';

    angular
        .module('app')
        .controller('RunSimulation', RunSimulation);

        RunSimulation.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationDropdownService','dropDownresponse'];
    function RunSimulation(UserService, $rootScope,$scope,$http,RunSimulationDropdownService,dropDownresponse) {

    }
    
    })();