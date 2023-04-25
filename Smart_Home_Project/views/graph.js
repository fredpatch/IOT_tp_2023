import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const coords = []
const POINTS = 100;
const MAX = 10;
const sensorText = document.querySelector('#sensor-text');

let timerInterval = null;
let sensorData = 0;
const baseUri = 'http://localhost:3002';

const width = 500;
const height = 250;

const margin = {
  left: 0, right: 0, top: 0, bottom: 15
};

const viewHeight = height - margin.top - margin.bottom;

// point to coordinate converter
const x = d3.scaleTime()
  .range([0, width - margin.left - margin.right]);

const y = d3.scaleLinear()
  .domain([0, MAX])
  .range([viewHeight, 0]);

const xAxis = d3.axisBottom(x)
  .tickSizeInner(-viewHeight)
  .tickSizeOuter(0)
  .tickPadding(4)
  .tickFormat(d3.timeFormat(':%S.%L'));

//create d3 path generation function
const line = d3.line()
  .curve(d3.curveBasis)
  .defined(p => !!p)
  .x((d) => x(d.x))
  .y((d) => y(d.y));

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// reused chart func
function draw(selection) {
  // change domain every time
  const now = Date.now();
  x.domain([now, now - 5e3])
  
  selection.each(function(data) {
    const container = d3.select(this)
    
    const svg = container.selectAll("svg").data([data]);
    const gEnter = svg.enter().append("svg").append("g");
    
    svg
      .attr("width", width)
      .attr('height', height)
        
    // append path layer
    gEnter
      .append("g")
        .attr("class", "path layer")
        .append("path")
          .attr("class", "line")
    
    gEnter
      .append('g')
      .attr('transform', `translate(0, ${viewHeight})`)
      .attr('class', 'x axis')
      .call(xAxis);
    
    const g = svg.select("g")     // real g elem
      .attr('transform', `translate(${margin.left},${margin.top})`)

    g.select("path.line")
      .attr('d', line(data))
    
    g.select('.x.axis')
      .call(xAxis)
      .selectAll('line')
      .attr('stroke-dasharray', 5)
      .attr('y2', -viewHeight);
  })
}

const wrapper = d3.select("#wrap");

d3.interval(() => {  
  coords.unshift({
    y: sensorData/10,
    x: new Date()
  })
  
  if (coords.length > POINTS) {
    coords.pop()
  }
  
  wrapper
    .datum(coords)
    .call(draw)
}, 100)

document.addEventListener('DOMContentLoaded', function () {
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
      fetch(baseUri+'/light/sensor',
          {
              method: 'GET',
          })
          .then((res) => {
              return res.json();
          })
          .then((data) => {
              sensorData = data.average;
              sensorText.innerText = data.average + " %";
          })
          .catch(function (err) {
              console.log(err)
          });
  },500)});
