from eventregistry import EventRegistry, QueryArticlesIter # type: ignore
import json
from secretapi import AI_API_NEWS_KEY
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

# change maxItems to get the number of results that you want
for article in q.execQuery(er, maxItems=1):
    print(json.dumps(article, indent=4))
    break
