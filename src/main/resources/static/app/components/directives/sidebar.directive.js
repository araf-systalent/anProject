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
		
	}
    return directiveDefinitionObject;
  }
  
  

})();