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
      scope.count_repetitions_pairs([[1009,2011],[1017,2011],[null,null],[null,null]]);
      expect(scope.repetitions_employees).toEqual([{
                index: 2011,
                value: 2
            },{
                index: 1009,
                value: 1
            },{
              index: 1017,
              value: 1
            }]);
    });

    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_pairs([[1001,2004],[1001,2002],[1003,2004],[1001,2002],[1004,2004]]);
      expect(scope.repetitions_employees).toEqual([{
                index: 1001,
                value: 3
            },{
              index: 2004,
              value: 3
            },
            {
              index: 2002,
              value: 2
            },{
              index: 1003,
              value: 1
            },{
              index: 1004,
              value: 1
            }]);
    });

    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_pairs([[1004,2001],[1002,2001],[1004,2003],[1002,2001],[1004,2004]]);
      expect(scope.repetitions_employees).toEqual([{
                index: 1004,
                value: 3
            },{
              index: 2001,
              value: 3
            },
            {
              index: 1002,
              value: 2
            },{
              index: 2003,
              value: 1
            },{
              index: 2004,
              value: 1
            }]);
    });


    it('should called function and count and sort repetitions in array',function(){
      scope.count_repetitions_pairs([[1009,2000],[1009,2001],[1002,2002],[1003,2002]]);
      expect(scope.repetitions_employees).toEqual([{
                index: 1009,
                value: 2
            },{
              index: 2002,
              value: 2
            },{
              index: 1002,
              value: 1
            },{
              index: 1003,
              value: 1
            },{
              index: 2000,
              value: 1
            },{
              index: 2001,
              value: 1
            }]);
    });

    it('should called function and return an array',function(){
      scope.create_group([['1009','2011'],['1017','2011'],[null,null],[null,null]]);
      expect(scope.employees_selected).toEqual([2011]);
    });

    it('should called function and return an array',function(){
      scope.create_group([['1009','2000'],['1009','2001'],['1002','2002'],['1003','2002']]);
      expect(scope.employees_selected).toEqual([1009,2002]);
    });

    it('should called function and return an array',function(){
      scope.create_group([[1001,2004],[1001,2002],[1003,2004],[1001,2002],[1004,2004]]);
      expect(scope.employees_selected).toEqual([1001,2004]);
    });

    it('should called function and return an array',function(){
      scope.create_group([[1004,2001],[1002,2001],[1004,2003],[1002,2001],[1004,2004]]);
      expect(scope.employees_selected).toEqual([1004,2001]);
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
