
class StateData{
    constructor(){
        this.projection = d3.geo.albersUsa().scale(140).translate([365, 225]);
        this.nameArray = data.population.map(d => d.geo.toUpperCase());
        this.populationData = data.population;
        this.updateCountry = updateCountry;
    }
}

class Map{


    drawMap(country) {
        let geojson = topojson.feature(country, country.properties.name);
        let path = d3.geoPath(this.projection);
        /*let states = geojson.features.map(
            state => {
                let ind = this.nameArray.indexOf(country.id)
                if(ind != -1){
                    let region = this.populationData[ind].region
                    return new StateData(country.type, country.id, country.properties, country.geometry, region)
                }else{
                    return new StateData(country.type, country.id, country.properties, country.geometry, null)
                }

            }
        )*/

        let selection = d3.select('.map').append('svg');
        selection.selectAll("path").data(states).enter().append('path')
            .attr('d', path).attr('id', d => d.id).attr('class', d => d.region)
    }

}