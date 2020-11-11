
class StateData{
    constructor(name, thirteen, cap_thirteen, fourteen, cap_fourteen, fifteen, cap_fifteen, sixteen,
                cap_sixteen, seventeen, cap_seventeen, eighteen,
        cap_eighteen, geometry, properties, id, type){
        this.name = name;
        this.thirteen = thirteen;
        this.cap_2013 = cap_thirteen;
        this.fourteen = fourteen;
        this.cap_2014 = cap_fourteen;
        this.fifteen = fifteen;
        this.cap_2015 = cap_fifteen;
        this.sixteen = sixteen;
        this.cap_2016 = cap_sixteen;
        this.seventeen = seventeen;
        this.cap_2017 = cap_seventeen;
        this.eighteen = eighteen;
        this.cap_2018 = cap_eighteen;
        this.geometry = geometry;
        this.properties = properties;
        this.id = id;
        this.type = type;
    }
}

class Map{

    constructor(data, year){
        this.year = year;
        this.stateData = data[1]
        data = data[0];

        this.projection = d3.geoAlbersUsa().scale(800).translate([305, 250]);
        let states = {};
        for(let i = 0; i < data.length; i++){
            let item = data[i];
            let year = item.date;
            year = year.slice(0,4)
            let state = item.state;
            if(state in states){
                states[state][year] += 1;
            }else{
                if(state.length >=4 && !(state.includes(':'))){
                    if(state.charAt(0) != ' '){
                        states[state] = {'2013' : 0, '2014' : 0, '2015' : 0, '2016' : 0, '2017' : 0, '2018' : 0}
                        states[state][year] += 1;
                    }

                }
            }
        }
        this.cases = states
        this.getPerCapita();
        this.colorScale = d3.scaleSequential().interpolator(d3.interpolateBlues)
            .domain([this.ultimate_min, this.ultimate_max]);

    }

    getPerCapita(){
        let mins = []
        let maxes = []

        for(let year = 2013; year<=2018; year++){
            let i = 0;
            let min = 1000;
            let max = 0;
            for(let key in this.cases){
                let state = this.stateData[i];
                if(state != undefined){
                    let population = state['pop'+year]
                    let stateData = this.cases[key][year]
                    let cap = stateData/population
                    this.cases[key]['perCap'+year] = cap
                    if(cap > max){
                        max = cap
                    }
                    if(cap < min){
                        min = cap
                    }
                }

                i++;
            }
            mins.push(min);
            maxes.push(max);

        }
        this.ultimate_min = Math.log(Math.max.apply(null, mins))
        this.ultimate_max = Math.log(Math.max.apply(null, maxes))
        console.log(this.ultimate_max, this.ultimate_min)

    }

    drawMap(country) {
        let geojson = topojson.feature(country, country.objects.states);
        let path = d3.geoPath(this.projection);
        let states = geojson.features.map(
            state => {
                let d = this.cases[state.properties.name]
                if(d != undefined){
                    return new StateData(state.properties.name, d['2013'], d['perCap2013'], d['2014'],
                        d['perCap2014'], d['2015'], d['perCap2015'], d['2016'],
                        d['perCap2016'], d['2017'], d['perCap2017'], d['2018'], d['perCap2018'],
                        state.geometry, state.properties,
                        state.id, state.type)
                }else{
                    return new StateData(state.properties.name, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0,
                        state.geometry, state.properties, state.id, state.type);
                }


            }
        )

        //plot map
        let that = this;
        let selection = d3.select('.map').append('svg').attr('height', 500).attr('width', 610);
        selection.selectAll("path").data(states).enter().append('path')
            .attr('d', path).attr('id', d => d.name).classed('states', true)
            .classed('boundary', true).style("fill", function(d){
            let cap_year = 'cap_'+that.year;
            let temp = that.colorScale(Math.log(d[cap_year]));
            return temp;
        })

        //add color

        let per_caps = [];
        for(let i = 0; i<56; i++){
            let state_info = states[i]
            let name = state_info['name']
            let cap = 0
            if(name in this.cases){
                let cap = this.cases[name]['perCap'+this.year]
            }
            per_caps.push(cap)
        }
        /*for(let key in this.cases){
            per_caps.push({'state' : key, 'cap' : this.cases[key]['perCap' + this.year]})
        }*/
        /*let temp = selection.selectAll('path')
            //.attr('fill', d => that.colorScale(d))
        console.log(temp)*/

    }

    updateYear(year){

    }

}
