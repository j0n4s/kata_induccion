'use strict';

angular.module('Group')
.controller('group', function ($scope) {
  
  $scope.inputs = [null,null];
  $scope.pairs = [[null,null],[null,null]];
  $scope.controller_loaded = 'Group loaded!';
  $scope.add  = function(numbers){
    var suma = 0;
    for(var contador=0;contador<numbers.length;contador++){
      suma += Number(numbers[contador]);
    }
    $scope.result = suma;
  };
  $scope.create_group = function(pairs){
    
  }
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group_pair.html',
    controller: 'group'
  });
});
