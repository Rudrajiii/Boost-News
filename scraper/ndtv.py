import requests
from bs4 import BeautifulSoup
import json

url = "https://www.ndtv.com/"

# Send a GET request to the URL
response = requests.get(url)

def scrape_ndtv_section(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    sections = ['india-news', 'education', 'offbeat', 'science']
    data = {section: [] for section in sections}

    for section in sections:
        section_div = soup.find('div', {'data-tb-region': section})
        if section_div:
            articles = section_div.find_all('li')
        
            for article in articles:
                link_tag = article.find('a', class_='LstWg1_img2')
                title_tag = article.find('h5', class_='crd_ttl8')
                image_tag = article.find('img', class_='lz_img')

                if link_tag and title_tag and image_tag:
                    link = link_tag['href']
                    title = title_tag.text.strip()
                    image_url = image_tag['src']

                    data[section].append({
                        'title': title,
                        'link': link,
                        'image_url': image_url
                    })

    return data

# Check if the request was successful
if response.status_code == 200:

    soup = BeautifulSoup(response.content, 'lxml')


    data = {}

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
            img_tag = item.find('img')
            img_url = img_tag['src'] if img_tag else None
            articles.append({
                'title': title,
                'link': link,
                'img_url': img_url
            })
    
    data['articles'] = articles

    # Scrape additional sections
    additional_data = scrape_ndtv_section(url)
    data.update(additional_data)

    # Save the data to a JSON file
    with open('../data/scraped_data_ndtv.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print("Data has been saved to scrap_data.json")
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
