// [숙제13] 텍스트 분석 도구 구현
// 2025-13100 김채영

// --- 함수 정의들 (21강 코드 재사용) ---
// 1. 본문 가져오기
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark   = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx   = text.indexOf(endMark);

    // 시작 표시 다음 줄부터 끝 표시 직전까지
    return text.slice(startIdx, endIdx);
}

// 2. 가져온 본문에서 단어들의 배열 얻기
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*-]/g, " ")
        // 상위 30개 어휘에 --가 등장해서, 이를 방지하기 위해 기존 [...]에 -를 추가함.
        .split(/\s+/)
        .filter(w => w.length > 0);
}

// 3. 단어들의 배열에서 불용어를 제거한 배열 얻기
function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}

// 4. 단어들의 배열을 {단어: 빈도} 꼴의 객체로 만들기
function countWords(words) { // words: 단어들의 배열
    const counts = {}; // 빈 객체 초기화
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}

// 5. {단어: 빈도} 객체에서 상위 n개의 배열 얻기
function topN(counts, n) { // (바로 위 함수에서 나오는 counts) counts: 객체
    return Object.entries(counts) // 객체 -> 배열로 변환
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

// 종합: text -> 상위 n개 단어의 배열
function analyze(text, stopwords) {
    const body    = extractBody(text);
    const words   = getWords(body);
    const cleaned = removeStopwords(words, stopwords);
    const counts  = countWords(cleaned);
    return topN(counts, 30);
}

// --- 메인: 세 파일을 동시에 fetch ---
// 파일 읽고 처리하기
Promise.all([
  fetch("/data/frankenstein.txt").then(r => r.text()),
  fetch("/data/dracula.txt").then(r => r.text()),
  fetch("/data/stopwords-en.txt").then(r => r.text()),
  fetch("/data/stopwords-custom.txt").then(r => r.text()),
]).then(([frankText, dracText, baseStop, customStop]) => {
    const stopwords = (baseStop + "\n" + customStop)
    .split(/\s+/)
    .filter(w => w.length > 0);
  const frankTop = analyze(frankText, stopwords);
  const dracTop  = analyze(dracText, stopwords);
  drawChart("#chart-frankenstein", frankTop, "rgba(40, 167, 69, 0.6)");
  drawChart("#chart-dracula", dracTop, "rgba(220, 53, 69, 0.6)");
});

function drawChart(selector, top, color) {
  const canvas = document.querySelector(selector);
  new Chart(canvas, {
    type: "bar",
    data: {
      labels: top.map(item => item[0]), // 단어
      datasets: [{
        label: "빈도", data: top.map(item => item[1]), // 빈도
        backgroundColor: color, // 색깔
      }],
    },
    options: {
      indexAxis: "y", // 가로로 긴 막대
      maintainAspectRatio: false, // 비율 보존 안 함 -> 아래로 긴 그림
      scales: {
        x: { beginAtZero: true }, // 막대그래프 옵션: 0부터 시작
        y: { ticks: { autoSkip: false } },
      },
    },
  });
}