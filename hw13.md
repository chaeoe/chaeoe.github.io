---
layout: page
title: "[숙제13] 텍스트 분석 도구 구현"
permalink: /hw13/
---

# [숙제13] 텍스트 분석 도구 구현

<!-- Q1: 두 고딕 소설의 상위 30개 단어 비교 -->
<h2>Frankenstein vs. Dracula -- 상위 30개 단어</h2>

<div style="display: flex; gap: 1em;">
    <div style="flex: 1;">
        <h3>Frankenstein (Shelley, 1818)</h3>
        <div style="height: 600px;">
            <canvas id="chart-frankenstein"></canvas>
        </div>
    </div>
    <div style="flex: 1;">
        <h3>Dracula (Stoker, 1897)</h3>
        <div style="height: 600px;">
            <canvas id="chart-dracula"></canvas>
        </div>
    </div>
</div>

<!-- Q2: 보고서 -->
## 보고서

### 추가한 불용어와 근거
NLTK 기본 목록 외에 다음 5개의 단어를 `data/stopwords-custom.txt`에 추가했다:
`one`, `could`, `would`, `said`, `even`.

이 단어들은 두 작품의 상위 30개 어휘에 **모두** 들어 있었으나,
특정 인물이나 사건, 주제를 드러내는 어휘가 아니라
소설의 내용이나 특성을 파악하는 데 도움이 되지 않는다고 판단하여 제외했다.  
`one`은 막연한 지시어이고, `would`, `could`는 조동사로서 문법적·문체적 기능을 한다.
또한 `said`는 인물 간의 대화를 인용하는 상황에서 자주 등장하는 어휘,
`even`은 주위의 내용을 강조하는 부사일 뿐이다.

### 두 작품의 단어 빈도가 들려주는 이야기
- **공통으로 도드라지는 단어**: 두 작품 모두 `time`, `day`, `saw`와 같은 어휘가 보인다.
이는 두 소설이 **시간 흐름**에 따른 화자의 **시선과 발견**을 통해 공포감이나 긴장감을 쌓아가는 서술 방식을 공유하고 있다고 해석할 수 있다.
또 `man`이 공통으로 보이는데, 이는 *Frankenstein*의 피조물과 *Dracula*의 흡혈귀가 모두
**인간과 비인간의 경계**와 관련된 존재라는 점과 연결지을 수 있다.

- **한 작품에만 도드라지는 단어**와 그것이 시사하는 작품의 특성:
*Frankenstein*에서는 `father`, `life`, `first`와 같은 단어가 두드러지는데,
이는 이 소설의 제재인 **창조자와 피조물의 관계**, **생명의 창조**와 잘 어우러진다.
반면 *Dracula*에서는 `van`, `helsing`, `lucy` 같은 **고유명사**가 상위에 위치한다.
이는 소설에서 여러 인물의 시점이 교차하여 드러나는 특성과 특정 인물을 중심으로 사건이 전개되는 특성, 즉 **인물 중심적** 성격을 잘 보여준다.

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/assets/js/hw13.js"></script>