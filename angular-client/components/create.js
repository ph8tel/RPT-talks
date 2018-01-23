angular.module('app')
.component('create', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/create.html'
})

.controller('createCtrl', function($scope, $http, $sce ){
  $scope.userName = window.userName

  $scope.format = function(text) {
    if(text){
      return window.markdownParser(text)
    }
  }
  $scope.vid = function(p) {
    if (p && p.videoUrl) {
    return $sce.trustAsResourceUrl(p.videoUrl.replace('watch?v=', 'embed/'))
  }
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