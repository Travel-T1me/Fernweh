import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const getRestaurants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const { location } = req.query;

  // if (!location) {
  //   res.status(400).send('Location query parameter is required.');
  //   return;
  // }

  // const options = {
  //   method: 'GET',
  //   url: 'https://yelp-reviews.p.rapidapi.com/business-search',
  //   params: {
  //     query: 'Restaurants',
  //     location: location as string,
  //     start: '0',
  //     yelp_domain: 'yelp.com'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
  //     'X-RapidAPI-Host': 'yelp-reviews.p.rapidapi.com'
  //   }
  // };

  const data =  [
    {
        "id": "YJGVfuxx51TALFxi02xvKg",
        "alias": "blu-on-the-hudson-weehawken",
        "name": "Blu on the Hudson",
        "address": "1200 Harbor Blvd, Weehawken, NJ 07086",
        "latitude": 40.760562,
        "longitude": -74.0231313314963,
        "business_page_link": "https://www.yelp.com/biz/blu-on-the-hudson-weehawken",
        "rating": 4.3,
        "review_count": 135,
        "price_range": "",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/IYchnKxKgiWYInytV_ELKA/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/YJGVfuxx51TALFxi02xvKg",
        "phone": "+12016361200",
        "country": "US"
    },
    {
        "id": "OLa3-KQO9rHjswo55E3Jgg",
        "alias": "trattoria-la-sorrentina-north-bergen",
        "name": "Trattoria La Sorrentina",
        "address": "7831 Bergenline Ave, North Bergen, NJ 07047",
        "latitude": 40.8017289,
        "longitude": -74.0069911,
        "business_page_link": "https://www.yelp.com/biz/trattoria-la-sorrentina-north-bergen",
        "rating": 4.3,
        "review_count": 660,
        "price_range": "$$",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/AP9NpHVEnbxLEuezXCspHg/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/OLa3-KQO9rHjswo55E3Jgg",
        "phone": "+12018698100",
        "country": "US"
    },
    {
        "id": "HjvCwjM0EkFoYo8TFHjfww",
        "alias": "arre-sinaloa-union-city",
        "name": "Arre Sinaloa",
        "address": "4605 Park Ave, Union City, NJ 07087",
        "latitude": 40.77804222204433,
        "longitude": -74.0175949037075,
        "business_page_link": "https://www.yelp.com/biz/arre-sinaloa-union-city",
        "rating": 4.8,
        "review_count": 54,
        "price_range": "",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/_YSAYjKYGE0-iV6PF_fVRw/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/HjvCwjM0EkFoYo8TFHjfww",
        "phone": "+12014309897",
        "country": "US"
    },
    {
        "id": "Xax0exxSL5JCG6jb8w4ymw",
        "alias": "harrys-food-and-drink-north-bergen-2",
        "name": "Harry's Food And Drink",
        "address": "8101 Bergenline Ave, North Bergen, NJ 07047",
        "latitude": 40.803142,
        "longitude": -74.0058554,
        "business_page_link": "https://www.yelp.com/biz/harrys-food-and-drink-north-bergen-2",
        "rating": 4.5,
        "review_count": 246,
        "price_range": "$$",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/KZdo0fpu453T-lLFHJwcJw/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/Xax0exxSL5JCG6jb8w4ymw",
        "phone": "+12018618101",
        "country": "US"
    },
    {
        "id": "BXY0ZV3dNopEU1jphLEQrA",
        "alias": "the-highwood-weehawken",
        "name": "The Highwood",
        "address": "500 Ave At Port Imperial, Weehawken, NJ 07086",
        "latitude": 40.77683348001929,
        "longitude": -74.0116246417165,
        "business_page_link": "https://www.yelp.com/biz/the-highwood-weehawken",
        "rating": 3.9,
        "review_count": 228,
        "price_range": "$$",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/hA37NuwDM1UPFC6m6Y__aQ/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/BXY0ZV3dNopEU1jphLEQrA",
        "phone": "+12015204554",
        "country": "US"
    },
    {
        "id": "7kxUGyfyD16SmSdkS_sNjA",
        "alias": "carnegie-diner-and-cafe-secaucus",
        "name": "Carnegie Diner & Cafe",
        "address": "700 Plaza Dr, Secaucus, NJ 07094",
        "latitude": 40.787339348145544,
        "longitude": -74.04607458042604,
        "business_page_link": "https://www.yelp.com/biz/carnegie-diner-and-cafe-secaucus",
        "rating": 3.6,
        "review_count": 192,
        "price_range": "$$",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/C-BGDmxVqvFYmxzXekD7hw/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/7kxUGyfyD16SmSdkS_sNjA",
        "phone": "+12012676111",
        "country": "US"
    },
    {
        "id": "ME0627wYk0ikhX2yf1fN7w",
        "alias": "haven-riverfront-restaurant-and-bar-edgewater-2",
        "name": "HAVEN Riverfront Restaurant and Bar",
        "address": "2 Main St, Edgewater, NJ 07020",
        "latitude": 40.803426,
        "longitude": -73.9907,
        "business_page_link": "https://www.yelp.com/biz/haven-riverfront-restaurant-and-bar-edgewater-2",
        "rating": 4,
        "review_count": 1217,
        "price_range": "$$$",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/RGRxHvIskokZShxn4nHXCw/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/ME0627wYk0ikhX2yf1fN7w",
        "phone": "+12019431900",
        "country": "US"
    },
    {
        "id": "Lvo_g4oi8QxLaNxNISfMHQ",
        "alias": "parriyas-west-new-york",
        "name": "Parriyas",
        "address": "5509 Bergenline Ave, West New York, NJ 07093",
        "latitude": 40.7859665,
        "longitude": -74.01878889999999,
        "business_page_link": "https://www.yelp.com/biz/parriyas-west-new-york",
        "rating": 4.8,
        "review_count": 9,
        "price_range": "",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/8Ev4dkySCMJjqdiRbwBcPQ/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/Lvo_g4oi8QxLaNxNISfMHQ",
        "phone": "+12014303828",
        "country": "US"
    },
    {
        "id": "LeF5JrQrqXlVCYVfmev9Yw",
        "alias": "rumba-cubana-north-bergen-2",
        "name": "Rumba Cubana",
        "address": "1807 45th St, North Bergen, NJ 07047",
        "latitude": 40.7840761,
        "longitude": -74.0336385,
        "business_page_link": "https://www.yelp.com/biz/rumba-cubana-north-bergen-2",
        "rating": 4.2,
        "review_count": 555,
        "price_range": "$$",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/VGUUe-oQTOPxYpZM-ijJUQ/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/LeF5JrQrqXlVCYVfmev9Yw",
        "phone": "+12015539100",
        "country": "US"
    },
    {
        "id": "WNOUPEZ6J8SZVSaK6Q3e-A",
        "alias": "porto-by-antonio-north-bergen-2",
        "name": "Porto By Antonio",
        "address": "8921 Old River Rd, North Bergen, NJ 07047",
        "latitude": 40.8048834508642,
        "longitude": -73.9934416639218,
        "business_page_link": "https://www.yelp.com/biz/porto-by-antonio-north-bergen-2",
        "rating": 4.3,
        "review_count": 953,
        "price_range": "$$",
        "photo": "https://s3-media0.fl.yelpcdn.com/bphoto/j6Chqpqu-i7MzyFEM4sjIA/348s.jpg",
        "photos_page_link": "https://www.yelp.com/biz_photos/WNOUPEZ6J8SZVSaK6Q3e-A",
        "phone": "+12019417107",
        "country": "US"
    }
]

  try {
    // const response = await axios.request(options);
    const response = data
    res.locals.restaurants = response;
    return next();
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching Yelp data.');
  }
};