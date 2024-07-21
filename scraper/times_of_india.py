import json
import requests
from bs4 import BeautifulSoup

# URL to scrape
url = 'https://timesofindia.indiatimes.com/'


response = requests.get(url)
response.raise_for_status()  # Check for HTTP errors
html_content = response.text


soup = BeautifulSoup(html_content, 'html.parser')


scraped_data = []

# Find all divs with class 'col_l_6'
for div in soup.find_all('div', class_='col_l_6'):
    figure = div.find('figure')
    if figure:
        a_tag = figure.find('a')
        if a_tag:
            # Extract the URL
            link_url = a_tag.get('href')
            
            # Extract the image source
            img_tag = figure.find('img')
            if img_tag:
                
                img_src = img_tag.get('data-src') or img_tag.get('src')
                
                if img_src and img_src.endswith('.cms'):
                    
                    img_src = img_tag.get('src') or img_tag.get('data-src')
            else:
                img_src = None
            
            
            text = figure.find('figcaption').text.strip() if figure.find('figcaption') else None
            
            # Append the data to the list
            scraped_data.append({
                'url': link_url,
                'image': img_src,
                'text': text
            })


json_file_path = 'scraped_data_toi.json'


with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(scraped_data, json_file, ensure_ascii=False, indent=4)

print(f"Data has been successfully saved to {json_file_path}")