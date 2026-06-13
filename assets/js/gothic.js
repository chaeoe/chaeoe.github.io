// [숙제13] 텍스트 분석 도구 구현, [숙제14] 숙제13 통합
// 2025-13100 김채영

// --- 함수 정의들 (21강 코드 재사용) ---
// Project Gutenberg 텍스트 파일에서 본문만 가져오기
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark   = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx   = text.indexOf(endMark);

    // 시작 표시 다음 줄부터 끝 표시 직전까지
    return text.slice(startIdx, endIdx);
}

// 종합: text -> 상위 n개 단어의 배열
function analyze(text, stopwords) {
    const body    = extractBody(text);
    const words   = getWords(body); // analysis.js 함수
    const cleaned = removeStopwords(words, stopwords); // analysis.js 함수
    const counts  = countWords(cleaned); // analysis.js 함수
    return topN(counts, 30); // analysis.js 함수
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