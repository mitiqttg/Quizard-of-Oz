// const { test, expect } = require("@playwright/test");

// test("Main page has expected statistics", async ({ page }) => {
//   await page.goto("");
//   await expect(page.locator("p")).toContainText("Total number of topics:");
//   await expect(page.locator("p")).toContainText("Total number of questions:");
//   await expect(page.locator("p")).toContainText("Total number of questions anwers:");
//   await expect(page.locator("p")).toContainText("Total number of users:");
// });

// test("Can create a new question, listing all questions", async ({ page }) => {
    //   await page.goto("");
    //   await expect(page.locator("h2")).toContainText("Current questions");
//   const randomQuestion =`${Math.random()*10}`;
//   await page.locator("textarea[name=question_text]").type(randomQuestion);
//   await page.getByRole('submit', { name: 'Add a question' }).click();
//   await expect(page.locator(`a >> text="${randomQuestion}"`)).toHaveText(randomQuestion);
// });

// test("Can delete a question.", async ({ page }) => {
//   await page.goto("");
//   const listName = `List ${Math.random()}`;
//   await page.locator("input[type=text]").type(listName);
//   await page.getByRole('button', { name: 'Create list!' }).click();
//   await page.getByRole('listitem').filter({ hasText: listName}).getByRole('button', { name: 'Deactivate list!' }).click();
//   await expect(page.locator(`a >> text='${listName}'`)).toBeHidden();
// });

// test("Can show a single list.", async ({ page }) => {
//   await page.goto("https://wick.fly.dev/lists");
//   const randomname =`${Math.random()}`;
//   await page.locator("input[type=text]").type(randomname);
//   await page.getByRole('button', { name: 'Create list!' }).click();
//   await page.getByRole('link', { name: randomname }).click();
//   await expect(page.locator("h1")).toHaveText(randomname);
// });

// test("Single list can add new item and listing that item.", async ({ page }) => {
//   await page.goto("https://wick.fly.dev/lists/1");
//   await expect(page.locator("h2")).toContainText(["Adding new item","All shopping items"]);         
//   const itemName = `Item: ${Math.random()}`;
//   await page.locator("input[type=text]").type(itemName);
//   await page.getByRole('button', { name: 'Add item' }).click();
//   await expect(page.locator(`ul > li`)).toContainText([itemName]);
// });

// test("Can collect an item.", async ({ page }) => {
//   await page.goto("https://wick.fly.dev/lists/1");
//   const itemName = `Item: ${Math.random()}`;
//   await page.locator("input[type=text]").type(itemName);
//   await page.getByRole('button', { name: 'Add item' }).click();
//   await page.getByRole('listitem').filter({ hasText: itemName}).getByRole('button', { name: 'Mark collected!' }).click();
//   await expect(page.locator(`li > del`).filter({ hasText: itemName})).toContainText([itemName]);
// });
