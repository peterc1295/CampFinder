mapboxgl.accessToken = 'pk.eyJ1IjoicGV0ZXJjaHVuIiwiYSI6ImNsMTlzbnRzYjA1ZmIza3Fyc2tkYW8xcGUifQ.Vma9N_4i1pF-nOmK4SX8Sw';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/light-v10', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)