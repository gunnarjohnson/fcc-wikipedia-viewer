// Changes placeholder text in input form
$(document).ready(function placeholderText() {
	$('input').focus(function placeholderFocus() {
    $(this).attr('placeholder', 'Thank you, Sir. May I have another?')
	})
	.blur(function placeholderBlur() {
    $(this).attr('placeholder', 'ENTER TEXT HERE')
	})
});

// Clears any previous search results
function clearResults() {
	document.getElementById("wikipedia-viewer__results").innerHTML = "";
}

// Searches Wikipedia for pages matching form input
function searchWikipedia() {
  // Assigns form input to variable
  var searchInput = document.getElementById("wikipedia-search__input").value;
	// Executes if form input is empty
	if (searchInput == "") {
  	var div = document.createElement("div");
    document.getElementById("wikipedia-viewer__results").appendChild(div);
    // Assigns div class name
    div.className = "wikipedia-search__results";
		// Displays error message
    div.innerHTML = "<h2>INVALID ENTRY</h2><p>Please try again.</p>";
		$(div).hide().fadeIn(500);
	}
	// Executes if form input is entered (and valid)
	else {
		// Gets data from Wikimedia API using form input
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&callback=&formatversion=2&exsentences=2&exintro=1&explaintext=1&gsrsearch=" + searchInput,
			dataType: "jsonp",
			type: "POST",
			headers: {"Api-User-Agent":"Example/1.0"},
			success: function(data) {
				// Loops through resulting objects in array
				for (i = 0; i < 10; i++) {
					// Creates a div for each result
					var div = document.createElement("div");
					document.getElementById("wikipedia-viewer__results").appendChild(div);
					// Assigns div class name
					div.className = "wikipedia-search__results";
					// Adds title and extract to each div
					var title = data.query.pages[i].title;
					var extract = data.query.pages[i].extract;
					div.innerHTML = "<h2>" + title + "</h2><p>" + extract + "</p>";
					$(div).hide().fadeIn(500);
					// Function executes when a div is clicked, opening relevant link
					let pageIdNumber = data.query.pages[i].pageid;
					div.id = "wikipedia-search__results--" + i;
					div.style.cursor = 'pointer';
					document.getElementById(div.id).onclick = function() {
						window.open("https://en.wikipedia.org/?curid=" + pageIdNumber, "_blank","resizable=yes");
        	}
      	}
    	}
  	});
	}
}

// Pressing enter on keyboard registers as search button click
$("#wikipedia-search__input").keyup(function hitEnter(event){
    if(event.keyCode == 13){
        $("#wikipedia-search__button").click();
    }
});

// Calls functions when button is clicked
var searchButton = document.getElementById("wikipedia-search__button");
searchButton.addEventListener("click", clearResults, false);
searchButton.addEventListener("click", searchWikipedia, false);
