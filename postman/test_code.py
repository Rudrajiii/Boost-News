import requests
from bs4 import BeautifulSoup
import json

def fetch_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BeautifulSoup(response.content, 'html.parser')
    else:
        print(f'Failed to retrieve the webpage. Status code: {response.status_code}')
        return None

def extract_text(tag, selector, default=''):
    element = tag.find(selector) if tag else None
    return element.get_text(strip=True) if element else default

def extract_attribute(tag, selector, attribute, default=''):
    element = tag.find(selector) if tag else None
    return element.get(attribute, default) if element else default

def main():
    url = 'https://www.thehindu.com/'
    soup = fetch_page(url)
    if not soup:
        return {}
    
    article_section = soup.find('div', class_='element bigger main-element pt-0')
    if article_section:
        label = article_section.find('div' , class_='label')
        # by_line = article_section.find('div', class_='by-line')
        # author_name = extract_text(by_line, 'div.author-name')
        main_heading = extract_text(article_section, 'h1.title')
        sub_heading = extract_text(article_section, 'div.sub-text')
        # author_name = extract_text(article_section, 'div.author-name')
        image_url = extract_attribute(article_section.find('div', class_='picture'), 'img', 'data-original', extract_attribute(article_section.find('div', class_='picture'), 'img', 'src'))

        if image_url:
            image_url = image_url.replace('SQUARE_80', 'SQUARE_960')
        if label :
            print(label.get_text())
        # if by_line:
        #     print(by_line.find('div' , class_='author-name').find('a' , class_="person-name lnk").get_text())
            # print(author_name.find('div' , class_='author-name'))
    premium_data = soup.find('div' , class_='reverse-column')
    # if premium_data:
    #     print(premium_data.prettify())
    # else:
    #     print('Not Found')
    # Find the parent div with class 'reverse-part'
    reverse_part = premium_data.find('div', class_='reverse-part')

    # Iterate through each child div with class 'element with-writer'
    elements = reverse_part.find_all('div', class_='element with-writer')

    # List to store the extracted information
    data = []

    # Extract the necessary information from each element
    for element in elements:
        info = {}
        
        # Extract the link
        link_tag = element.find('a', href=True)
        info['link'] = link_tag['href'] if link_tag else None
        
        # Extract the image
        img_tag = element.find('img', class_='media-object')
        info['image'] = img_tag['data-original'] if img_tag else None
        
        # Extract the title
        title_tag = element.find('h3', class_='title').find('a')
        info['title'] = title_tag.text.strip() if title_tag else None
        
        # Extract the author name
        author_tag = element.find('a', class_='person-name')
        info['author'] = author_tag.text.strip() if author_tag else None
        
        # Add the extracted information to the data list
        data.append(info)

        # Print the extracted information
        for item in data:
            print(f"Link: {item['link']}")
            print(f"Image: {item['image']}")
            print(f"Title: {item['title']}")
            print(f"Author: {item['author']}")
            print("---")
    
main()