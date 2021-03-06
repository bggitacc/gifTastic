		// gifTastic Object //

		var gifTastic = {

			// Animal Array //

		    catButton: ["Dog", "Cat", "Rabbit", "Hamster", "Skunk", "Goldfish", "Bird", "Ferret", "Turtle", "Snake", "Crab", "Goat", "Chicken", "Chupacabra", "Frog"],

		    // Add Button Method //

		    addButton: function(i) {

		       

		        var tempBut = "<button class='btn btn-default cat-but' id='" + this.catButton[i] + "'>" + this.catButton[i] + "  <span class='glyphicon glyphicon-play'></span></button>";

		        $("#catBut").append(tempBut);


		    },

		    // List Buttons To Animal Buttons Panel //

		    listBut: function() {

		        for (i = 0; i < this.catButton.length; i++) {



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

		           




		            var catImage = "<div id='img-result'><span><br><strong class='rating-top'>Rating : " + response.data[i].rating.toUpperCase() + "</strong></span><br><br><img src='" + imageUrlStatic + "' width='200' height='175' class='result-img' alt='GifTastic " + catSearch + " Gif!' data-live = '" + imageUrl + "' data-preview ='" + imageUrlStatic + "' data-status = true></span>";


		            $("#gif-result").append(catImage);

		        }

		    },



		};

		// List Array Buttons After Page Load //

		gifTastic.listBut();


		// Event Listener For Form Input //

		$('#runSearch').on('click', function() {


		    var iTerm = $("#addAnimal").val().trim();

		    // Check For Empty Input //

			if (iTerm.length > 0) {		    
		    var i = (gifTastic.catButton.length + 1);

		    gifTastic.catButton[i] = iTerm;

		    gifTastic.addButton(i); 

		    // remove input text //

			$("#addAnimal").val("");				}

		    else {

		    	return;
		    }


		    console.log($("#addAnimal").val().trim());
		});


		// Event Listener For Animal Buttons and Dynamically Added Buttons //

		$("#catBut").on("click", ".cat-but", function(event)


		    {

		        var catSearch = this.id;

		        $("#results-label").text(" Gif Results For - " + catSearch)

		        console.log(catSearch);

		        // API Query String + Animal Button ID //

		        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + catSearch + "&limit=12&api_key=dc6zaTOxFJmzC";

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