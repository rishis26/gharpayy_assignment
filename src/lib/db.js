import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const db = {
  read: (table) => {
    const filePath = path.join(DATA_DIR, `${table}.json`);
    if (!fs.existsSync(filePath)) {
      // Return empty array and create the file if it doesn't exist
      fs.writeFileSync(filePath, "[]");
      return [];
    }
    try {
      const content = fs.readFileSync(filePath, "utf8");
      return content ? JSON.parse(content) : [];
    } catch (e) {
      console.error(`Error reading ${table}.json:`, e);
      return [];
    }
  },
  write: (table, data) => {
    const filePath = path.join(DATA_DIR, `${table}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return data;
  },
  insert: (table, item) => {
    const data = db.read(table);
    const newItem = {
      ...item,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };
    data.push(newItem);
    db.write(table, data);
    return newItem;
  },
  update: (table, id, updates) => {
    const data = db.read(table);
    const index = data.findIndex((x) => x._id === id);
    if (index === -1) return null;
    data[index] = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };
    db.write(table, data);
    return data[index];
  },
  delete: (table, id) => {
    const data = db.read(table);
    const filtered = data.filter((i) => i._id !== id);
    db.write(table, filtered);
    return true;
  },
};
