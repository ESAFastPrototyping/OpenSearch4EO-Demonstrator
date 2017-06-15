
var handleProviderClick = function(e) {
	var target = $(e.currentTarget);
	if (target.hasClass('custom')) {
		target.find('#provider-connector-url').focus();
	} else {
		window.location.href = "3.html";
	}
};
var handleUrlInputChange = function() {
	$('#add-connector').find('.eoos-provider-go').addClass('highlighted');
};
var handleUrlInputKeyPress = function(e) {
	if ( e.which == 13 ) {
		e.preventDefault();
		window.location.href = "3.html";
	}
};
var handlePropertyUse = function(e) {
	var target = $(e.currentTarget).closest('.eoos-property');
	target.addClass('used');
	$('#search-submit').text('Search');
};
var handleSearchClick = function() {
	window.location.href = "3.html";
};
var handleSearchBackClick = function() {
	window.location.href = "1.html";
};
var handleCollectionsClick = function() {
	window.location.href = "2.html";
};


var handleResultsExpandClick = function() {
	var sidebar = $('#sidebar');
	var expandButton = $('#results-expand-button');
	var expanded = sidebar.hasClass('expanded');
	if (expanded) {
		sidebar.removeClass('expanded');
		expandButton.text('Expand »');
	} else {
		sidebar.addClass('expanded');
		expandButton.text('« Collapse');
	}
};


var handleTabClick = function(e) {
	var target = $(e.currentTarget).closest('#sidebar-tabs > a');
	var tab = target.attr('data-for');
	$('.sidebar-tab').removeClass('active');
	$('#sidebar-tabs').find('a').removeClass('active');
	$('#' + tab).addClass('active');
	target.addClass('active');

	if (tab == "tab-results") {
		$('#timeline').show();
	} else {
		$('#timeline').hide();
		$('#sidebar').removeClass('expanded');
		$('#results-expand-button').text('Expand »');
	}

};

$(function() {

	$('#provider-list').on('click.eoos', '.eoos-provider, .eoos-provider-go', handleProviderClick);
	$('.eoos-provider-go').on('click.eoos', handleProviderClick);
	$('#provider-connector-url').on('input.eoos', handleUrlInputChange);
	$('#provider-connector-url').on('keypress.eoos', handleUrlInputKeyPress);
	$('#go-collections').on('click.eoos', handleCollectionsClick);
	$('#go-search').on('click.eoos', handleSearchClick);


	$('#property-fulltext').on('input.eoos', handlePropertyUse);
	$('#property-location-select-in-map').on('click.eoos', handlePropertyUse);
	$('#property-timerange-start').on('change.eoos', handlePropertyUse);
	$('#property-timerange-end').on('change.eoos', handlePropertyUse);
	$('#search-back').on('click.eoos', handleSearchBackClick);

	$('#search-submit').on('click.eoos', handleSearchClick);
	$('#breadcrumbs').on('click.eoos', 'a', handleSearchBackClick);


	$('#sidebar-tabs').on('click.eoos', 'a', handleTabClick);


	$('#results-expand-button').on('click.eoos', handleResultsExpandClick);

	if($('#wwd-results').length) {

		var wwd = new WorldWind.WorldWindow("wwd-results");

		var bingLayer = new WorldWind.BingAerialLayer(null);
		bingLayer.detailControl = 1.0;
		bingLayer.enabled = true;

		wwd.addLayer(bingLayer);

	}

});