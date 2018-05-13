const image1 = require('../images/image1.jpeg')
const image2 = require('../images/image2.jpeg')
const image3 = require('../images/image3.jpeg')
const image4 = require('../images/image4.jpeg')
const image5 = require('../images/image5.jpeg')
const image6 = require('../images/image6.jpeg')

const Cards = [{
  "id": 1,
  "first_name": "Denise",
  "age": 21,
  "friends": 9,
  "interests": 38,
  "image": image1
}, {
  "id": 2,
  "first_name": "Cynthia",
  "age": 27,
  "friends": 16,
  "interests": 49,
  "image": image2
}, {
  "id": 3,
  "first_name": "Maria",
  "age": 29,
  "friends": 2,
  "interests": 39,
  "image": image3
}, {
  "id": 4,
  "first_name": "Jessica",
  "age": 20,
  "friends": 18,
  "interests": 50,
  "image": image4
}, {
  "id": 5,
  "first_name": "Julie",
  "age": 28,
  "friends": 2,
  "interests": 13,
  "image": image5
}, {
  "id": 6,
  "first_name": "Anna",
  "age": 24,
  "friends": 12,
  "interests": 44,
  "image": image6
}]

export default class HttpClient {
  static fetchGirls() {
    return new Promise((resolve, reject) => {
      resolve(Cards);
    })
  }
}