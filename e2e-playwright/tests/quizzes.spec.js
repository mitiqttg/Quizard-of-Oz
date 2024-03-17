import { test, expect } from '@playwright/test';

test("Main page has expected title and statistics", async ({ page }) => {
    await page.goto("http://localhost:7777/");
    await expect(page).toHaveTitle("Quizzes!");
    await expect(page.locator("h1")).toContainText("Practice application");
    await expect(page.locator("h3")).toContainText("Statistics!");
    await expect(page.getByText(
        "Total number of topics:", 
        "Total number of questions:", 
        "Total number of questions answered:", 
        "Total number of users:")).toBeVisible();
});

const userEmail = `haha${Math.random()*10}@hihi.com`;
const userPassword = `123456haha${Math.random()*10}`;

test("Can register", async ({ page }) => {
      await page.goto("http://localhost:7777/auth/register");
      await expect(page.getByRole('link')).toHaveText("Already registered? Login here.");
      await page.locator("input[type=email]").type(userEmail);
      await page.locator("input[type=password]").type(userPassword);
      await page.getByRole('button', { name: 'Register' }).click();
      await expect(page.locator("h1")).toContainText("Login form");
});

test("Can login", async ({ page }) => {
      await page.goto("http://localhost:7777/auth/login");
      await page.locator("input[type=email]").type(userEmail);
      await page.locator("input[type=password]").type(userPassword);
      await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator("h1")).toContainText("Good morning, sunshine!");
  await expect(page.locator("h2")).toContainText("Current topics!");
});

const topicName = `We are ${Math.random()*100}`;

test("Can create a topic if user login as admin.", async ({ page }) => {
  await page.goto("http://localhost:7777/auth/login");
  const adminEmail = "admin@admin.com";
  await page.locator("input[type=email]").type(adminEmail);
  await page.locator("input[type=password]").type('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator("h1")).toContainText("Welcome boss!");
  await page.locator("input[type=text]").type(topicName);
  await page.getByRole('button', { name: 'Add topic' }).click();
  await expect(page.locator(`a >> text=${topicName}`)).toHaveText(topicName);
});

test("Can delete a topic.", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");
    const adminEmail = "admin@admin.com";
    await page.locator("input[type=email]").type(adminEmail);
    await page.locator("input[type=password]").type('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName1 = `Mia sans ${Math.random()*100}`;
    await page.locator("input[type=text]").type(topicName1);
    await page.getByRole('button', { name: 'Add topic' }).click();
    await expect(page.locator(`a >> text='${topicName1}'`)).toHaveText(topicName1);
    await page.getByRole('listitem').filter({ hasText: topicName1}).getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator(`a >> text='${topicName1}'`)).toBeHidden();
});

const randomQuestion1 =`Who is the first human land on the moon? ${Math.random()*100}`;
const randomQuestion2 =`When was the first Wimbledon tournament? ${Math.random()*100}`;
const topicName1 = "Hear me roar- Lannister";

test("Can create a new question, listing all questions", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");
    const userEmail = "admin@admin.com";
    const userPassword = "123456";
    await page.locator("input[type=email]").type(userEmail);
    await page.locator("input[type=password]").type(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/topics');
    await page.locator("input[type=text]").type(topicName1);
    await page.getByRole('button', { name: 'Add topic' }).click();

    await page.getByRole('link').filter({ hasText: topicName1}).click();
    await expect(page.locator("h1")).toContainText(topicName1);
    await page.locator("textarea[name=question_text]").type(randomQuestion1);
    await page.getByRole('button', { name: 'Add question' }).click();
    await page.locator("textarea[name=question_text]").type(randomQuestion2);
    await page.getByRole('button', { name: 'Add question' }).click();
    await expect(page.locator(`a >> text="${randomQuestion1}"`)).toHaveText(randomQuestion1);
    await expect(page.locator(`a >> text="${randomQuestion2}"`)).toHaveText(randomQuestion2);
});

test("Can delete a question.", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");
    const userEmail = "admin@admin.com";
    const userPassword = "123456";
    await page.locator("input[type=email]").type(userEmail);
    await page.locator("input[type=password]").type(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/topics');
    await page.locator("input[type=text]").type(topicName1);
    await page.getByRole('button', { name: 'Add topic' }).click();

    await page.getByRole('link').filter({ hasText: topicName1}).click();
    await page.getByRole('listitem').filter({ hasText: randomQuestion1}).getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator(`a >> text='${randomQuestion1}'`)).toBeHidden;  
});

const itemName1 = `Winter is coming -Stark ${Math.random()*100}`;
const itemName2 = `Family, duty, honor -Tully ${Math.random()*100}`;

test("Can add an option and list all options", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");
    const userEmail = "admin@admin.com";
    const userPassword = "123456";
    await page.locator("input[type=email]").type(userEmail);
    await page.locator("input[type=password]").type(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link').filter({ hasText: topicName1}).click();
    await page.getByRole('link').filter({ hasText: randomQuestion2}).click();

    await page.locator("textarea[name=option_text]").type(itemName1);
    await page.getByLabel('Correct').check();
    await page.getByRole('button', { name: 'Add option' }).click();
    
    await page.locator("textarea[name=option_text]").type(itemName2);
    await page.getByRole('button', { name: 'Add option' }).click();

    await expect(page.locator('ul > li')).toContainText([itemName1, itemName2]);
});

test("Can delete an option", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");
    const userEmail = "admin@admin.com";
    const userPassword = "123456";
    await page.locator("input[type=email]").type(userEmail);
    await page.locator("input[type=password]").type(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link').filter({ hasText: topicName1}).click();
    await page.getByRole('link').filter({ hasText: randomQuestion2}).click();

    await page.getByRole('listitem').filter({ hasText: itemName2}).getByRole('button', { name: 'Delete option' }).click();
    await expect(page.locator(`li >> text='${itemName2}'`)).toBeHidden();
});

test("Can get a random quiz from topic", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");
    const topic = `Literature ${Math.random()}`;
    const question = `When did Shakespeare write Hamlet? ${Math.random()}`;
    const option1 = `Between 1599 and 1601 ${Math.random()}`;
    const option2 = `Between 1609 and 1611 ${Math.random()}`;
    const userEmail = "admin@admin.com";
    const userPassword = "123456";
    await page.locator("input[type=email]").type(userEmail);
    await page.locator("input[type=password]").type(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator("input[type=text]").type(topic);
    await page.getByRole('button', { name: 'Add topic' }).click();

    await page.getByRole('link').filter({ hasText: topic}).click();
    await page.locator("textarea[name=question_text]").type(question);
    await page.getByRole('button', { name: 'Add question' }).click();
    
    await page.getByRole('link').filter({ hasText: question}).click();
    await page.locator("textarea[name=option_text]").type(option1);
    await page.getByLabel('Correct').check();
    await page.getByRole('button', { name: 'Add option' }).click();

    await page.getByRole('link').filter({ hasText: "Quiz"}).click();
    await expect(page.locator("h2")).toContainText("Topics for quiz");
    await page.getByRole('link').filter({ hasText: topic}).click();
    await expect(page.locator("h2")).toContainText(`Question: ${question}`);
});
