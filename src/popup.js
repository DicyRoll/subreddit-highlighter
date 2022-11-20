function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function generateInputGroup(subreddit = null, color = null) {
  let templateInputGroup = document.getElementById("template-subreddit-input");
  let inputsNumber = document.querySelectorAll("#subreddit-list > div.subreddit-input-group").length;

  let subredditInputGroup = templateInputGroup.cloneNode(true);

  subredditInputGroup.id = "subreddit-input-group-" + (inputsNumber + 1);
  subredditInputGroup.classList.remove("hidden");
  subredditInputGroup.classList.add("flex");

  subredditInputGroup.querySelector("button#delete-btn").addEventListener("click", deleteInputGroup);
  subredditInputGroup.querySelector("button#delete-btn").id = "delete-btn-" + (inputsNumber + 1);

  if (subreddit && color) {
    subredditInputGroup.querySelector("input.subreddit-name").value = subreddit;
    subredditInputGroup.querySelector("input.subreddit-color").value = color;
  } else {
    subredditInputGroup.querySelector("input.subreddit-color").value = randomHexColor();
  }

  return subredditInputGroup;
}

function addSubreddit() {
  let subredditList = document.getElementById("subreddit-list");
  let subredditInput = generateInputGroup();

  subredditList.appendChild(subredditInput);
}

function saveSubreddits() {
  let subredditList = document.getElementById("subreddit-list");
  let subredditInputs = subredditList.querySelectorAll("div.subreddit-input-group");

  let subreddits = [];
  let subredditColors = [];

  subredditInputs.forEach(subredditInput => {
    let subreddit = subredditInput.querySelector("input.subreddit-name").value;
    let color = subredditInput.querySelector("input.subreddit-color").value;

    if (subreddit && color) {
      subreddits.push(subreddit.trim());
      subredditColors.push(color);
    }
  });

  chrome.storage.sync.set({
    subreddits: subreddits,
    subredditColors: subredditColors
  }, function () {
    console.log('Subreddit options saved');
  });

  let saveBtn = document.getElementById("save-subreddits");
  let saveTooltip = saveBtn.parentElement;
  let saveCheckbox = document.getElementById("save-checkbox");

  saveBtn.classList.remove("btn-primary");
  saveBtn.classList.add("btn-success");
  saveTooltip.classList.add("tooltip");

  saveCheckbox.checked = true;

  loadSubreddits();

  setTimeout(() => {
    saveBtn.classList.add("btn-primary");
    saveBtn.classList.remove("btn-success");
    saveTooltip.classList.remove("tooltip");

    saveCheckbox.checked = false;
  }, 3000);
}

function loadSubreddits() {
  chrome.storage.sync.get(['subreddits', 'subredditColors'], function (result) {
    let subredditList = document.getElementById("subreddit-list");
    let subredditInputs = subredditList.querySelectorAll("div.subreddit-input-group");

    let subreddits = result.subreddits;
    let subredditColors = result.subredditColors;

    if (subreddits && subredditColors) {
      subredditInputs.forEach(subredditInput => {
        subredditInput.remove();
      });

      for (let i = 0; i < subreddits.length; i++) {
        let subredditInput = generateInputGroup(subreddits[i], subredditColors[i]);

        subredditList.appendChild(subredditInput);
      }
    }

    console.log('Subreddit options loaded');
  });
}

function deleteInputGroup() {
  let inputId = this.id.split('-')[2];
  let subredditInputGroup = document.getElementById("subreddit-input-group-" + inputId);

  subredditInputGroup.remove();
}

function undoChanges() {
  loadSubreddits();
}

document.getElementById("add-subreddit-btn").addEventListener("click", addSubreddit);
document.getElementById("save-subreddits").addEventListener("click", saveSubreddits);
document.getElementById("undo-btn").addEventListener("click", undoChanges);

loadSubreddits();
