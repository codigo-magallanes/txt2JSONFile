const fs = require("fs");
const fetch = require('node-fetch');
const dataOBJ = require("./sources.json"); 
const { linesToData, dataToMoonPhases } = require("./calendario365.js")
const { dataToSunPhases, addNSCDates } = require("./astropixels.js");
const { moonTerms } = require("./dates");

let astroData = {
  docs: [],
  sun: {},
  moon: {}
};
const server = 'http://127.0.0.1:5500'
const dataFile = `../txt2JSON/json/astroData.json`
let jsonFile = `./json/data-${(new Date).toJSON()}.json`
let config = {
  /**
   * @values ('json' | 'locale' | 'ms' | 'any' ) Output format of dates if not stablished beforehand
   */
  saveDatesAs: "ms",
};

/**
 * ** PROMISES **
 */

// GLOBAL
function getTextLines(data) {
  return data.split("\n");
}

function addData(obj) {
  astroData = { ...astroData, ...obj };
  return astroData;
}

function saveData(data) {
  data = JSON.stringify(data, null, 2)
  fs.writeFile(jsonFile, data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File: ", jsonFile);
  });
  fs.writeFile(dataFile, data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File: ", dataFile);
  });
}

// for every source prints dataOBJ in screen.
// need to fix so it only prints and logs info once
  let source;
  let files = []
  for (source in dataOBJ.sources) {
    let temp = dataOBJ.sources[source]['files']
    if (temp != undefined) {
      temp.forEach((url) => files.push(fetch(`${server}${url}`)))
    }
  }
  
  Promise.all(files).
    then(function (responses) {
      // returns a new array formed with .map()
      return Promise.all(responses.map(async function (response) {
        const url = response.url
        const txt = await response.text();
        return { url, txt }
      }));
    }).then(function (arr) {
      arr.forEach((doc) => {
        if (doc.url.includes('/astropixels/')) {
          let data = getTextLines(doc.txt)
          data = data.map((line) => line.trim().replace(/\s{5,6}|\t/g, ',').split(','))
          let sunData = dataToSunPhases(data)
          let obj = addNSCDates(sunData)
          addData(obj)
        } else if (doc.url.includes('/calendario365/')) {
          let lines = getTextLines(doc.txt)
          let data = linesToData(lines)
          let obj = dataToMoonPhases(data)
          addData(obj)
        } else {
          console.log(`need new code to extract infor from:\n ${doc.url}`)
        }
      })
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
  }).finally(() => { saveData({ astroData }) });