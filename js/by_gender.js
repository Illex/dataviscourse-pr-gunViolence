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
        this.scaleX = d3.scaleLinear().domain([0,10]).range([0, this.width]);

    }

    addState(states){
        this.states = states;
        this.filteredData = this.data.filter(d => this.states.contains(d.state))
    }

    drawHist() {
        let that = this;
        let svg = d3.select('.by_gender').append('svg').attr('height', this.height)
            .attr('width', this.width).append('g').attr('transform', 'translate(5,5)')
        svg.append("g").attr("transform", "translate(0," + this.height + ")")

        let maxes = [];
        for(let s in this.dist[this.year]){
            let max = 0;
            let val = {};
            let data = this.dist[this.year][s]
            for(let i = 0; i < data.length; i++){
                let d = data[i];
                if(d['deaths'] > max){
                    max = d['deaths'];
                    d['state'] = s;
                    val = d;
                }
            }
            maxes.push(val);
        }
        let colorScale = d3.scaleSequential().interpolator(d3.interpolateBlues)
            .domain([d3.min(maxes.map(d => d.deaths)), d3.max(maxes.map(d => d.deaths))]);
        let size = d3.scaleLinear().domain([0, d3.max(maxes.map(d => d.deaths))])
            .range([7,50])
        let Tooltip = d3.select(".by_gender")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "3px")
            .style("padding", "5px")

        let mouseover = function(d) {
            Tooltip
                .style("opacity", 1)
        }
        let mouseleave = function(d) {
            Tooltip
                .style("opacity", 0)
        }
    }
}