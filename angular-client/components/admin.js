angular.module('app')
.component('admin', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/admin.html'
})

.controller('adminCtrl', function($scope, $http, $rootScope) {
  $http.get('/api/blogs/all/')
  .then( function(res){
    $scope.list = res.data
    },
    function(err) {
      if (err) {
        console.log(err)
      }
    })
  .then( function() {
    $scope.list.forEach( e => {
      $http.get('/api/blogs/one/' + e._id)
      .then( function(res) {
        e.date = res.data
      })
    })
  })

  $http.get('/api/users/all/')
  .then( function(res){
    $scope.users = res.data
    },
    function(err){
      console.log('error getting users ', err)
    }
  )

  $scope.userPosts = [];

  $scope.showPosts = false;

  $scope.hasUserPosts = function(){
    return $scope.showPosts
  }

  $scope.postsByUser = function(user) {
    $scope.showPosts = !$scope.showPosts;
    $http.get('/api/blogs/byauthor/' + user.name)
    .then( function(res){
      console.log('worked')
      $scope.userPosts = res.data
    })
  }

  $scope.makeFeatured = function(post){
    $http.patch('/api/blogs/featured/' + post._id, {featured: true})
    .then(function(res){
     if (res) {
      console.log(res, 'make featured ran')
     }
    })
  }

  $scope.removeUser = function(user, changeView) {
    console.log('remove user ran')
    $http.delete('/api/users/one/' + user._id)
    .then( function(res){
      changeView('admin')

    },
    function(err){
      if (err) {
        console.log('error deleting in http')
      }
    })
  }

  $scope.makeAdmin = function (user) {
    $http.patch('/api/users/one/' + user._id, {isAdmin: true})
    .then( function(res) {
      console.log('User is now admin', res)
      window.isAdmin = true
    },
    function(err) {
      console.log('failed updating to Admin ', err)
    })

  }

  $scope.delete = function(id, viewSet) {
    $http.delete('/api/blogs/delete/' + id)
    .then( function(res) {
      console.log('delete ran')
    })
    viewSet('feed')
  }

})