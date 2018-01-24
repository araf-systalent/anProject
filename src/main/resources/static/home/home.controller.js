(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$scope','RunSimulationDropdownService'];
    function HomeController(UserService, $rootScope,$scope,RunSimulationDropdownService) {
        var vm = this;
        vm.catClass=[];
        vm.clientGroup=[];
        vm.priceStructure=[];
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        initController();

        function initController() {

            try {
                loadCurrentUser();
                loadAllUsers();
                loadDropDownData();
            }
            catch(err) {
                //document.getElementById("demo").innerHTML = err.message;
                console.log(err.message);
            }
            
        }

        function loadDropDownData(){
            $scope.runSimulationDropdown=null;
             var dropDownresponse=RunSimulationDropdownService.runSimulationDropdownData();
             RunSimulationDropdownService.runSimulationDropdownData()
             .then(function (data) {
                setDropdownElementDatas(data);
             });
            
        }

        function setDropdownElementDatas(data){
            vm.catClass=data["Price Structure"].values;
            vm.clientGroup=data["Client Group"].values;
            vm.priceStructure=data["Price Structure"].values;
        }
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();