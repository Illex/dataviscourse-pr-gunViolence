class Timeline{

    constructor(d){
        this.data = d;
        //get min and max violence rate
    }

    //performs first time setup of the timeline
    draw(){

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
            population["2014"] += parseInt(this.data[1][i].pop2014);
            population["2015"] += parseInt(this.data[1][i].pop2015);
            population["2016"] += parseInt(this.data[1][i].pop2016);
            population["2017"] += parseInt(this.data[1][i].pop2017);
            population["2018"] += parseInt(this.data[1][i].pop2018);
        }

        //build an array that is the ratio of gun violence/population for each month
        let ratios = [];
        //2014
        for(let i = 0; i < 12; i++){
            ratios[i] = globalRate[i+12] / population["2014"]
        }
        //2015
        for(let i = 0; i < 12; i++){
            ratios[i+12] = globalRate[i+24] / population["2015"]
        }
        //2016
        for(let i = 0; i < 12; i++){
            ratios[i+24] = globalRate[i+36] / population["2016"]
        }
        //2017
        for(let i = 0; i < 12; i++){
            ratios[i+36] = globalRate[i+48] / population["2017"]
        }
        //2018 only has 3 months of data
        for(let i = 0; i < 2; i++){
            ratios[i+48] = globalRate[i+60] / population["2018"]
        }

        //setup scales
        //set a scale for the first year recorded
        console.log("sub data")
        //console.log(ratios.slice(0,12))
        let pane = d3.select(".timeline").append("svg").attr("id", "timeline-pane")
            .attr("width", "650")
            .attr("height", "450")
        let timeAxis = d3.select("#timeline-pane").append("g")
            .attr("id" , "timelineAxis")
            .attr("transform", "translate(20,400)")

        let tempScale = d3.scaleLinear().domain([0, 11]).range([0, 600]);
        console.log("tempScale")
        console.log(tempScale(12))
        let xAxis = d3.axisBottom(tempScale).ticks(12).tickSize("15")

        //style axis
        let axis = d3.select("#timelineAxis").call(xAxis)
            axis.select('.domain').attr("opacity", "0")
            axis.selectAll("text").remove();

        //let bScale = d3.scaleLinear().domain([0, d3.max(ratios.slice(0, 12), d => d[0])]).range([0, 400]).nice()

        //make a path for the timeline
//        let iScale = d3.scaleLinear()
 //           .domain([0, 12])
  //          .range([0, 500])
//
 //       let yScale = d3.scaleLinear()
  //          .domain([d3.min(ratios.slice(12,24), d => d[0]), d3.max(ratios.slice(12,24), d => d[0])])
   //         .range([0, 500])
//
 //       let pathGenerator = d3.area()
  //          .x((d,i) => iScale(i))
   //         .y0(0)
    //        .y1(d => yScale(d))
//
 //       let lineChart = d3.select("#timeline-pane").append("g").attr("id", "charPath")
  //          .datum(ratios.slice(12,24))
   //         .attr("d", function(d){
    ////            return pathGenerator(d);
      //      })

    }

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

let clearHandler = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("clear")
}

let changeYear = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("changeYear")
}

let changeMonth = function(){
    //TODO: fill this in
    console.log("implement This")
    console.log("changeMonth")
}
