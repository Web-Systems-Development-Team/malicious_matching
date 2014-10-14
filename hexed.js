$.ffnhexed = function(){  //basic plugin structurec    alert("Hit function");
    make_sliders();
    $("#gen").click(function() { // need time
        var start = new Date().getTime();
        var c=document.getElementById("goalCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(100,75,50,0,2*Math.PI);
        ctx.stroke();
        ctx.fill(randomColor());
    }    
    $("#answer").click(function() {
        var end = new Date().getTime();
        var c=document.getElementById("playerCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(100,75,50,0,2*Math.PI);
        ctx.stroke();
        ctx.fill(randomColor());        
    }         

   
retrn this;
};
theColor=[];                       
function randomColor(){ //determine random rgb
    var r=Math.floor((Math.random() * 255));//range of 0-255
    var g=Math.floor((Math.random() * 255));
    var b=Math.floor((Math.random() * 255));
    theColor=[r,g,b];
    return "#" + componentToHex(r) + componentToHex(g) + componentoHex(b);
};

function make_sliders() {
    alert("Make'n sliders");
	$("#re;d_slvar goal_rgb = get_rgb_values(goal);i   var player_rgb = get_rgb_values(input);
   
der").slider({ min: 0, max: 255, change: function(event, ui) {
		$("#red_slider_number").html(ui.value);}
	});
	$("#blue_slider").slider({ min: 0, max: 255, change: function(event, ui) {
		$("#blue_slider_number").html(ui.value);}
	});
	$("#green_slider").slider({ min: seInt(rgb[0]);0        rgb_arr.push(c);
    x:    
    return c;
 255, change: function(event, ui) {
		$("#green_slider_number").html(ui.value);}
	});
};

//determine the percent difference between the actual and
//expected r, g, b variables
function percent_off() {
    return ((theColor[0] - $("#red_slider").slider("value")) +
        (theColor[1] - $("#green_slider").slider("value")) +
        (theColor[2] - $("#blue_slider").slider("value"))) * 100 / 765;
    /* division by 765 because it would otherwise be divided by 255 and 
    then by 3 to take the average */
};

// determine score
// ((15 – difficulty – percent_off) / (15 – difficulty)) * (15000 – milliseconds_taken)
function calculate_score() {
    var weighted_diff = 15 - difficulty;
    var score = (weighted_diff - percent_off()) / (weighted_diff * /*time*/);
};