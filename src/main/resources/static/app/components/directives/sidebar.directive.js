;(function() {

  'use strict';
  angular
    .module('app')
    .directive('sideBar', SideBar);
  
  SideBar.$inject = ['site.config','$rootScope','$timeout','$location',];
  
  function SideBar(SiteConfig, $rootScope, $timeout, $location) {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'A',
	  scope : false,
      templateUrl: 'app/components/directives/sidebar.tmpl.html',
	  link : SiteBarLink 
    };
	
	function SiteBarLink(scope){
		scope.AppName = SiteConfig.APP_NAME;
		scope.ProjectList = SiteConfig.PROJECTS;
		scope.SubMenuActive = false;
		
		
	}
    return directiveDefinitionObject;
  }
  
  

})();