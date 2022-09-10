import * as d3 from "d3";

// BarData = [
//     {
//         data : [
//             {
//                 time: '9:00:00',
//                 value: 30
//             }
//         ]
//     }
// ]
// ====================================
// setting = {
//     oneday_timeformat : true, // true or false 
//     xy_axis : true, // true or false
//     line_color : {
//         'LineName' : '#ff0000'
//     }
// }
function BarChart(root, BarData, setting){
    const margin = { top: 0, right: 15, bottom: 20, left: 20},
        width = root.clientWidth - margin.left - margin.right,
        height = root.clientHeight - margin.top - margin.bottom;
    
    const NewData = BarData.map(eachline => ({
        data : eachline.data.map(point => ({
            time : point.time,
            value : point.value
        }))
    }));

    const svg = d3.select(root)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .domain(NewData[0]['data'].map(d => d.time))
        .range([0, width - margin.left - margin.right])
        .padding(0.4);
    const y = d3.scaleLinear()
        .domain([0, d3.max(NewData[0]['data'], d => d.value)])
        .range([height, 0]);
    
    // add lines into svg
    svg.selectAll('.bar')
        .data(NewData[0]['data'])
        .enter().append("rect")
        .attr('class', 'bar')
        .attr('x', d => x(d.time))
        .attr('y', d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "#8a89a6");

    svg.append('g')
        .attr('class', 'xaxis')
        .attr('transform', `translate(0, ${height})`)
        .style('font-size', 7)
        .call(d3.axisBottom(x));
    svg.append('g')
        .attr('class', 'yaxis')
        .style('font-size', 7)
        .call(d3.axisLeft(y).tickFormat(
            function(d){
                return d;
            }).ticks(5)
        )
}
export default BarChart
