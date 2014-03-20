/*jshint browser: true, sub: true, camelcase: false  */
'use strict';
//name space
var PAGESP = {};
PAGESP.WEEKDAYSTR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
PAGESP.ABSOLUTE_ZERO = -273.15;
PAGESP.WEATHER_ICON_URL = 'http://openweathermap.org/img/w/';
PAGESP.getCelsius = function(temp) {
  if (typeof(temp) !== 'number') {
    return 0;
  }
  return (temp + PAGESP.ABSOLUTE_ZERO).toFixed(0);
};

$().ready(function() {
  var now, calendarTextArea;
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Shanghai,China&callback=?', function (data) {
    var weatherArea;
    weatherArea = $('#tile-weather>div').children();
    $(weatherArea[0]).text(PAGESP.getCelsius(data.main.temp) + '°');
    $(weatherArea[2]).find('img').attr('src', PAGESP.WEATHER_ICON_URL + data.weather[0].icon);
    $(weatherArea[2]).find('span').text(data.weather[0].main);
    $(weatherArea[3]).text(PAGESP.getCelsius(data.main.temp_min) +
      '°/' + PAGESP.getCelsius(data.main.temp_max) + '°');
    $(weatherArea[4]).text(data.name);
  });
  now = new Date();
  calendarTextArea = $('#tile-calendar .CalendarText>');
  calendarTextArea[0].innerHTML = now.getDate();
  calendarTextArea[1].innerHTML = PAGESP.WEEKDAYSTR[now.getDay() - 1];
});

