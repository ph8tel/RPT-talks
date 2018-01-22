angular.module('app')
.component('post', {
  templateUrl: '/templates/post.html'
})
.controller('postCtrl', function($scope, $http, $sce) {
  $scope.post = window.detail
  $scope.vid = function() {
    return $sce.trustAsResourceUrl($scope.post.videoUrl.replace('watch?v=', 'embed/'))
  }
  $scope.post.videoUrl.replace("watch?v=", "embed/")
  $scope.body = window.detail.body.split('\n').filter(e => e !== '')
  $http.get('/api/blogs/one/' + window.detail._id)
    .then( function (res) {
      $scope.date = res.data
    },
    function(err) {
      if (err) {
        console.log('error getting date formatted ', err)
      }
    })
});