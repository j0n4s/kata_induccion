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
      expect(scope.pairs).toEqual([[null,null],[null,null]]);
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

  describe('When create a group',function(){
    it('should called function and return an array',function(){
      scope.create_group([[1009,2011],[1017,2011]]);
      expect(scope.result).toBe([2011]);
    });

    it('should called function and return an array',function(){
      scope.create_group([[1009,2000],[1017,2001],[1002,2002],[1002,2002]]);
      expect(scope.result).toBe([2002,1009]);
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
