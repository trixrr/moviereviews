// get the below variable from mongo database using that mongoose thing...
let dateOfBirth = new Date();
// Below variable is the upper value i want for the date, so like a year in the future
let dateUpper = new Date(
  dateOfBirth.getFullYear() + 1,
  dateOfBirth.getMonth(),
  dateOfBirth.getDate()
);

// Need to put these into year-month-day format for the thing to work with the NY times API
dateOfBirth =
  dateOfBirth.getFullYear() +
  "-" +
  dateOfBirth.getMonth() +
  "-" +
  dateOfBirth.getDate();
dateUpper =
  dateUpper.getFullYear() +
  "-" +
  dateUpper.getMonth() +
  "-" +
  dateUpper.getDate();

// The below will be the key i get from the NYTime movie API
let apiKey = "blah";

// the format for the API request needs to be <start-date>;<end-date> so do that here
let dateString = dateOfBirth + ";" + dateUpper;

// the API request URL needs to be something like
// http://api.nytimes.com/svc/movies/v2/reviews/search.json?opening-date=1990-11-29;1991-11-29&offset=100&order=opening-date&api-key=<whatever your key is>
// so let's build that now
url =
  "http://api.nytimes.com/svc/movies/v2/reviews/search.json?opening-date=" +
  dateString +
  "&offset=100&order=opening-date&api-key=" +
  apiKey;

console.log(url);

// Now just plug the URL into the axios.get() function
axios
  .get(url)
  // the .then is a promise that basically says "when this thing is done, do this"
  .then(function(response) {
    result_json = response.data.results;

    res.render("index", { results: result_json });
  })
  // If the request fails for whatever reason, catch the error and...
  .catch(function(error) {
    // log it to the console to see what went wrong
    console.log(error);
  });
