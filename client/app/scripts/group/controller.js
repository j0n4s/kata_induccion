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
    $scope.set_employees_more_repititions(pairs);
    $scope.get_better_group();
  };

  $scope.count_repetitions_pairs = function (pairs){
    $scope.repetitions_employees = [];
    var estocolmo_employee = 0;
    var londres_employee = 1;
    var count_repititions = 0;
    for (var count_pairs = 0; count_pairs < pairs.length; count_pairs++){
        var count_repetition_estocolmo_employee = 0;
        var pairs_estocolmo_employee = [];
        var count_repetition_londres_employee = 0;
        var pairs_londres_employee = [];
        for (var count_pairs_repeat = 0; count_pairs_repeat < pairs.length; count_pairs_repeat++) {
              if ((Number(pairs[count_pairs][estocolmo_employee]) === Number(pairs[count_pairs_repeat][estocolmo_employee])) || (Number(pairs[count_pairs][estocolmo_employee]) === Number(pairs[count_pairs_repeat][londres_employee]))) {
                count_repetition_estocolmo_employee++;
                pairs_estocolmo_employee.push(count_pairs_repeat);
              }
              if ((Number(pairs[count_pairs][londres_employee]) === Number(pairs[count_pairs_repeat][londres_employee])) || (Number(pairs[count_pairs][londres_employee]) === Number(pairs[count_pairs_repeat][estocolmo_employee]))) {
                count_repetition_londres_employee++;
                pairs_londres_employee.push(count_pairs_repeat);
              }
        }

        var found = $scope.find_object($scope.repetitions_employees, 'id', pairs[count_pairs][estocolmo_employee]);
        if(!found && pairs[count_pairs][londres_employee] !== null){
          $scope.repetitions_employees[count_repititions] = {
            id: pairs[count_pairs][estocolmo_employee],
            repetitions: count_repetition_estocolmo_employee,
            pairs: pairs_estocolmo_employee
          };
          count_repititions ++;
        }
        found = $scope.find_object($scope.repetitions_employees, 'id', pairs[count_pairs][londres_employee]);
        if(!found && pairs[count_pairs][londres_employee] !== null){
          $scope.repetitions_employees[count_repititions] = {
            id: pairs[count_pairs][londres_employee],
            repetitions: count_repetition_londres_employee,
            pairs: pairs_londres_employee
          };
          count_repititions ++;
        }
    }
    $scope.sort_repetitions();
  };


  $scope.set_employees_more_repititions = function (pairs){
    var pairs_selected = [];
    $scope.employees_selected = [];
    $scope.repetitions_employees.forEach(function(employee) { 
        for (var count = 0; count < pairs.length; count++) {
            if (!$scope.in_array(count, pairs_selected)) {
                if (Number(pairs[count][0]) === Number(employee.id) || Number(pairs[count][1]) === Number(employee.id)) {
                      pairs_selected.push(count);
                    var found = $scope.find_object($scope.employees_selected, 'id', employee.id);
                    if (!found && Number(employee.id) > 0) {
                      $scope.employees_selected.push(employee);
                    }
                }
            }
        }
    });
  };

  $scope.get_better_group = function (){
    $scope.employees_better_selected = [];
    var employees_selected_tmp = $scope.employees_selected;
    $scope.employees_selected.forEach(function(employee) {
      var count_repetitions_group_employee = [];
          for (var count = 0; count < employee.pairs.length; count++) {
              for(var count_pairs = 0; count_pairs < employees_selected_tmp.length; count_pairs++){
                  if(employee.id !== employees_selected_tmp[count_pairs].id && $scope.in_array(employee.pairs[count],employees_selected_tmp[count_pairs].pairs) &&  !$scope.in_array(employee.pairs[count],count_repetitions_group_employee)){
                    count_repetitions_group_employee.push(employee.pairs[count]);
                  }
              }
          }
          if(count_repetitions_group_employee.length !== employee.pairs.length){
            $scope.employees_better_selected.push(Number(employee.id));
          }else{
            employee.pairs=[];
          }
    });
  };

  $scope.sort_repetitions = function () {
      $scope.repetitions_employees.sort(function(a, b){
            return b.repetitions - a.repetitions;
      });
      $scope.repetitions_employees = $scope.repetitions_employees.filter(function(id){
            return id !== undefined;
      });
  };
  $scope.find_object =  function(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return true;
        }
    }
    return false;
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
