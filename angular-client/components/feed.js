angular.module('app')
.component('feed', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/feed.html'
})

.controller('feedCtrl', function($scope, $http, $sce){
  $http.get('/api/blogs/all/')
  .then( function(res) {
    $scope.list = res.data
  })
  $http.get('/api/blogs/dates/')
  .then( function(res) {
    $scope.dates = res.data
  })
  .then( function () {
      $scope.clean = $scope.list.map( (item, idx) => {
        item.createdAt = $scope.dates[idx].date
        item.videoShowUrl = $sce.trustAsResourceUrl(item.videoUrl)
        return item
      })
    $scope.userName = window.userName
  })
});

