class Map {
    constructor(map, tileLayer) {
        this.map = map;
        this.markers = []
        tileLayer.addTo(this.map);
    }

    addMarker(marker) {
        this.markers.push(marker);
        marker.addTo(this.map);
    }

    removeMarker(marker) {
        var markerIndex = this.findMarkerIndex(marker);
        if (markerIndex != -1) {
            this.map.removeLayer(this.markers[markerIndex]);
            this.markers.splice[markerIndex, 1];
            console.log(`Marker removed at: ${marker['_latlng']}.`)
        } else {
            console.log(`No marker removed at: ${marker['_latlng']}.`)
        }
    }

    findMarkerIndex(marker) {
        for (var i = 0; i < this.markers.length; i++) {
            var tmpMarker = this.markers[i];
            if (marker.latitude === tmpMarker.latitude
                && marker.longitude === tmpMarker.longitude) {
                console.log(`Marker found at index: ${i}`);
                return i;
            }
        }
        console.log(`Marker at ${marker['_latlng']} not found.`);
        return -1;
    }

    autoScaleOnZoom() {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].radius(2);
        }
    }

    get markerList() {
        return this.markers;
    }
}

class Marker {
    constructor(latitude, longitude, aspect = {}, html) {
        this.marker = L.circle([latitude, longitude], aspect);
        this.marker.bindPopup(html)

        // Attach mouse over listener
        this.marker.on('mouseover', function(ev) {
            ev.target.openPopup();
            console.log(ev.target)
        });

        return this.marker;
    }

    // Getters and Setters

    get latitude() {
        return this.marker['_latlng']['lat'];
    }

    get longitude() {
        return this.marker['_latlng']['lng'];
    }

    get radius() {
        return this.marker['_mRadius'];
    }

    set radius(radius) {
        this.marker.radius = radius;
    }
}