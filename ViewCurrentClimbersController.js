app.controller('MainCtrl2',['$scope',
function($scope, $window){

	//adds new post
	$scope.posts = [

		];
  //filtered posts declaration

  $scope.filteredPosts = $scope.posts;

	$scope.addPost = function(){
		$scope.posts.push({name: $scope.name, type: $scope.type, level: $scope.level, priority: $scope.priority});
		$scope.name = '';
		$scope.type = '';
		$scope.level = '';
		$scope.priority = '';


	}

  //Returns the listing in the filtered posts array pointed to by the specified index

  $scope.fListingAt = function(index){
    return $scope.filteredPosts[index];
  }

	//Remove row function
