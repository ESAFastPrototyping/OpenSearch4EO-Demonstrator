
var handleProviderClick = function(e) {
	var target = $(e.currentTarget);
	if (target.hasClass('custom')) {
		target.find('#provider-connector-url').focus();
	} else {
		window.location.href = "2.html";
	}
};
var handleUrlInputChange = function() {
	$('.eoos-provider.custom').find('.eoos-provider-go').addClass('highlighted');
};
var handleUrlInputKeyPress = function(e) {
	if ( e.which == 13 ) {
		e.preventDefault();
		window.location.href = "2.html";
	}
};
var handlePropertyUse = function(e) {
	var target = $(e.currentTarget).closest('.eoos-property');
	target.addClass('used');
};

$(function() {

	$('#provider-list').on('click.eoos', '.eoos-provider, .eoos-provider-go', handleProviderClick);
	$('#provider-connector-url').on('input.eoos', handleUrlInputChange);
	$('#provider-connector-url').on('keypress.eoos', handleUrlInputKeyPress);


	$('#property-fulltext').on('input.eoos', handlePropertyUse);
	$('#property-location-select-in-map').on('click.eoos', handlePropertyUse);
	$('#property-timerange-start').on('change.eoos', handlePropertyUse);
	$('#property-timerange-end').on('change.eoos', handlePropertyUse);

});