var app = angular.module('guestApp', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        guestPromise: ['guests', function(guests){
          return guests.getAll();
        }]
      }
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('guests', ['$http', function($http){
    var o = {guests: []};

    o.getAll = function() {
      return $http.get('/guests').success(function(data){
        angular.copy(data, o.guests);
      });
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