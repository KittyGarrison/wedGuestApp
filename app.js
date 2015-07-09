var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.guests = [
    {name_first: 'first name 1', isAttending: true},
    {name_first: 'first name 2', isAttending: false},
    {name_first: 'first name 3', isAttending: false},
    {name_first: 'first name 4', isAttending: true},
    {name_first: 'first name 5', isAttending: false}
  ];

  $scope.addGuest = function(){
    if(!$scope.name_first || $scope.name_first === '') { return; }
    $scope.guests.push({name_first: $scope.name_first, isAttending: $scope.isAttending});
    $scope.name_first = '';
  };

}]);