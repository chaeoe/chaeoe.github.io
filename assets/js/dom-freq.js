// assets/js/dom-freq.js
function countChar(text, target) {
  let count = 0;
  for (const ch of text) {
    if (ch === target) count++;
  }
  return count;
}

// HTML 문서에서 가져오기
const text = document.querySelector("#text-body").textContent;

const targets = ["이", "의", "날", "개", "소"];
const counts = targets.map(t => countChar(text, t));

// 비어 있던 HTML 리스트 가져오기
const list = document.querySelector("#freq-list");

for (let i = 0; i < targets.length; i++) {
  const li = document.createElement("li");
  li.textContent = `'${targets[i]}' : ${counts[i]}번`;
  list.appendChild(li);
}

let maxIdx = 0;
for (let i = 1; i < counts.length; i++) {
  if (counts[i] > counts[maxIdx]) maxIdx = i;
}

const topChar = document.querySelector("#top-char");
topChar.textContent = `가장 자주 나온 글자: ${targets[maxIdx]} (${counts[maxIdx]}번)`;
topChar.style.fontWeight = "bold";
topChar.style.color = "crimson";