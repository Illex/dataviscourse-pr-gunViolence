words = [] 

words[0] = d3.json("data/data.txt")
words[1] = d3.json("data/stateData.txt")
words[2] = d3.json("data/stateData.json")
words[3] = d3.json('data/count_distribution.json')

//data at 0 is the gun violence json
//data at 1 is the state population
//data at 2 is state metrics by year
Promise.all(words).then(data =>
{
    //verify loading works
    //console.log(data);

    this.activeYear = 2014;
    this.states = new Set();
    let that = this;

    function updateState(state) {
        //pass in a null to clear the set
        if(that.states.has(state)){
            that.states.delete(state);
        }else if(state != null){
            that.states.add(state);
        }else{
            that.states = new Set();
        }
        //console.log(that.states)
        // TODO - update state filters
        by_state.addState(that.states);
        gender.addState(that.states);
        //update states in the incident list
        incidents.storyUpdate(states);
        timeLine.chartUpdate(states, data);
    }

    function updateYear(year){
      //  console.log(year)
        that.activeYear = year;
        map.updateYear(year);
        gender.changeYear(year);
    }

    //create objects
    const map = new Map(data[2], this.activeYear, updateState, updateYear);
    d3.json('data/states.json').then(mapData => {
        map.drawMap(mapData)
    });

    const by_state = new State(data, this.activeYear, this.states, updateState, updateYear);
    by_state.drawBars();

    const gender = new Gender(data, this.activeYear, this.states);
    gender.drawHist();

    const timeLine = new Timeline(data);
    timeLine.draw();

    const incidents = new IncidentList(data);
    incidents.draw();
    //add event handlers for filters
    d3.select("#dataFilter").on("change", function(d){
        //every time this filter is changed all the following funcitons are called
        incidents.storyUpdate(states);
        timeLine.chartUpdate();
    })
    d3.select("#orderSelect").on("change", function(d){
        //every time this filter is changed all the following funcitons are called
        incidents.storyUpdate(states);
    })
    d3.select("#yearFilter").on("change", function(d){
        //every time this filter is changed all the following funcitons are called
        let year = document.getElementById('yearFilter').value
        updateYear(year)
        incidents.storyUpdate(states);
        timeLine.chartUpdate();
    })
    d3.select("#monthFilter").on("change", function(d){
        //every time this filter is changed all the following funcitons are called
        incidents.storyUpdate(states);
        timeLine.chartUpdate();
    })

    const storyPane = new Story(data);
    storyPane.draw();



});



