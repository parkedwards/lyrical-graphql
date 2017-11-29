const webdriver = require("selenium-webdriver");
const { Builder, By, Key, until } = webdriver;

const driver = new Builder().forBrowser("chrome").build();

driver.get('http://localhost:4000/#/');
driver.findElement(By.id('song-7')).click();