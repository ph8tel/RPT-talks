angular.module('app')
.component('test', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/test.html'
})
.controller('testCtrl', function($scope, $sce){
  $scope.testUrl = ""
  $scope.data = 'DATADATA';
  $scope.showMe = false;
  $scope.toggleShow = function(){
    $scope.showMe = !$scope.showMe;
  }
  $scope.addVid = function ( inc) { console.log(inc)
  $scope.testUrl = $sce.trustAsResourceUrl(inc)
}
})