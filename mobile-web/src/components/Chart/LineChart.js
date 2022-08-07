import * as d3 from "d3";

/* *****
LineData = [
    {
        name : 'LineName',
        plotdata : [
            {
                time: '9:00:00',
                value: 30
            }
        ]
    }
]
====================================
setting = {
    oneday_timeformat : true, // true or false 
    xy_axis : true, // true or false
    line_color : {
        'LineName' : '#ff0000'
    }
}
*** */
function LineChart(root, LineData, setting){
    const margin = { top: 5, right: 15, bottom: 0, left: 20},
        width = document.querySelector(`.${root}`).clientWidth,
        height = document.querySelector(`.${root}`).clientHeight;

    const parseTime = setting.oneday_timeformat 
        ? d3.timeParse("%H:%M:%S") 
        : d3.timeParse('%Y-%m-%d');

    const NewData = LineData.map(eachline => ({
        name : eachline.name,
        data : eachline.data.map(point => ({
            time : parseTime(point.time),
            value : point.value
        }))
    }));

    const svg = d3.select(document.querySelector(`.${root}`))
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const y_domain = d3.extent(NewData.map(eachline => (
        eachline.data.map(point => (
            point.value
        ))
    ))[0])
    const x = d3.scaleTime()
        .domain(d3.extent(NewData[0].data, d => d.time))
        .range([0, width - margin.left - margin.right])
        .nice()
    const y = d3.scaleLinear()
        .domain([y_domain[0]*0.85,y_domain[1]*1.15])
        .range([height, 0])
        .nice()

    const line = d3.line()
        .x(d => x(d.time))
        .y(d => y(d.value))
    const lines = svg.append('g').attr('class', 'lines')
    

    // add lines into svg
    lines.selectAll('.line-group')
        .data(NewData)
        .enter()
        .append('g')
        .attr('class', 'line-group')
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.data))
        .style('stroke', d => setting.line_color[d.name])
        .style('fill', 'none')

    if(setting.xy_axis) {
        const xaxis_format = setting.oneday_timeformat 
            ? d3.timeFormat("%H")
            : d3.timeParse('%Y-%m-%d')

        svg.append('g')
            .attr('class', 'xaxis')
            .attr('transform', `translate(0, ${height-20})`)
            .style('font-size', 7)
            .call(d3.axisBottom(x).ticks(5).tickFormat(xaxis_format))
        svg.append('g')
            .attr('class', 'yaxis')
            .attr('transform', `translate(0, ${-20})`)
            .style('font-size', 7)
            .call(d3.axisLeft(y).ticks(5))
    }
    else {
        const reference_line = d3.line()
            .x(d => x(d.time))
            .y(d => y(d.value))
        const reference_lines = svg.append('g').attr('class', 'reference_lines')
        const reference_data = LineData.map(eachline => ({
            name : eachline.name,
            data : eachline.data.map(point => ({
                time : parseTime(point.time),
                value : eachline.data[0].value
            }))
        }))

        reference_lines.selectAll('.reference_lines')
            .data(reference_data)
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr('d', d => reference_line(d.data))
            .style('stroke', '#808080')
            .style('fill', 'none')
            .style('stroke-dasharray', '2,2')
    }
}
export default LineChart
