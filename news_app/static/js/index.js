const countries = {
  india: "in",
  korea: "kr",
  australia: "au",
  japan: "jp",
  china: "cn",
  russia: "ru"
};
const API_KEY = "f40c14ba5548450c8333597dade80555";
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
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;

    let res = await fetch(url);
    let data = await res.json();

    const filteredData = await filterArticles(data); // Call filter function

    console.log(filteredData);

    card.forEach((item, i) => {
      const titleElement = item.querySelector(".title");
      const imageElement = item.querySelector("#img");
      const descriptionElement = item.querySelector(".des");
      const contentElement = item.querySelector(".con");
      const authorElement = item.querySelector(".author");
      const pubTimeElement = item.querySelector(".pub-time");

      if (filteredData[i]) {
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
        console.log("Not enough articles for card", i + 1);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function getData() {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`
    );
    let data = await res.json();
    console.log(data);
    const filteredData = await filterArticles(data);
    console.log(typeof filteredData);

    card.forEach((item, i) => {
      const titleElement = item.querySelector(".title");
      const imageElement = item.querySelector("#img");
      const descriptionElement = item.querySelector(".des");
      const contentElement = item.querySelector(".con");
      const authorElement = item.querySelector(".author");
      const pubTimeElement = item.querySelector(".pub-time");

      if (filteredData[i]) {
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
