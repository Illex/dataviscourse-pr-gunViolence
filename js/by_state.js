class State{

    constructor(data, year, states, updateState, updateYear) {
        console.log("By State")
        this.data = data[2];
        this.updateState = updateState;
        this.updateYear = updateYear;

        this.filteredData = this.sumTotal();
        this.height = 500;
        this.width = 300;
        this.year = year;
        this.states = states;

        this.scaleX = d3.scaleLinear().range([0, this.width])
            .domain([0, Math.max(this.data.map(d => d['deaths']))])

    }

    sumTotal(){
        let us = {
            'name' : 'USA',
            'deaths' : pass,
            'injuries' : pass,
            'incidents' : pass
        }
        return us;
    }

    addState(states){
        this.states = states;
        this.filteredData = this.data.filter(d => d.state in states)
        if(this.filteredData.length > 0){
            this.scaleX = d3.scaleLinear().range([0, this.width])
                .domain([0, Math.max(this.filteredData.map(d => d['deaths'+year]))])
        }
        this.scaleX = d3.scaleLinear().range([0, this.width])
            .domain([0, Math.max(this.data.map(d => d['deaths'+year]))])
    }

    drawBars(){
        let viz = d3.select('#by_state').append('svg').attr('height', this.height)
            .attr('width', this.width).append('g')
    }


}