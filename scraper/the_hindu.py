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
    
    data = {}

    # Extract smaller article section
    premium_data = soup.find('div' , class_='reverse-column')
    reverse_part = premium_data.find('div', class_='reverse-part')
    elements = reverse_part.find_all('div', class_=['element with-writer', 'element with-writer no-border'])
    premium_data_set = []
    # Extract the necessary information from each element
    for element in elements:
        info = {}

        link_tag = element.find('a', href=True)
        info['link'] = link_tag['href'] if link_tag else None

        img_tag = element.find('img', class_='media-object') or element.find('img', class_='lazy')
        info['image'] = img_tag.get('data-original') or img_tag.get('data-src-template') if img_tag else None

        title_tag = element.find('h3', class_='title').find('a')
        info['title'] = title_tag.text.strip() if title_tag else None

        author_tag = element.find('a', class_='person-name')
        info['author'] = author_tag.text.strip() if author_tag else None


        # Add the extracted information to the premium_data_set list
        premium_data_set.append(info)
    data['premium_articles_data'] = premium_data_set


    # Extract main article section
    article_section = soup.find('div', class_='element bigger main-element pt-0')
    if article_section:
        label = article_section.find('div' , class_='label')
        main_heading = article_section.find('h1', class_='title')
        sub_heading = article_section.find('div', 'sub-text')
        author_name = article_section.find('div', class_='by-line').find('div' , class_='author-name').find('a' , class_="person-name lnk")
        image_url = extract_attribute(article_section.find('div', class_='picture'), 'img', 'data-original', extract_attribute(article_section.find('div', class_='picture'), 'img', 'src'))
        if image_url:
            image_url = image_url.replace('SQUARE_80', 'SQUARE_960')

        if not author_name:
            author_name = 'No Author Name Found'
        else:
            author_name = author_name.get_text()

        data['main_article'] = {
            'label':label.get_text(),
            'main_heading': main_heading.get_text(),
            'sub_heading': sub_heading.get_text(),
            'author_name': author_name,
            'image_url': image_url
        }
    return data
def sub_main():
    url = "https://www.thehindu.com/sci-tech/technology/"
    soup = fetch_page(url)
    if not soup:
        return {}
    
    data = {}
    
    tech = soup.find('div' , class_='element main-row-element')
    if tech:
        title = tech.find('h3' , class_='title')
        link_txt = title.find('a').get_text()
        data['tech_text'] = link_txt
        
        a = tech.find('div' , class_='right-content')
        l = a.find('a')
        d = l.find('div' , class_='picture')
        img = extract_attribute(d,'img', 'data-original')
        big_img = img.replace('SQUARE_80' , 'SQUARE_960')
        data['tech_image'] = big_img
    else:
        data['tech'] = 'No tech'
    
    return data
if __name__ == '__main__':
    main_data = main()
    tech_data = sub_main()
    
    all_data = {
        'main_data': main_data,
        'tech_data': tech_data
    }
    
    with open('the_hindu.json', 'w') as json_file:
        json.dump(all_data, json_file, indent=4)
    
    print('Data has been saved to the_hindu.json')