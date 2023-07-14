$(document).ready(() => {

  //fetcting data/tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: "GET",
      success: function(data) {
        renderTweets(data);
      },
      fail: function(error) {
        console.log("error: ", error);
      }
    });
  };

  const escape = function (tweet) {
    let div = document.createElement("div")
    let div2 = document.createElement("div")
    div2.appendChild(document.createTextNode(tweet))
    div.appendChild(div2)
    // div.appendChild($(`<div> ${tweet} </div>`));
    return div.innerHTML;
  };


  const renderTweets = function(tweets) {
    //iterate over array of tweets reversely or from newest one
    tweets.reverse().forEach(tweet => {
      let $tweet = createTweetElement(tweet);
      $('#tweets').append($tweet);
      
    });
    

  };
  const createTweetElement = function(tweet) {
    let date = timeago.format(tweet.created_at);
    const $tweetMarkup = $(`<article class= "tweet">
    <header>
      <div>
        <img src=${tweet.user.avatars} alt ="avatar" >
      </div>
      <div class="name">${tweet.user.name}</div>
      <div class="email">${tweet.user.handle}</div> 
    </header>
    <div> ${escape(tweet.content.text)} </div>
    <footer>
      <output class="date">${date}</output>
      <div>
        <i class="fa-sharp fa-solid fa-flag icon"></i>
        <i class="fa-solid fa-retweet icon"></i>
        <i class="fa-sharp fa-solid fa-heart icon"></i>
      </div> 
    </footer>
  </article>`);
    return $tweetMarkup;
  };

  loadTweets();


  //submit a tweet
  const $form = $('#sub-form');
  $form.on("submit", function(event) {
   
    event.preventDefault();
    let $tweet = $('#tweet-text').val();
    if ($tweet.length < 1) {
      alert("Tweet is empty, please write your tweet!");
      return;
    }
    if ($tweet.length > 140) {
      alert("Your tweet is too long!");
      return;
    }
    $.ajax({
      url: '/tweets',
      method: "POST",
      data: $form.serialize(),
      success: function() {
        
        $('#tweet-text').val("");
        $('#tweets').empty();
        loadTweets();
      },
      fail: function(error) {
        console.log("error: ", error);
      }
    });
 
  });
});




