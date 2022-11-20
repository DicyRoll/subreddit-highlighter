const postBgColor = "#1a1a1b";

var subreddits = [];
var subredditColors = [];

function highlight() {
  let posts = document.querySelectorAll('div[data-testid="post-container"] a[data-click-id="subreddit"]:not(.checked)');

  posts.forEach(post => {
    let subreddit = post.getAttribute("href").split("/")[2].toLowerCase();

    if (subreddit && subreddits.includes(subreddit)) {
      let postContainer = post.closest("div[data-testid='post-container']");

      if (postContainer) {
        let postColor = subredditColors[subreddits.indexOf(subreddit)];

        postContainer.style.cssText = `background: linear-gradient(90deg, ${postColor} 0%, ${postBgColor} 3%)`;
      }
    }

    post.classList.add("checked");
  });
}

chrome.storage.sync.get(['subreddits', 'subredditColors'], function (result) {
  subreddits = result.subreddits;
  subredditColors = result.subredditColors;

  if (subreddits && subredditColors) {
    highlight();
    setInterval(highlight, 3000);
  }
});