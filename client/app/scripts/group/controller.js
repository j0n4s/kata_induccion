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
    var repetitions_pairs = $scope.count_repetitions_pairs(pairs);    
    var pairs_selected = [];
    $scope.employees_selected = [];
    repetitions_pairs.forEach(function(employee) {
        for (var count = 0; count < pairs.length; count++) {
            if (!$scope.in_array(count, pairs_selected)) {
                if (Number(pairs[count][0]) === Number(employee.index) || Number(pairs[count][1]) === Number(employee.index)) {
                      pairs_selected.push(count);
                    if (!$scope.in_array(Number(employee.index), $scope.employees_selected) && Number(employee.index) > 0) {
                      $scope.employees_selected.push(Number(employee.index));
                      console.log(employee.index);
                    }
                }
            }
        }
    });
    console.log($scope.employees_selected);
  };

  $scope.count_repetitions_pairs = function (pairs){
    $scope.repetitions_employees = [];
    for (var count = 0; count < pairs.length; count++){
        var count_repetition_position0 = 0;
        var count_repetition_position1 = 0;
        for (var count_repeat = 0; count_repeat < pairs.length; count_repeat++) {
              if ((Number(pairs[count][0]) === Number(pairs[count_repeat][0])) || (Number(pairs[count][0]) === Number(pairs[count_repeat][1]))) {
                count_repetition_position0++;
              }
              if ((Number(pairs[count][1]) === Number(pairs[count_repeat][1])) || (Number(pairs[count][1]) === Number(pairs[count_repeat][0]))) {
                count_repetition_position1++;
              }
        }
        $scope.repetitions_employees[pairs[count][0]] = count_repetition_position0;
        $scope.repetitions_employees[pairs[count][1]] = count_repetition_position1;
    }
    $scope.repetitions_employees = $scope.sort_repetitions($scope.repetitions_employees);    
    return $scope.repetitions_employees;
  };

  $scope.sort_repetitions = function (repetitions_employees) {
      repetitions_employees = repetitions_employees.map(function(repetitions, employee){
          return {
            index: employee,
            value: repetitions
          };
      });
      repetitions_employees.sort(function(a, b){
            return b.value - a.value;
      });
      repetitions_employees = repetitions_employees.filter(function(index){
            return index !== undefined;
      });
      return repetitions_employees;
  };

  $scope.in_array = function (needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] === needle){
           return true;
        }
    }
    return false;
  };
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group_pair.html',
    controller: 'group'
  });
});
