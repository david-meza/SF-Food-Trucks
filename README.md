# SF Satisfy Hunger

### Geting Started
*  Clone and run `bundle install` to install the required gems
*  Run `rake db:migrate` and `rake db:seed` to get the database initialized
*  Optionally run `rspec` to make sure all tests are passing (which they should)
*  Fire up your `rails server` and head to `localhost:3000` to check it out!

This is [David's](https://github.com/david-meza) and [Xin's](https://github.com/facingsouth) attempt at [Uber Coding Challenge #4](https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md#food-trucks).  This is a full stack application, making use of a Ruby on Rails API to serve data to an Angular front-end. Check it out [HERE](http://sf-satisfy-hunger.herokuapp.com/)

### Walkthrough

#### Database
The database is seeded with data from [SF Open Data](http://data.sfgov.org/). One initial API call was made, but since the data is not constantly changing, the results were stored locally. Then our `seed.rb` file does some file I/O magic to get all these entries into the database.

#### Testing
###### Controller Testing
Because our app is primarily an API to serve the front end, looking at the controller tests gives a great opportunity took look at the capabilities of the app.  Our API can receive 3 parameters: latitude, longitude, and radius. Then, results are filtered based on the starting point, and the specified radius. If no parameters are passed, our database just sends back all existing records.

This, and responsiveness to different formats were tested in our controller tests.

###### Model Testing
Our FoodTruck model is contains the search methods, called `FoodTruck.find_in_range()`, and so our model tests for data check that this method works properly. In addition, it also checks that FoodTruck model validates its attributes appropriately when creating a new record.

#### Back-end
As briefly mentioned, the back-end is used as an API to provide nearly instant results to a change in the map. As a user moves accross the map or increases/decreases the range of the results, the database will be queried to collect the most accurate and relevant information in real-time.

#### Front-end
Our Front-end is built on AngularJS. We used Angular because the information we display is constantly changing according to our user input, and Angular provided us with access to that real-time updating feature. We used to main services to accomplish our goals. First, a food truck service which communicates with Rails and the DB via API calls. And second, a map service, which grabs location data from the browser and generates some of the data used on the map like the food truck markers. Then, our maps controller is in charge of controlling the rendering / updating of the map, and contains all the necessary functions to communicate with the Google Maps API.

#### Guided Tour
Step 1. Visit [SF Satisfy Hunger](http://sf-satisfy-hunger.herokuapp.com/)

Step 2. a. Accept the request to Geolocate you and find relevant results to your location, or...

Step 2. b. Search for a particular address / place / food truck on the search box.

Step 3. Click on one of the food truck icons to get details about a truck like name, schedule and type of food.

Step 4. Enjoy a great meal!

Live Demo : [View!](http://sf-satisfy-hunger.herokuapp.com/)
