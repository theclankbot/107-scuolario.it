const KEY = "912662772832c299bba3bd4a76335904";
const SITE = "https://scuolario.it";
const HOST = "scuolario.it";

const urls = process.argv.slice(2);
const urlList = urls.length > 0 ? urls : [`${SITE}/sitemap.xml`];

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  console.error(`IndexNow submission failed: ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}

console.log(`IndexNow submission queued for ${urlList.length} URL(s).`);
