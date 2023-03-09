* JavaScript file was not executing in the HTML template.
    - Cause: href attribute was used instead of src.
    - Fix: switched to proper src and the script executed as inteded.

* Title and legend were not working in the chart.
    - Cause: plugin needs to be nested inside options.
    - Fix: nested plugin into options and title and legend rendered as expected.

* Echarts would not work properly (animations and tooltips missing) unless I put the code in the script section in the HTML template. This can work if there were only a few charts, but given this project requires a dozen charts (possibly more), it does not organize well. 
    - Cause: unknown
    - Fix attempt: tried to install via npm but I would get errors from the browser that it wouldn't be able to import echarts into the .js file where I had the graph. I don't know if the issue comes from trying to mix node and django together or if I had the code wrong somewhere. 
    - Alternative solution: went back to use Chart.js as I had no issues there. Moreover, Echarts charts do not resize automatically, whereas Chart.js do straight out of the box, which is quite handy for responsiveness. 
    - Comment: I will return to this issue in the future, perhaps make a post on StackOverflow to see what other perspectives may shed light on the issue. 