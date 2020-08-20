class Main {
	constructor() {
		this.setupEventListeners();
	}
	setupEventListeners() {
		const buttonEl = document.querySelector('[name="search"]');
		buttonEl.addEventListener('click', this.handleSearch);
		const bodyEl = document.querySelector('body');
		bodyEl.addEventListener('got-results', this.handleResults);
		bodyEl.addEventListener('got-error', this.handleSearchError);
	}
	handleSearch = (event) => {
		event.preventDefault();

		const hashtagEl = document.querySelector('[name="hashtag"]');
		const hashtagTerm = hashtagEl.value;

		console.log('searching...', hashtagTerm);
		const api = new TwitterApi();
		if (hashtagTerm === '') {
			alert('you need to search for something');
		} else {
			api.tweetSearch(hashtagTerm);
		}
	};
	handleResults = (event) => {
		const results = event.detail;
		// console.log('hello', results);

		const allTweetsEl = document.querySelector('.all-tweets');
		allTweetsEl.textContent = '';

		for (let t in results) {
			const tweets = results[t];
			// console.log(tweets);
			const tweetEl = document.createElement('li');
			allTweetsEl.appendChild(tweetEl);

			const tweeterEl = document.createElement('h2');
			tweetEl.appendChild(tweeterEl);
			tweeterEl.innerText = 'Original Tweeter: ' + tweets.user.name;

			const tweetContentEl = document.createElement('p');
			tweetEl.appendChild(tweetContentEl);
			tweetContentEl.textContent = 'Tweet: ' + tweets.text;

			const tweetTimeEl = document.createElement('span');
			tweetEl.appendChild(tweetTimeEl);
			tweetTimeEl.textContent = 'Tweeted at: ' + tweets.created_at;
		}
	};
}
new Main();
