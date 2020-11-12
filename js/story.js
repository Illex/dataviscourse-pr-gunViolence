class Story{

    constructor(d){
        this.data = d;
    }

    draw(){

        //upper outline
            d3.select(".story")
            .append("svg").attr("id", "outline-top")
            .attr("width", "300")
            .attr("height", "20")
            d3.select("#outline-top").append("g").append("line")
            .attr("x1", "0")
            .attr("x2", "300")
            .attr("y1", "6")
            .attr("y2", "6")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width","4");

        //bottom outline
            d3.select(".story")
            .append("svg").attr("id", "outline-bottom")
            .attr("transform", "translate(0,472)")
            .attr("width", "300")
            .attr("height", "20")
            d3.select("#outline-bottom").append("g").append("line")
            .attr("x1", "0")
            .attr("x2", "300")
            .attr("y1", "6")
            .attr("y2", "6")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width","4");
        
        //left outline
            d3.select(".story")
            .append("svg").attr("id", "outline-left")
            .attr("transform", "translate(0,-43)")
            .attr("width", "4")
            .attr("height", "500")
            d3.select("#outline-left").append("g").append("line")
            .attr("x1", "2")
            .attr("x2", "2")
            .attr("y1", "0")
            .attr("y2", "498")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width","4");

        //right outline
            d3.select(".story")
            .append("svg").attr("id", "outline-right")
            .attr("transform", "translate(292,-43)")
            .attr("width", "4")
            .attr("height", "500")
            d3.select("#outline-right").append("g").append("line")
            .attr("x1", "2")
            .attr("x2", "2")
            .attr("y1", "0")
            .attr("y2", "498")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width","4");
    }

    update(){
        //TODO: fill this in
    }
}
