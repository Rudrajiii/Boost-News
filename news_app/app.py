from flask import Flask, render_template , jsonify , request
from eventregistry import EventRegistry, QueryArticlesIter # type: ignore
from secretapi import AI_API_NEWS_KEY
app = Flask(__name__)

@app.route('/' , methods=['GET'])
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

    for article in q.execQuery(er, maxItems=1):
        article_data = {
            "title": article['title'],
            "image": article['image'] if 'image' in article else None,
            "description": article['body'] if 'body' in article else None
        }
        articles.append(article_data)

    print(articles[0])
    print("h",articles)
    return render_template("ai_card.html" , articles = articles)

if __name__ == '__main__':
  app.run(debug=True)

