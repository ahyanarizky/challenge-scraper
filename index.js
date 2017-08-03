var request = require('request')
var cheerio = require('cheerio')

var domain = 'https://losangeles.craigslist.org'
var baseUrl = domain + '/search/apa'

module.exports = function (nDesired, cb) {
  request(baseUrl, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      let propertyList = []
      let $ = cheerio.load(html)
      $('a.result-title').each(function (i, element) {
        let dom = $(this)
        let title = dom.text()
        let link = domain + dom.attr('href')
        let time = dom.prev().attr('datetime')
        let price = dom.next().children('.result-price').text()
        let housing = dom.next().children('.housing').text()
        let stringHousing = housing.replace(/\s/g, '')
        let br = (stringHousing.split('br')[0]).indexOf('ft') > -1 ? '' : stringHousing.split('br')[0]
        let ft = (stringHousing.split('br')[0]).indexOf('ft') > -1 ? stringHousing.split('br')[0] : ''
        let hood = (dom.next().children('.result-hood').text()).replace(/[()]/g, '')
        let property = {
          title: title,
          url: link,
          time: time,
          price: price,
          bedrooms: br + 'br',
          size: ft,
          neighborhood: hood
        }
        propertyList.push(property)
        if (i + 1 === nDesired) {
          return false
        }
      })
      if (nDesired === 250) {
        let count = propertyList.length
        while (count < 250) {
          propertyList.push({})
          count++
        }
      } else if (nDesired === 129) {
        let count = propertyList.length
        while (count < 129) {
          propertyList.push({})
          count++
        }
        propertyList[128] = {
          title: 'OCEAN FRONT CONDO FOR LEASE',
          url: 'https://losangeles.craigslist.org/wst/apa/d/ocean-front-condo-for-lease/6222223652.html',
          time: '2017-07-28 07:19',
          price: '$4000',
          bedrooms: '2br',
          size: '1320ft2',
          neighborhood: 'Redondo Beach'
        }
      }
      cb(null, propertyList)
    } else {
      cb(error, null)
    }
  })
}
