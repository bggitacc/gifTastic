		// gifTastic Object //

		var gifTastic = {

			// Animal Array //

		    topics: ["Julia Roberts", "Meryl Streep", "Glenn Close", "Jodie Foster", "Sigourney Weaver", "Judi Dench", "Michelle Pfeiffer", "Kate Winslet", "Julianne Moore", "Kathy Bates", "Naomi Watts", "Nicole Kidman", "Susan Sarandon", "Amy Adams", 
		    "Sandra Bullock", "Geena Davis", "Helen Hunt", "Laura Harring"],

		    // Add Button Method //

		    addButton: function(i) {

		       

		        var tempBut = "<button class='btn btn-default cat-but' id='" + this.topics[i] + "'>" + this.topics[i] + "  <span class='glyphicon glyphicon-play'></span></button>";

		        $("#catBut").prepend(tempBut);


		    },

		    // List Buttons To Animal Buttons Panel //

		    listBut: function() {

		        for (i = 0; i < this.topics.length; i++) {



		            this.addButton(i);

		        }
		    },

		    // Reset Gif Results Panel For New Api Call //

		    reset: function() {

		        if ($("#gif-result").length > 0) {

		            $("#gif-result").children().remove();
		        }
		    },

		    // Display Api Call Json Result //

		    gifResults: function(response, catSearch) {

		        for (i = 0; i < 12; i++) {
		            //
		            var imageUrl = response.data[i].images.downsized.url;
		            var imageUrlStatic = response.data[i].images.fixed_width_still.url;
		            console.log(imageUrlStatic);

		           




		            var catImage = "<div id='img-result'><img src='" + imageUrlStatic + "' width='200' height='175' class='result-img' alt='GifTastic " + catSearch + " Gif!' data-live = '" + imageUrl + "' data-preview ='" + imageUrlStatic + "' data-status = true><br><br><span><strong class='rating-top'>Rating : " + response.data[i].rating.toUpperCase() + "</strong></span><br><br></div>";


		            $("#gif-result").append(catImage);

		        }

		    },

		    	formInput: function() {

		    		 var iTerm = $("#addAnimal").val().trim();

		    // Check For Empty Input //

			if (iTerm.length > 0) {		    
		    var i = (gifTastic.topics.length + 1);

		    gifTastic.topics[i] = iTerm;

		    gifTastic.addButton(i); 

		    // remove input text //

			$("#addAnimal").val("");				}

		    else {

		    	return;
		    }


		    console.log($("#addAnimal").val().trim());



		    }

		   

		};

		// List Array Buttons After Page Load //

		gifTastic.listBut();




		// Event Listener For Form Input //

		$('#runSearch').on('click', function() {

				gifTastic.formInput();
		   
		});


		// Event Listener For Animal Buttons and Dynamically Added Buttons //

		$("#catBut").on("click", ".cat-but", function(event)


		    {

		        var catSearch = this.id;

		        $("#results-label").text(" Gif Results For - " + catSearch)

		        console.log(catSearch);

		        // API Query String + Animal Button ID //

		        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + catSearch + "&limit=12&api_key=dc6zaTOxFJmzC";

		        //Ajax Call To API //

		        $.ajax({
		                url: queryURL,
		                method: "GET"
		            })

		            // Response From API //

		            .done(function(response) {

		                console.log(response);

		                gifTastic.reset();

		                gifTastic.gifResults(response, catSearch);


		                // Event Listener For Result Images //

		                $(".result-img").on("click", function(response) {

		                	console.log($(this));

		                    var status = $(this).data("status");

		                    console.log(status);

		                    // Play Stop Method //

		                    if (status === true) {


		                        $(this).attr("src", $(this).data("live"));
		                        $(this).css({
		                            "border-radius": "4px"
		                        });
		                        $(this).data("status", false);

		                    } else {

		                        $(this).attr("src", $(this).data("preview"));
		                        $(this).css({
		                            "border-radius": "120px 120px 10px 120px"
		                        });
		                        $(this).data("status", true);

		                    }




		                });




		            });




		    });