fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(0);
        max = Math.floor(data.length);
        randoselection = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive

        document.getElementById("quote").innerHTML = data[randoselection].text
        
        if(document.getElementById("author").innerHTML = data[randoselection].author = "null"){
            document.getElementById("author").innerHTML =  "Unknown";
        }
    }
    getRandomIntInclusive()
});
