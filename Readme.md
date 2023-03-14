# vStock :: visualizing fundamental stock data

A simple stock viewing web app built in python, html, css, and javascript. Django framework was used as structure for the site, Bootstrap to style and Chart.js to generate the graphs. Stock data is retrieved from Alpha Vantage using a free license. The app is deployed and live - prospective employers can get in touch if they would like to try the demo (the link is not shared publicly since this is not a commercial version, and the free API licence only handles a very limited amount of calls.)

## Functionality rundown:

- Display at a strategic glance fundamental stock data in a pleasing visualization
- Control API calls
- Database storage with automatic updating when data is older than a set parameter (1 day in this case)

Since API keys may have limited calls (as in this case), the app uses local cache memory to set a timeout when the API is called. This prevents more calls on the API than is allowed for, avoiding faulty data to be stored in the database. However, the app stores previous successful data and will first attempt to retrieve the data from the database if the ticker symbol already exists. The app will also check the timestamp of the existing record and if the data is older than the set parameter, the app will call the API (unless its function is on the cache timeout). If the user agent inputs within the timeout range, they will be sent to an request denied page. And if the user agent inputs a faulty or non-existent ticker symbol, the app will detect this in the data retrieved from the API provider and send the user agent to a ticker invalid page. These routes are intended to prevent the app from crashing. 

A second API source (with preset endpoints) is called for index data with which to compare the current stock. This data will also be stored in the database with a refresh window when data has become stale. This API call is "optional", such that if the call runs into errors, the main data should still load and everything else in the app should still work without it. The graph where this is relevant will simply not display the comparison data. 