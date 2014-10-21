/*
To-Do:

[Done] Text boxes do not change the input when changed, and they can go outside 0-255.
 
[Done] Text boxes display as decimal (the spec states that they need to be hex)

There seems to be a bug in the scoring system on my branch (unimplemented in master).

Many of the elements are still in the underlying DOM, and they need to be created as part of whatever object calls hexed().

Difficulty and turns remain unimplemented.
*/



(function($){

    $.fn.hexed = function(arg) {
        if(!(arg instanceof String)) {
            var settings = arg;
            difficulty = settings.difficulty;
            turns = settings.turns;
            init();
        } else {
            var action = arg;
            if(action == "name of a command") {
                ;; //do that command 
            } else {
                $.error('Action '+ action +' does not exist on jQuery.hexed');
            }
        }
        //alert("difficulty: " + difficulty + " | turns: " + turns);
        return this;
    }

    function init() {
        make_sliders();
        var turn_count = 0;
        $("#gen").click(function() { // need time
            turns = $("#turns").val();
            //alert("turns: " + turns);
            difficulty = $("#difficulty").val();
            turn_count++;
            if (turn_count <= turns) {
                start = new Date().getMilliseconds();
                var c=document.getElementById("goalCanvas");
                var ctx=c.getContext("2d");
                ctx.beginPath();
                ctx.arc(100,75,50,0,2*Math.PI);
                /* //This isn't working for some reason
                ctx.strokeStyle="#fff";
                ctx.lineWidth=1.5px;
                ctx.stroke();
                */
                ctx.fillStyle=randomColor();
                ctx.fill();
            }
        });
        $("#answer").click(function() {
            end = new Date().getMilliseconds();
        $("#score").text("Score: " + calculate_score());
        //alert(calculate_score());
        });
    }

    theColor=[];
    ansColor=[];

    function randomColor(){ //determine random rgb
        var r=Math.floor((Math.random() * 255)); //range of 0-255
        var g=Math.floor((Math.random() * 255));
        var b=Math.floor((Math.random() * 255));
        theColor=[r,g,b];
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }

    //Draws the player's color choice from the sliders next to the original color
    function playerColor() {
        //alert("playerColoe");
        var c=document.getElementById("goalCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(250,75,30,0,2*Math.PI);
        ansColor = [$("#red_slider").slider("value"), 
                    $("#green_slider").slider("value"), 
                    $("#blue_slider").slider("value")];
        ctx.fillStyle = "#" + $("#red_slider").slider("value").toString(16) +
    	$("#green_slider").slider("value").toString(16) +
    	$("#blue_slider").slider("value").toString(16);
        ctx.fill();
    }

    function make_sliders() {
        $("#red_slider").slider({ 
            min: 0, 
            max: 255, 
            slide: function(event, ui) {
        	   $("#red_slider_number").val(ui.value.toString(16));
        	   //$("#red_slider").find(".ui-slider-handle").text(ui.value);
        	   playerColor();
            }
        });
        $("#green_slider").slider({ 
            min: 0, 
            max: 255, 
            slide: function(event, ui) {
            	$("#green_slider_number").val(ui.value.toString(16));
                //$("#green_slider").find(".ui-slider-handle").text(ui.value);
        	   playerColor();
            }
        });
        $("#blue_slider").slider({ 
            min: 0, 
            max: 255, 
            slide: function(event, ui) {
            	$("#blue_slider_number").val(ui.value.toString(16));
                //$("#blue_slider").find(".ui-slider-handle").text(ui.value);
            	playerColor();
            }
        });

        /* bind input box with slider's value 
        and set the range of input box (0-255) */
        $("#red_slider_number").change(function () {
            if ($(this).val() > 255)
                $(this).val(255);
            else if ($(this).val() < 0)
                $(this).val(0);

            $("#red_slider").slider("value", parseInt($(this).val()));
            playerColor();
        });
        $("#green_slider_number").change(function () {
            if ($(this).val() > 255)
                $(this).val(255);
            else if ($(this).val() < 0)
                $(this).val(0);
 
            $("#green_slider").slider("value", parseInt($(this).val()));
            playerColor();
        });
        $("#blue_slider_number").change(function () {
            if ($(this).val() > 255)
                $(this).val(255);
            else if ($(this).val() < 0)
                $(this).val(0);
            
            $("#blue_slider").slider("value", parseInt($(this).val()));
            playerColor();
        });
    }

    //determine the percent difference between the actual and
    //expected r, g, b variables
    function percent_off() {
        return (Math.abs(theColor[0] - ansColor[0])/255 +
                Math.abs(theColor[1] - ansColor[1])/255 +
                Math.abs(theColor[2] - ansColor[2])/255) * 100 / 3;
        /* division by 765 because it would otherwise be divided by 255 and 
           then by 3 to take the average */
    }

    // determine score
    // ((15 – difficulty – percent_off) / (15 – difficulty)) * (15000 – milliseconds_taken)
    function calculate_score() {
        var weighted_diff = 15 - difficulty;
        var score = (weighted_diff - percent_off()) / (weighted_diff * (end-start));
        return percent_off() + "% off | " + score + " points";
    }
}( jQuery ));