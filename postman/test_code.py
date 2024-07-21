import requests
from bs4 import BeautifulSoup
import json

# Define the URL
url = "https://www.ndtv.com/"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'lxml')
    a = soup.find('div' , class_='vjl-md-3 CrdSptrRt order-1')
    print(a.find('img')['src'])
    # Dictionary to hold the scraped data
    data = {}
    left_article = soup.find('div' , class_='vjl-row mb-25 top-scroll-17')
    # print(left_article.prettify())
    if left_article:
        img_url = left_article.find('div' , class_='vjl-md-6 CrdSptrRt').find('div' , class_='crd-b crd-b_h-at res_crd-1 pb-0').find('div' , class_='crd_img').find('div' , class_='img-gr img-gr_f').find('a')
    # Extracting the main article
    main_article = soup.find('div', class_='vjl-md-6 CrdSptrRt')
    if main_article:
        main_article_title = main_article.find('h1', class_='crd_ttl7').get_text(strip=True)
        main_article_link = main_article.find('a')['href']
        main_article_image = main_article.find('img')['src']
        
        data['main_article'] = {
            'title': main_article_title,
            'link': main_article_link,
            'image': main_article_image
        }
    else:
        data['main_article'] = None
    
    # Extracting the list items
    list_items = soup.find_all('li', class_='LstWg1-li')
    articles = []
    
    for item in list_items:
        title_tag = item.find('h3')
        if title_tag:
            title = title_tag.get_text(strip=True)
            link = item.find('a')['href']
            articles.append({
                'title': title,
                'link': link
            })
    
    data['articles'] = articles

    # Save the data to a JSON file
    # with open('scrap_data.json', 'w') as json_file:
    #     json.dump(data, json_file, indent=4)

    print("Data has been saved to ndtv_news.json")
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
