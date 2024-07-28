import json
import requests
from bs4 import BeautifulSoup

BASE_URL = 'https://techcrunch.com/category/artificial-intelligence/'

def main_ai_handle(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    BIG_DATA = []
    
    post_pickers = soup.find_all('div', class_='wp-block-tc23-post-picker')
    
    for post in post_pickers:
        heading_div = post.find('h2', class_='wp-block-post-title')
        heading = heading_div.find('a').get_text(strip=True) if heading_div else "No heading"

        author_div = post.find('div', class_='wp-block-tc23-author-card-name')
        author_name = author_div.find('a').get_text(strip=True) if author_div else "No author"

        description_div = post.find('div', class_='wp-block-post-excerpt')
        description = description_div.find('p').get_text(strip=True) if description_div else "No description"

        image_div = post.find('figure', class_='wp-block-post-featured-image')
        image_url = image_div.find('img')['src'] if image_div and image_div.find('img') else "No image"

        data_object = {
            'heading': heading,
            'author': author_name,
            'description': description,
            'image_url': image_url
        }
        BIG_DATA.append(data_object)

    with open('../data/ai_headlines.json', 'w', encoding='utf-8') as json_file:
        json.dump(BIG_DATA, json_file, indent=4, ensure_ascii=False)

    print("Data scraped and stored in ai_headlines.json")

if __name__ == "__main__":
    main_ai_handle(BASE_URL)