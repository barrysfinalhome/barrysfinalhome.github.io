'use strict';
$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Shanghai,China&callback=?', function (data) {
  console.info(data);
});
