
var handleProviderClick = function(e) {
	var target = $(e.currentTarget);
	if (target.hasClass('custom')) {
		target.find('#provider-connector-url').focus();
	} else {
		window.location.href = "2.html";
	}
};
var handleUrlInputChange = function(e) {
	console.log('changeee');
	$('.eoos-provider.custom').find('.eoos-provider-go').addClass('highlighted');
};

$(function() {

	$('#provider-list').on('click.eoos', '.eoos-provider', handleProviderClick);
	$('#provider-connector-url').on('input.eoos', handleUrlInputChange);

});