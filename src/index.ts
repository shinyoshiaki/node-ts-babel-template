require("@babel/polyfill");

import axios from "axios";

const req = axios.create({ baseURL: "https://api.github.com/users/" });

const fetch = async (user: string) => {
  let ress: any[][] = [];
  for (let i = 0; ; i++) {
    const res = await req
      .get(user + "/repos?per_page=100&page=" + i)
      .catch(console.log);
    if (!res) break;
    if ((res as any).data.length === 0) break;
    ress.push((res as any).data);
  }
  if (ress.length === 0) return;
  console.log({ ress });
  const res = ress.flatMap(item => item);

  const languages = res.flatMap(item => {
    if (item.language) {
      return [item.language];
    } else {
      return [];
    }
  });

  const results: { type: string; count: number }[] = [];
  const map: { [key: string]: number } = {};
  languages.forEach(lang => {
    if (Object.keys(map).includes(lang)) {
      map[lang]++;
    } else {
      map[lang] = 1;
    }
  });
  Object.keys(map).forEach(key => results.push({ type: key, count: map[key] }));
  console.log(results);
};

fetch("shinyoshiaki");
