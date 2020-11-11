words = [] 

words[0] = d3.json("data/data.txt")
words[1] = d3.json("data/stateData.txt")

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
    let year = '2013';

    const map = new Map(data, year)
    d3.json('data/states.json').then(mapData => {
        map.drawMap(mapData)
    });

    const timeLine = new Timeline(data);
    timeLine.draw();
}

