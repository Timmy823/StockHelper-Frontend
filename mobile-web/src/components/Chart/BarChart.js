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
//     bar_color : {
//         'LineName' : '#ff0000'
//     }
// }
function BarChart(root, BarData, setting) {
    let items = Object.keys(BarData[0]).slice(1);

    const margin = { top: 0, right: 0, bottom: 20, left: 30 },
        width = root.clientWidth - margin.left - margin.right,
        height = root.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(root)
        .append('svg')
        .attr('width', width)
        .attr('height', root.clientHeight)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .domain(BarData.map(d => d.time))
        .range([0, width - margin.left - margin.right])
        .padding(setting['bar_padding']||0.4);
    const y = d3.scaleLinear()
        .domain([0, d3.max(BarData.map((element) => {
            let value = 0;
            items.map((e) => { value += Number(element[e]) });

            return value;
        }))])
        .range([height, 0]);

    const x_axis = d3.axisBottom(x).tickValues(x.domain().filter((e, i)=>i%(setting['xaxis_interval']||1) == 0));
    const y_axis = d3.axisLeft(y).tickFormat(function (d) { return d + (setting['yaxis_label_name']||'元');}).ticks(6);

    const stackData = d3.stack()
        .keys(items)(BarData)

    // add lines into svg
    svg.selectAll('g')
        .data(stackData)
        .enter().append("g")
            .attr("fill", d => setting['bar_color'][d.key])
            .selectAll('rect')
            .data(d  => d )
            .enter().append("rect")
                .attr('x', d => x(d.data.time))
                .attr('y', d => y(d[1]))
                .attr("width", x.bandwidth())
                .attr("height", d => y(d[0]) - y(d[1]));

    svg.append('g')
        .attr('class', 'xaxis')
        .attr('transform', `translate(0, ${height})`)
        .style('font-size', 7)
        .style('color', 'white')
        .call(x_axis);
        
    svg.append('g')
        .attr('class', 'yaxis')
        .style('font-size', 7)
        .style('color', 'white')
        .call(y_axis);
}
export default BarChart;
