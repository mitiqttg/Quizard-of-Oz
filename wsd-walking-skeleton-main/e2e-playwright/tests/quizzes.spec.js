// const { test, expect } = require("@playwright/test");

// test("Main page has expected statistics", async ({ page }) => {
//   await page.goto("");
//   await expect(page.locator("p")).toContainText("Total number of topics:");
//   await expect(page.locator("p")).toContainText("Total number of questions:");
//   await expect(page.locator("p")).toContainText("Total number of questions anwers:");
//   await expect(page.locator("p")).toContainText("Total number of users:");
// });

//   const topicName = `We are ${Math.random()*100}`;
// test("Can create a topic.", async ({ page }) => {
//   await page.goto("");
//   const adminEmail = "admin@admin.com";
//   await page.locator("input[type=email]").type(adminEmail);
//   await page.locator("input[type=password]").type('123456');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await expect(page.locator("h1")).toContainText("Welcome boss!");
//   await page.locator("input[type=text]").type(topicName);
//   await page.getByRole('submit', { name: 'Add topic' }).click();
//   await expect(page.locator(`a >> text='${topicName}'`)).toHaveText(topicName);
// });

// test("Can delete a topic.", async ({ page }) => {
//   await page.goto("");
//   const adminEmail = "admin@admin.com";
//   await page.locator("input[type=email]").type(adminEmail);
//   await page.locator("input[type=password]").type('123456');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await expect(page.locator("h1")).toContainText("Welcome boss!");
//   const topicName = `We are ${Math.random()*100}`;
//   await page.locator("input[type=text]").type(topicName);
//   await page.getByRole('submit', { name: 'Add topic' }).click();
//   await expect(page.locator(`a >> text='${topicName}'`)).toHaveText(topicName);
//   await page.getByRole('listitem').filter({ hasText: topicName}).getByRole('button', { name: 'Delete' }).click();
//   await expect(page.locator(`a >> text='${topicName}'`)).toBeHidden();

// });

//   const randomQuestion1 =`${Math.random()*10}`;
//   const randomQuestion2 =`${Math.random()*10}`;
// test("Can create a new question, listing all questions", async ({ page }) => {
    //   await page.goto("");
    //   await expect(page.locator("h2")).toContainText("Current questions");
//   await page.locator("textarea[name=question_text]").type(randomQuestion1);
//   await page.getByRole('submit', { name: 'Add a question' }).click();
//   await page.locator("textarea[name=question_text]").type(randomQuestion2);
//   await page.getByRole('submit', { name: 'Add a question' }).click();
//   await expect(page.locator(`a >> text="${randomQuestion1}"`)).toHaveText(randomQuestion1);
//   await expect(page.locator(`a >> text="${randomQuestion2}"`)).toHaveText(randomQuestion2);
// });

// test("Can delete a question.", async ({ page }) => {
//   await page.goto("");
//   const question = `What is the meaning of ${Math.random()}`;
//   await page.locator("textarea[name=question_text]").type(question);
//   await page.getByRole('submit', { name: 'Add a question' }).click();
// await expect(page.locator(`a >> text="${question}"`)).toHaveText(question);
//   await page.getByRole('listitem').filter({ hasText: question}).getByRole('button', { name: 'Delete' }).click();
//   await expect(page.locator(`a >> text='${question}'`)).toBeHidden();
// });

// const itemName = `Item: ${Math.random()*100}`;
// test("Can add an option", async ({ page }) => {
//   await page.goto("");
//   await expect(page.locator("h3")).toContainText(["Add a option below","Questions:"]);         
//   await page.locator("textarea[name=option_text]").type(itemName);
//   await page.getByRole('submit', { name: 'Add option' }).click();
//   await expect(page.locator(`ul > li`)).toContainText([itemName]);
// });

// test("Can delete an option", async ({ page }) => {
//   await page.goto("");
//   //   await page.getByRole('listitem').filter({ hasText: itemName}).getByRole('button', { name: 'Delete option' }).click();
//   await expect(page.locator(`li >> text='${itemName}'`)).toBeHidden();
// });

// test("Can get a random quiz from topic", async ({ page }) => {
    //   await page.goto("");
    //await expect(page.locator("h2")).toContainText("Topics for quiz"));
//   await page.locator("input[type=text]").type(itemName);
//   await page.getByRole(page.locator(`a >> text="${randomQuestion1}"`)).click();
//   await page.getByRole('listitem').filter({ hasText: itemName}).getByRole('button', { name: 'Mark collected!' }).click();
//   await expect(page.locator(`li > del`).filter({ hasText: itemName})).toContainText([itemName]);
// });

// test("Can delete an option", async ({ page }) => {
//   await page.goto("https://wick.fly.dev/lists/1");
//   const itemName = `Item: ${Math.random()}`;
//   await page.locator("input[type=text]").type(itemName);
//   await page.getByRole('button', { name: 'Add item' }).click();
//   await page.getByRole('listitem').filter({ hasText: itemName}).getByRole('button', { name: 'Mark collected!' }).click();
//   await expect(page.locator(`li > del`).filter({ hasText: itemName})).toContainText([itemName]);
// });