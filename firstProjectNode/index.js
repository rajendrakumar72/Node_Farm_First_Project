const http =require("http");
// var fDate= require('./DateModule')
const url=require("url");
const fs=require("fs");
const slugify=require("slugify");
const replaceTemplate=require("./module/replacementTemplate")
// const fileIn=fs.readFileSync("./firstProjectNode/txt/InputReadFile.txt","utf-8");
const fileFromData=fs.readFileSync("./txt/Data.txt","utf-8");
const fileForFront=fs.readFileSync("./txt/DataForFront.txt","utf-8");

const dataOverview=fs.readFileSync("./templates/template-overview.html","utf-8");
const tempProduct=fs.readFileSync("./templates/template-product.html","utf-8");

const tempCard=fs.readFileSync("./templates/template-card.html","utf-8");
// const fileFromData=fs.readFileSync('./txt/data.txt',
// {encoding:'utf8', flag:'r'});
const productDataObject=JSON.parse(fileFromData);
const parseData=JSON.parse(fileForFront);

const slugs=parseData.map(el => slugify(el.productName, {lower :true}));
console.log(slugs);
 

const server=http.createServer((req,res)=> {
    console.log(req.url);
    const { query , pathname } = url.parse(req.url,true);


// res.writeHead(200, {'Content-Type' : 'text/plain'});
// res.write("The Current Date "+fDate.myDateTime());
// var q=url.parse(req.url,true).query;
// var txt=q.year+" "+q.month;
// res.write(req.url)
// res.end(fileIn);
    // const path=req.url;
    if(pathname==="/overview"||pathname==='/'){
        res.writeHead(200,{"Content-Type":"text/html"});

        const cardsHtml=parseData.map(el => replaceTemplate(tempCard,el)).join("");
        const output=   dataOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        // console.log(output);

        res.end(output);
    
    }else if(pathname === "/product"){
        console.log(query);
        res.writeHead(200,{"Content-Type":"text/html"});
        const product =parseData[query.id];
        const output=replaceTemplate(tempProduct,product);
        res.end(output);
        
    }else if(pathname==="/data"){
        // fs.readFile("./firstProjectNode/txt/Data.txt","utf-8",(err,data)=>{
        //     const productData=JSON.parse(data);
        //     res.writeHead(200,{'Content-Type':'application/json'});
        //     res.end(data);
        // });
        res.writeHead(200,{'Content-Type':'application/json'});
        // console.log.apply(fileFromData)
        res.end(fileFromData);

    }else{
        res.writeHead(404,{'Content-Type':'text/html'});

        res.end('<h1>URL not found</h1>');
    }
});

server.listen(9000,"127.0.0.1",()=>{
console.log("listening to the port 9000");
});