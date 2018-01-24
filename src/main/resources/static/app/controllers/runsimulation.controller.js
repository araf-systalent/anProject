(function () {
    'use strict';

    angular
        .module('app')
        .controller('RunSimulation', RunSimulation);

        RunSimulation.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationService','dropDownresponse'];
    function RunSimulation(UserService, $rootScope,$scope,$http,RunSimulationService,dropDownresponse) {
        var vm = this;
        $rootScope.catClass=[];
        $rootScope.clientGroup=[];
        $rootScope.priceStructure=[];
        $rootScope.pageHeader="Run simulation";
        initController();
       
        function initController() {

            try {
                loadDropDownData();
            }
            catch(err) {
                //document.getElementById("demo").innerHTML = err.message;
                console.log(err.message);
            }
            
        }

        function loadDropDownData(){

            setDropdownElementDatas(dropDownresponse);
           
            
        }

        function setDropdownElementDatas(data){
            vm.catClass=data["Price Structure"].values;
            vm.catClass =unique(vm.catClass);
            vm.clientGroup=data["Client Group"].values;
            vm.clientGroup =unique(vm.clientGroup);
            vm.priceStructure=data["Price Structure"].values;
        }

        function unique(list) {
            var result = [];
            $.each(list, function(i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        }
    }

    
    })();