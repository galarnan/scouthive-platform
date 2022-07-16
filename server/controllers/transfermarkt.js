const fetch = require('node-fetch');
const cheerio = require('cheerio');

const fetchURLdata = (req, res) => {
  const details = []
  fetch(req.body.URL)
  .then(response => response.text())
  .then(body => cheerio.load(body))
  .then($ =>
    Promise.all(
      $(".info-table > .info-table__content--bold").map((i,el) =>{
        item = $(el).text().trim()
        details.push(item)
      }),
      details.push($(".data-header__headline-wrapper").text().trim().split('\n')[1].trim())
    )
    .then(res.json(details)))
}


module.exports = {
  fetchURLdata: fetchURLdata
};


// const data_url = req.body.URL
// fetch(data_url)
// .then(response => res.json(response))




