var resumeApp = angular.module('resumeApp', []);

resumeApp.controller('MainCtrl', ['$http', '$scope', function ($http, $scope) {
	
	$scope.dataKeys1 = []
	
	$http.get('js/data.json').then(function (data) {
		console.log("JSON loaded")
    $scope.data = data.data;
		console.log(Object.keys($scope.data))
		$scope.dataKeys = Object.keys($scope.data).slice(2)
		console.log('DATAKEYS', $scope.dataKeys)
		angular.forEach($scope.data, function(value, key) {
			console.log(key)
			console.log(value)
		})
  }, function() {
		console.log('JSON not loaded')
	});
	
}]);