const {JSDOM} = require('jsdom')
const fs = require('fs')


function write(content){
    fs.appendFile('output.txt', `${content} \n`, (err) => {
        if (err) {
          console.error('Error appending to file:', err);
          return;
        }
        console.log('Content appended to file successfully!');
    });
}




async function crawlPage(baseURL, currentURL, pages){
    
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if(baseURLObj.hostname != currentURLObj.hostname){
        return pages;
    }

    const noralizedCurrentURL = noralizeURL(currentURL)

    if(pages[noralizedCurrentURL] > 0){
        pages[noralizedCurrentURL]++;

        return pages
    }

    pages[noralizedCurrentURL] = 1;

    // console.log(`actively crawling: ${currentURL}`);

    write(currentURL);


    try{
        const resp = await fetch(currentURL)

        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")

        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}`)
            return pages
        }

        let htmlBody = await resp.text();
        
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for(const nextURL of nextURLs){
           pages = await crawlPage(baseURL, nextURL, pages);
        }

    }catch(err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
    }
    
    return pages
}



function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')

    for(const linkElement of linkElements){
        
        if(linkElement.href.slice(0,1) === '/'){
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                // console.log(urlObj.href);
                urls.push(urlObj.href);
            }catch(err){
                console.log(`error with relative url ${err.message}`)
            }
            
        }else{
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href);
            }catch(err){
                console.log(`error with relative url ${err.message}`)
            }
        }
        
    }

    
    
    return urls
}



function noralizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }

    return hostPath;
}

module.exports = {
    noralizeURL,
    getURLsFromHTML,
    crawlPage
};