angular.module('app')
.component('add', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/addUser.html'
})

.controller('addCtrl', function($scope, $http) {

  $scope.submit = function(user, viewChange) {
    $http.post('/api/users/new/', user)
    .then( function(res) {
      console.log('user added')
      viewChange('feed')
      window.userName = user.name
    },
    function(err) {
      console.log('error adding user ', err)
    })
  }

})