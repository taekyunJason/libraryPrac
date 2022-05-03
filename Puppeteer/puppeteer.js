const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("https://www.goodchoice.kr/product/search/2");
  const content = await page.content();

  const $ = cheerio.load(content);

  await page.setViewport({
    width: 1366,
    height: 768,
  });

  //복사한 리스트의 Selector로 리스트를 모두 가져온다.
  //#product_list_area > li:nth-child(2)
  const lists = $("#product_list_area > li");
  //모든 리스트를 순회한다.
  lists.each((index, list) => {
    //호텔의 이름을 가져온다.
    //#poduct_list_area > li:nth-child(2) > a > div > div.name > strong
    const name = $(list).find("a > div > div.name > strong").text();

    //호텔의 가격을 가져온다.
    // #poduct_list_area > li:nth-child(2) > a > div > div.price > p > b
    const price = $(list).find("a > div > div.price > p > b").text();
    //호텔의 위치를 가져온다.
    // #poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)

    const location = $(list)
      .find("a > div > div.name > p:nth-child(4)")
      .text()
      .slice(25, 43);

    console.log({
      index,
      name,
      price,
      location,
    });
  });
  browser.close();
})();
