'use strict';

angular.module('App')
.controller('Main', function ($scope) {

  $scope.controller_loaded = 'Main controller loaded!';
  
  $scope.parejas = [{
    id: 1, label: 'Pareja 1', p1:0 , p2:0
  },{
    id: 2, label: 'Pareja 2', p1:0 , p2:0
  },{
    id: 3, label: 'Pareja 3', p1:0 , p2:0
  },{
    id: 4, label: 'Pareja 4', p1:0 , p2:0
  },{
    id: 5, label: 'Pareja 5', p1:0 , p2:0
  }];

  $scope.enviarGrupos = function(){
    //colocar las parejas
    if(!this.validarParejas()){
        alert("Las parejas no se encuentran creadas correctamente");
    }else{
      $.post( "/enviarGrupos",{
        data:$scope.parejas
      },"json").done(function(json){
        alert(json);
      }).fail(function(){

      });
    }
  };
  $scope.validarParejas = function(){
    var i=0;
    for(i in $scope.parejas){
      var nombrePareja = "#pareja"+$scope.parejas[i].id;
      if(jQuery(nombrePareja).val()!=""){
        var pareja = jQuery(nombrePareja).val().split(";");
        if(!isNaN(parseInt(pareja[0])) && parseInt(pareja[0]) >= 1000  && parseInt(pareja[0]) <= 1999){
            $scope.parejas[i].p1 = parseInt(pareja[0]);
        }else{
          return false;
        }
        if(!isNaN(parseInt(pareja[1])) && parseInt(pareja[1]) >= 2000  && parseInt(pareja[1]) <= 2999){
          $scope.parejas[i].p2 = parseInt(pareja[1]);
        }else{
          return false;
        }
      }
    }
    return true;
  }
});
