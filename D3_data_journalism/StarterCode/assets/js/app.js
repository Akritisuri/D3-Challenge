// @TODO: YOUR CODE HERE!

var svgWidth = 900;
var svgHeight = 500;

// Set the margins 
var margin = { 
    top: 60,
    right: 60, 
    bottom: 60, 
    left: 60
};

// Define the dimensions 
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom; 

// Select the body, append SVG area, and set dimensions 
var svg = d3.select("scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight); 

// append group are and set its margins 
var ChartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var file = "StarterCode/assets/data/data.csv" 
d3.csv(file)