angular.module('app')
.component('search', {
  bindings: {
    changeView: '<'
  },
  templateUrl: '/templates/search.html'
})
.controller('searchCtrl',  function($scope, $http){

//filter results by word in body
  $scope.byContent = function(keyWords) {

    let Query = new Set(keyWords.split(' '))

    let filteredPosts;

    $http.get('/api/blogs/')
    .then(function(res){
      let unfiltered = res.data
      let filtered = []

      unfiltered.forEach( function(post){
        post.body.split(' ').forEach( function(word){
          if (Query.has(word)) {
            filtered.push(post)
          }
        })
      })

    if (filtered.length > 1) {
      let noDuplicates = filtered.filter( function(post, idx, ary){
        if (idx === ary.length - 1) {
          return post
        }
        if (idx < (ary.length - 1) && post._id !== ary[idx+1]._id) {
          return post
        }
      })
      $scope.displayPosts = noDuplicates.map( function(post){
        $http.get('/api/date/' + post.createdAt)
        .then( function(res){
          post.createdAt = res.data.date
        })
      return post
      });
    } else {
      $scope.displayPosts = filtered.map( function(post){
        $http.get('/api/date/' + post.createdAt)
        .then( function(res){
          post.createdAt = res.data.date
        })
      return post
    });
    }
    })
  }

  $scope.search = function(query) {
    console.log('sending ', query)
    $http.get('/api/blogs/custom/' + query)
    .then(function(res){
        $scope.displayPosts = res.data;
        console.log('got this back ', res.data)
      },
      function(err){
        console.log('error geting search ', err);
    })
  }

  $scope.byTitle = function(title) {
    $http.get('/api/blogs/bytitle/' + title)
    .then( function(res) {
      $scope.displayPosts = res.data;
    },
    function(err) {
      console.log('error getting by title');
    })
    .then( function(){
      $scope.displayPosts.map(function(post){
        $http.get('/api/date/' + post.createdAt)
        .then(function(res){
          post.createdAt = res.data.date
        },
        function(err){
          console.log(err)
        })
        return post
      })
    })
  }

  $scope.byName = function(name){
    $http.get('/api/blogs/byauthor/' + name)
    .then(function(res){
      console.log("found these posts: ", res.data)
      $scope.displayPosts = res.data;
    },
    function(err){
      if (err) {
        console.log('error searching by name ', err)
      }
    })
    .then( function(){
      $scope.displayPosts.map(function(post){
        $http.get('/api/dates/' + post.createdAt)
        .then(function(res){
          post.createdAt = res.data.date
        },
        function(err){
          console.log(err)
        })
        return post
      })
    })
  }

  $scope.running = function(){
    return $scope.displayPosts;
  }

})