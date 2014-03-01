// geo.js

function get_location() {
	navigator.geolocation.getCurrentPosition(function(pos) {
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
		geocoder.geocode({ 'latLng': latlng }, function(results, status) {
			$('#from').val(results[0].formatted_address);
		});	});
}

function geonames_typeahead() {

	var geoNamesUsername = 'zvikara';

	/**
	 * Initialize typeahead.js
	 */
	 $('.typeahead').typeahead({
	 	name: $(this).attr('id'),
	 	remote: {
			// http://www.geonames.org/export/geonames-search.html
			url: 'http://api.geonames.org/searchJSON?q=%QUERY&maxRows=10&country=il&username=' + geoNamesUsername + '&lang=de&style=full',
			filter: function(parsedResponse) {
				var result = [];
				for (var i=0; i<parsedResponse.geonames.length; i++) {
					var geonameId = parsedResponse.geonames[i].geonameId;
					result.push({
						name: parsedResponse.geonames[i].name,
						value: parsedResponse.geonames[i].name,
						geonameId: geonameId,
						countryName: parsedResponse.geonames[i].countryName,
						lat: parsedResponse.geonames[i].lat,
						lng: parsedResponse.geonames[i].lng,
						bbox: parsedResponse.geonames[i].bbox,
					});
				}
				return result;
			}
		},
		template: [
		'<p class="geo-name">{{name}}</p>',
		'<p class="geo-country text-muted">{{countryName}}</p>'
		].join(''),
		engine: Hogan
	});


	/**
	 * Fix tt hint
	 */
	 $('.typeahead').on('typeahead:initialized', function(e, data) {
		// fix for using twitter bootstrap
		var hint = $(e.target).prev('.tt-hint');
		var small = $(e.target).is('.input-sm');
		var large = $(e.target).is('.input-lg');
		if (small) {
			hint.addClass('input-sm');
		} else if (large) {
			hint.addClass('input-lg');
		} else {
			hint.addClass('input');
		}
		hint.addClass('form-control');
	});

}
