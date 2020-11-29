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
        let svg = d3.select('.by_gender').append('svg').attr('id', 'gender_title').attr('height', this.height)
            .attr('width', this.width).append('g');

        d3.select('#gender_title').append('text')
            .text('Biggest Incident of the Year').attr('transform', 'translate(50,25)');

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
        console.log(maxes)

        let node = svg.selectAll("circle")
            .data(maxes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", d => size(+d.deaths))
            .attr("cx", that.width / 2)
            .attr("cy", that.height / 2)
            .style("fill", d => colorScale(d => +d.deaths))
            .style("fill-opacity", 0.8)
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)

        /*let simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(that.width / 2).y(that.height / 2))
            .force("charge", d3.forceManyBody().strength(0.5))
            .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1))

        this.simulation
            .nodes(maxes)
            .on("tick", function(d){
                node.attr("cx", function(d){ return d.x; })
                    .attr("cy", function(d){ return d.y; })
            });

         */
    }
}