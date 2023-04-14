// Import the url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Create the demographics panel and fetch data
function metaDemo(selectedValue) {
      d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
   
        // Filter data by selected ID after converting their types 
        var selectedData = data.metadata.filter((meta) => meta.id == selectedValue)[0];
      
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        var entries = Object.entries(selectedData);
        
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
        console.log(entries);
        });
  }
  
// Create the bar chart and fetch data
function bar(selectedValue) {
        d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // Filter data by selected ID
        var selectedData = data.samples.filter((sample) => sample.id === selectedValue);

        // Assign the first object to selectedData variable
        var objects = selectedData[0];
        
        // Get the top 10 otus
        var trace1 = [{
            x: objects.sample_values.slice(0,10).reverse(),
            y: objects.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: objects.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(49,170,189)",
                opacity: 0.8
            },
            orientation: "h"
        }];
        var layout1 = {
            title: "Top 10 OTU ID Found",
            xaxis: { autorange: true },
            yaxis: { autorange: true },
            margin: { l: 100,
                      r: 80,
                      t: 100,
                      b: 30 },
            height: 400,
          };
         Plotly.newPlot("newbar", trace1,layout1);
    });
}
  
// Create the bubble chart and fetch data
function bubble(selectedValue) {
        d3.json(url).then((data) => {

       // Filter data by selected ID
        var selectedData = data.samples.filter((sample) => sample.id === selectedValue)[0];
            
       // Trace for the data for the bubble chart
        var trace2 = [{
            x: selectedData.otu_ids,
            y: selectedData.sample_values,
            text: selectedData.otu_labels,
            mode: "markers",
            marker: {
                size: selectedData.sample_values,
                color: selectedData.otu_ids,
                colorscale: "YlGnBu"
            }
        }];
    
        // Apply the x-axis lengend to the layout
        var layout2 = {
            xaxis: {title: "OTU ID"},
            width: 1100,
            height: 450,
            margin: { t: 50, r: 25, l: 25, b: 25 },
                
        };
       
        Plotly.newPlot("newbubble", trace2, layout2);
    });
}

// Create the gauge chart and fetch the JSON data 
function gauge(selectedValue) {
    
    d3.json(url).then((data) => {
        // An array of metadata objects
        var metadata = data.metadata;
        
        // Filter data by selected ID
        
        var selectedData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to selectedData variable
        var selectedData = selectedData[0]

        // Trace for the data for the gauge chart
        var trace3 = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: selectedData.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(40,200,20)"},
                steps: [
                    { range: [0, 1], color: "rgb(233,245,248)" },
                    { range: [1, 2], color: "rgb(218,239,244)" },
                    { range: [2, 3], color: "rgb(203,231,239)" },
                    { range: [3, 4], color: "rgb(187,223,229)" },
                    { range: [4, 5], color: "rgb(158,209,225)" },
                    { range: [5, 6], color: "rgb(128,195,216)" },
                    { range: [6, 7], color: "rgb(49,170,189)" },
                    { range: [7, 8], color: "rgb(143,197,154)" },
                    { range: [8, 9], color: "rgb(132, 181, 137)" },
                    { range: [9, 10], color:"rgb(112, 160, 118)" }
                ]
            }
        }];
        Plotly.newPlot("newgauge", trace3);
    });
}
// Create the default page with plot.

function init() {
    // Use D3 to fetch the data and setup  the dropdown menu  
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        var dropdownMenu = d3.select("#selDataset");

        // Append each name as an option to the drop down menu
         data.names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Call the functions to make the demographic panel, bar chart, and bubble chart
        metaDemo(data.names[0]);
        bar(data.names[0]);
        bubble(data.names[0]);
        gauge(data.names[0]);
    });
}
// Toggle interactive plots for changing events
function optionChanged(selectedValue) {
    metaDemo(selectedValue);
    bar(selectedValue);
    bubble(selectedValue);
    gauge(selectedValue)
}
// Initialize the dashboard
init();


