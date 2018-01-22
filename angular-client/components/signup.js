angular.module('app')
.component('signup', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/sign-up.html'
})

.controller('signUpCtrl', function($scope, $http, $sce ){

$scope.formUrl = function() {
  return $sce.trustAsResourceUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vRJuu0l1VI2Ojqm_j4-Po_gCIege3ybPYK8l5tFB8p57iYVy2m6DmAUvkvydPWsQSvtNDLSZxChAioy/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false')
}

$scope.submit = function(request, viewChange) {
  $http.put('api/ideas/new', request ).
  then( function (res) {
     viewChange('feed')
  },
  function (err) {
    if (err) {
      console.log(err)
    }
  })
}

})