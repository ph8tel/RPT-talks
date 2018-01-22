
angular.module('app')
.controller('AppCtrl', function($scope, $http) {

  this.view = 'login';

  this.changeView = (option, data) => {
    this.view = option;
    if (data){
    $http.patch('/api/blogs/one/' + data._id)
    .then(
      function(suc) {
        console.log(data.title, ' view count updated')
      },
      function(err){
        console.log(err, ' is error')
      })
    window.detail = data;
    }
  }

  this.isAdmin = window.isAdmin;

  this.isLogged = window.isLoggedIn;

  this.logged = function(){
    return window.isLoggedIn
  }

  this.isAdmin = function(){
    return window.isAdmin
  }

  this.loggOut = function(){
    window.isLogged = false
    window.isAdmin = false
    window.user = null
    window.userName = null
    this.view = 'login'
  }

})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});
