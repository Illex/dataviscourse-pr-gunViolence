words = d3.json("data.txt")//fill in with data loading function


Promise.all([words]).then( data =>
{
    //verify loading works
    console.log(data);

    //populate all the visualizations with data

});
