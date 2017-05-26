
var handleProviderClick = function() {
	window.location.href = "2.html";
};

$(function() {

	$('#provider-list').on('click.eoos', '.eoos-provider', handleProviderClick);

});