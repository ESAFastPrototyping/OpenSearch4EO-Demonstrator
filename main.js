
var handleProviderClick = function(e) {
	var target = $(e.currentTarget);
	if (target.hasClass('custom')) {
		target.find('#provider-connector-url').focus();
	} else {
		window.location.href = "2.html";
	}
};

$(function() {

	$('#provider-list').on('click.eoos', '.eoos-provider', handleProviderClick);

});