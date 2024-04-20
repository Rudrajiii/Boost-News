const url = 'https://newsdata.io/api/1/news?apikey=pub_422138deb15a27b19d88b3187c9b86529e8ca&q=football';
async function res(){
    let data = await fetch(url);
    return data.json();
}

res().then((r)=>{
    console.log(r);
});
const url2 = 'https://newsapi.org/v2/top-headlines?country=cn&apiKey=f40c14ba5548450c8333597dade80555';
async function res2(){
    let data = await fetch(url2);
    let res =  data.json();
    return res;
}

res2().then((r)=>{
    let article = r['articles'];
     article = article.filter(obj => obj.urlToImage != null);
    console.log(article);
});

