var request = require('request')
var cheerio = require('cheerio')

var domain = 'https://losangeles.craigslist.org'
var baseUrl = domain + '/search/apa'

request(baseUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        // console.log(html);
        let $ = cheerio.load(html)
        $("a.result-title").each(function(i, element) {
            // console.log(i);
            // console.log(element.children.data);
            let dom = $(this)
            let title = dom.text()
            let link = domain + dom.attr("href")
            let time = dom.prev().attr("datetime")
            let price = dom.next().children(".result-price").text()
            
            let housing = dom.next().children(".housing").text()
            let stringHousing = housing.replace(/\s/g,'')
            let br = (stringHousing.split("br")[0]).indexOf("ft") > -1 ? "" : stringHousing.split("br")[0]
            // let ft = 
            console.log(i, br)
        })
    } else {
        console.log(error);
    }
})

module.exports = function (nDesired, cb) {
}
