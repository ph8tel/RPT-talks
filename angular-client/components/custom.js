angular.module('app')
.component('custom', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/custom.html'
})

.controller('customCtrl', function($scope, $http, $sce){

  $scope.userName = window.userName;

  $scope.displayPosts = []

  $scope.featuredPosts = []

  $scope.hasResults = function(){
    return $scope.displayPosts.length > 0 ? false : true;
  }

  $http.get('/api/blogs/all/')
  .then( function(res){
    $scope.posts = res.data
  }, function(err){
    if (err) {
      console.log(err)
    }
  })
  .then( function(){
    $scope.displayPosts = $scope.posts.filter(
      function(post){
        if (post.author === $scope.userName) {
          $http.get('/api/date/' + post.createdAt)
          .then(function(res){
            post.createdAt = res.data.date
            post.videoShowUrl = $sce.trustAsResourceUrl(post.videoUrl.replace('watch?v=', 'embed/') )
          })
          return post
        }
      })
  })

  $http.get('/api/blogs/featured/')
  .then( function(res){
    console.log('got featured')
    $scope.featuredPosts = res.data
  },
  function(err){
    console.log(err)
  })

  $scope.currentFeatured = function(){
    console.log('feats', $scope.featuredPosts)
    $scope.featuerdPosts = $scope.featuredPosts.forEach( post => post.videoShowUrl = $sce.trustAsResourceUrl(post.videoUrl) )
    return
  }

  $scope.running = function(){

    $scope.displayPosts.forEach( post => post.videoShowUrl = $sce.trustAsResourceUrl(post.videoUrl) )
    return $scope.displayPosts
  }
})