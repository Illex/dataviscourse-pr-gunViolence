class Gender{

    /*Split by injury/death
    largest attack by state
    */
    constructor(data, year, states){
        this.data = data[2];
        this.dist = data[3];
        this.year = year;
        this.width = 300;
        this.height = 490;
        this.states = states;

        this.scaleX = d3.scaleLinear().domain([0,10]).range([0, this.width])
    }

    addState(states){
        this.states = states;
        this.filteredData = this.data.filter(d => this.states.contains(d.state))
    }

    drawHist(){
        let that = this;
        let svg = d3.select('.by_gender').append('svg').attr('height', this.height)
            .attr('width', this.width).append('g').attr('transform', 'translate(5,5)')
        svg.append("g").attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.scaleX))



}