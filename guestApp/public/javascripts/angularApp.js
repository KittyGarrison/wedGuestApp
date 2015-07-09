var app = angular.module('guestApp', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('guests', [function(){
    var o = {
      guests: [
        {name_first: 'first name 1', isAttending: true},
        {name_first: 'first name 2', isAttending: false},
        {name_first: 'first name 3', isAttending: false},
        {name_first: 'first name 4', isAttending: true},
        {name_first: 'first name 5', isAttending: false}
      ]
    };
    return o;
}])

app.controller('MainCtrl', [
'$scope',
'guests',
function($scope, guests){
  $scope.guests = guests.guests;

  $scope.addGuest = function(){
    if(!$scope.name_first || $scope.name_first === '') { return; }
    $scope.guests.push({name_first: $scope.name_first, isAttending: $scope.isAttending});
    $scope.name_first = '';
  };

}]);