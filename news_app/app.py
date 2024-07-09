from flask import Flask, render_template, jsonify, request
from eventregistry import EventRegistry, QueryArticlesIter # type: ignore
from secretapi import AI_API_NEWS_KEY

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/articles')
def get_articles():
    er = EventRegistry(apiKey=AI_API_NEWS_KEY)

    query = {
        "$query": {
            "$and": [
                {
                    "conceptUri": "http://en.wikipedia.org/wiki/Artificial_intelligence"
                },
                {
                    "categoryUri": "dmoz/Computers/Artificial_Intelligence"
                },
                {
                    "lang": "eng"
                }
            ]
        },
        "$filter": {
            "forceMaxDataTimeWindow": "31"
        }
    }

    q = QueryArticlesIter.initWithComplexQuery(query)

    articles = []

    for article in q.execQuery(er, maxItems=30):  # Fetch up to 30 articles
        article_data = {
            "title": article.get('title', 'No Title'),
            "image": article.get('image'),
            "description": article.get('body', 'No Description'),
            "source_id": article.get('source', {}).get('title', 'Unknown Source'),
            "pubDate": article.get('date', 'Unknown Date'),
            "link": article.get('url', '#')
        }
        articles.append(article_data)

    return jsonify(articles)

if __name__ == '__main__':
    app.run(debug=True)
