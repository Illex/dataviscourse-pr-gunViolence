
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

    constructor(data){
        data = data[0];
        this.projection = d3.geoAlbersUsa().scale(140).translate([365, 225]);
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
    }

    drawMap(country) {
        let geojson = topojson.feature(country, country.objects.states);
        let path = d3.geoPath(this.projection);
        console.log(country)
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

        let selection = d3.select('.map').append('svg');
        selection.selectAll("path").data(states).enter().append('path')
            .attr('d', path).attr('id', d => d.name).classed('states', true)
            .classed('boundary', true);
    }

}