CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  title TEXT NOT NULL
    CHECK(length(trim(title)) BETWEEN 1 AND 120),

  description TEXT NOT NULL DEFAULT ''
    CHECK(length(description) <= 2000),

  priority TEXT NOT NULL DEFAULT 'Medium'
    CHECK(priority IN ('Low', 'Medium', 'High')),

  status TEXT NOT NULL DEFAULT 'Pending'
    CHECK(status IN ('Pending', 'In Progress', 'Completed')),

  created_at TEXT NOT NULL
    DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);