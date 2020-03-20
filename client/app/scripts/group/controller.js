'use strict';

angular.module('Group')
.controller('group', function ($scope) {
  
  $scope.inputs = [null,null];
  $scope.pairs = [[null,null],[null,null],[null,null],[null,null]];
  $scope.controller_loaded = 'Group loaded!';
  $scope.add  = function(numbers){
    var suma = 0;
    for(var contador=0;contador<numbers.length;contador++){
      suma += Number(numbers[contador]);
    }
    $scope.result = suma;
  };
  $scope.create_group = function(pairs){
    
    $scope.count_repetitions_pairs(pairs);
    var pairs_selected = [];
    $scope.employees_selected = [];
    $scope.repetitions_employees.forEach(function(employee) { 
        for (var count = 0; count < pairs.length; count++) {
            if (!$scope.in_array(count, pairs_selected)) {
                if (Number(pairs[count][0]) === Number(employee.index) || Number(pairs[count][1]) === Number(employee.index)) {
                      pairs_selected.push(count);
                    if (!$scope.in_array(Number(employee.index), $scope.employees_selected) && Number(employee.index) > 0) {
                      $scope.employees_selected.push(Number(employee.index));
                    }
                }
            }
        }
    });
    console.log($scope.employees_selected);
  };

  $scope.count_repetitions_pairs = function (pairs){    
    $scope.repetitions_employees = [];
    var empleado_estocolmo = 0;
    var empleado_londres = 1;
    for (var count = 0; count < pairs.length; count++){
        var count_repetition_empleado_estocolmo = 0;
        var count_repetition_empleado_londres = 0;
        for (var count_repeat = 0; count_repeat < pairs.length; count_repeat++) {
              if ((Number(pairs[count][empleado_estocolmo]) === Number(pairs[count_repeat][empleado_estocolmo])) || (Number(pairs[count][empleado_estocolmo]) === Number(pairs[count_repeat][empleado_londres]))) {
                count_repetition_empleado_estocolmo++;
              }
              if ((Number(pairs[count][empleado_londres]) === Number(pairs[count_repeat][empleado_londres])) || (Number(pairs[count][empleado_londres]) === Number(pairs[count_repeat][empleado_estocolmo]))) {
                count_repetition_empleado_londres++;
              }
        }
        $scope.repetitions_employees[pairs[count][empleado_estocolmo]] = count_repetition_empleado_estocolmo;
        $scope.repetitions_employees[pairs[count][empleado_londres]] = count_repetition_empleado_londres;
    }
    $scope.sort_repetitions();
  };

  $scope.sort_repetitions = function () {
    $scope.repetitions_employees = $scope.repetitions_employees.map(function(repetitions, employee){
          return {
            index: employee,
            value: repetitions
          };
      });
      $scope.repetitions_employees.sort(function(a, b){
            return b.value - a.value;
      });
      $scope.repetitions_employees = $scope.repetitions_employees.filter(function(index){
            return index !== undefined;
      });
  };

  $scope.in_array = function (needle, haystack) {
    var length = haystack.length;
    for (var contador = 0; contador < length; contador++) {
        if (haystack[contador] === needle){
           return true;
        }
    }
    return false;
  };

  $scope.add_group = function(){
    $scope.pairs.push([null,null]);    
  };
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group_pair.html',
    controller: 'group'
  });
});
