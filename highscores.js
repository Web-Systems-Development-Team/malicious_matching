(function($){

	// this is for all highscore table objects
	// which is okay since they're sharing local storage anyway
	var highscores = null;

	// main plugin method
	$.fn.highscore_table = function(action) {
		if(!action)
			load_highscores(this);
		else if(action == "load")
			load_highscores(this);
		else if(action == "clear")
			clear_highscores(this);
		else if(action == "save")
			save_highscores(this);
		else if(action == "draw")
			draw_highscores(this);
		else if(action == "add")
			add_highscore(this, arguments[1], arguments[2]);
		else {
			$.error('Action '+ action +' does not exist on jQuery.highscore_table');
		}
		return this;
	};

	// other plugin methods
	function load_highscores(obj) {
		var str = localStorage.getItem("highscores");
		if(str != "undefined") {
			var hs = JSON.parse(str);
			highscores = hs;
			draw_highscores(obj);
		}
		return this;
	}

	function clear_highscores(obj) {
		localStorage.removeItem("highscores");
		highscores = null;
		return this;
	}

	function save_highscores(obj) {
		localStorage.setItem("highscores", JSON.stringify(highscores));
		return this;
	};

	function draw_highscores(obj) {
		if(highscores) {
			// var songs = data.playlist.songs;
			// for(var i=0; i<songs.length; ++i) {
			var text = "<tr><td>Name</td><td>Score</td></tr>";
			var scores = highscores.scores;
			for(var i=0; i<scores.length; ++i) {
				text +="<tr><td>"+scores[i].name+"</td><td>"+scores[i].score+"</td></tr>"
			}
			obj.html(text);
		} else {
			obj.html("No high scores. Play some!!");
		}
		return this;
	};

	function add_highscore(obj, name, score) {
		var reccord = { "name":name, "score":score};
		if(highscores) {
			highscores.scores.push(reccord);
			highscores.scores.sort(function(a, b) {
				return b.score - a.score;
			});
			// trim down to 10 elements
			while(highscores.scores.length > 10)
				highscores.scores.pop();
		} else {
			highscores = new Object();
			highscores.scores = [reccord];
		}
		draw_highscores(obj);
		// save_highscores(obj);
		return this;
	};

}( jQuery ));