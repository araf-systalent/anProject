// ;(function(){
//     'use strict';
//     angular.module('app')
// .service('runSimulationDropdownService',function($scope,$http){
//         this.runSimulationFunction=function($scope,$http){
//             var mainInfo = $http.get('app-content/run_simulation_dropdown.json').success(function(response) {
//                 return response.data;
//             });
           
//         } 
// });
// })();


(function () {
    'use strict';

    angular
        .module('app')
        .factory('RunSimulationService', RunSimulationService);

        RunSimulationService.$inject =  ['$http','$rootScope'];
    function RunSimulationService($http,$rootScope) {
        var service = {};
        service.getDropDownData=runSimulationDropdownData;
        service.runSimulation=runSimulation;
        service.getSpecificresult=simulationResultForSpecific;
        return service;
        function runSimulationDropdownData(){
            var apiBaseUrl=$rootScope.ApiBaseUrl;            
            return $http.get(apiBaseUrl+'api/dropdowns/simulation').then(handleSuccess, handleError('Error getting runsimulation dropdown data'));
           
        } 

        function runSimulation(data){
            var apiBaseUrl=$rootScope.ApiBaseUrl; 
            //$http.get(apiBaseUrl+'api/dropdowns/simulation').then(handleSuccess, handleError('Error getting runsimulation dropdown data'));
            return $http({
                url : apiBaseUrl+'api/simulation/run',
                method : 'POST',
                "content-type": "application/json;",
                data:data,
                transformResponse: [function (data) {
                    // Do whatever you want!
                    return {data:data};
                }]
              }).then(handleSuccess, handleError('Error getting runsimulation '));
        }

        function simulationResultForSpecific(data){
            var apiBaseUrl=$rootScope.ApiBaseUrl; 
            //$http.get(apiBaseUrl+'api/dropdowns/simulation').then(handleSuccess, handleError('Error getting runsimulation dropdown data'));
            return $http({
                url : apiBaseUrl+'api/simulation',
                method : 'POST',
                "content-type": "application/json;",
                data:data
              }).then(handleSuccess, handleError('Error getting simulation results for specific'));
        }


        function handleSuccess(res) {
            return   {success:true,data:res.data} ;
        }

        function handleError(error) {
            return  { success: false, message: error };
        }
       

    }
    
    })();
