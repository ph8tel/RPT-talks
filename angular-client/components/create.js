angular.module('app')
.component('create', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/create.html'
})

.controller('createCtrl', function($scope, $http, $sce ){

  $scope.format = function(text) {
    return window.markdownParser(text)
  }
  $scope.vid = function(p) {
    return $sce.trustAsResourceUrl(p.videoUrl.replace('watch?v=', 'embed/'))
  }
  $scope.submit = function(p, viewSet) {
    p.author = window.userName
    p.videoId = p.videoUrl.split('=')[1]
    p.videoUrl = p.videoUrl.replace('watch?v=', 'embed/')
    console.log('sending ', p)
    $http.post('/api/blogs/new/', p)
    .then( function(res) {
      console.log('response post is ', res)
      viewSet('feed')
    },
    function(err) {
      console.log('error posting ', err)
    })
  }
});