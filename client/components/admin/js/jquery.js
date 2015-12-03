$(function() {
	setTimeout(function() {
		$('.table').click(function() {
			console.log(this.find('table'));
		});
	}, 500);
});
