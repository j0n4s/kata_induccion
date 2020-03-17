'use strict';

angular.module('Group')
.controller('group', function ($scope) {

  $scope.controller_loaded = 'Group loaded!';

  $scope.registro = function(p1,p2){
    console.log('pares 1 =', p1, 'pares 2 =', p2);
    
    return [2011];
  };



})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
