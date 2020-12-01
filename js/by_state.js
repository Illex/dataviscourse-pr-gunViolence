class State{

    constructor(data, year, states, updateState, updateYear) {
        this.og_data = data[2];
        this.data = data[2];
        this.updateState = updateState;
        this.updateYear = updateYear;

        this.height = 500;
        this.width = 295;
        this.barWidth = 140;
        this.maxWidth = 135;
        this.year = year;
        this.states = states;
        this.colors = ["#b32222", "#22b39b", "#7b22b3", "#b322a0", "#b37222"];

        this.aScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, d => d['injuries'+this.year])])
            .range([0, this.maxWidth]);
        this.bScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, d => d['deaths'+this.year])])
            .range([0, this.maxWidth]);


    }


    addState(states){
        this.states = states;

        let that = this;
        this.data = this.og_data.filter(d => that.states.has(d.state))
        if(this.data.length === 0){
            this.data = this.og_data;
        }
        this.aScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, d => d['injuries'+this.year])])
            .range([0, this.width/2-5]);
        this.bScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, d => d['deaths'+this.year])])
            .range([0, this.width/2-5]);

        this.updateBars();
    }

    drawBars(){
        let that = this;

        //tooltip
        let mouseover = function(d){
            tooltip.style('opacity', 1)
        }

        let mousemove = function(d){
            tooltip.style('opacity', 1)
            tooltip.html('<p><b>'+d.state+'</b></p>' +
                '<p>Deaths: '+ d['deaths'+that.year] +'</p>' +
                '<p>Injuries: '+ d['injuries'+that.year] +'</p>')
                .style("left", (d3.event.pageX+5) + "px")
                .style("top", (d3.event.pageY) + "px");
        }

        let mouseleave = function(d){
            tooltip.transition().duration(200).style("opacity", 0)
        }

        d3.select("#aBlock").append('text').text('Injuries')
            .attr('transform', 'translate(90,40)')
        d3.select("#bBlock").append('text').text('Deaths')
            .attr('transform', 'translate(5,40)')

        let a = d3.select( "#aBarChart-axis").attr("transform", "translate(0,70)").call(d3.axisTop(d3.scaleLinear()
            .domain([0, d3.max(that.data, d => d['injuries'+that.year])]).range([that.barWidth, 5])).ticks(5));
        a = a.append('g').attr('id', 'aBarChart').attr('transform', 'translate(140, 3)')
        let barsa = a.selectAll('rect').data(this.data);
        let new_barsa = barsa.enter().append('rect')
            .attr('width', (d, i) => that.aScale(d['injuries'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24)
            .attr('transform', 'scale(-1,1)').style('fill', '#7B22B3')
            .on('mouseover', mouseover).on('mousemove', mousemove).on('mouseleave', mouseleave);
        barsa.exit().remove();
        new_barsa.merge(barsa);


        let b = d3.select("#bBarChart-axis").attr("transform", "translate(5,70)").call(d3.axisTop(this.bScale).ticks(4))
        b = b.append('g').attr('id', 'bBarChart').attr('transform', 'translate(0,3)')
        let barsb = b.selectAll('rect').data(this.data);
        let new_barsb = barsb.enter().append('rect')
            .attr('width', (d, i) => that.bScale(d['deaths'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24).style('fill', '#B37222')
            .on('mouseover', mouseover).on('mousemove', mousemove).on('mouseleave', mouseleave);
        barsa.exit().remove();
        new_barsb.merge(barsb);

        let tooltip = d3.select('.by_state').append('div').style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "3px")
            .style("padding", "3px")
            .style('font', '10px sans-serif')
            .style('position', 'absolute')

    }

    updateBars(){

        let that = this
        let mouseover = function(d){
            tooltip.style('opacity', 1)
        }

        let mousemove = function(d){
            tooltip.style('opacity', 1)
            tooltip.html('<p><b>'+d.state+'</b></p>' +
                '<p>Deaths: '+ d['deaths'+that.year] +'</p>' +
                '<p>Injuries: '+ d['injuries'+that.year] +'</p>')
                .style("left", (d3.event.pageX+5) + "px")
                .style("top", (d3.event.pageY) + "px");
        }

        let mouseleave = function(d){
            tooltip.transition().duration(200).style("opacity", 0)
        }
        let barsa = d3.select('#aBarChart').selectAll('rect').data(that.data);
        let new_barsa = barsa.enter().append('rect')
            .attr('width', (d, i) => that.aScale(d['injuries'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24)
            .attr('transform', 'scale(-1,1)').style('fill', '#7B22B3')
            .on('mouseover', mouseover).on('mousemove', mousemove).on('mouseleave', mouseleave);
        barsa.exit().remove();
        new_barsa.merge(barsa);

        let barsb = d3.select('#bBarChart').selectAll('rect').data(that.data);
        let new_barsb = barsb.enter().append('rect')
            .attr('width', (d, i) => that.bScale(d['deaths'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24).style('fill', '#B37222')
            .on('mouseover', mouseover).on('mousemove', mousemove).on('mouseleave', mouseleave);
        barsb.exit().remove();
        new_barsb.merge(barsb);
        let tooltip = d3.select('.by_state').append('div').style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "3px")
            .style("padding", "3px")
            .style('font', '10px sans-serif')
            .style('position', 'absolute')
    }


}