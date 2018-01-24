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
            scope.logOutApp=function(){
                console.log("logout");
                $location.path('/login');
                console.log('$location',$location.path());
            };
            
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