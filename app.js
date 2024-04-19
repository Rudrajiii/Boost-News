const url = 'https://newsdata.io/api/1/news?apikey=pub_422138deb15a27b19d88b3187c9b86529e8ca&q=football';
async function res(){
    let data = await fetch(url);
    return data.json();
}

res().then((r)=>{
    console.log(r);
});

