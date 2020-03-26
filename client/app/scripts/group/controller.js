'use strict';
angular.module('Group')

.controller('group', function ($scope, _) {
  
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
    $scope.count_repetitions_sort_pairs(pairs);
    $scope.set_employees_more_repititions(pairs);
    $scope.get_better_group();
  };

  $scope.count_repetitions_sort_pairs = function (pairs){
    $scope.repetitions_employees = [];
    var estocolmo_employee = 0;
    var londres_employee = 1;
    $scope.count_repetitions_employee(pairs,estocolmo_employee);
    $scope.count_repetitions_employee(pairs,londres_employee);
    $scope.repetitions_employees = _.sortBy($scope.repetitions_employees,'repetitions').reverse();
  };

  $scope.count_repetitions_employee = function(pairs,country_employee){
       var count_repititions = $scope.repetitions_employees.length;
      for (var count_pairs = 0; count_pairs < pairs.length; count_pairs++){
          var count_repetition_country_employee = 0;
          var pairs_employee = [];
          for (var count_pairs_repeat = 0; count_pairs_repeat < pairs.length; count_pairs_repeat++) {
                if (Number(pairs[count_pairs][country_employee]) === Number(pairs[count_pairs_repeat][country_employee])){
                  count_repetition_country_employee++;
                  pairs_employee.push(count_pairs_repeat);
                }
          }
          var found = _.findWhere($scope.repetitions_employees, {id: pairs[count_pairs][country_employee]});
          if(found === undefined && pairs[count_pairs][country_employee] !== null){
            $scope.repetitions_employees[count_repititions] = {
              id: pairs[count_pairs][country_employee],
              repetitions: count_repetition_country_employee,
              pairs: pairs_employee
            };
            count_repititions ++;
          }
      }
  };


  $scope.set_employees_more_repititions = function (pairs){
    var pairs_selected = [];
    $scope.employees_selected = [];
    $scope.repetitions_employees.forEach(function(employee) { 
        for (var count = 0; count < pairs.length; count++) {
            if(!_.contains(pairs_selected, count)){
                if (Number(pairs[count][0]) === Number(employee.id) || Number(pairs[count][1]) === Number(employee.id)) {
                      pairs_selected.push(count);
                   var found = _.findWhere($scope.employees_selected, {id: employee.id});
                    if (found === undefined && Number(employee.id) > 0) {
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
                  if(employee.id !== employees_selected_tmp[count_pairs].id && _.contains(employees_selected_tmp[count_pairs].pairs, employee.pairs[count])  &&  !_.contains(count_repetitions_group_employee ,employee.pairs[count])){
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
