const https = require('https');
const JSSoup = require('jssoup').default;
const fs = require('fs');
const url = "https://en.wikipedia.org/wiki/Brightness"; // FIRST: find a url of a page you are interested in from wikipedia 
const jsonPath = "./json/"; 
const imagePath = "./images/"; 
const name = "";


/*
This web-scraping example is set up for working with wikipedia.If you want to adapt this
to scrape another site you should go and inspect the site in the browser first, then adapt this. 
*/

function getAllImages(soupTag){
    let imgs = soupTag.findAll('img');
    let imgUrls = [];

    for(let i = 0; i < imgs.length; i++){
        let attrs = imgs[i].attrs;// get a tag attributes
        // if there is an href attribute let's get it
        if('src' in attrs){
            let src = attrs.src;
            if(src.indexOf("wiki/Special:") == -1){ //these are not images
                if(src.indexOf("https:") == -1){
                    src = "https:"+src;
                }
                console.log(src);
                imgUrls.push(src);
            }
        }
    }

    return imgUrls;
}

//returns one large string of all text
function getParagraphText(soupTag){
    let paragraphs = soupTag.findAll('p');
    let TextArray = [];
    let text = '';
    for(let i = 0; i < paragraphs.length; i++){
        
        let p = paragraphs[i].getText().toLowerCase();

        if(p.indexOf("light") != -1){
        TextArray.push(p);
        //Text += p;
        console.log(p);
    
        //text += paragraphs[i].getText();
        //console.log(paragraphs[i].getText());
    }
    }
    return TextArray;
}

//pass in Plain Old Javascript Object that's formatted as JSON
function writeJSON(data){
    try {
        let path = jsonPath+name+".json";
        fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
        console.log("JSON file successfully saved");
    } catch (error) {
        console.log("An error has occurred ", error);
    }
}

//create soup  
function createSoup(document){
    
    let soup = new JSSoup(document);
    let data = {
        "name": name,
        "url": url,
        "content": {}
    }; 

    let main = soup.find('main');//only get the content from the main body of the page

    data.content = {
        "text": getParagraphText(main)
    };
        
    //output json
    writeJSON(data);

}

//Request the url
https.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    
    let document = [];

    res.on('data', (chunk) => {
        document.push(chunk);
    }).on('end', () => {
        document = Buffer.concat(document).toString();
        // console.log(body);
        createSoup(document);
    });

}).on('error', (e) => {
    console.error(e);
});

