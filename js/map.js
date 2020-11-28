
class StateData{
    constructor(name, data, geometry, properties, id, type){
        let state = {}
        for(let i = 0; i < data.length; i++){
            if(data[i]['state'] == name){
                state = data[i];
                //console.log(name, data[i])
                break;
            }
        }
        this.name = name;
        this.data = state;
        this.geometry = geometry;
        this.properties = properties;
        this.id = id;
        this.type = type;
    }
}

class Map{

    constructor(data, year, updateState){
        this.year = year;
        this.stateData = data;
        this.updateState = updateState;
        this.count = 0;

        this.projection = d3.geoAlbersUsa().scale(800).translate([305, 250]);
        this.getPerCapita();
        this.colorScale = d3.scaleSequential().interpolator(d3.interpolateBlues)
            .domain([1.05*this.ultimate_min, this.ultimate_max]);

    }

    updateYear(year){
        this.year = year;
        d3.select('.map').remove();
        this.drawMap();
    }

    getPerCapita(){
        let mins = []
        let maxes = []

        for(let year = 2013; year<=2018; year++){
            let i = 0;
            let min = 1000;
            let max = 0;
            for(let key in this.stateData){
                let state = this.stateData[i];
                let cap = +state['perCap'+year]
                    if(cap > max){
                        max = cap
                    }
                    if(cap < min){
                        min = cap
                    }
                i++;
            }
            mins.push(min);
            maxes.push(max);

        }
        this.ultimate_min = Math.log(mins.reduce(function(a, b) {
            return Math.max(a, b);
        }));
        this.ultimate_max = Math.log(maxes.reduce(function(a, b) {
            return Math.max(a, b);
        }));

    }

    drawMap(country) {
        let that = this
        let geojson = topojson.feature(country, country.objects.states);
        let path = d3.geoPath(this.projection);
        let states = geojson.features.map(
            state => {
                let d = this.stateData
                return new StateData(state.properties.name, d, state.geometry, state.properties,
                        state.id, state.type)


            }
        )

        //tooltip
        let mouseover = function(d){
            console.log(d)
            //console.log('mouse')
            d3.select('.map').selectAll('.states').transition().duration(200).style('opacity', .7)
            tooltip.style('opacity', 1)
            d3.select(this).transition().duration(200).style("opacity", 1)
        }

        let mousemove = function(d){
            console.log(d.data)
            tooltip.style('opacity', 1)
            tooltip.html('<p><b>'+d.name+'</b></p>' +
                '<p>Population: '+ d.data['pop'+that.year] +'</p>' +
                '<p>Incidents per Capita: '+ Math.round(d.data['perCap'+that.year], 6) +'</p>')
                .style("left", (d3.event.pageX+5) + "px")
                .style("top", (d3.event.pageY) + "px");
        }

        let mouseleave = function(d){
            d3.select('.map').selectAll('.states').transition().duration(200).style('opacity', 1)
            d3.select(this).transition().duration(200)
            tooltip.transition().duration(200).style("opacity", 0)
        }

        let click = function(d){
            if(that.count >= 5){
                d3.select('.map').selectAll('.states').classed('selected', false)
                    .transition().duration(200).style('opacity', 1);
                that.updateState(null);
                that.count = 0;
            }else {
                if (d3.select(this).classed('selected')) {
                    d3.select('.map').selectAll('.states').classed('selected', false)
                        .transition().duration(200).style('opacity', 1);
                    that.updateState(null)
                    that.count = 0;
                } else {
                    d3.select(this).classed('selected', true).transition().duration(200);
                    that.updateState(d3.select(this).attr('id'))
                    that.count += 1;
                }
            }
        }

        //plot map
        let selection = d3.select('.map').append('svg').attr('height', 500).attr('width', 610);
        let tooltip = d3.select('.map').append('div').style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "3px")
            .style("padding", "3px")
            .style('font', '10px sans-serif')
            .style('position', 'absolute')

        selection.selectAll("path").data(states).enter().append('path')
            .attr('d', path).attr('id', d => d.name).classed('states', true)
            .classed('boundary', true).style("fill", function (d) {
            let cap_year = 'perCap' + that.year;
            let temp = that.colorScale(Math.log(d.data[cap_year]));
            return temp;
        }).on('mouseover', mouseover).on('mouseleave', mouseleave)
            .on('click', click).on('mousemove', mousemove)


    }

}
