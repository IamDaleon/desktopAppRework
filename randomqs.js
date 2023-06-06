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
        else{
            document.getElementById("author").innerHTML = data[randoselection].author = "null"
        }
    }
    getRandomIntInclusive()
});

function clockTick() {
    const currentTime = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","August","Sep","Oct","Nov","Dec"];

        month = months[currentTime.getMonth()],
        day = currentTime.getDate(),
        year = currentTime.getFullYear(),
        hours = ("0" + currentTime.getHours()).slice(-2),
        minutes = ("0" + currentTime.getMinutes()).slice(-2)
        seconds = ("0" + currentTime.getSeconds()).slice(-2),
        date = (  day + " " + month + ", " + year);
        time = (' ' + hours + ':' + minutes + ':' + seconds);

    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;
  }

  setInterval(clockTick, 1000);