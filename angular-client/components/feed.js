angular.module('app')
.component('feed', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/feed.html'
})

.controller('feedCtrl', function($scope, $http, $sce){
  $scope.list = startTalks

  $http.get('/api/blogs/all/')
      .then( function (res) {
        $scope.list = res.data
        window.list = res.data
      },
      function (err) {
        if (err) {
          console.log(err)
        }
  })

  $http.get('/api/blogs/dates/')
  .then( function(res) {
    $scope.dates = res.data
  })
  .then( function () {
      $scope.clean = $scope.list.map( (item, idx) => {
        item.createdAt = $scope.dates[idx].date
        return item
      })
    $scope.userName = window.userName
  })
  $scope.vid = function(p) {
    return $sce.trustAsResourceUrl(p.videoUrl.replace('watch?v=', 'embed/'))
  }
});

