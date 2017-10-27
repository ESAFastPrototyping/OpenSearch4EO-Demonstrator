import WorldWind from './worldwind/worldwind';
import $ from 'jquery';

export default function Old(){
	var handleProviderGoClick = function() {
		window.location.href = "2.html";
	};
	var handleUrlInputChange = function() {
		$('#add-connector').find('.eoos-provider-go').addClass('highlighted');
	};
	var handleUrlInputKeyPress = function(e) {
		if ( e.which == 13 ) {
			e.preventDefault();
			window.location.href = "index.html";
		}
	};
	var handlePropertyUse = function(e) {
		var target = $(e.currentTarget).closest('.eoos-property');
		target.addClass('used');
		//$('#search-submit').text('Search');
	};
	var handleSearchClick = function() {
		window.location.href = "index.html";
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
		var target = $(e.currentTarget).closest('.sidebar-tabs > a');
		var tab = target.attr('data-for');
		var parent = target.closest('.sidebar-tabs').parent();
		parent.find('.sidebar-tab').removeClass('active');
		parent.find('.sidebar-tabs').find('a').removeClass('active');
		$('#' + tab).addClass('active');
		target.addClass('active');

		//if (tab == "tab-results") {
		//	$('#timeline').show();
		//} else {
		//	$('#timeline').hide();
		//	$('#sidebar').removeClass('expanded');
		//	$('#results-expand-button').text('Expand »');
		//}

	};

	var handleProviderListClick = function(e) {
		var target = $(e.currentTarget).closest('.eoos-provider');
		target.addClass('active');
		$('#collections').removeClass('hidden');
	};
	var handleCollectionListClick = function(e) {
		var target = $(e.currentTarget).closest('.eoos-collection');
		target.addClass('active');
		$('#searches').removeClass('hidden');
	};





	var setProvider = function() {
		$('#provider-header').removeClass('unset');
	};
	var setCollection = function() {
		setProvider();
		$('#collection-header').removeClass('unset');
	};

	var switchSidebarBlock = function(id) {
		$('.sidebar-block').removeClass('active');
		$('#' + id + '-header').addClass('active');
		$('#' + id + '-content').addClass('active');
	};

	var handleSidebarBlockClick = function(e) {
		var target = $(e.currentTarget).closest('.sidebar-block');
		var id = target.attr("id").split('-')[0];
		switchSidebarBlock(id);
	};

	var handleSidebarProviderClick = function(e) {
		setProvider();
		switchSidebarBlock('provider');
	};

	var handleSidebarCollectionClick = function(e) {
		setCollection();
		switchSidebarBlock('collection');
	};


	$(function() {

		$('.eoos-provider-go').on('click.eoos', handleProviderGoClick);
		$('#provider-connector-url').on('input.eoos', handleUrlInputChange);
		$('#provider-connector-url').on('keypress.eoos', handleUrlInputKeyPress);
		$('#go-collections').on('click.eoos', handleCollectionsClick);
		$('#go-search').on('click.eoos', handleSearchClick);
		$('.eoos-provider').on('click.eoos', handleProviderListClick);
		$('.eoos-collection').on('click.eoos', handleCollectionListClick);
		$('.eoos-search').on('click.eoos', handleSearchClick);


		$('#property-fulltext').on('input.eoos', handlePropertyUse);
		$('#property-location-select-in-map').on('click.eoos', handlePropertyUse);
		$('#property-timerange-start').on('change.eoos', handlePropertyUse);
		$('#property-timerange-end').on('change.eoos', handlePropertyUse);
		$('#search-back').on('click.eoos', handleSearchBackClick);

		$('#search-submit').on('click.eoos', handleSearchClick);
		$('#breadcrumbs').on('click.eoos', 'a', handleSearchBackClick);


		$('.sidebar-tabs').on('click.eoos', 'a', handleTabClick);


		$('#results-expand-button').on('click.eoos', handleResultsExpandClick);

		if($('#wwd-results').length) {

			var wwd = new WorldWind.WorldWindow("wwd-results");

			var bingLayer = new WorldWind.BingAerialLayer(null);
			bingLayer.detailControl = 1.0;
			bingLayer.enabled = true;

			wwd.addLayer(bingLayer);

		}


		$('.sidebar-block.header').on('click.eoos', handleSidebarBlockClick);
		$('.sidebar-block').on('click.eoos', '.sidebar-list-item.provider', handleSidebarProviderClick);
		$('.sidebar-block').on('click.eoos', '.sidebar-list-item.collection', handleSidebarCollectionClick);

	});
}
