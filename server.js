const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();

let browser;

async function startBrowser(){

browser = await puppeteer.launch({

executablePath:"/usr/bin/chromium",

headless:false,

args:[
"--no-sandbox",
"--disable-dev-shm-usage",
"--start-maximized"
],

userDataDir:"/data/browser"

});


const page = await browser.newPage();

await page.goto(
"https://www.aliexpress.com",
{
waitUntil:"domcontentloaded"
}
);

}

app.use(express.static("public"));

app.get("/status",(req,res)=>{
res.json({
status:"running",
site:"AliExpress"
});
});


app.listen(8080,async()=>{

console.log("Server started");

await startBrowser();

});
