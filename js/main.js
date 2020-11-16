words = [] 

words[0] = d3.json("data/data.txt")
words[1] = d3.json("data/stateData.txt")
words[2] = d3.json("data/stateData.json")

//data at 0 is the gun violence json
//data at 1 is the state population
Promise.all(words).then(data =>
{
    //verify loading works
    //console.log(data);

    //create objects
    create_objects(data)

});

function create_objects(data) {
    let year = '2014';

    const map = new Map(data[2], year);
    d3.json('data/states.json').then(mapData => {
        map.drawMap(mapData)
    });

    //const state = new State(data);

    const timeLine = new Timeline(data);
    timeLine.draw();

    //const incidents = new IncidentList(data);
    //incidents.draw();

    //const storyPane = new Story(data);
    //storyPane.draw();
}

