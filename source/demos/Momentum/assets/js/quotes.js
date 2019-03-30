$(document).ready(function(){
   let url = "https://thesimpsonsquoteapi.glitch.me/quotes";

   $.ajax({
      url: url,
      dataType: "json",
      success: function(data){
          let quote = data[0].quote;
          let character = data[0].character;
          $("#quote").html(`${quote} &nbsp; - ${character}`);
      }
   });
});