const {crawlPage} = require('./crawl.js')
const {loadServer, delete_file} = require('./index.js')


async function main(){
    if(process.argv.length < 3){
        console.log("no website provided");
        process.exit(1);
    }

    if(process.argv.length >= 4){
        console.log("too many command line args");
        process.exit(1);
    }

    const baseURL = process.argv[2];

    delete_file();


    console.log(`starting crawl of: ${baseURL}`);

    const pages = await crawlPage(baseURL, baseURL, {});

    for(const page of Object.entries(pages)){
        console.log(page);
    }

    loadServer();

   

}

main();