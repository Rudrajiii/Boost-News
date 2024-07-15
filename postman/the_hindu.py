import requests
from bs4 import BeautifulSoup

# Define the URL of The Hindu's main page
url = 'https://www.thehindu.com/'
response = requests.get(url)

if response.status_code == 200:
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find the main article section
    article_section = soup.find('div', class_='element bigger main-element pt-0')
    smaller_article_section = soup.find('div' , class_='smaller')
    if smaller_article_section:
        main_title = smaller_article_section.find('h3' , class_='title')
        if main_title:
            link_tag = main_title.find('a')
            strong_tag = main_title.find('strong')
            get_main_title_text = main_title.get_text(strip=True)
            print(f'Rudra"s heading {get_main_title_text}')
            if strong_tag:
                text = strong_tag.get_text(strip=True)
                print(f'Strong tag text => {text}')
            if link_tag:
            # Print the href attribute and text of the anchor tag
                print(f'Link: {link_tag["href"]}, Text: {link_tag.get_text(strip=True)}')
    
    if article_section:
        # Extract the main heading
        main_heading_tag = article_section.find('h1', class_='title')
        if main_heading_tag:
            main_heading = main_heading_tag.get_text(strip=True)
            print(f'Main Heading: {main_heading}')
        
        # Extract the sub-heading
        sub_heading_tag = article_section.find('div', class_='sub-text')
        if sub_heading_tag:
            sub_heading = sub_heading_tag.get_text(strip=True)
            print(f'Sub-Heading: {sub_heading}')
        
        # Extract the author name
        author_tag = article_section.find('div', class_='author-name')
        if author_tag:
            author_name = author_tag.get_text(strip=True)
            print(f'Author Name: {author_name}')
        
        # Extract the image URL
        image_tag = article_section.find('div', class_='picture').find('img')
        if image_tag:
            image_url = image_tag.get('data-original', image_tag.get('src'))
            clear_n_big_img_url = image_url.replace('SQUARE_80' , 'SQUARE_960')
            print(f'Image URL: {clear_n_big_img_url}')
    else:
        print('No main article section found.')
else:
    print(f'Failed to retrieve the webpage. Status code: {response.status_code}')


# "https://th-i.thgim.com/public/incoming/9ytfn5/article68386671.ece/alternates/SQUARE_100/20240710001L.jpg"

# "https://th-i.thgim.com/public/incoming/9ytfn5/article68386671.ece/alternates/LANDSCAPE_960/20240710001L.jpg"