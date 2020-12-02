class State{

    constructor(data, year, states, updateState, updateYear) {
        this.og_data = data[2];
        this.data = data[2];
        this.updateState = updateState;
        this.updateYear = updateYear;

        this.height = 500;
        this.width = 295;
        this.barWidth = 138;
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
        this.sorted = {'injuries' : 'No', 'deaths': 'No'}

        this.sort();


    }

    sort(){
        let that = this;
        d3.select("#aBlock").on('click', function(d){
            console.log('a')
            let temp = [];
            let injuries = that.data.map(d => d['injuries'+that.year]).sort(function(a, b){return a-b})
            for(let i of injuries){
                temp.push(that.data.filter(d => d['injuries'+that.year] === i)[0]);
            }
            if(that.sorted['injuries'] === 'Asc'){
                temp = temp.reverse();
                that.sorted['injuries'] = 'Desc'
            }else{
                that.sorted['injuries'] = 'Asc'
            }
            that.sorted['deaths'] = 'No'
            that.data = temp;
            that.updateBars();
        })

        d3.select("#bBlock").on('click', function(d){
            console.log('b')
            let temp = []
            let deaths = that.data.map(d => d['deaths'+that.year]).sort(function(a, b){return a-b})
            for(let i of deaths){
                temp.push(that.data.filter(d => d['deaths'+that.year] === i)[0]);
            }
            if(that.sorted['deaths'] === 'Asc'){
                console.log("A")
                temp = temp.reverse();
                that.sorted['deaths'] = 'Desc'
            }else{
                that.sorted['deaths'] = 'Asc'
            }
            that.sorted['injuries'] = 'No'
            that.data = temp;
            that.updateBars();
        })
    }


    addState(states){
        this.states = states;

        let that = this;
        this.data = this.og_data.filter(d => that.states.has(d.state))
        let temp = [];
        for(let i of states){
            temp.push(this.data.filter(d => d.state === i)[0])
        }
        this.data = temp;
        if(this.data.length === 0){
            this.data = this.og_data;
        }
        this.sorted['injuries'] = 'No'
        this.sorted['deaths'] = 'No'

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
            .attr('transform', 'translate(87,40)')
        d3.select("#bBlock").append('text').text('Deaths')
            .attr('transform', 'translate(5,40)')

        let a = d3.select( "#aBarChart-axis").attr("transform", "translate(0,70)").call(d3.axisTop(d3.scaleLinear()
            .domain([0, d3.max(that.data, d => d['injuries'+that.year])]).range([that.barWidth, 5])).ticks(4));
        a = a.append('g').attr('id', 'aBarChart').attr('transform', 'translate(140, 3)')
        let barsa = a.selectAll('rect').data(that.data);
        let new_barsa = barsa.enter().append('rect')
            .attr('width', (d, i) => that.aScale(d['injuries'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24)
            .attr('transform', 'scale(-1,1)').style('fill', '#7B22B3')
            .on('mouseover', mouseover).on('mousemove', mousemove).on('mouseleave', mouseleave);
        barsa.exit().remove();
        new_barsa.merge(barsa);


        let b = d3.select("#bBarChart-axis").attr("transform", "translate(5,70)").call(d3.axisTop(that.bScale).ticks(4))
        b = b.append('g').attr('id', 'bBarChart').attr('transform', 'translate(0,3)')
        let barsb = b.selectAll('rect').data(that.data);
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
        barsa = new_barsa.merge(barsa).transition().duration(100)
            .attr('width', (d, i) => that.aScale(d['injuries'+that.year])).attr('height', 22);

        let barsb = d3.select('#bBarChart').selectAll('rect').data(that.data);
        let new_barsb = barsb.enter().append('rect')
            .attr('width', (d, i) => that.bScale(d['deaths'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24).style('fill', '#B37222')
            .on('mouseover', mouseover).on('mousemove', mousemove).on('mouseleave', mouseleave);
        barsb.exit().remove();
        barsb = new_barsb.merge(barsb).transition().duration(100)
            .attr('width', (d, i) => that.bScale(d['deaths'+that.year])).attr('height', 22);

        if(this.states.size <= 5 && this.states.size > 0){
            let iter = 0;
            for(let i of this.states){
                barsa.filter(d => d.state == i).style('fill', that.colors[iter])
                barsb.filter(d => d.state == i).style('fill', that.colors[iter])
                iter += 1;
            }
        }else{
            barsa.style('fill', '#7B22B3')
            barsb.style('fill', '#B37222')
        }

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