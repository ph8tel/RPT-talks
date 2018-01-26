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

  if ($scope.p && $scope.p.videoUrl){
    p.videoUrlClean = urlFormat(p.videoUrl)
  }

  urlFormat = function(url){

    if( url.split('').includes('&') ){
      url = url.split('&')[0].replace('watch?v=', 'embed/')
      console.log('inside  & sending ', url)
      return url
    }
        console.log('holder now ', url)
    if (url.split('/').find( word => word === 'youtu.be')){
      return `https://www.youtube.com/embed/${url.split('/')[3]}`
    } else {
      return url
    }

  }

  $scope.vid = function(p) {
    if (p && p.videoUrlClean) {
        $sce.trustAsResourceUrl(p.videoUrlClean)
      }
  }

  $scope.submit = function(p, viewSet) {
    p.author = window.userName
    p.videoId = urlFormat(p.videoUrl).split('/')[4]
    p.videoUrl = urlFormat(p.videoUrl)
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