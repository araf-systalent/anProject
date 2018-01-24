(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationDropdownService','dropDownresponse'];
    function HomeController(UserService, $rootScope,$scope,$http,RunSimulationDropdownService,dropDownresponse) {
        var vm = this;
        $rootScope.catClass=[];
        $rootScope.clientGroup=[];
        $rootScope.priceStructure=[];
        $rootScope.pageHeader="Run simulation";
        $rootScope.user = null;
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

        function logOutApp(){
            $location.path('/login');
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