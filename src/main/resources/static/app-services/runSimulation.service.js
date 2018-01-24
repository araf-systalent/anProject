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
        return service;
        function runSimulationDropdownData(){
            var apiBaseUrl=$rootScope.ApiBaseUrl;            
            return $http.get(apiBaseUrl+'api/dropdowns/simulation').then(handleSuccess, handleError('Error getting runsimulation dropdown data'));
           
        } 

        function handleSuccess(res) {
            return   res.data ;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
       

    }
    
    })();
