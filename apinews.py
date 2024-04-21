from eventregistry import EventRegistry, QueryArticlesIter
import json

er = EventRegistry(apiKey='e6384209-b7f6-4b81-bf2d-94d702bf596d')

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
