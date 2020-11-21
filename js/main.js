words = [] 

words[0] = d3.json("data/data.txt")
words[1] = d3.json("data/stateData.txt")
words[2] = d3.json("data/stateData.json")

//data at 0 is the gun violence json
//data at 1 is the state population
//data at 2 is state metrics by year
Promise.all(words).then(data =>
{
    //verify loading works
    //console.log(data);

    this.state = null;
    this.activeYear = 2014;
    let that = this;
    function updateState(state) {
        console.log(state)
        that.state = state;

        // TODO - update state filters

    }

    function updateYear(year){
        console.log(year)
        that.activeYear = year;
    }

    //create objects
    const map = new Map(data[2], this.activeYear, updateState, updateYear);
    d3.json('data/states.json').then(mapData => {
        map.drawMap(mapData)
    });

    //const state = new State(data);

    const timeLine = new Timeline(data);
    timeLine.draw();

    const incidents = new IncidentList(data);
    incidents.draw();

    const storyPane = new Story(data);
    storyPane.draw();

});

