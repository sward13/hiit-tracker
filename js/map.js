var cloudmadeURL = "http://tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/998/256/{Z}/{X}/{Y}.png";
var crimeURL = "http://sanfrancisco.crimespotting.org/crime-data?format=json&count=100&dstart=2011-04-01";
var po = org.polymaps;
var svg = po.svg("svg");
document.getElementById("map").appendChild(svg);

// create our map
var map = po.map()
    .container(svg)
    .add(po.interact());

map.add(po.image()
    .url(po.url(cloudmadeURL)));

map.add(po.geoJson()
    .url(crimeURL)
    .tile(false)
    .clip(false)
    .zoom(12)
    .on("load", markerLoad));

map.add(po.compass()
    .pan("none"));    

var infoWindow = com.postarchitectural.infoWindow("#infowindow");
var hoverLabel = com.postarchitectural.infoWindow("#hoverlabel");

// what to do when markers load
function markerLoad(e) {
    var features = e.features;
    // loop over all the features we loaded
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        
        // 1 add the event listener to the element
        feature.element.addEventListener("click", makeMarkerClick(feature.data), false);
        feature.element.addEventListener("mouseover", makeMarkerOver(feature.data), false);
        feature.element.addEventListener("mouseout", hoverLabel.hide, false);
    }
}

// what to do when we click on a marker
function makeMarkerClick(data) {
    return function(e) {
        // markerclick event
        console.log(e, data);
        
        var lat = data.geometry.coordinates[1];
        var lon = data.geometry.coordinates[0];
        var content = data.properties.crime_type + "<br />" + data.properties.description + "<br />" + data.properties.date_time; //building a string from different data properties
        
        infoWindow.selection(e.target) //passing data to the infowindow
        	.html(content, "#infowindow .content")
        	.location({lat: lat, lon: lon})
        	.show();
    };
}

function makeMarkerOver(data) {
    return function(e) {
        // markerover
        hoverLabel.html(data.properties.crime_type)
        	.offset({x: -10, y: -30 })
        	.show();
    };
}

$(window).mousemove(function (e) {
	hoverLabel.moveTip(e.pageX, e.pageY);
});