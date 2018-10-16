angular.module('WhackAMole', ['ngAnimate'])
.factory('moleFactory', [function(){
  let temp = [];
  for (let i = 0; i < 9; ++i){
      temp.push({
          delay: getRandomInt(10000) + 500,
          duration: getRandomInt(2000) + 2000,
          visible: false,
          timeId: 0
      })
  };
  var o = {
    moles: temp
  };
  return o;
}])
.controller('MainCtrl', [
'$scope',
'moleFactory',
function($scope, moleFactory){
  $scope.moles = moleFactory.moles;
  $scope.score = 0;
  $scope.gameInProgress = false;
  $scope.time = 30;

  $scope.moleClick = function(idx){
    if ($scope.moles[idx].visible && $scope.gameInProgress){
      $scope.moleExit(idx);
      if ($scope.gameInProgress) $scope.score = $scope.score + 100;
    }
  };
  
  $scope.showMole = function(idx){
    return $scope.moles[idx].visible;
  }
  
  $scope.hideMole = function(idx){
    return !$scope.moles[idx].visible;
  }
  
  $scope.startGame = function(){
    $scope.score = 0;
    $scope.time = 30;
    $scope.gameInProgress = true;
    for (let i = 0; i < $scope.moles.length; ++i){
      $scope.moles[i].timeId = setTimeout(function(){$scope.$apply($scope.moleEnter(i))}, $scope.moles[i].delay);    
    };
    var interval = setInterval(function(){$scope.$apply($scope.time -= 1);}, 1000);
    setTimeout(function(){
      clearInterval(interval);
      $scope.$apply($scope.endGame());
    }, 30000);
  }
  
  $scope.buttonDisabled = function(){
    return $scope.gameInProgress;
  }
  
  $scope.endGame = function(){
    for (let i = 0; i < $scope.moles.length; ++i){
      clearTimeout($scope.moles[i].timeId);
      $scope.gameInProgress = false;   
      $scope.time = 0;
    };
  }
  
  $scope.moleEnter = function(idx){
    //alert('enter')
    $scope.moles[idx].visible = true;
    $scope.moles[idx].timeId = setTimeout(function(){$scope.$apply($scope.moleExit(idx))}, $scope.moles[idx].duration);
  };

  $scope.moleExit = function(idx) {
    //alert('exit')
    clearTimeout($scope.moles[idx].timeId)
    $scope.moles[idx].delay = getRandomInt(5000) + 2000;
    $scope.moles[idx].duration = getRandomInt(1000) + 100;
    $scope.moles[idx].visible = false;
    $scope.moles[idx].timeId = null;
    $scope.moles[idx].timeId = setTimeout(function(){$scope.$apply($scope.moleEnter(idx))}, $scope.moles[idx].delay);  
  };

}]);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}