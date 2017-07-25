// globals
var hpuser = [200, 220, 200];
var level = 1;
var enemytotal = 7;
var hpenemy = [200, 400, 200, 200, 300, 300, 200];
var attackuser = [30, 25, 25];
var attackenemy = [31, 32, 30, 28, 35, 23, 35]
var characters = ["ed", "al", "roy"];
var characters1 = ["Edward Elric", "Alphonse Elric", "Roy Mustang"];
var homunculus = ["envy", "gluttony", "greed", "lust", "pride", "sloth", "wrath"];
var factorad = [1, 0.9, 1.1, 1, 1, 1.2, 1];
var factorel = [1, 1, 1, 0.8, 1.1, 1, 1.2];
var factorroy = [1, 1.3, 1, 1.5, 1, 1, 0.8];
var factors = [factorad, factorel, factorroy];
var factorwin = 1 + (Math.floor(Math.random() * 6) + 7 + 1) / 100;
var factorhp = 1 + (Math.floor(Math.random() * 4) + 2 + 1) / 100;

// placeholders
var factordamage;
var indexself;
var indexdefender;
var hpself;
var hpdefender;
var charactername;
var defendername;

// pick up character
$(".character").on("click", function() {
	indexself = characters.indexOf($(this).attr("id"));
	hpself = hpuser[indexself];
	charactername = characters1[indexself]
	$("#characters").empty();
	$("#player").html("Your Character: " + charactername + "<br>" + "<img src='assets/images/"+ $(this).attr("id") + ".jpg' class='user'>");
	$("#enemy").css("display", "block");
})

// pick up enemy
$(".homunculus").on("click", function() {
	$("#damage").empty();
	indexdefender = homunculus.indexOf($(this).attr("id"));
	hpdefender = hpenemy[indexdefender];
	defendername = homunculus[indexdefender][0].toUpperCase() + homunculus[indexdefender].substring(1, );
	$(this).remove();
	$(".homunculus").css("width", "100px");
	$(".homunculus").css("border", "0");
	$("#defender").html("Defender: " + defendername + "<br>" + "<img src='assets/images/" + $(this).attr("id") + ".jpg' class='defender'>" + "<br><button type='button' id='attack'>Attack</button>")

// damage calculation
	$("#attack").on("click", function() {
		$("#damage").empty();
		factordamage = (Math.floor(Math.random() * 10) + 90 + 1) / 100;
		var damagedef = attackuser[indexself] * factors[indexself][indexdefender] * factordamage;
		hpdefender -= damagedef;
		factordamage = (Math.floor(Math.random() * 10) + 90 + 1) / 100;
		var damageself = attackenemy[indexdefender] * factordamage;
		hpself -= damageself;

// damage output		
		$("#damage").html("<p>You attacked " + defendername + " for " + damagedef.toFixed(1) + " damage</p>"
			+ "<p>" + defendername + " attacked you back for " + damageself.toFixed(1) + " damage</p>");

// level-up or die (lol)
		if (hpself > 0 && hpdefender <= 0 && enemytotal != 0) {
			// update level, attack and hp
			$("#attack").remove();
			$("#damage").empty();
			level += 1;
			enemytotal -= 1;
			$("#defender").empty();
			$("#damage").html("You've defeated " + defendername + ", try to challenge other enemies with appropriate strategy.")
			hpself = hpuser[indexself] * factorhp;
			for (i = 0; i < factors[indexself].length; i++) {
				factors[indexself][i] = factors[indexself][i] * factorwin;
			}
		}

		else if (hpself <= 0 && hpdefender <= 0) {
			$("#attack").remove();
			$("#enemy").css("display", "none");
			$("#damage").empty();
			$("#damage").html("You are tied. Try again to win with better strategy.<br><button type='button' onclick='window.location.reload()'>Try Again</button>")
		}

		else if (hpself <= 0 && hpdefender >=0) {
			$("#attack").remove();
			$("#enemy").css("display", "none");
			$("#damage").empty();
			$("#damage").html("You've been defeated...try again.<br><button type='button' onclick='window.location.reload()'>Try Again</button>")
		}

		else if (enemytotal == 0) {
			$("#attack").remove();
			$("#damage").empty();
			$("#damage").html("You've defeated all homunculus, big congratulations!<br><button type='button' onclick='window.location.reload()'>Have Fun Again</button>")
		}

	})
})