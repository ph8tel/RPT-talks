
angular.module('app')
.component('login', {
   bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/login.html'
})
.controller('loginCtrl', function($scope, $http) {
  $scope.verify = function(creds, viewChange) {
    $http.get('/api/users/login/' + creds.name)
    .then(function(res) {
      if ( res.data && res.data.pwd === creds.pwd ) {
        if (res.data.isAdmin) {
          window.isAdmin = true
        }
        console.log('uath pass')
        viewChange('feed')
        window.isLoggedIn = true
        window.user = res.data
        window.userName = creds.name
      } else {
        console.log('uath fli')
        viewChange('add')
      }
    },
    function(err){
      if (err) {
      console.log('login fail')
    }
    })
  }
})