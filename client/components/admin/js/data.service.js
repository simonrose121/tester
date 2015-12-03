(function() {
	angular
		.module('testerAdmin')
		.service('dataService', dataService);

	dataService.$Inject = ['$http'];

	function dataService($http) {
		var service = {
			getAnswers: getAnswers
		};

		return service;

		function getAnswers(callback) {
			$http.get('/getAnswers/').success(function(data) {
				callback(data);
			}).error(function(data) {
				throw data;
			});
		}
	}
})();
