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
        by_line = article_section.find('div', class_='by-line')
        # author_name = extract_text(by_line, 'div.author-name')
        main_heading = extract_text(article_section, 'h1.title')
        sub_heading = extract_text(article_section, 'div.sub-text')
        author_name = extract_text(article_section, 'div.author-name')
        image_url = extract_attribute(article_section.find('div', class_='picture'), 'img', 'data-original', extract_attribute(article_section.find('div', class_='picture'), 'img', 'src'))

        if image_url:
            image_url = image_url.replace('SQUARE_80', 'SQUARE_960')
        if label :
            print(label.get_text())
        if by_line:
            print(by_line.find('div' , class_='author-name').find('a' , class_="person-name lnk").get_text())
            # print(author_name.find('div' , class_='author-name'))
    
main()