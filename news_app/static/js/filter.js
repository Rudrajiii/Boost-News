const article = [
    {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "HT News Desk",
        "title": "Latest News, Live Updates Today April 18, 2024: Belarus' parliament votes to leave Europe's conventional forces treaty already abandoned by Russia - Hindustan Times",
        "description": "Welcome to the live updates platform for Hindustan Times. Follow all the major news updates, headlines and breaking news stories from India and around the world right here. Track the real-time developments of major events for April 18, 2024.",
        "url": "https://www.hindustantimes.com/india-news/latest-india-news-today-live-updates-april-18-2024-101713403806539.html",
        "urlToImage": "https://www.hindustantimes.com/ht-img/img/2024/04/18/550x309/UN-ISRAEL-PALESTINIAN-CONFLICT-DIPLOMACY-24_1713463175767_1713463206281.jpg",
        "publishedAt": "2024-04-18T17:19:35Z",
        "content": "Get the latest news updates and breaking news stories from India and around the world right here. Disclaimer: This is an AI-generated live blog and has not been edited by Hindustan Times staff....Rea… [+12852 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "India Today"
        },
        "author": "India Today News Desk",
        "title": "WHO says bird flu cases spreading to humans an enormous concern - India Today",
        "description": "WHOs chief scientist Jeremy Farrar labelled the AH5N1 variant as a quotglobal zoonotic animal pandemicquot He sounded alarm over the virus spreading to humans",
        "url": "https://www.indiatoday.in/world/story/who-says-bird-flu-cases-spreading-to-humans-an-enormous-concern-2528965-2024-04-18",
        "urlToImage": null,
        "publishedAt": "2024-04-18T17:06:46Z",
        "content": "The World Health Organisation has raised concerns about the spread of H5N1 bird flu to humans. The global health organisation flagged that the bird flu has an “extraordinarily high” mortality rate in… [+2134 chars]"
      }
];

console.log(typeof article);

const filteredObject = article.find(obj => obj.urlToImage != null);
console.log(filteredObject);