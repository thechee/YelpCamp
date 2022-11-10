const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6347aef97e589d889c72e08b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita obcaecati labore earum, repellat magni possimus doloribus deleniti ab, iusto dolor beatae corporis nihil voluptate facere, quidem vero deserunt nisi officia!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/dl5af9wkw/image/upload/v1667364019/YelpCamp/jod9wrldwthe4muavatx.jpg',
                filename: 'YelpCamp/jod9wrldwthe4muavatx'
            },
            {
                url: 'https://res.cloudinary.com/dl5af9wkw/image/upload/v1667364017/YelpCamp/tcubmeppd6r2pkgjuvgs.jpg',
                filename: 'YelpCamp/tcubmeppd6r2pkgjuvgs'
            }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

