;(function() {
    
      'use strict';
      angular
        .module('app')
        .directive('minHeader', MinHeader);
      
        MinHeader.$inject = ['site.config','$rootScope','$timeout','$location'];
      
      function MinHeader(SiteConfig, $rootScope, $timeout, $location) {
    
        // Definition of directive
        var directiveDefinitionObject = {
          restrict: 'A',
          scope : {},
          templateUrl: 'app/components/directives/minheaderbar.tmpl.html',
          link : SiteBarLink 
        };
        
        function SiteBarLink(scope){
            scope.AppName = SiteConfig.APP_NAME;
            scope.ProjectList = SiteConfig.PROJECTS;
            scope.SubMenuActive = false;
            
            
        }

        function smMenuClick() {
          animateBarIcon('fa-bars', 'fa-bars');
          if ($("#menuContainer").hasClass("hidden-xs")) {
              $("#menuContainer").toggleClass("hidden-xs");
              animateLeftMenu("0", 1);
          } else {
              animateLeftMenu("-115", 0.5);
          }
      };
  
      function animateLeftMenu(left, opacity) {
          $("#menuContainer").animate({
              opacity: opacity,
              left: left,
          }, 500, function () {
              if (left != "0") {
                  $("#menuContainer").toggleClass("hidden-xs");
              }
          });
      }
      function animateBarIcon(fromArrow, toArrow) {
          var iconElement = document.getElementById('icon');
          var options = {
              from: fromArrow,
              to: toArrow,
              animation: 'rotateClockwise'
          };
  
          iconate(iconElement, options);
      }
        return directiveDefinitionObject;
      }
      
      
    
    })();