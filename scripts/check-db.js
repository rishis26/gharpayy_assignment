const fs = require("fs");
const path = require("path");

const dataDir = path.join(process.cwd(), "data");
const leadsFile = path.join(dataDir, "leads.json");

if (fs.existsSync(leadsFile)) {
  const data = JSON.parse(fs.readFileSync(leadsFile, "utf8"));
  console.log(`Current Leads Count: ${data.length}`);
  if (data.length > 0) {
    console.log("First Lead Timeline Samples:");
    data.slice(0, 1).forEach((l) => {
      console.log(`Lead: ${l.name}`);
      console.log(`Timeline Count: ${l.timeline?.length || 0}`);
      l.timeline?.forEach((t) => console.log(` - [${t.type}] ${t.text}`));
    });
  }
} else {
  console.log("leads.json does not exist");
}
