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


  const renderTweets = function(tweets) {
    // tweets.sort((a, b) => timeago.format(b.created_at) - timeago.format(a.created_at))
    // console.log(tweets);

    tweets.reverse().forEach(tweet => {
      let $tweet = createTweetElement(tweet);
      $('#tweets').append($tweet);
      
    });
    

  };
  const createTweetElement = function(tweet) {
    let date = timeago.format(tweet.created_at);
    // console.log('tweet', tweet)
    const $tweetMarkup = $(`<article class= "tweet">
    <header>
      <div>
        <img src=${tweet.user.avatars} alt ="avatar" >
      </div>
      <div class="name">${tweet.user.name}</div>
      <div class="email">${tweet.user.handle}</div> 
    </header>
    <div>  ${tweet.content.text}</div>
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




