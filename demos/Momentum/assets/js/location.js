/**
 *  Google Maps Timezone API key: AIzaSyCoc74GBPHSqKV3km5hGmdesC3lplu1M6s
 *
 *  darksky api key: 4d1977dd251130f29bf178012ddc03f0
 */

let new_ip = "https://api.darksky.net/forecast/";
let new_key = "4d1977dd251130f29bf178012ddc03f0/";

let requestTimeout = setTimeout(function(){
    console.log("Sorry! something has gone terribly wrong.");
}, 8000);

// user ip call
$.ajax({
    url: "https://ipinfo.io",
    dataType: "jsonp",
    success: function(data){

        // url filled with user's current ip location
        let testCall = `${new_ip}${new_key}${data.loc}`;
        $.ajax({
            url: testCall,
            dataType: "jsonp",
            success: function(response){
                // console.log(data);
                // console.log(response);

                let city = data.city;
                let state = data.region;
                let zipcode = data.postal;
                let country = data.country;
                let temp = Math.round(response.currently.apparentTemperature);
                let cTemp = `${((temp - 32) * 5/9).toFixed(2)}`;
                let wind = response.currently.windSpeed;
                let cWind = `${(wind * 0.44704).toFixed(2)}`;

                // display default temperature, windspeed and location.
                $("#weatherApp").html(`${temp}&deg`);
                $("#windSpeed").html(`${wind} mph`);
                $("#location").html(`${state}`);
                $("#description").html(`${response.hourly.summary}`);

                // error handling
                clearTimeout(requestTimeout);
            }
        });
    }
});

function success(position) {
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;

  var timeZone = $.getJSON("https://maps.googleapis.com/maps/api/timezone/json?location="+latitude+","+longitude+"&timestamp=1458000000&key=AIzaSyCoc74GBPHSqKV3km5hGmdesC3lplu1M6s",
      function(data){
      console.log( "success", data );
      return data;
  }).fail(function() {

  });
}

function error() {
  console.log("Unable to retrieve your location");
  /**

    TODO:
    - Set default time to "world clock"
    - Icon for weather?

   */

}

// Clock
function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    //let s = today.getSeconds();
    let p= "AM";
    let tod = "morning";

    // change to US time format.
    // ^^Only in US?
    if(h>12){
      h= h-12;
      p="PM";
      tod = (h>=6)?"evening":"afternoon";
    }
    m = checkTime(m);
    //s = checkTime(s);

    document.getElementById('time').innerHTML =
    //h + ":" + m + ":" + s;
    h + ":" + m + " " + p;
    document.getElementById("greeting-time").innerHTML = tod;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}