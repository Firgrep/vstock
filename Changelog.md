# CHANGELOG

2.1 
- Fixed progress loading bar to vanish properly when the next page loads.
- Fixed CCS on main page.

2.0
- Major graph overhaul. Switched from using server-side Matplotlib over to client-side Chart.js for the graphs/charts. Instead of using the server resources and power to produce the graphs, the graphs are produced on client-side using JavaScript. In the new regime, data is processes on the server but is then sent to the frontend where it is "picked up" by JavaScript to produce the relevant graphs. This leads to a vast increase in app performance and server stability. The Matplotlib graphs would take roughly 4 seconds to generate, which is a LONG time on the Web. Chart.js does the same job, with web responsive charts, in a fraction of the time. Overall, this is an improvement in the architecture as the server does not need to do the expensive operation of generating the graphs which results is much higher scalability.
- Added a new "Updates" page.
- "About" and "Updates" pages are now off-canvas panels that open up on the sides. Given the information on these is quite sparse, it makes more sense to have them display in this way. 
- Responsiveness has been improved, particularly with modals which now will open in fullscreen when the device window is beneath a certain threshold, though work remains on the very smallest of devices.
- Changed background image from .png to .webp for improved load. 

1.1
- Improved app responsiveness to smaller devices and increased fonts on graphs for improved readability. 

1.0
- Initial functional release and live deployment.


## Future improvements / TO DO:

- Add documentation using JSDoc. 
- More graphs. Perhaps a radar graph that collates all the data and displays the "health" of a company?
- Refactoring possibilites: the code could be improved for readability, a number of arguments used in functions could be streamlined as easy-to-access-and-alter variables put at the top of the file. Additionally, the graph functions could be nested as methods a class structure, making the ticker data itself a particular object and then stored as this. One would have to check what is the best solution regarding the figures produced in this case, as currently the figures are produced as .svg simply overwrite the previous upon call. 
- Streamline data treatment: the data from the API are retreived as .json and stored in the database as .json. Currently, all of the data populates a single field in the database and this is not user-friendly or particularly effective should one have to retreieve a specific piece of data. In the current version, when retrieved from the database, the .json object is opened and prepared into specific global variables for graph production, but this preparation process takes place every time data is retrieved from the database. The upside is that this data necessarily needs to be treated when first retrieved from the API, so this preparation is necessary at least once, but there room for improvement. Perhaps a better control flow would be to prepare the fresh data into a plurality of fields into the database, which, when retrieved, simply retrieve these fields rather than re-preparing the .json file. 

## Known bugs:

- The loading pop-up does not close after the new page is loaded, which means it stays there when the user hits back.
- There is a chance that the API provider may return an empty dictionary, which is something the app is not currently programmed to handle and will therefore crash. I noticed this was particularly frequent with non-U.S. companies, hence why the app is currently limited just to those as the data is (assumed) to be complete. Nevertheless, this eventuality needs to be covered. In principle it is an easy fix (add a conditional to check whether dictionary is empty, and, if so, fabricate a default dictionary of zeroes so that the graphs can be produced), but will likely have structural rammifications as to how the rest of the module behaves. 
- Some Aria labels need to be corrected.