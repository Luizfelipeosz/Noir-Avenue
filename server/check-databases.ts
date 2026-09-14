import Database from "better-sqlite3";

const databases = [
  "../dev.db",
  "./dev.db",
  "./prisma/dev.db",
];

for (const databasePath of databases) {
  console.log("\n==============================");
  console.log("🗄️ Banco:", databasePath);

  try {
    const db = new Database(databasePath, {
      readonly: true,
    });

    const tables = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
      )
      .all();

    console.log("📋 Tabelas:", tables);

    const users = db
      .prepare(
        "SELECT id, name, email FROM User"
      )
      .all();

    console.log("👥 Usuários:", users);

    db.close();
  } catch (error) {
    console.log("❌ Não foi possível ler este banco:", error);
  }
}