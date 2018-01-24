;(function() {
    
      'use strict';
      angular
        .module('app')
        .directive('fullHeader', FullHeader);
      
        FullHeader.$inject = ['site.config','$rootScope','$timeout','$location'];
      
      function FullHeader(SiteConfig, $rootScope, $timeout, $location) {
    
        // Definition of directive
        var directiveDefinitionObject = {
          restrict: 'A',
          scope : false,
          templateUrl: 'app/components/directives/fullheader.tmpl.html',
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