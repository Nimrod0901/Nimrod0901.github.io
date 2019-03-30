$(document).ready(function(){
  //Trigger Time, Greeting and weather functionalities
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error);
  }
  startTime();

});