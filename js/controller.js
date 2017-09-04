var characterControllers = angular.module("characterControllers", ["ngAnimate"]);

characterControllers.controller("ListController", ["$scope", "$http", function($scope, $http) {
  $http.get("data.json").success(function(data) {
    $scope.characters = data;
    $scope.characterOrder = 'classes';
  });
}]);

characterControllers.controller("DetailsController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
	$http.get("data.json").success(function(data) {
		$scope.characters = data;
		$scope.whichItem = $routeParams.itemId;
		if($routeParams.itemId > 0) {
			$scope.preItem = Number($routeParams.itemId) - 1;
		}
		else {
			$scope.preItem = Number($scope.characters.length) - 1;
		}
		if($routeParams.itemId < $scope.characters.length - 1) {
			$scope.nextItem = Number($routeParams.itemId) + 1;
		}
		else {
			$scope.nextItem = 0;
		}
	});
}]);