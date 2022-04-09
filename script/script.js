// console.log('lol');
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});







/* Создание карты */
map = L.map('map', {
  minZoom: 5,
  zoomControl: false,
  preferCanvas: true
});


/* Назначение границ */
map.setMaxBounds([
  [-34.922059, 1.878542],
	[-7.937712, 29.300417]
]);


/* << Окно управления слоями >> */
var LayerSwitcher = new L.control.layers();
map.addControl(LayerSwitcher);
L.control.zoom({
  position:'topright'
}).addTo(map);


/* Слой московской области */
var moLayer = L.tileLayer.wms('http://mvitu.arki.mosreg.ru/wms2/cache/?', {
layers: 'm10'
})/*.addTo(map)*/;
LayerSwitcher.addBaseLayer(moLayer, 'Московская область'); /* добавить слой в LayerSwitcher */


/* Слой OpenStreetMap */
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="../new9/https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  crs: L.CRS.EPSG3857
});
map.addLayer(osmLayer);  /* добавить на карту слой OpenStreetMap */
LayerSwitcher.addBaseLayer(osmLayer, 'OpenStreetMap');  /* добавить слой в LayerSwitcher */


var myRenderer = L.canvas({ padding: 0.5 });	   

map.setView([-25.739818, 28.220377], 3);


const daysPoints = {
  1 : {
    'Airoport' : [-22.604693, 17.078996],
    'Hotel Kalahari Anib Lodge' : [-24.430409, 18.101015],
  },
  2 : {
    'moving' : [-24.742592, 15.286505],
    'Hotel Desert Quiver Camp' : [-24.487051, 15.840700],
  },
  3 : {
    'canion' : [-24.487567, 15.798967],
    'Hotel Namib Desert Camp 2Go' : [-24.489411, 15.813731],
  },
  4 : {
    'moving' : [-22.660294, 14.542980],
    'dunes' : [-22.970310, 14.594847],
    'Hotel Princessin Rupprecht' : [-22.682474, 14.524611],
  },
  5 : {
    'moving' : [-22.964138, 14.493311],
    'Hotel Princessin Rupprecht' : [-22.682474, 14.524611],
  },
  6 : {
    'moving' : [-22.004315, 15.585615],
    'Hotel Ai Aiba Lodge' : [-21.513235, 15.580100],
  },
  7 : {
    'park' : [-18.790429, 16.308408],
    'Hotel Oppi Koppi' : [-19.620832, 14.847661],
  },
  8 : {
    'park' : [-18.790429, 16.308408],
    'Hotel Okakuejo Resort' : [-19.177458, 15.915931],
  },
  9 : {
    'park' : [-18.805483, 16.304229],
    'Hotel Etosha Safari Camp2Go' : [-19.194011, 15.926157],
  },
  10 : {
    'park' : [-18.790429, 16.308408],
    'moving' : [-22.567369, 17.087430],
    'Hotel Afrikan Kwela Guesthouse' : [-22.594539, 17.083850],
  },
  11 : {
    'transfer' : [-22.603808, 17.078789],
  },
};

// console.log(daysPoints)
let arrow = [];
// marker = new L.Marker(daysPoints[1]['Аэропорт Хосей Кутако']).addTo(map);
Object.keys(daysPoints).forEach(function(day) {
  Object.keys(daysPoints[day]).forEach(function(points) {
    marker = new L.Marker(daysPoints[day][points]).addTo(map)
    arrow.push(daysPoints[day][points])
  }, daysPoints[day]);
}, daysPoints);
// polyline = new L.polyline(points, {color: 'red'});


console.log(arrow);

polyline = new L.polyline(arrow, {color: 'red'});
map.addLayer(polyline);
map.fitBounds(polyline.getBounds());













const hotels_button = document.getElementsByClassName('hotels-button')
function getPhoto(object)
{
  $.each(hotels_button, function(index){
    hotels_button[index].classList.remove('hotel-active');;
  });

  document.getElementById('hotel_photo').src='img/hotels/'+object.id+'.jpg';
  object.classList.add('hotel-active');
}