const mongoose = require('mongoose');
const cities = require('./cities.js');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground.js');

mongoose.connect('mongodb://localhost:27017/yelpCamp')
    .then( () => {
        console.log('Database connected successfully')
    })
    .catch(error => {
        console.log('Database connection not successful')
        handleError(error)
    });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
//========================================================================


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '623f5e08f0fa73c567cb075d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'This is the description',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ] 
          },
            images: [
              {
                url: 'https://res.cloudinary.com/dem41hktz/image/upload/v1648412421/YelpCamp/cz4ogt2ciae0wb0g2lip.jpg',
                filename: 'YelpCamp/cz4ogt2ciae0wb0g2lip',
              },
              {
                url: 'https://res.cloudinary.com/dem41hktz/image/upload/v1648412422/YelpCamp/f6yfmyr4epfb4nffxlju.jpg',
                filename: 'YelpCamp/f6yfmyr4epfb4nffxlju',
              },
              {
                url: 'https://res.cloudinary.com/dem41hktz/image/upload/v1648412423/YelpCamp/r43adkj7ygw0zm15wnnk.jpg',
                filename: 'YelpCamp/r43adkj7ygw0zm15wnnk',
              }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});