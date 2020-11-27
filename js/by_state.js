class State{

    constructor(data, year, states, updateState, updateYear) {
        console.log("By State")
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
        let a = d3.select( "#aBarChart-axis").attr("transform", "translate(0,70)").call(d3.axisTop(d3.scaleLinear()
            .domain([0, d3.max(that.data, d => d['injuries'+that.year])]).range([that.barWidth, 5])).ticks(4));
        a = a.append('g').attr('id', 'aBarChart').attr('transform', 'translate(140, 3)')
        let barsa = a.selectAll('rect').data(this.data);
        let new_barsa = barsa.enter().append('rect')
            .attr('width', (d, i) => that.aScale(d['injuries'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24)
            .attr('transform', 'scale(-1,1)').style('fill', 'indigo');
        barsa.exit().remove();
        new_barsa.merge(barsa);


        let b = d3.select("#bBarChart-axis").attr("transform", "translate(5,70)").call(d3.axisTop(this.bScale).ticks(4))
        b = b.append('g').attr('id', 'bBarChart').attr('transform', 'translate(0,3)')
        let barsb = b.selectAll('rect').data(this.data);
        let new_barsb = barsb.enter().append('rect')
            .attr('width', (d, i) => that.bScale(d['deaths'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24).style('fill', 'grey');
        barsa.exit().remove();
        new_barsb.merge(barsb);

    }

    updateBars(){
        console.log(this.data.length)
        let that = this
        let barsa = d3.select('#aBarChart').selectAll('rect').data(that.data);
        let new_barsa = barsa.enter().append('rect')
            .attr('width', (d, i) => that.aScale(d['injuries'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24)
            .attr('transform', 'scale(-1,1)').style('fill', 'indigo')
        barsa.exit().remove();
        new_barsa.merge(barsa);

        let barsb = d3.select('#bBarChart').selectAll('rect').data(that.data);
        let new_barsb = barsb.enter().append('rect')
            .attr('width', (d, i) => that.bScale(d['deaths'+that.year])).attr('height', 22)
            .attr('x', 0).attr('y', (d,i) => i * 24).style('fill', 'grey')
        barsb.exit().remove();
        new_barsb.merge(barsb);
    }


}