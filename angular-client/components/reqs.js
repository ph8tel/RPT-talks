angular.module('app')
.component('requests', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/requests.html'
})
.controller('reqCtrl', function($scope, $http, $sce ){

$http.get('/api/requests/all/')
 .then( function (res) {
  $scope.currentRequests = res.data
 },
 function (err) {
  if (err) {
    console.log(err)
  }
 })

$scope.submit = function(request, viewChange) {
  request.author = window.userName

  $http.post('/api/requests/new/', request ).
  then( function (res) {
     viewChange('feed')
  },
  function (err) {
    if (err) {
      console.log(err)
    }
  })
  $http.post('/api/email/request/', request)
  .then( function (res) {
    console.log('email sent ', res)
  },
  function (err) {
    if (err) {
      console.log(err, 'email err')
    }
  })
}

})

