
fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(0);
        max = Math.floor(data.length);
        randoselection = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
        // console.log(data[randoselection].text);
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
        month = currentTime.getMonth() + 1,
        day = currentTime.getDate(),
        year = currentTime.getFullYear(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes(),
        seconds = currentTime.getSeconds(),
        date = (month + "/" + day + "/" + year);
        time = (' ' + hours + ':' + minutes + ':' + seconds);
    // here we get the element with the id of "date" and change the content to the text variable we made above
    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;
  }

  setInterval(clockTick, 1000);