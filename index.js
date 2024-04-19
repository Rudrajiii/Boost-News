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
const titlee = document.querySelector(".title");
const img = document.getElementById("img");
const des = document.querySelector(".des");
const card = document.querySelectorAll(".card");
btn.addEventListener("click", async () => {
  try {
    let inputCountry = cn.value.toLowerCase();
    country = countries[inputCountry];
    if (!country) {
      console.log("Country not found");
      return;
    }
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;

    let res = await fetch(url);
    let data = await res.json();

    card.forEach((item, i) => {
      const titleElement = item.querySelector(".title");
      const imageElement = item.querySelector("#img");
      const descriptionElement = item.querySelector(".des");

      if (data["articles"] && data["articles"][i]) {
        // Check if data exists for this index
        const title = data["articles"][i]["title"];
        titleElement.textContent = title;
        const image = data["articles"][i]["urlToImage"];
        imageElement.src = image;
        const description = data["articles"][i]["description"];
        descriptionElement.textContent = description;
      } else {
        // Handle case where there are less than 3 articles
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
    card.forEach((item, i) => {
        const titleElement = item.querySelector(".title");
        const imageElement = item.querySelector("#img");
        const descriptionElement = item.querySelector(".des");
  
        if (data["articles"] && data["articles"][i]) {
          // Check if data exists for this index
          const title = data["articles"][i]["title"];
          titleElement.textContent = title;
          const image = data["articles"][i]["urlToImage"];
          imageElement.src = image;
          const description = data["articles"][i]["description"];
          descriptionElement.textContent = description;
        } else {
          // Handle case where there are less than 3 articles
          console.log("Not enough articles for card", i + 1);
        }
      });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getData().then((data) => {
  console.log(data);
});
