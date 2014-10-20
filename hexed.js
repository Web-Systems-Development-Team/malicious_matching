var theColor=[];
var ansColor=[];
var start = 0;
var end = 0;
var difficulty = 0;


$.fn.hexed = function() {
    make_sliders();
    $("#gen").click(function() { // need time
        start = new Date().getMilliseconds();
        //alert(start);
        var c=document.getElementById("goalCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(100,75,50,0,2*Math.PI);
        ctx.stroke();
	    ctx.fillStyle=randomColor();
        ctx.fill();
        //var d=document.getElementById("playerCanvas");
        //d.hide();
    });
    $("#answer").click(function() {
        //alert("click got it");
        end = new Date().getMilliseconds();
        //alert(end);
        var c=document.getElementById("playerCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(100,75,50,0,2*Math.PI);
        ctx.stroke();
        var getR = parseInt($("#red_slider_number").text().trim(), 10);
        //alert("r = " + getR);
        var getG = parseInt($("#green_slider_number").text().trim(), 10);
        var getB = parseInt($("#blue_slider_number").text().trim(), 10);
        ansColor = [getR, getG, getB];
        ctx.fillStyle = "#" + getR.toString(16) + getB.toString(16) + getG.toString(16);;
        ctx.fill();
        alert("percent off = " + percent_off() + "%");
        alert("score = " + calculate_score());

        //alert(ansColor[0] + " " + ansColor[1] + " " + ansColor[2]);     
    });
    return this;
}

                    
function randomColor(){ //determine random rgb
    var r=Math.floor((Math.random() * 255)); //range of 0-255
    var g=Math.floor((Math.random() * 255));
    var b=Math.floor((Math.random() * 255));
    theColor=[r,g,b];
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

function make_sliders() {
    $("#red_slider").slider({ min: 0, max: 255, change: function(event, ui) {
	$("#red_slider_number").html(ui.value);}
			    });
    $("#green_slider").slider({ min: 0, max: 255, change: function(event, ui) {
	$("#green_slider_number").html(ui.value);}
			      });
    $("#blue_slider").slider({ min: 0, max: 255, change: function(event, ui) {
	$("#blue_slider_number").html(ui.value);}
			     });
}

//determine the percent difference between the actual and
//expected r, g, b variables
function percent_off() {
    return ((theColor[0] - ansColor[0]) +
            (theColor[1] - ansColor[1]) +
            (theColor[2] - ansColor[2])) * 100 / 765;
    /* division by 765 because it would otherwise be divided by 255 and 
       then by 3 to take the average */
}

// determine score
// ((15 – difficulty – percent_off) / (15 – difficulty)) * (15000 – milliseconds_taken)
//not finished yet, the /*time*/ must be replaced

function calculate_score() {
    var weighted_diff = 15 - difficulty;
    //alert("start:" + start);
    //alert("end:" + end);
    var score = (weighted_diff - percent_off()) / (weighted_diff * (start-end));
    if(score < 0)
        return 0;
    return score;
}

