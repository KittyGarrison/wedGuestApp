var app = angular.module('guestApp', ['ui.router', 'ngAnimate']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/partials/home.html'
    });
  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: '/partials/about.html'
    });

  $stateProvider
    .state('whoswho', {
      url: '/whoswho',
      templateUrl: '/partials/whoswho.html'
    });

  $stateProvider
    .state('more', {
      url: '/more',
      templateUrl: '/partials/more.html'
    });

  $stateProvider
    .state('rsvp', {
      url: '/rsvp',
      templateUrl: '/partials/rsvp.html'
    });

  $stateProvider
    .state('guests', {
      url: '/guests',
      templateUrl: '/partials/guests.html',
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

    o.create = function(guest) {
      return $http.post('/guests', guest).success(function(data){
        o.guests.push(data);
      });
    };

    return o;
}])

app.controller('viewCtrl', [
'$scope',
'$timeout',
function($scope, $timeout){
  $scope.displayView =true;

  $scope.$on('$stateChangeStart', function(){
    $scope.displayView = true;
  });

}]);

app.controller('rsvpCtrl', [
'$scope',
'guests',
function($scope, guests){
  $scope.guests = guests.guests;
  $scope.isAttending = '';
  $scope.name_first = '';
  $scope.name_last = '';
  $scope.phone = '';
  $scope.email = '';
  $scope.song = '';
  $scope.food = '';
  $scope.msg = '';

  $scope.rsvp = function(bool){
    $scope.isAttending = bool;
    console.log(isAttending); 
  }

  $scope.addGuest = function(){
    if(!$scope.name_first || $scope.name_first === '') { return; }

    guests.create({
      name_first: $scope.name_first,
      name_last: $scope.name_last,
      phone: $scope.phone,
      email: $scope.email,
      song: $scope.song,
      food: $scope.food,
      msg: $scope.msg,
      isAttending: $scope.isAttending
    });
  };

}]);

app.controller('guestCtrl', [
'$scope',
'guests',
function($scope, guests){
  $scope.guests = guests.guests;

}]);

app.filter('titlecase', function() {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
 
        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }
 
            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }
 
            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    }
});