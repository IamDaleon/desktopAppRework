fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(0);
        max = Math.floor(data.length);
        randoselection = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive

        let quote = data[randoselection].text;
        let author = data[randoselection].author;
        
        document.getElementById("quote").innerHTML = quote
        // document.getElementById("author").innerHTML = author

        console.log(quote);
        console.log(author);

        if(author === null){
          document.getElementById("author").innerHTML =  " ";
      }else{
          document.getElementById("author").innerHTML = author;
      }
  }
  getRandomIntInclusive()
});