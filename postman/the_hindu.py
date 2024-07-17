import requests
from bs4 import BeautifulSoup

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
        return
    
    # Extract smaller article section
    smaller_article_section = soup.find('div', class_='smaller')
    if smaller_article_section:
        main_title = smaller_article_section.find('h3', class_='title')
        if main_title:
            link = extract_attribute(main_title, 'a', 'href')
            strong_text = extract_text(main_title, 'strong')
            main_title_text = main_title.get_text(strip=True)
            print(f'Rudra\'s heading: {main_title_text}')
            if strong_text:
                print(f'Strong tag text => {strong_text}')
            if link:
                print(f'Link: {link}, Text: {main_title.get_text(strip=True)}')
    
    # Extract main article section
    article_section = soup.find('div', class_='element bigger main-element pt-0')
    if article_section:
        main_heading = extract_text(article_section, 'h1.title')
        sub_heading = extract_text(article_section, 'div.sub-text')
        author_name = extract_text(article_section, 'div.author-name')
        image_url = extract_attribute(article_section.find('div', class_='picture'), 'img', 'data-original', extract_attribute(article_section.find('div', class_='picture'), 'img', 'src'))

        if image_url:
            image_url = image_url.replace('SQUARE_80', 'SQUARE_960')

        if main_heading:
            print(f'Main Heading: {main_heading}')
        if sub_heading:
            print(f'Sub-Heading: {sub_heading}')
        if author_name:
            print(f'Author Name: {author_name}')
        if image_url:
            print(f'Image URL: {image_url}')
    else:
        print('No main article section found.')

def sub_main():
    url = "https://www.thehindu.com/sci-tech/technology/"
    soup = fetch_page(url)
    if not soup:
        return
    tech = soup.find('div' , class_='element main-row-element')
    if tech:
        # print(tech.prettify())
        title = tech.find('h3' , class_='title')
        link_txt = title.find('a').get_text()
        print(f'Tech Text : {link_txt}')
    if tech:
        a = tech.find('div' , class_='right-content')
        l = a.find('a')
        d = l.find('div' , class_='picture')
        img = extract_attribute(d,'img', 'data-original')
        big_img = img.replace('SQUARE_80' , 'SQUARE_960')
        print(big_img)
    else:
        print('No tech')

    

if __name__ == '__main__':
    main()
    print('-----------------')
    sub_main()





# "https://th-i.thgim.com/public/incoming/9ytfn5/article68386671.ece/alternates/SQUARE_100/20240710001L.jpg"

# "https://th-i.thgim.com/public/incoming/9ytfn5/article68386671.ece/alternates/LANDSCAPE_960/20240710001L.jpg"