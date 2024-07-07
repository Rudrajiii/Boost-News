const countries = {
  india: "in",
  korea: "kr",
  australia: "au",
  japan: "jp",
  china: "cn",
  russia: "ru"
};
// const API_KEY1 = "f40c14ba5548450c8333597dade80555";
// const API_KEY2 = "f40c14ba5548450c8333597dade80555";
// const API_KEY3 = "f40c14ba5548450c8333597dade80555";


let country;

const cn = document.getElementById("cn");
const btn = document.querySelector(".btn");
const card = document.querySelectorAll(".card");




async function filterArticles(data) {
  // Filter articles with valid image URLs
  const filteredArticles = data["articles"].filter(
    (article) => article["urlToImage"] !== null
  );
  return filteredArticles;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

btn.addEventListener("click", async (e) => {
  try {
    let inputCountry = cn.value.toLowerCase();
    country = countries[inputCountry];
    if (!country) {
      console.log("Country not found");
      return;
    }
    e.preventDefault();

     // Get the current date and subtract one day
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtract one day

    // Format the date to YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    const url1 = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY1}`;
    const url2 = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY2}`;
    const url3 = `https://newsapi.org/v2/everything?q=apple&from=${formattedDate}&to=${formattedDate}&sortBy=popularity&apiKey=${API_KEY3}`;


    let res1 = await fetch(url1);
    let res2 = await fetch(url2);
    let res3 = await fetch(url3);

    let data1 = await res1.json();
    let data2 = await res2.json();
    let data3 = await res3.json();

    const filteredData1 = await filterArticles(data1);
    const filteredData2 = await filterArticles(data2);
    const filteredData3 = await filterArticles(data3);

    const filteredData = [...filteredData1, ...filteredData2 , ...filteredData3];

    console.log(filteredData);

    card.forEach((item, i) => {
      const titleElement = item.querySelector(".title");
      const imageElement = item.querySelector("#img");
      const descriptionElement = item.querySelector(".des");
      const contentElement = item.querySelector(".con");
      const authorElement = item.querySelector(".author");
      const pubTimeElement = item.querySelector(".pub-time");

      if (filteredData[i]) {
        item.style.display = "block"; // Show card
        const author = filteredData[i]["author"];
        authorElement.textContent = author ? `Reporting - ${author}` : "Unknown Author";

        const title = filteredData[i]["title"];
        if (title === "[Removed]") {
          titleElement.textContent =
            "Due to Some technical issues, this article cannot be shown right now. Please wait for some time.";
        } else {
          titleElement.textContent = title;
        }

        const image = filteredData[i]["urlToImage"];
        imageElement.onerror = () => {
          console.warn("Image failed to load:", image);
          imageElement.src =
            "https://ih0.redbubble.net/image.195569273.8857/stf,small,600x600.jpg"; // Replace with a default image URL
        };
        if(image === null){
          imageElement.src =
            "https://ih0.redbubble.net/image.195569273.8857/stf,small,600x600.jpg"; // Replace with a default image URL
        }
        imageElement.src = image;

        let description = filteredData[i]["description"];
        if (description === "[Removed]" || description === null) {
          descriptionElement.textContent =
            "We are Sorry, cannot display this article temporarily. Please wait for the server response.";
        } else {
          descriptionElement.textContent = description;
        }
        const content = filteredData[i]["content"];
        const url = filteredData[i]["url"];
        if (content) {
          const updatedContent = content.replace(/\[\+\d+ chars\]$/, `... <a style="text-decoration:none" href="${url}" target="_blank">CLICK HERE FOR MORE</a>`);
          contentElement.innerHTML = updatedContent;
        } else {
          contentElement.innerHTML = `<a style="text-decoration:none" href="${url}" target="_blank">For More Information Visit</a>`;
        }

        const pubTime = filteredData[i]["publishedAt"];
        pubTimeElement.textContent = `Published on: ${formatDate(pubTime)}`;
      } else {
        item.style.display = "none"; // Hide card
        console.log("Not enough articles for card", i + 1);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function getData() {
  try {

    // Get the current date and subtract one day
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtract one day

    // Format the date to YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;


    let res1 = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY1}`);
    let res2 = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY2}`);
    let res3 = await fetch(`https://newsapi.org/v2/everything?q=apple&from=${formattedDate}&to=${formattedDate}&sortBy=popularity&apiKey=${API_KEY3}`);

    let data1 = await res1.json();
    let data2 = await res2.json();
    let data3 = await res3.json();

    const filteredData1 = await filterArticles(data1);
    const filteredData2 = await filterArticles(data2);
    const filteredData3 = await filterArticles(data3);

    const filteredData = [...filteredData1, ...filteredData2 , ...filteredData3];

    console.log(filteredData);

    card.forEach((item, i) => {
      const titleElement = item.querySelector(".title");
      const imageElement = item.querySelector("#img");
      const descriptionElement = item.querySelector(".des");
      const contentElement = item.querySelector(".con");
      const authorElement = item.querySelector(".author");
      const pubTimeElement = item.querySelector(".pub-time");

      if (filteredData[i]) {
        item.style.display = "block"; // Show card
        const author = filteredData[i]["author"];
        authorElement.textContent = author ? `Reporting : ${author}` : "Unknown Author";

        const title = filteredData[i]["title"];
        if (title === "[Removed]") {
          titleElement.textContent =
            "Due to Some technical issues, this article cannot be shown right now. Please wait for some time.";
        } else {
          titleElement.textContent = title;
        }

        const image = filteredData[i]["urlToImage"];
        imageElement.onerror = () => {
          console.warn("Image failed to load:", image);
          imageElement.src =
            "https://ih0.redbubble.net/image.195569273.8857/stf,small,600x600.jpg"; // Replace with a default image URL
        };
        if(image === null){
          imageElement.src =
            "https://ih0.redbubble.net/image.195569273.8857/stf,small,600x600.jpg"; // Replace with a default image URL
        }
        imageElement.src = image;

        let description = filteredData[i]["description"];
        if (description === "[Removed]" || description === null) {
          descriptionElement.textContent =
            "We are Sorry, cannot display this article temporarily. Please wait for the server response.";
        } else {
          descriptionElement.textContent = description;
        }

        const content = filteredData[i]["content"];
        const url = filteredData[i]["url"];
        if (content) {
          const updatedContent = content.replace(/\[\+\d+ chars\]$/, `... <a style="text-decoration:none" href="${url}" target="_blank">CLICK HERE FOR MORE</a>`);
          contentElement.innerHTML = updatedContent;
        } else {
          contentElement.innerHTML = `For More Information : <a style="text-decoration:none" href="${url}" target="_blank">Visit</a>`;
        }

        const pubTime = filteredData[i]["publishedAt"];
        pubTimeElement.textContent = `Published on: ${formatDate(pubTime)}`;
      } else {
        item.style.display = "none"; // Hide card
        console.log("Not enough articles for card", i + 1);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData().then((dat) => {
  console.log(dat);
});


const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

const API_URLS = [
  `https://newsapi.org/v2/everything?q=tesla&from=${formattedDate}&sortBy=publishedAt&apiKey=1cc928358b8e4ee5a53e7a778d1900d6`,
  "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1cc928358b8e4ee5a53e7a778d1900d6",
];

async function fetchNewsData() {
  try {
    const responses = await Promise.all(API_URLS.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));

    // Flatten and filter articles with valid image URLs, correct extensions, and unique URLs
    const articles = data.flatMap(d => d.articles).filter((article, index, self) => {
      if (article.urlToImage && article.urlToImage !== "") {
        // Check if the URL ends with a valid image extension and is not webp
        const validExtensions = ['.jpg', '.jpeg', '.png'];
        const lowerCaseUrl = article.urlToImage.toLowerCase();
        const isUnique = self.findIndex(a => a.urlToImage === article.urlToImage) === index;
        return isUnique && validExtensions.some(ext => lowerCaseUrl.includes(ext)) && !lowerCaseUrl.endsWith('.webp');
      }
      return false;
    });

    return articles;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return [];
  }
}

function createCarouselItem(article, isActive) {
  return `
    <div class="carousel-item ${isActive ? 'active' : ''}">
      <img class="bd-placeholder-img" width="100%" height="40%" src="${article.urlToImage}" alt="">
      <div class="container">
        <div class="carousel-caption ${isActive ? 'text-start' : 'text-end'}">
          <h1>${article.title}</h1>
          <p class="opacity-75">${article.author ? `Reporting - ${article.author}` : 'Unknown Author'}</p>
        </div>
      </div>
    </div>
  `;
}

function createCarouselIndicator(index, isActive) {
  return `
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index}" class="${isActive ? 'active' : ''}" aria-label="Slide ${index + 1}" ${isActive ? 'aria-current="true"' : ''}></button>
  `;
}

async function updateCarousel() {
  try {
    const articles = await fetchNewsData();
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const innerContainer = document.querySelector('.carousel-inner');

    indicatorsContainer.innerHTML = articles.map((_, index) => createCarouselIndicator(index, index === 0)).join('');
    innerContainer.innerHTML = articles.map((article, index) => createCarouselItem(article, index === 0)).join('');
  } catch (error) {
    console.error("Error updating carousel:", error);
  }
}

updateCarousel();



//New Headline handleing with logic
const newAPIKey = "pub_47313dd3bbf1cd0dea635abec80e56b594662";
const newslogo = document.getElementById('newslogo');
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  newslogo.src = "https://github.com/Rudrajiii/Boost-News/blob/main/postman/newspaper-logo.png?raw=true";
}
const categories = ["sports", "bollywood","hollywood", "ai", "politics"];

async function fetchCategoryNews(category) {
  if (category === 'ai') {
      const aiNews = await fetchAINews();
      const aiNewsFromAPI = await fetchAINewsFromAPI();
      return [...aiNews, ...aiNewsFromAPI];
  }
  const url = `https://newsdata.io/api/1/news?apikey=${newAPIKey}&q=${category}`;
  try {
      let res = await fetch(url);
      let data = await res.json();
      return data.results;
  } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
      return [];
  }
}

async function fetchAINews() {
  try {
      let res = await fetch('/articles');
      let data = await res.json(); 
      return data;
  } catch (error) {
      console.error('Error fetching AI news:', error);
      return [];
  }
}

async function fetchAINewsFromAPI() {
  const url = `https://newsdata.io/api/1/news?apikey=${newAPIKey}&q=ai`;
  try {
      let res = await fetch(url);
      let data = await res.json();
      return data.results;
  } catch (error) {
      console.error('Error fetching AI news from API:', error);
      return [];
  }
}


function createCard(article) {
  const card = document.createElement('div');
  card.classList.add('card');

  const titleElement = document.createElement('div');
  titleElement.classList.add('title');
  titleElement.textContent = article["title"];
  card.appendChild(titleElement);

  const settElement = document.createElement('div');
  settElement.classList.add('sett');
  const authorElement = document.createElement('p');
  authorElement.classList.add('author');
  authorElement.textContent = article["source_id"] ? `Source - ${article["source_id"]}` : "Unknown Source";
  const pubTimeElement = document.createElement('p');
  pubTimeElement.classList.add('pub-time');
  pubTimeElement.textContent = `Published on: ${formatDate(article["pubDate"])}`;
  settElement.appendChild(authorElement);
  settElement.appendChild(pubTimeElement);
  card.appendChild(settElement);

  const imagElement = document.createElement('div');
  imagElement.classList.add('imag');
  const imageElement = document.createElement('img');
  imageElement.id = 'img';
  imageElement.onerror = () => {
      console.warn("Image failed to load:", article["image_url"] || article["image"]);
      imageElement.src = "https://ih0.redbubble.net/image.195569273.8857/stf,small,600x600.jpg";
  };
  const imageUrl = article["image_url"] || article["image"];
  if (!imageUrl) {
      imageElement.src = "https://ih0.redbubble.net/image.195569273.8857/stf,small,600x600.jpg";
  } else {
      imageElement.src = imageUrl;
  }
  imagElement.appendChild(imageElement);
  card.appendChild(imagElement);

  const descriptionElement = document.createElement('div');
  descriptionElement.classList.add('des');
  if (article["description"]) {
      if (article["description"].length > 300) {
          const truncatedDescription = article["description"].substring(0, 300) + '... ';
          descriptionElement.innerHTML = `${truncatedDescription}<a style="text-decoration:none" href="${article["link"]}" target="_blank">visit for more</a>`;
      } else {
          descriptionElement.textContent = article["description"];
      }
  } else {
      descriptionElement.textContent = "Description not available.";
  }
  card.appendChild(descriptionElement);

  const contentElement = document.createElement('div');
  contentElement.classList.add('con');
  if (article["content"] === "ONLY AVAILABLE IN PAID PLANS") {
      contentElement.innerHTML = `<a style="text-decoration:none" href="${article["link"]}" target="_blank">For More Information Visit Here</a>`;
  } else if (article["content"]) {
      const updatedContent = article["content"].replace(/\[\+\d+ chars\]$/, `... <a style="text-decoration:none" href="${article["link"]}" target="_blank">CLICK HERE FOR MORE</a>`);
      contentElement.innerHTML = updatedContent;
  } else {
      contentElement.innerHTML = `<a style="text-decoration:none" href="${article["link"]}" target="_blank">For More Information Visit Here</a>`;
  }
  card.appendChild(contentElement);

  return card;
}


async function updateCategoryNews() {
  for (const category of categories) {
      const articles = await fetchCategoryNews(category);
      const wrapper = document.querySelector(`.${category}-wrapper`);
      wrapper.innerHTML = ""; // Clear previous news articles

      const seenArticles = new Set();
      articles.forEach(article => {
        const uniqueKey = `${article["title"]}-${article["image_url"] || article["image"]}-${article["link"]}-${article["description"]}`;
          if (!seenArticles.has(uniqueKey)) {
              seenArticles.add(uniqueKey);
              const card = createCard(article);
              wrapper.appendChild(card);
          }
      });
  }
}

document.addEventListener("DOMContentLoaded", updateCategoryNews);

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}
