import { sql } from "../database/database.js";

const addChore = async (userId, title, description, chorecoins, dueDate) => {
  await sql`INSERT INTO chores
      (user_id, title, description, chorecoins, due_date)
        VALUES (${userId}, ${title}, ${description}, ${chorecoins}, ${dueDate})`;
};

const claimChore = async (choreId, userId) => {
  await sql`INSERT INTO chore_assignments
    (chore_id, user_id, created_at) VALUES
      (${choreId}, ${userId}, NOW())`;
};

const listTopics = async () => {
  const rows = await sql`SELECT * FROM topics`;

  return rows;
};

const listAvailableChores = async () => {
  const rows = await sql`SELECT * FROM chores
      WHERE (due_date IS NULL OR due_date > NOW())
      AND id NOT IN (SELECT chore_id FROM chore_assignments)`;

  return rows;
};

const listUserChores = async (userId) => {
  const rows = await sql`SELECT * FROM chores
      WHERE id IN (
        SELECT chore_id FROM chore_assignments
          WHERE user_id = ${userId} AND completed_at IS NULL
      )`;

  return rows;
};

const completeChore = async (choreId, userId) => {
  await sql`UPDATE chore_assignments SET completed_at = NOW()
        WHERE chore_id = ${choreId} AND user_id = ${userId}`;

  const coinsRes = await sql`SELECT chorecoins FROM chores WHERE id = ${choreId}`;

  const coins = coinsRes[0].chorecoins;
  if (coins === 0) {
    return;
  }

  await sql`UPDATE users SET
        chorecoins = chorecoins + ${coins}
        WHERE id = ${userId}`;

  await sql`UPDATE users SET
        chorecoins = chorecoins - ${coins}
        WHERE id IN (SELECT user_id FROM chores WHERE id = ${choreId})`;
};

export {
  addChore,
  claimChore,
  completeChore,
  listAvailableChores,
  listChores,
  listUserChores,
};
