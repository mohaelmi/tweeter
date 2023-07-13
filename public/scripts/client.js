/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];


$(document).ready(() => {

  //fetcting data/tweets from the server
  const loadTweets = function() {
    $.ajax({ 
      url: '/tweets', 
      method: "GET",
      success: function (data) {
       renderTweets(data)
      },
      fail: function (error) {
        console.log("error: ", error);
      }
    })
  }

  loadTweets()

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      let $tweet = createTweetElement(tweet);
      $('#tweets').append($tweet);
      
    });
    

  }
  const createTweetElement = function(tweet) {
    let date = timeago.format(tweet.created_at)
    // console.log('tweet', tweet) 
    const $tweetMarkup = $(`<article>
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


  //submit a tweet
  const $form = $('#sub-form')
  $form.on("submit", function(event) {
    let $counter = $('.counter')
    event.preventDefault()
    let tweet = $('#tweet-text').val()
    if($counter < 0) {
      alert("Tweet is empty, please write your tweet!")
      return
    }
    if(tweet.length > 140) {
      alert("Your tweet is too long!")
      return
    }
    $.ajax({ 
      url: '/tweets', 
      method: "POST",
      data: $form.serialize(),
      fail: function (error) {
        console.log("error: ", error);
      }
    })
   $('#tweet-text').val("")
    
  })
});




