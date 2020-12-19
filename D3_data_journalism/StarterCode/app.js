function makeResponsive() {
   
    var svgWidth = 1000;
    var svgHeight = 700;
    
    // Set the margins 
    var margin = { 
        top: 20,
        right: 40, 
        bottom: 200, 
        left: 120
    };
    
    // Define the dimensions 
    var chartWidth = svgWidth - margin.left - margin.right;
    var chartHeight = svgHeight - margin.top - margin.bottom; 
    
    // Select the body, append SVG area, and set dimensions 
    var svg = d3
        .select(".chart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);


    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight); 


    
    // append group are and set its margins 
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    
    d3.csv("data.csv").then(function(CensusData) {
    
        CensusData.forEach(function(data) {
            data.healthcare = +data.healthcare;
            data.obesity = +data.obesity;
        });
    
        // Create scale functions 
        var xLinearScale = d3.scaleLinear()
            .domain(d3.extent(CensusData, d => d.healthcare))
            .range([0, svgWidth]);
    
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(CensusData, d => d.obesity)])
            .range([svgHeight, 0]);
    
        // Creates axes 
        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale).ticks(10);
    
        // append axes 
        chartGroup.append("g")
            .attr("transform", `translate(0, 600)`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        // Create the circles 
        var CirclesGroup = chartGroup.selectAll("Circle")
            .data(CensusData)
            .enter() 
            .append("circle")
            .attr("cx", d => xLinearScale(d.healthcare))
            .attr("cy", d => yLinearScale(d.obesity)) 
            .attr("r", "15") 
            .attr("fill", "blue")
            .attr("opacity", "0.5");
    
        // Add the state labels to the circles 
        var CircleLabels = chartGroup.selectAll(null).data(CensusData).enter().append("text"); 
    
        // Create labels for the axes 
        CircleLabels
            .attr("x", function(d) {
                return xLinearScale(d.healthcare);
            })
            .attr("y", function(d) {
                return yLinearScale(d.obesity);
            })
            .text(function(d) {
                return d.abbr;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle")
            .attr("fill", "white");
    
 
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (svgHeight / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare (%)");
    
        chartGroup.append("text")
            .attr("transform", `translate(${svgWidth / 2}, 650)`)
            .attr("class", "axisText")
            .text("Obesity Rate (%)");
    
        // Initialize tooltip
        var toolTip = d3.tip() 
            .attr("class", "tooltip") 
            .offset([80, -60]) 
            .html(function(d) {
                return (`${d.healthcare}<br> Healthcare: ${d.healthcare}<br>Obesity: ${d.obesity}`);
            });
    
        // Create tooltip in the chart 
        chartGroup.call(toolTip); 
        CirclesGroup.on("click", function(data) {
            toolTip.show(data, this);
        })
    });
    
    }
        
makeResponsive();
    