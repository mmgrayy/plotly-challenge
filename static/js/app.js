//Check to make sure the data reads in the console 
d3.json('data/samples.json').then(data => console.log(data))
// choose drop down id from html file 
var idSelect = d3.select("#selDataset");
// select demo info div info
var demoTable = d3.select("#sample-metadata");
// establish all of your charts that are present in the html
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");
//*****BONUS******
var bonusGauge = d3.select("gauge");

//populate dropdown menu patient IDs 
function init() {
// reset graph data
    resetData();
// reestablish connection to samples.json file data 
    d3.json("data/samples.json").then((data => {
    //Putting ids in menu using a loop 
    // Loop will pull all ids from "option" property of the dataset and add it to a list 
    data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
          })); 

// 1st ID and matching charts 
    var dropId = idSelect.property("value")
    plotCharts(dropId);
      })); 
} 

// reset so you can click a new number from the drop down list
function resetData() {
  //Clearing out all data
demoTable.html("");
barChart.html("");
bubbleChart.html("");
//bonus
bonusGauge.html("");

}; 

// PLOTTING
function plotCharts(id) {
//read json wiith d3
d3.json("data/samples.json").then((data => {
var individualMetadata = data.metadata.filter(participant => participant.id == id)[0];
var wfreq = individualMetadata.wfreq;
  

// Iteration through each key
        Object.entries(individualMetadata).forEach(([key, value]) => {
            var newerList = demoTable.append("ul");
            newerList.attr("class", "list-group list-group-flush");
            var listItem = newerList.append("li");
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");
            // add pair to list
            listItem.text(`${key}: ${value}`);

        }); 
        
        
        // filter
        var individualSample = data.samples.filter(sample => sample.id == id)[0];
        // empty array to store data
        var barIds = [];
        var otuLabels = [];
        var sampleValues = [];
        // Another Iteratation 
        Object.entries(individualSample).forEach(([key, value]) => {
switch (key) {case "otu_ids": barIds.push(value);
break; 
case "sample_values": sampleValues.push(value);
break;
case "otu_labels":otuLabels.push(value);
break;
default:
break;} })
; 
 // SLICE TIME
var topOtuIds = barIds[0].slice(0, 10).reverse();
var topOtuLabels = otuLabels[0].slice(0, 10).reverse();
var topSampleValues = sampleValues[0].slice(0, 10).reverse();
// MAP OTU
var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);
// PLOTTING
var traceBar = {
    x: topSampleValues,
    y: topOtuIdsFormatted,
    text: topOtuLabels,
    type: 'bar',
    orientation: 'h',
    marker: {color: 'rgb(42, 136, 212)'}};
        
var dataBar = [traceBar];
// plot layout
var layoutBar = {
    height: 500,
    width: 600,
    font: {family: 'Quicksand'},hoverlabel: {font: {family: 'Quicksand'}},
    title: {text: `<b>Top OTUs for Test Subject ${id}</b>`,
    font: {size: 25 ,color: 'rgb(42, 136, 212)'}},
    xaxis: {title: "<b>Samples<b>",color: 'rgb(42, 136, 212)'},
    yaxis: {tickfont: { size: 20 }}}
    Plotly.newPlot("bar", dataBar, layoutBar);
// PLOT BUBBLE CHART
var bubbleChart = {
    x: barIds[0],
    y: sampleValues[0],
    text: otuLabels[0],
    mode: 'markers',
    marker: {
    size: sampleValues[0],
    color: barIds[0],
    colorscale: 'YlGnBu'}
    };
        
var bubbleData = [bubbleChart];
var layoutBub = {
     font: {family: 'Quicksand'},
     hoverlabel: {font: {family: 'Quicksand'}},
     xaxis: {title: "<b>OTU Id</b>",
     color: 'rgb(34,94,168)'},
     yaxis: {title: "<b>Sample Values</b>",
     color: 'rgb(34,94,168)'},
     showlegend: false,
        };
// plot the bubble chart 
Plotly.newPlot('bubble', bubbleData, layoutBub);
// ***BONUS***
if (wfreq == null) 
{wfreq = 0;}
// create an indicator trace for the gauge chart
var traceGauge = {
    domain: { x: [0, 1], y: [0, 1] },
    value: wfreq,
    type: "indicator",
    mode: "gauge",
    gauge: {axis: {
    range: [0, 9],
    tickmode: 'linear',
    tickfont: {
    size: 15}},
//transparent because we will make another pointer below
bar: { color: 'rgba(8,29,88,0)' }, 
// choose all your colors 
steps: [
    { range: [0, 1], color: 'rgb(185, 224, 244)' },
    { range: [1, 2], color: 'rgb(164, 212, 239)' },
    { range: [2, 3], color: 'rgb(134, 193, 232)' },
    { range: [3, 4], color: 'rgb(114, 181, 228)' },
    { range: [4, 5], color: 'rgb(94, 168, 224)' },
    { range: [5, 6], color: 'rgb(84, 162, 222)' },
    { range: [6, 7], color: 'rgb(64, 149, 217)' },
    { range: [7, 8], color: 'rgb(53, 143, 215)' },
    { range: [8, 9], color: 'rgb(42, 136, 212))' }]}
    
};
//Meter pointer math 
var angle = (wfreq / 9) * 180;
var degrees = 180 - angle,
    radius = .8;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    cX = String(x),
    cY = String(y),
    pathEnd = ' Z';
var path = mainPath + cX + " " + cY + pathEnd;
    gaugeColors = ['rgb(8,29,88)', 'rgb(37,52,148)', 'rgb(34,94,168)', 'rgb(29,145,192)', 'rgb(65,182,196)', 'rgb(127,205,187)', 'rgb(199,233,180)', 'rgb(237,248,217)', 'rgb(255,255,217)', 'white']

    // center and track where the needle is centered 
var traceNeedleCenter = {
    type: 'scatter',
    showlegend: false,
    x: [0],
    y: [0],
    marker: { size: 35, color: '850000' },
    name: wfreq,
    hoverinfo: 'name'
        };

        // create a data array from the two traces
        var dataGauge = [traceGauge, traceNeedleCenter];

        // define a layout for the chart
        var layoutGauge = {

            // draw the needle pointer shape using path defined above
            shapes: [{type: 'path', 
                    path: path,
                    fillcolor: '850000',
                    line: {color: '850000'}
            }],
            font: {family: 'Quicksand'},
            hoverlabel: {font: {family: 'Quicksand',size: 16}},
            title: {text: `<b>Test Subject ${id}</b><br><b>Belly Button Washing Frequency</b><br><br>Scrubs per Week`,
            font: {size: 20,color: 'rgb(42, 136, 212)'},},
            height: 500,
            width: 500,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1],
                fixedrange: true},
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-0.5, 1.5],
                fixedrange: true}
        };
Plotly.newPlot('gauge', dataGauge, layoutGauge);
})); 
}; 
//function for id change
function optionChanged(id) {
// reset one last time
    resetData();
    plotCharts(id);} 
init();