import json
import requests
from bs4 import BeautifulSoup

# URL to scrape
url = 'https://timesofindia.indiatimes.com/'

# Fetch HTML content from the URL
response = requests.get(url)
response.raise_for_status()  # Check for HTTP errors
html_content = response.text

# Parse HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# List to hold the scraped data 
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
                # Try to get the 'data-src' attribute first, if not available, use 'src'
                img_src = img_tag.get('data-src') or img_tag.get('src')
                
                # If the image URL ends with .cms, try to extract the correct URL
                if img_src and img_src.endswith('.cms'):
                    # Look for the actual image URL in the 'src' or 'data-src' attribute
                    img_src = img_tag.get('src') or img_tag.get('data-src')
            else:
                img_src = None
            
            # Extract the text
            text = figure.find('figcaption').text.strip() if figure.find('figcaption') else None
            
            # Append the data to the list
            scraped_data.append({
                'url': link_url,
                'image': img_src,
                'text': text
            })

# Define the output JSON file path
json_file_path = 'scraped_data_toi.json'

# Write the scraped data to a JSON file
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(scraped_data, json_file, ensure_ascii=False, indent=4)

print(f"Data has been successfully saved to {json_file_path}")