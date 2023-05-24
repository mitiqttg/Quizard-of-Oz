// const { test, expect } = require("@playwright/test");

// test("Main page has expected headings and statistics", async ({ page }) => {
//   await page.goto("https://wick.fly.dev/");
//   await expect(page.locator("h1")).toContainText("Shared shopping lists");
//   await expect(page.locator("ul > li")).toContainText([`Shopping lists:`, `Shopping list items:`]);
// });

// test("Can create a new list, listing all active lists", async ({ page }) => {
//   await page.goto("https://wick.fly.dev/lists");
//   await expect(page.locator("h1")).toContainText(["Shopping lists"]);         
//   await expect(page.locator("h2")).toContainText(["Add a list","Active lists"]);         
//   const randomname =`${Math.random()}`;
//   await page.locator("input[type=text]").type(randomname);
//   await page.getByRole('button', { name: 'Create list!' }).click();
//   await expect(page.locator(`a >> text="${randomname}"`)).toHaveText(randomname);
// });

// test("Can deactivate a list.", async ({ page }) => {
//   await page.goto("https://wick.fly.dev/lists");
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
