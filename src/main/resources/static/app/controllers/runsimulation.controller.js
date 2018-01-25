(function () {
    'use strict';

    angular
        .module('app')
        .controller('RunSimulation', RunSimulation);

        RunSimulation.$inject = ['UserService', '$rootScope','$scope','$http','RunSimulationService','dropDownresponse'];
    function RunSimulation(UserService, $rootScope,$scope,$http,RunSimulationService,dropDownresponse) {
        var vm = this;
        vm.catClasses=[];
        vm.clientGroups=[];
        vm.priceStructures=[];
        $rootScope.pageHeader="Run simulation";
        vm.simRunData={}
        vm.statistics={
            estimatePrftChg:"-",
            stdDevPrftChg:"-",
            avgChgRentalLength:"-",
            rentalAnalyzed:"-",
            daysAnalyzed:"-"
        };
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

        vm.executeSimulationRun=executeSimulationRun;

        function loadDropDownData(){

            setDropdownElementDatas(dropDownresponse);
           
            
        }
        function executeSimulationRun(){
            console.log(vm.simRunData.fromDate);
            var simParam =generateSimParam()
            RunSimulationService.runSimulation(simParam).then(function (response) {
               if(response.success){
                   
                   populateChartAndStatisticsBasedOnResult(response.data.data);


               }
               else{
                   return {};
               }
             });
        }

        function generateSimParam(){
            var simParam={
                "priceScheme": {
                  "type": vm.simRunData.priceStructure,
                  "level": 1
                },
                "grouping": {
                  "clientGroup": vm.simRunData.clientGroup,
                  //"rateZone": "rate zone 1",
                  "catClass": vm.simRunData.catClass
                },
                "simType": {
                  "nRun": 1000,
                  "sampleType": "HISTORIC",
                //   "dataStart":vm.simRunData.fromDate.toISOString().slice(0,-1),
                //   "dataEnd": vm.simRunData.toDate.toISOString().slice(0,-1),
                  "dataStart": "2018-01-11T15:25:41.390",
                  "dataEnd": "2018-04-21T15:25:41.398"
                },
                "startDate": vm.simRunData.fromDate.toISOString().slice(0,-1),
                "endDate": vm.simRunData.toDate.toISOString().slice(0,-1),
                "rentalLengthChange":null
              };
              return simParam;
        }

        function populateChartAndStatisticsBasedOnResult(simId){
            getSimulationResutById(simId).then(function (response) {
                if(response.success){
                    var simulationresult= response.data;
                    var simParamClientGroup = simulationresult.params.grouping.clientGroup;
                    var simParamCatClass = simulationresult.params.grouping.catClass;
                    populateSatisticsData(simulationresult.stats[simParamClientGroup]);
                    populateCumulativeRevenueChartData(simulationresult.cumulativeCharts[simParamClientGroup][simParamCatClass].REVENUE);
                }
                else{
                    return {};
                }
              });
        }
        
        function populateCumulativeRevenueChart(cumulativeRevenueChartsData){
            console.log(cumulativeRevenueChartsData);
        }
        function populateSatisticsData(statistics){
            
            vm.statistics={
                estimatePrftChg:statistics.PROFIT_CHANGE.avg,
                stdDevPrftChg:statistics.PROFIT_CHANGE.sd,
                avgChgRentalLength:"-",
                rentalAnalyzed:"-",
                daysAnalyzed:"-"
            };
        }
        function getSimulationResutById(simId){
            var simIdArr = [];
            simIdArr.push(parseFloat(simId));
            return getSpecificSimulationResult(simIdArr).then(function (response) {
                if(response.success){
                    return {success:true,data:response.data[0]};
                }
                else{
                    return response;
                }
              });
        }

        function getSpecificSimulationResult(simIdArr){
            console.log(simIdArr);
            return RunSimulationService.getSpecificresult(simIdArr).then(function (response) {
                if(response.success){
                    return response;
                }
                else{
                    return response;
                }
              });
        }

        function setDropdownElementDatas(data){
            vm.catClasses=data["Cat Class"].values;
            vm.catClasses =unique(vm.catClasses);
            vm.clientGroups=data["Client Group"].values;
            vm.clientGroups =unique(vm.clientGroups);
            vm.priceStructures=data["Price Structure"].values;
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