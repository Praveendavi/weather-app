const router = require('express').Router();
const fetch = require('node-fetch');
const mongoose = require('mongoose')
const Data = mongoose.model("Data")

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    temp: null
  });
});
router.post('/', async (req, res) => {
  const { city, des, temp } = req.body
  console.log(req.body)
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
  
  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: data.message,
            des: null,
            temp: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const temp = data.main.temp;
          res.render('index', {
            city, des, temp
          });
          const newData = new Data({
            city,
            des,
            temp
          })
          newData.save()
        }
      });
  } catch (err) {
    res.render('index', {
      city: 'something wrong',
      des: null,
      temp: null
    })
  }

})


module.exports = router;