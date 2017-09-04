// a new record array
var record = [];
// a new character bio array
var newbio = ["Swordmen are honest and as stubborn as the strong waves of the ocean. With strong physical attacks, defense, and a sense of command, a Swordman can become a headstrong leader to others. Swordmen continuously train to gain more skill and strength. After reading King Tristan 3rd's official notice recruiting adventurers, Swordmen join with the hope of becoming ever stronger. Equipped with strong armor and weapons, the brave swordman joins the world of adventure.", "Mages rely on their skills as their main source of damage, and such attacks are magically based and only take into account the target's Magical Defense, and not their Physical Defense. Furthermore, all of a Mage's spells are elemental, thus meaning the accurate use of the correct spell against the correct monsters is highly important.", "Archers are experts at long-range combat with Bows and Arrows. Their range gives them several advantages, which includes: The ability to change the element of their weapon quickly by changing their arrow type. This makes Archers able to exploit elemental advantages easily. Accuracy and damage is increased by the same stat (DEX), allowing all attacks to connect and deal a lot of damage. Range enables archers to defeat stationary or slow-moving opponents that are stronger than they are without being hit.", "Always on the lookout for profit, Merchants are the economic experts of Ragnarok Online. Setting out to make a fortune, playing as a Merchant will allow the player to get the most out of every last zeny. Merchants are also handy with items, being able to carry far more than other classes thanks to their Enlarge Weight Limit and Pushcart abilities.", "Waiting in the shadows, planning where they'll strike next, the mischievous Thieves are a force to reckon with. Swift and powerful, few can keep up with a Thief's attack speed and power, whether they're slashing their way in battle with a sharp dagger, or striking from afar with a bow. Striking them down isn't easy either, coupling their high flee with the ability to become invisible and poison their pursuers, Thieves have only magic to fear.", "Acolytes live their lives serving the Catholic Church and following the religious teachings. They train to become selfless and devoted individuals, aiming to help all that they meet. While the main location for Acolytes, like other members, is the Church in Protera, it isn't uncommon to find Acolytes travelling with adventurers around the world, especially adventurers recruited by King Tristan III. The religious teachings forbid Acolytes and other members of the Church from using bladed weapons.", "The Knight class is the primary second job for the Swordman class. Being a hack and slash type of character, Knights are granted access to a new mastery that will open a new type of weapon to wield aside from the Swordman's swords. They are also allowed to acquire powerful AoE skills like the famed Bowling Bash and the spear exclusive skill, Brandish Spear.", "Wizards are powerful offensive magic users. They rely on dangerous magic strikes as well as devastating Area of Effect spells to wreak havoc.", "Hunters are skillful at indirect combat. Their increased ASPD with bows helps makes them superior to Archers in ranged combat. They are also able to lay mines and traps on the ground to hinder or catch mobs. These traps will cause various status effects (Sandman inflicts the status sleep, for example) or cause elemental damage (i.e. Blast Mine, Land Mine) to a target. Additionally, they have a powerful subcharacter, the Falcon. Falcons are highly effective at dealing consistent damage, as their damage ignores DEF.", "Easily the most powerful of all the 2nd classes, the Blacksmiths sport damage equal to that of the trans 2nd classes(except their own trans class of course). Their only weakness lies in the fact that they only have 1 multitarget AoE spell (Cart Revolution) that has knockback and limited range, making it hard to target with.", "Assassins (and their transcended Assassin Cross) are able to equip a weapon in each hand and the exclusive users of Katar weapons. Assassins have a variety of damage dealing and poisoning skills. The Assassin are the only class who can walk slightly faster than any other class ingame as long as they leveled the proper skill (Thief's Improve Dodge). The Katar wielding Assassins also receive double the normal amount of critical hit rate. Therefore, whatever amount of critical rate Assassins have, it would always be doubled.", "Once Acolytes have undergone rigorous spiritual training and have served the Church and the community as a whole, they have the opportunity to be promoted within the ranks of the Church. If the Monk is said to train their body to fight evil and the Undead physically, the Priest does so with magic. As their spiritual journey brings them closer to God, they gain advanced skills in healing as well as new ways to assist their allies and harm their foes. They are able to resurrect fallen comrades, protect them from harm, and bless their weapons."];
// call the add character function
var addared = $("#addarea");
$(document).on("submit", function(event) {
	addCharacter(event);
});
// load the character
$(document).ready(function() {
	createCharacter();
});
// call the search function
$("#search").keyup(function() {
	searchCharacter();
});
$("#class").change(function() {
	setJob($(this));
});
// the character object
function character(characterid, characterjob, characterclasses, characterbio) {
	this.id = characterid;
	this.job = characterjob;
	this.class = characterclasses;
	this.bio = characterbio; 
}
// function to create new character
function createCharacter() {
	// read from JSON file
	$.getJSON("data.json", function(data){
		for(var i=0; i<data.characters.length; i++) {
			record[i] = new character(i, data.characters[i].job, data.characters[i].class, data.characters[i].bio);
			// call display character function
			displayCharacter(record[i]);
		}
		// Testing load data
		//console.table(record);
	});
}
// function to set job according to the class
function setJob(element) {
	if(element.val() == "First") {
		$("#job").html("<option>Swordman</option><option>Mage</option><option>Archer</option><option>Merchant</option><option>Thief</option><option>Acolyte</option>");
	}
	else {
		$("#job").html("<option>Knight</option><option>Wizard</option><option>Hunter</option><option>Blacksmith</option><option>Assassin</option><option>Priest</option>");
	}
}
// function to add new character
function addCharacter() {
	// don't refresh when submit
	event.preventDefault();
	// set the id to the length
	var i = record.length;
	// use record array to store new data
	record[i] = new character(i, addarea.job.value, addarea.class.value, checkBio(addarea.job.value));
	displayCharacter(record[i]);
	storeCharacter();
}
// function to display character into HTML
function displayCharacter(character) {
		var output = "<li id=\"" + character.id + "\">";
		output += "<h2>";
		output += character.job;
		output += "</h2>";
		output += "<img src=\"images/" + character.job + ".png\" alt=\"" + character.job + "\">";
		output += "<h4>";
		output += character.class;
		output += "</h4>";
		output += "<p>";
		output += character.bio;
		output += "</p>";
		output += "<button id=\"delete" + character.id + "\"";
		output += " class=\"btn btn-danger\">DELETE</button>";
		output += "</li>";
		$(".searchresults").append(output);
		// add the click to the delete button
		$("#delete"+character.id).click(function() {
			// call the delete function
			deleteCharacter($(this));
		});
}
// function to delete data
function deleteCharacter(element) {
    //get the target's id without the 'delete'
	var $num = Number(element.attr("id").slice(6));
	for(var i=$num; i<record.length-1; i++) {
		// rewrite the deleted data with the following data
		record[i] = record[i+1];
		record[i].id = i;
		$("#delete"+(i+1)).attr("id", "delete"+i);
		$("#"+(i+1)).attr("id", i);
	}
	// pop the data
	record.pop();
	// fade the row
	element.parent().fadeOut(500, function() {
		$(this).remove();
	});
	storeCharacter();
	// Testing delete Output
	//console.table(record);
}
// function to save data into JSON file
function storeCharacter() {
    var mydata = {"characters": record};
    // call the AJAX function to save data
	$.ajax({
		// use GET to save data
		type: "GET",
		dataType: "json",
        url: "storage.php",
        data: { data: JSON.stringify(mydata)},
        success: function () {console.log("Data Saved."); },
        failure: function() {console.log("Saving Data failed, please try again.");}
	});
	// use POST to save data
    //$.post("storage.php", {json: JSON.stringify(mydata)});
}
// function to search data
function searchCharacter() {
	var searchField = $("#search").val();
	var myExp = new RegExp(searchField, "i");
	// search for the data and match to the search value
	$.each(record, function(i, val) {
		if((val.job.search(myExp) < 0) && (val.class.search(myExp) < 0) && (val.bio.search(myExp) < 0) ) {
			$("#"+val.id).hide();
		}
		else {
			$("#"+val.id).show();
		}
	});
}
// function to read bio
function checkBio(character) {
	switch(character) {
		case "Swordman":
		return newbio[0];
		break;
		case "Mage":
		return newbio[1];
		break;
		case "Archer":
		return newbio[2];
		break;
		case "Merchant":
		return newbio[3];
		break;
		case "Thief":
		return newbio[4];
		break;
		case "Acolyte":
		return newbio[5];
		break;
		case "Knight":
		return newbio[6];
		break;
		case "Wizard":
		return newbio[7];
		break;
		case "Hunter":
		return newbio[8];
		break;
		case "Blacksmith":
		return newbio[9];
		break;
		case "Assassin":
		return newbio[10];
		break;
		case "Priest":
		return newbio[11];
		break;
	}
}