const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const themeBtn = document.getElementById("theme");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Theme switcher code
const whenLoaded = () => {
  if (!window.localStorage.getItem("theme")) {
    window.localStorage.setItem("theme", "light");
  } else if (window.localStorage.setItem("theme" === "dark")) {
    return;
  }
};

// Show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Show new quote.
const newQuote = () => {
  loading();
  // Pick a random quote.
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Display quote.
  authorText.textContent = quote.author;
  // Check Is Author Field Is blank and replace it with 'unknown.
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check the Quote length and style it accordingly.
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
};

// Get quotes from API.
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Handle errors here.
    console.log("Whoops, no quote for you" + error);
  }
}

// Tweet a quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} %0a%0a - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners.
newQuoteBtn.addEventListener("click", () => {
  newQuote();
});
twitterBtn.addEventListener("click", () => {
  tweetQuote();
});

// On load.
getQuotes();
whenLoaded();
