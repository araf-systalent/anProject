;(function() {

  'use strict';
  angular
    .module('app')
    .directive('sideBar', SideBar);
  
  SideBar.$inject = ['$rootScope','$timeout','$location',];
  
  function SideBar( $rootScope, $timeout, $location) {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'A',
	  scope : true,
      templateUrl: 'app/components/directives/sidebar.tmpl.html',
	  link : SiteBarLink 
    };
	
	function SiteBarLink(scope){

    scope.menuLsit=$rootScope.menuLsit;
    scope.isLogged=$rootScope.isLogged;
    scope.isActivePage=function(pageurl){
      var path =$location.path();
     
      if(scope.isActive(pageurl)){
        return "dropdown-submenu headerBg3";
      }
      else{
        return "";
      }
  };

  scope.isActive=function(pageurl){
    var path =$location.path();
    if(path=='/' && pageurl=='simulation' ){
      return true;
    }
    if(path=='/'+pageurl){
      return true;
    }
    else{
      return false;
    }
};
		
	}
    return directiveDefinitionObject;

    
  }
  
  

})();