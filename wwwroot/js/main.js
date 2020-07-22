/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

var margin = { left: 80, right: 20, top: 50, bottom: 100 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var g = d3.select("#coffee-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," +
        margin.top + ")");

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

g.append("text")
    .attr("class", "y axis-label")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Revenue")
    .attr("transform", "rotate(-90)");

d3.json("data/revenues.json").then(function(data) {

    data.forEach(d => {

        d.revenue = +d.revenue;
        console.log(d.revenue);
    });

    var x = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.month;
        }))
        .range([0, width])
        .padding(0.2);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.revenue;
        })])
        .range([height, 0]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisCall);

    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d) { return "$" + d; });
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return x(d.month);
        })
        .attr("y", function(d) {
            return y(d.revenue);
        })
        .attr("height", function(d) {

            return height - y(d.revenue);
        })
        .attr("width", x.bandwidth)
        .attr("fill", "grey");
});