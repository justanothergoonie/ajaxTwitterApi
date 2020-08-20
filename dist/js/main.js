"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Main = /*#__PURE__*/function () {
  function Main() {
    _classCallCheck(this, Main);

    _defineProperty(this, "handleSearch", function (event) {
      event.preventDefault();
      var hashtagEl = document.querySelector('[name="hashtag"]');
      var hashtagTerm = hashtagEl.value;
      console.log('searching...', hashtagTerm);
      var api = new TwitterApi();

      if (hashtagTerm === '') {
        alert('you need to search for something');
      } else {
        api.tweetSearch(hashtagTerm);
      }
    });

    _defineProperty(this, "handleResults", function (event) {
      var results = event.detail; // console.log('hello', results);

      var allTweetsEl = document.querySelector('.all-tweets');
      allTweetsEl.textContent = '';

      for (var t in results) {
        var tweets = results[t]; // console.log(tweets);

        var tweetEl = document.createElement('li');
        allTweetsEl.appendChild(tweetEl);
        var tweeterEl = document.createElement('h2');
        tweetEl.appendChild(tweeterEl);
        tweeterEl.innerText = 'Original Tweeter: ' + tweets.user.name;
        var tweetContentEl = document.createElement('p');
        tweetEl.appendChild(tweetContentEl);
        tweetContentEl.textContent = 'Tweet: ' + tweets.text;
        var tweetTimeEl = document.createElement('span');
        tweetEl.appendChild(tweetTimeEl);
        tweetTimeEl.textContent = 'Tweeted at: ' + tweets.created_at;
      }
    });

    this.setupEventListeners();
  }

  _createClass(Main, [{
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var buttonEl = document.querySelector('[name="search"]');
      buttonEl.addEventListener('click', this.handleSearch);
      var bodyEl = document.querySelector('body');
      bodyEl.addEventListener('got-results', this.handleResults);
      bodyEl.addEventListener('got-error', this.handleSearchError);
    }
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
