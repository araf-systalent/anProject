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
        .factory('RunSimulationDropdownService', RunSimulationDropdownService);

        RunSimulationDropdownService.$inject =  ['$http'];
    function RunSimulationDropdownService($http) {
        var service = {};
        service.runSimulationDropdownData=runSimulationDropdownData;
        return service;
        function runSimulationDropdownData(){
            return $http.get('app-content/run_simulation_dropdown.json').then(handleSuccess, handleError('Error getting runsimulation dropdown data'));
           
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
