'use strict';
angular.module('Group')

.controller('group', function ($scope, _) {
  $scope.pairs = [[null,null],[null,null]];
  $scope.controller_loaded = 'Group loaded!';
  $scope.pairs_employees = [];

  $scope.create_group = function(pairs){
    $scope.get_pairs_repetitions(pairs);
    $scope.set_employees_more_repititions(pairs);
    $scope.get_better_group();
  };

  $scope.get_pairs_repetitions = function (pairs){
    $scope.repetitions_employees = []; 
    $scope.estocolmo_employee = 0;
    $scope.londres_employee = 1;
    $scope.get_pairs_by_employee(pairs,$scope.estocolmo_employee);
    $scope.get_pairs_by_employee(pairs,$scope.londres_employee);
    $scope.repetitions_employees = _.sortBy($scope.repetitions_employees,'repetitions').reverse();
  };

  $scope.get_pairs_by_employee = function (pairs,country_employee){
    var count_repititions = $scope.repetitions_employees.length;
    _.each(pairs, function (pair){
      var pairs_involved_employee = [];
      var count_pairs_repeat = 0;
        _.each(pairs, function (pair_tmp){
            if (pair[country_employee] === pair_tmp[country_employee] && !_.contains(pairs_involved_employee, count_pairs_repeat)){
              pairs_involved_employee.push(count_pairs_repeat);
            }
          count_pairs_repeat ++;
         });
         var found = _.findWhere($scope.repetitions_employees, {id: pair[country_employee]});
         if(found === undefined && pair[country_employee] !== null){
           $scope.repetitions_employees[count_repititions] = {
             id: pair[country_employee],
             repetitions: pairs_involved_employee.length,
             pairs: pairs_involved_employee
           };
           count_repititions ++;
         }
    });
  };

  $scope.set_employees_more_repititions = function (pairs){
    var pairs_selected = [];
    $scope.employees_selected = [];    
    _.each($scope.repetitions_employees, function(employee) { 
        var count_pairs = 0;
        _.each(pairs, function(pair){
            if(!_.contains(pairs_selected, count_pairs) && (Number(pair[$scope.estocolmo_employee]) === Number(employee.id) || Number(pair[$scope.londres_employee]) === Number(employee.id))){
                  pairs_selected.push(count_pairs);
                  var found = _.findWhere($scope.employees_selected,{id: employee.id});
                  if (found === undefined) {
                    $scope.employees_selected.push(employee);
                  }
            }
            count_pairs++;
        });
    });
  };

  $scope.get_better_group = function (){
    $scope.employees_better_selected = [];
    var employees_selected_tmp = $scope.employees_selected;
      _.each($scope.employees_selected,function(employee) {
          var count_repetitions_pairs_employee = [];
          _.each(employee.pairs, function(pairs_by_employee){
            _.each(employees_selected_tmp, function(employee_tmp){
                if(employee.id !== employee_tmp.id && _.contains(employee_tmp.pairs, pairs_by_employee)  &&  !_.contains(count_repetitions_pairs_employee ,pairs_by_employee)){
                  count_repetitions_pairs_employee.push(pairs_by_employee);
                }
            });
          });
          if(count_repetitions_pairs_employee.length !== employee.pairs.length){
            $scope.employees_better_selected.push(Number(employee.id));
          }
          if(count_repetitions_pairs_employee.length === employee.pairs.length){
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
