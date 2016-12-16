 var App = angular.module('App', ['ngRoute', 'ngMaterial']);

 App.config(function($httpProvider, $routeProvider) {
     delete $httpProvider.defaults.headers.common['X-Requested-With'];

     $routeProvider
         .when('/', {
             templateUrl: 'pages/home.html'
         })
         .when('/movie/:id', {
             templateUrl: 'pages/movie.html'
         })
         .when('/tv/:id', {
             templateUrl: 'pages/tv.html'
         })
         .when('/actor/:id', {
             templateUrl: 'pages/actor.html'
         })
         .otherwise({
             redirectTo: '/'
         });
 });
App.controller('movieSearchController', function($scope, $http, $routeParams, $timeout) {
     $scope.categories = [{
         id: "movie",
         name: "Movies",
         icon: "theaters"
     }, {
         id: "tv",
         name: "TV",
         icon: "live_tv"
     }, {
         id: "person",
         name: "People",
         icon: "person"
     }]
     $('#query').keyup(function(event) {
         var url = 'https://api.themoviedb.org/3/';
         var key = '6693182da059a88baddfc039f502a88b';
         var searchTerm = $('#query').val();
         var searchType = $("#searchType option:selected").val();
         $http.get(url + 'search/' + searchType + '?api_key=' + key + '&language=en-US&query=' + searchTerm)
             .success(function(data) {
                 $scope.movies = data.results;
             })
     })
     $scope.setfilter = function() {
         $scope.search = {};
         $scope.search[$scope.key] = $scope.filter;
     };
 });
 App.controller('movieController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var movieID = $routeParams.id;
     $http.get(url + 'movie/' + movieID + '?api_key=' + key + '&language=en-US')
         .success(function(data) {
             $scope.movieData = [data];
         });
 });
 App.controller('movieCastController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var movieID = $routeParams.id;
     $http.get(url + 'movie/' + movieID + '/credits?api_key=' + key)
         .success(function(data) {
             $scope.actors = data.cast;
         });
 });
 App.controller('movieRolesController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '/movie_credits?api_key=' + key)
         .success(function(data) {
             $scope.movieRoles = data.cast;
         });
 });

 App.controller('actorController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '?api_key=' + key)
         .success(function(data) {
             $scope.actorData = [data];
         });
 });

 App.controller('tvSearchController', function($scope, $http, $routeParams, $timeout) {
     $('#query').keyup(function(event) {
         var url = 'https://api.themoviedb.org/3/';
         var key = '6693182da059a88baddfc039f502a88b';
         var searchTerm = $('#query').val();
         $http.get(url + 'search/tv?api_key=' + key + '&language=en-US&query=' + searchTerm)
             .success(function(data) {
                 $scope.movies = data.results;
             })
             .error(function(data) {
                 $scope.movies = data.results;
             });
     })
 });

 App.service('seasonService', function() {
     var id = '1';
     var setID = function(x) {
         id = x;
     }
     var seasonID = function() {
         return id;
     }
     return {
         setID: setID,
         seasonID: seasonID
     };
 });

 App.controller('tvController', function($scope, $http, $routeParams, seasonService) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var tvID = $routeParams.id;
     $http.get(url + 'tv/' + tvID + '?api_key=' + key + '&language=en-US')
         .success(function(data) {
             $scope.tvData = [data];
         });

     $scope.isSet = function(tabNum) {
         return $scope.tab === tabNum;
     };

     $scope.setTab = function(tabNum) {
         $scope.tab = tabNum;
         console.log(tabNum);

         $http.get(url + 'tv/' + tvID + '/season/' + $scope.tab + '?api_key=' + key + '&language=en-US')
             .success(function(data) {
                 $scope.seasoneData = [data];
                 $scope.episodeData = data.episodes;
             });
     }

 });
 App.controller('episodeController', function($scope, $http, $routeParams, seasonService) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var tvID = $routeParams.id;

     $scope.season = seasonService.seasonID();

     $http.get(url + 'tv/' + tvID + '/season/' + $scope.season + '?api_key=' + key + '&language=en-US')
         .success(function(data) {
             $scope.seasonData = [data];
             $scope.episodes = data.episodes;
         });
 });
 App.controller('tvCastController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var tvID = $routeParams.id;
     $http.get(url + 'tv/' + tvID + '/credits?api_key=' + key)
         .success(function(data) {
             $scope.actors = data.cast;
         });
 });
 App.controller('tvRolesController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '/tv_credits?api_key=' + key)
         .success(function(data) {
             $scope.tvRoles = data.cast;
         });
 });
 App.controller('socialController', function($scope, $http, $routeParams) {
     var url = 'https://api.themoviedb.org/3/';
     var key = '6693182da059a88baddfc039f502a88b';
     var actorID = $routeParams.id;
     $http.get(url + 'person/' + actorID + '/external_ids?api_key=' + key)
         .success(function(data) {
             $scope.smAccounts = [data];
         });
 });
 App.directive('errSrc', function() {
     return {
         link: function(scope, element, attrs) {
             element.bind('error', function() {
                 if (attrs.src != attrs.errSrc) {
                     attrs.$set('src', attrs.errSrc);
                 }
             });
         }
     }
 });
 App.controller('sidenavController', function($scope, $timeout, $mdSidenav, $log) {
     $scope.toggleLeft = buildDelayedToggler('left');
     $scope.toggleRight = buildToggler('right');
     $scope.isOpenRight = function() {
         return $mdSidenav('right').isOpen();
     };
     function debounce(func, wait, context) {
         var timer;
         return function debounced() {
             var context = $scope,
                 args = Array.prototype.slice.call(arguments);
             $timeout.cancel(timer);
             timer = $timeout(function() {
                 timer = undefined;
                 func.apply(context, args);
             }, wait || 10);
         };
     }
     function buildDelayedToggler(navID) {
         return debounce(function() {
             $mdSidenav(navID)
                 .toggle()
                 .then(function() {
                     $log.debug("toggle " + navID + " is done");
                 });
         }, 200);
     }
     function buildToggler(navID) {
         return function() {
             $mdSidenav(navID)
                 .toggle()
                 .then(function() {
                     $log.debug("toggle " + navID + " is done");
                 });
         }
     }
 })
 App.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
     $scope.close = function() {
         $mdSidenav('left').close()
             .then(function() {
                 $log.debug("close LEFT is done");
             });

     };
 })
App.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav('right').close()
            .then(function() {
                $log.debug("close RIGHT is done");
            });
    };
});
