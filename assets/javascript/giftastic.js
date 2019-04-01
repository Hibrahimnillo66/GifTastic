$(document).ready(function(){

    var gifsButtons =["cat", "dog", "lion","elephant"];


    function displayGifInfo(){
       
        var animalGif =$(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalGif + "&api_key=t4s0ND9kzm8AJyXs6k6xfGf1K78YXReV&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
        })
            .then(function(response){

                $("#holder").empty();

                for(var i=0; i<response.data.length; i++){

                    var searchDiv = $('<div class="col-md-4 search-item">');
                    var rating = response.data[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var Title = response.data[i].title;
                    var p2 = $("<p>").text("Title: " + Title);
                    var still = response.data[i].images.fixed_height_still.url;
                    var animated = response.data[i].images.fixed_height.url;
                    var animalImage = $("<img>");
                    animalImage.attr("src", still);
                    animalImage.attr('data-still', still);
                    animalImage.attr('data-animated', animated)
                    animalImage.attr('data-state', 'still');
                    animalImage.addClass('searchImage');

                    searchDiv.append(p2);
                    searchDiv.append(p);
                    searchDiv.append(animalImage);
                    $("#holder").append(searchDiv);
                    

                }
            })
    };

    $(document).on("click", '.searchImage', function(){

        var state = $(this).attr("data-state");

        if(state == "still"){
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
          }else {
            $(this).attr("src",$(this).attr("data-still"));
            $(this).attr("data-state","still");
          }
    })

    function displayButtons(){

        $("#buttons-view").empty();

        // Looping through the array of gifs
        for (var i = 0; i < gifsButtons.length; i++) {

            // Then dynamicaly generating buttons for each gif in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn");
            // Adding a data-attribute
            a.attr("data-name", gifsButtons[i]);
            // Providing the initial button text
            a.text(gifsButtons[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }

    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animalGif = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        gifsButtons.push(animalGif);

        // Calling renderButtons which handles the processing of our movie array
        displayButtons();
    });

  

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".gif-btn", displayGifInfo);


    displayButtons();








})