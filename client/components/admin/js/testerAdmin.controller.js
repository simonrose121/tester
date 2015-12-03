(function() {
	angular
		.module('testerAdmin')
		.controller('TesterAdmin', TesterAdmin);

	TesterAdmin.$Inject = ['dataService'];

	function TesterAdmin(dataService) {
		var vm = this;

		dataService.getAnswers(function(data) {
			vm.data = data;
		});
	}
})();
