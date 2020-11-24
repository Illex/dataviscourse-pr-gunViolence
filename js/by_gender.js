class Gender{

    constructor(data, year, states){
        this.data = data[2];
        this.year = year;
        this.width = 300;
        this.height = 4900;
        this.states = states;
    }

    addState(state){
        this.states = states;
        this.filteredData = this.data.filter(d => d.state in states)
    }

    drawHist(){
        let svg = d3.select('.by_gender').append('svg').attr('height', this.height)
            .attr('width', this.width).attr('transform', 'translate(5,5)')


    }
}