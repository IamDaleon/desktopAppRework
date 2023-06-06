const siteCardTemplate = document.querySelector("[data-site-template]")
const siteCardContainer = document.querySelector("[data-site-cards-container]")
const searchInput = document.querySelector("[data-search]")

let sites = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  sites.forEach(site => {
    const isVisible =
      site.sitename.toLowerCase().includes(value) || 
      site.sitehosted.toLowerCase().includes(value)
      // site.siterenewal.toLowerCase().includes(value)
    site.element.classList.toggle("hide", !isVisible)
  })
})

fetch("../general.json")
  .then(res => res.json())
  
  .then(data => {
    sites = data.map(site => {
      const card = siteCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-title]")
      const tag1 = card.querySelector("[data-tag1]")
      const tag2 = card.querySelector("[data-tag2]")
      const tag3 = card.querySelector("[data-tag3]")
      const tag4 = card.querySelector("[data-tag4]")
      const tag5 = card.querySelector("[data-tag5]")
      // const tag6 = card.querySelector("[data-tag6]")
      header.textContent = site.sitename
      tag1.textContent = `Hosted by: ${site.hosted}`
      tag2.textContent = `Renewal Date: ${site.renewal}`
      tag3.textContent = `PHP Version: ${site.phpv}`
      tag4.textContent = `Wordpress Version: ${site.wpv}`
      tag5.textContent = `Access: ${site.access}`
      // tag6.textContent = `<a href="http://${site.url}"`
      siteCardContainer.append(card)
      
      
      return { sitename: site.sitename, sitehosted: site.hosted, siterenewal: site.renewal, sitewpv: site.wpv, sitephp: site.phpv, siteaccess: site.url}
    })

    // document.getElementById('page').innerHTML = `http://${data[0].url}`;  
    // console.log(`http://${data[0].url}`);

    let aReplacement = document.getElementById('page');
    let urlR = `${data[0].url}`;
    if (document.readyState != "complete") {
      document.addEventListener('DOMContentLoaded', function() {
        prepareTags()
      }, false);
    } else {
      prepareTags();
    }

    function prepareTags(){
      if (aReplacement) {
        aReplacement.setAttribute(`onclick`,`require('shell').openExternal("http://${urlR}"`)
      }
      return false;
    }
  })