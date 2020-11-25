class Timeline{

    constructor(d){
        this.data = d;
        //get min and max violence rate
        this.ratios = [];
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
                globalRate.push(counter);
                date = this.data[0][i].date.substr(0,7);
                counter = 0;
            }
        }

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
        //let ratios = [];
        //2014
        for(let i = 0; i < 12; i++){
            this.ratios[i] = globalRate[i+12] / population["2014"]
        }
        //2015
        for(let i = 0; i < 12; i++){
            this.ratios[i+12] = globalRate[i+24] / population["2015"]
        }
        //2016
        for(let i = 0; i < 12; i++){
            this.ratios[i+24] = globalRate[i+36] / population["2016"]
        }
        //2017
        for(let i = 0; i < 12; i++){
            this.ratios[i+36] = globalRate[i+48] / population["2017"]
        }
        //2018 only has 3 months of data
        for(let i = 0; i < 2; i++){
            this.ratios[i+48] = globalRate[i+60] / population["2018"]
        }

        //setup scales
        //set a scale for the first year recorded
        let pane = d3.select(".timeline").append("svg").attr("id", "timeline-pane")
            .attr("width", "650")
            .attr("height", "450")
        let timeAxis = d3.select("#timeline-pane").append("g")
            .attr("id" , "timelineAxis")
            .attr("transform", "translate(20,400)")

        let tempScale = d3.scaleLinear().domain([0, 11]).range([0, 600]);
        let xAxis = d3.axisBottom(tempScale).ticks(12).tickSize("15")

        //style axis
        let axis = d3.select("#timelineAxis").call(xAxis)
            axis.select('.domain').attr("opacity", "0")
            axis.selectAll("text").remove();
        
        //draw global path
        let yScale = d3.scaleLinear().domain([0, d3.max(this.ratios, d => d)]).range([600, 0])
        let ALineGenerator = d3
            .line()
            .x((d, i) => tempScale(i))
            .y(d => yScale(d))
        //TODO: fix line chart drawing
        let ALineChart = d3.select("#timeline-pane").append("g").append("path").attr("id", "countryPath")
            .attr("transform", " translate(20, 100)")
            .attr("fill", "none")
            .attr("stroke-width", "2")
            .attr("stroke", "steelBlue")
        //datum is the year 2014
            .datum(this.ratios.slice(12,24))
            .attr("d", function(d){
                return ALineGenerator(d);
            });

        }

        chartUpdate(states){

            //transition the ratio line for the whole country between years on update
            console.log("ratio data")
            console.log(this.ratios)
            //x scale
        let tempScale = d3.scaleLinear().domain([0, 11]).range([0, 600]);
            //y scale
        let yScale = d3.scaleLinear().domain([0, d3.max(this.ratios, d => d)]).range([600, 0])
        let ALineGenerator = d3
            .line()
            .x((d, i) => tempScale(i))
            .y(d => yScale(d))

         let year = document.getElementById("yearFilter").value;
          let pathData = []
           if(year ==="2014"){pathData = this.ratios.slice(0,12)}
            else if(year ==="2015"){pathData = this.ratios.slice(12,24)}
            else if(year ==="2016"){pathData = this.ratios.slice(24,36)}
            else if(year ==="2017"){pathData = this.ratios.slice(36,48)}
            else if(year ==="2018"){pathData = this.ratios.slice(48,)};

            d3.select("#countryPath")
            .attr("transform", " translate(20, 100)")
            .attr("fill", "none")
            .attr("stroke-width", "2")
            .attr("stroke", "steelBlue")
            .datum(pathData)
            .transition().attr("d", function(d){
                return ALineGenerator(d);
            })
    }
    

    
}
