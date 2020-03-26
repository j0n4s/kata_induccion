'use strict';

describe('Controller: select group', function () {

  beforeEach(module('Group'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', { $scope: scope });
  }));

  describe('On instance', function () {
    it('should set "controller_loaded" variable in scope', function () {
      expect(scope.controller_loaded).toContain('loaded');
    });   

    it('should defined pairs in scope', function (){
      expect(scope.pairs).toEqual([[null,null],[null,null],[null,null],[null,null]]);
    });

    it('should defined input in scope', function (){
      expect(scope.inputs).toEqual([null,null]);
    });
    
  });

  describe('When add',function(){
    it('should called function and return number',function(){
      scope.add(['2','1','3']);
      expect(scope.result).toBe(6);
    });
  });

  describe('When add group',function(){
    it('should called function and push an new pair',function(){
      scope.add_group();
      expect(scope.pairs).toEqual([[null,null],[null,null],[null,null],[null,null],[null,null]]);
    });
  });

  describe('When create a group',function(){
    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_sort_pairs([[1009,2011],[1017,2011],[null,null],[null,null]]);
      expect(scope.repetitions_employees).toEqual([{
                id: 2011,
                repetitions: 2,
                pairs: [0,1]
            },{
                id: 1017,
                repetitions: 1,
                pairs: [1]
            },{
              id: 1009,
              repetitions: 1,
              pairs: [0]
            }]);
    });

    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_sort_pairs([[1001,2004],[1001,2002],[1003,2004],[1001,2002],[1004,2004]]);
      expect(scope.repetitions_employees).toEqual([{
                id: 2004,
                repetitions: 3,
                pairs: [0,2,4]
            },{
              id: 1001,
              repetitions: 3,
              pairs: [0,1,3]
            },{
              id: 2002,
              repetitions: 2,
              pairs: [1,3]
            },{
              id: 1004,
              repetitions: 1,
              pairs: [4]
            },{
              id: 1003,
              repetitions: 1,
              pairs: [2]
            }]);
    });

    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_sort_pairs([[1004,2001],[1002,2001],[1004,2003],[1002,2001],[1004,2004]]);
      expect(scope.repetitions_employees).toEqual([{
              id: 2001,
              repetitions: 3,
              pairs: [0,1,3]
            },{
              id: 1004,
              repetitions: 3,
              pairs: [0,2,4]
            },{
              id: 1002,
              repetitions: 2,
              pairs: [1,3]
            },{
              id: 2004,
              repetitions: 1,
              pairs: [4]
            },{
              id: 2003,
              repetitions: 1,
              pairs: [2]
            }]);
    });


    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_sort_pairs([[1009,2000],[1009,2001],[1002,2002],[1003,2002]]);
      expect(scope.repetitions_employees).toEqual([{
              id: 2002,
              repetitions: 2,
              pairs: [2,3]
            },{
              id: 1009,
              repetitions: 2,
              pairs: [0,1]
            },{
              id: 2001,
              repetitions: 1,
              pairs: [1]
            },{
              id: 2000,
              repetitions: 1,
              pairs: [0]
            },{
              id: 1003,
              repetitions: 1,
              pairs: [3]
            },{
              id: 1002,
              repetitions: 1,
              pairs: [2]
            }]);
    });
    
    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_sort_pairs([[1,11],[2,11],[1,12],[3,12],[1,13],[4,13],[1,14],[5,14]]);
      expect(scope.repetitions_employees).toEqual([{
                id: 1,
                repetitions: 4,
                pairs: [0,2,4,6]
            },{
              id: 14,
              repetitions: 2,
              pairs: [6,7]
            },{
              id: 13,
              repetitions: 2,
              pairs: [4,5]
            },{
              id: 12,
              repetitions: 2,
              pairs: [2,3]
            },{
              id: 11,
              repetitions: 2,
              pairs: [0,1]
            },{
              id: 5,
              repetitions: 1,
              pairs: [7]
            },{
              id: 4,
              repetitions: 1,
              pairs: [5]
            },{
              id: 3,
              repetitions: 1,
              pairs: [3]
            },{
              id: 2,
              repetitions: 1,
              pairs: [1]
            }]);
    });
    it('should called function and return an array',function(){
      scope.create_group([['1009','2011'],['1017','2011'],[null,null],[null,null]]);
      expect(scope.employees_better_selected).toEqual([2011]);
    });

    it('should called function and return an array',function(){
      scope.create_group([['1009','2000'],['1009','2001'],['1002','2002'],['1003','2002']]);
      expect(scope.employees_better_selected).toEqual([2002,1009]);
    });

    it('should called function and return an array',function(){
      scope.create_group([[1001,2004],[1001,2002],[1003,2004],[1001,2002],[1004,2004]]);
      expect(scope.employees_better_selected).toEqual([2004,1001]);
    });

    it('should called function and return an array',function(){
      scope.create_group([[1004,2001],[1002,2001],[1004,2003],[1002,2001],[1004,2004]]);
      expect(scope.employees_better_selected).toEqual([2001,1004]);
    });

    it('should called function and return an array',function(){
      scope.create_group([[1,11],[2,11],[1,12],[3,12],[1,13],[4,13],[1,14],[5,14]]);
      expect(scope.employees_selected).toEqual([{
                id: 1,
                repetitions: 4,
                pairs: []
            },{
              id: 14,
              repetitions: 2,
              pairs: [6,7]
            },{
              id: 13,
              repetitions: 2,
              pairs: [4,5]
            },{
              id: 12,
              repetitions: 2,
              pairs: [2,3]
            },{
              id: 11,
              repetitions: 2,
              pairs: [0,1]
            }]);
    });

    it('should called function and return an array',function(){
      scope.create_group([[1,11],[2,11],[1,12],[3,12],[1,13],[4,13],[1,14],[5,14]]);
      expect(scope.employees_better_selected).toEqual([14,13,12,11]);
    });
  });



  describe('when going to /group', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/group/views/group_pair.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/group');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/group/views/group_pair.html');
      expect(route.current.controller).toBe('group');
    });
  });

});
