class Timeline{

    constructor(d){
        this.data = d;
        //get min and max violence rate
    }

    //performs first time setup of the timeline
    draw(){
        //TODO: make time frame selector bar
        //TODO: make x axis with tick numbers equal to the time frame range
        //TODO: make a y scale that scales the line based on the ratio of selectedAttribute/gun Violence
        //TODO: get the elements on the page
        //
        //~~~~~~~~~~~~ build timeline using drop down menus first, then look into building a double slider ~~~~~~~~~~
        //double slider problem is non trivial
        //  possibly use example here for building double slider
        //  http://giacomoballi.com/blog/css-range-double-slider
        //
        //
        //get gun violence to population rate 

        //storage for the rate at each month
        let globalRate = []
        //the default date
        let date = "2013-01";
        let counter = 0

        //for every event
        for(let i = 0; i < this.data[0].length; i++){
            //if it's date is equal to the current one, increment
            if(this.data[0][i].date.substr(0,7) === date){
                counter++;
            }
            //if it's not, we're done counting events in that month
            else{
                //console.log(this.data[0][i].date.substr(0,7))
                globalRate.push(counter);
                date = this.data[0][i].date.substr(0,7);
                counter = 0;
            }
        }
        console.log("global rate");
        console.log(globalRate);

        //add up the total population for each year
        let population = []
        population["2013"] = 0;
        population["2014"] = 0;
        population["2015"] = 0;
        population["2016"] = 0;
        population["2017"] = 0;
        population["2018"] = 0;

        for(let i = 0; i < this.data[1].length; i++){
            population["2013"] = this.data[1][i].pop2013;
            population["2014"] = this.data[1][i].pop2014;
            population["2015"] = this.data[1][i].pop2015;
            population["2016"] = this.data[1][i].pop2016;
            population["2017"] = this.data[1][i].pop2017;
            population["2018"] = this.data[1][i].pop2018;
        }

        //console.log("population")
        //console.log(population)

        console.log(this.data)
        //let selection = d3.select(".timeline").append("svg").attr("height", 410).attr("width", 610).attr("id", "time-line")
        //append g for each element on the svg

        //x axis goes from 0 to 63
        //draw the line chart as a rate of "global" violence rates/deaths
    }

    //updates the timeline based on the filters
    update(){

    }
}

let button1Handler = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("button1Handler");
}

let changeData = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("changing data");
}

let changeOrder = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("change order")
}

let selectAllHandler = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("selectAll")
}

let clearHandler = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("clear")
}
