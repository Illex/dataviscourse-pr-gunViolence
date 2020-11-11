
class StateData{
    constructor(name, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, geometry, properties, id, type){
        this.name = name;
        this.thirteen = thirteen;
        this.fourteen = fourteen;
        this.fifteen = fifteen;
        this.sixteen = sixteen;
        this.seventeen = seventeen;
        this.eighteen = eighteen;
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

        this.colorScale = d3.scaleThreshold()
            .domain([0, .25, .5, .75, 1])
            .range(d3.schemeBlues[5]);
        this.getPerCapita();
    }

    getPerCapita(){
        console.log(this.cases)
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
        console.log(maxes, mins);

    }

    drawMap(country) {
        let geojson = topojson.feature(country, country.objects.states);
        let path = d3.geoPath(this.projection);
        let states = geojson.features.map(
            state => {
                let d = this.cases[state.properties.name]
                if(d != undefined){
                    return new StateData(state.properties.name, d['2013'], d['2014'],
                        d['2015'], d['2016'], d['2017'], d['2018'], state.geometry, state.properties,
                        state.id, state.type)
                }else{
                    return new StateData(state.properties.name, 0, 0, 0, 0, 0, 0,
                        state.geometry, state.properties, state.id, state.type);
                }


            }
        )

        //plot map
        let selection = d3.select('.map').append('svg').attr('height', 500).attr('width', 610);
        selection.selectAll("path").data(states).enter().append('path')
            .attr('d', path).attr('id', d => d.name).classed('states', true)
            .classed('boundary', true)

        //add color

    }

    updateYear(year){

    }

}