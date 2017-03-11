var app = angular.module('myApp', []);

app.factory('storageService', ['$rootScope', function($rootScope) {

    return {
        get: function(key) {
            return localStorage.getItem(key);
        },
        set: function(key, data) {
            localStorage.setItem(key, data);
        }
    };
}]);

app.controller('myCtrl',['storageService',function(storageService) {

  // Set local storage data to storageService
  storageService.set('key', 'value');

  // Get saved local storage data from storageService
  var data = storageService.get('key');

});