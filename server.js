const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();

app.use(express.static("public"));

let browser;

async function launchBrowser(){

try {

browser = await puppeteer.launch({

executablePath: "/usr/bin/chromium",

headless: false,

userDataDir: "/data/browser",

args:[
"--no-sandbox",
"--disable-setuid-sandbox",
"--disable-dev-shm-usage",
"--disable-gpu",
"--no-first-run",
"--no-default-browser-check",
"--start-maximized"
]

});


const pages = await browser.pages();

const page = pages[0];

await page.goto(
"https://www.aliexpress.com",
{
waitUntil:"networkidle2",
timeout:60000
}
);


console.log("AliExpress loaded");


}catch(e){

console.log("Browser error:");
console.log(e);

}

}


app.get("/status",(req,res)=>{
res.json({
running:true
});
});


app.listen(8080,()=>{

console.log("Web server running on 8080");

launchBrowser();

});
