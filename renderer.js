// const func = async () => {
//     const response = await window.versions.ping()
//     console.log(response) // prints out 'pong'
//   }
  
//   func()

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