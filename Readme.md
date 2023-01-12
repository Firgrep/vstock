vStock :: visualizing fundamental stock data

A simple stock viewing web app built in python, html, css, and javascript. Django framework was used as structure for the site, Bootstrap to style and matplotlib to generate the graphs. Stock data is retrieved from Alpha Vantage using a free license. The app is live on Heroku - prospective employers can get in touch if they would like to try the demo (the link is not shared publicly since this is not a commercial version, and the free API licence only handles a limited amount of calls.)

Functionality rundown:

    - Display at a strategic glance fundamental stock data in a pleasing visualization
    - Control API calls
    - Database storage with automatic updating when data is older than a set parameter (1 day in this case)

Since API keys may have limited calls (as in this case), the app uses local cache memory to set a timeout when the API is called. This prevents more calls on the API than is allowed for, avoiding faulty data to be stored in the database. However, the app stores previous successful data and will first attempt to retrieve the data from the database if the ticker symbol already exists. The app will also check the timestamp of the existing record and if the data is older than the set parameter, the app will call the API (unless its function is on the cache timeout). If the user agent inputs within the timeout range, they will be sent to an request denied page. And if the user agent inputs a faulty or non-existent ticker symbol, the app will detect this in the data retrieved from the API provider and send the user agent to a ticker invalid page. These routes are intended to prevent the app from crashing. 

Future improvements:

    - Full mobile responsiveness: the app currently is not well optimized for mobile devices or smaller media maps, altough some responsiveness exists natively with Bootstrap, closer custom tailoring is required to make sure it would work appropriately on all devices. 
    - More graphs: in addition to more graphs one could add comparisons to major indices (such as the S&P500) with which compare the selected stock's performance with. Particularly covariance could be useful. 
    - Fixing unforeseen bugs: although all bugs encountered during initial production were weeded out, additional testing and usage might reveal further errors. If you come across any, please get in touch on my linkedin https://www.linkedin.com/in/filip-niklas-58a599243/