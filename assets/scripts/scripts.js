$(document).ready(function () {
  // array for inputs
  let btnArray = ["dogs", "cows", "bees", "trees", "lemons"];

  function addButtons() {
    let search = $(this).data("search");

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=eaGM9Ozx693334fR78RrpJPvXUWnuRPg&limit=12";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      let results = response.data;
      
      for (let i = 0; i < results.length; i++) {

        let $gifDiv = $("<div class='col-md-5'>");
        let $gifRating = results[i].rating;
        let animationState = results[i].images.fixed_height.url;
        let staticGif = results[i].images.fixed_height_still.url;
        let $gif = $("<img>");
        let $p = $("<p>").text("Rating: " + $gifRating);
  
//       TODO:  should edit to pass as obj instead of multi line
        $gif.attr("src", staticGif);
        $gif.addClass("gif");
        $gif.attr("data-state", "still");
        $gif.attr("data-still", staticGif);
        $gif.attr("data-animate", animationState);
        $gifDiv.append($gif);
        $gifDiv.append($p);

        $("#gifResults").find(".row").prepend($gifDiv);
      }
    });
  }

  $("#search").on("click", function (event) {

    event.preventDefault();
    let newSearch = $("#searchInput").val().trim();
//     console.log(newSearch);
    btnArray.push(newSearch);
    $("#searchInput").val('');
    displayButtons();

  });

  function displayButtons() {

    $("#btnGroup").empty();

    for (let i = 0; i < btnArray.length; i++) {

      let newBtn = $('<button class="btn btn-primary newSearch" type="button" style="margin-right: 5px; margin-top: 5px;">');
      newBtn.attr("data-search", btnArray[i]);
      newBtn.text(btnArray[i]);
      $("#btnGroup").append(newBtn);

    }
  }

  displayButtons();

  function gifstateChange() {

    let gifState = $(this).attr("data-state");
    if (gifState === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");

    }
  }

  $("body").on("click", ".newSearch", addButtons);
  $("body").on("click", ".gif", gifstateChange);

});
