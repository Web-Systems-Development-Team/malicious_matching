(function($){

    $.fn.hexed = function(arg) {
        if(!(arg instanceof String)) {
            var settings = arg;
            difficulty = settings.difficulty;
            turns = settings.turns;
            init(this);
        } else {
            var action = arg;
            if(action == "name of a command") {
                ;; //do that command 
            } else {
                $.error('Action '+ action +' does not exist on jQuery.hexed');
            }
        }
        return this;
    }

    function init(hexObj) {
	//Define r,g,b variables to hold the player entered RGB.
	//When a player manipulates the text box or slider, this changes it.
	//When a function needs to read from the RGB values, it reads from this.
	red = green = blue = 255;

	//Saved score, to be used in the same fashion.
	score = 0;

	//Create the slider objects.
        make_sliders();

	//Initialize the text boxes.
	$("#red_slider_number").val(red.toString(16));
	$("#green_slider_number").val(green.toString(16));
	$("#blue_slider_number").val(blue.toString(16));

	//Add the drawing canvas and other elements.
	hexObj.append("<canvas id=\"goalCanvas\" width=\"300\" height=\"150\"></canvas>");
	/*
	hexObj.append("<div id=\"red_slider\" class=\"slider\"></div><input type=\"number\" id=\"red_slider_number\" value=\"0\">");
	hexObj.append("<div id=\"green_slider\" class=\"slider\"></div><input type=\"number\" id=\"green_slider_number\" value=\"0\">");
	hexObj.append("<div id=\"blue_slider\" class=\"slider\"></div><input type=\"number\" id=\"blue_slider_number\" value=\"0\">");
	hexObj.append("<div id=\"buttons\"><button type=\"button\" id=\"gen\">Generate Color!</button><button type=\"button\" id=\"answer\">Got it!</button></div><p id=\"score\" style=\"#f00\"></p>");
	*/
	
	//Generate Color button click
        $("#gen").click(function() { // need time
            start = new Date().getMilliseconds();
            var c=document.getElementById("goalCanvas");
            var ctx=c.getContext("2d");
            ctx.beginPath();
            ctx.arc(100,75,50,0,2*Math.PI);
            ctx.fillStyle=randomColor();
            ctx.fill();
        });

	//Got It button click
        $("#answer").click(function() {
            end = new Date().getMilliseconds();
	    calculate_score();
            $("#score").text("Red: "+red_off().toFixed(1)+"% off, Green: "+green_off().toFixed(1)+"% off, Blue: "+blue_off().toFixed(1)+"% off, Score: "+score.toFixed(1));
        });

	//Text box change
	$("#red_slider_number").input(function() {
	    alert("doopliss");
	    red = this.value;
	    $("#red_slider").value = red;
	    playerColor();
	});
    }

    //Holds the secret actual color values
    theColor=[];

    //determine random rgb                     
    function randomColor(){
        var r=Math.floor((Math.random() * 255)); //range of 0-255
        var g=Math.floor((Math.random() * 255));
        var b=Math.floor((Math.random() * 255));
        theColor=[r,g,b];
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }

    //Draws the player's color choice from the sliders next to the original
    //color
    function playerColor() {
        var c=document.getElementById("goalCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(250,75,30,0,2*Math.PI);
        ctx.fillStyle =
	    "#" + red.toString(16) + green.toString(16) + blue.toString(16);
        ctx.fill();
    }

    function make_sliders() {
        $("#red_slider").slider({ min: 0, max: 255, value: red, slide: function(event, ui) {
	    red = ui.value;
	    $("#red_slider_number").val(red.toString(16));
    	    playerColor();
        }});
        $("#green_slider").slider({ min: 0, max: 255, value: green, slide: function(event, ui) {
	    green = ui.value;
    	    $("#green_slider_number").val(green.toString(16));
    	    playerColor();
        }});
        $("#blue_slider").slider({ min: 0, max: 255, value: blue, slide: function(event, ui) {
	    blue = ui.value;
    	    $("#blue_slider_number").val(blue.toString(16));
    	    playerColor();
        }});
    }

    //determine the percent difference between the actual and
    //expected r, g, b variables
    function red_off() { return (red - theColor[0]) * 100 / 255; }
    function green_off() { return (green - theColor[1]) * 100 / 255; }
    function blue_off() { return (blue - theColor[2]) * 100 / 255; }
    function percent_off() {
        return (Math.abs(red_off()) + Math.abs(green_off()) + Math.abs(blue_off())) / 3;
    }

    // determine score
    function calculate_score() {
        var weighted_diff = 15 - difficulty;
        var calcScore = ((weighted_diff - percent_off()) / weighted_diff)
	    * (15000 - (end-start));
	score = calcScore;
    }
    
}( jQuery ));
