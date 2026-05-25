// [숙제12] 인문학 데이터 시각화
// 2025-13100 김채영

// Q1
fetch("/data/sillok.json")
  .then(response => response.json())
  .then(records => {
    const labels = records.map(r => r.king);
    const counts = records.map(r => r.volumes);

    const canvas = document.querySelector("#q1-chart");
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "권수",
                data: counts,
                backgroundcolor: "rgba(54, 162, 235, 0.6)"
            }]
        },
        options: {
            plugins: {
                title: { display: true, text: "조선왕조실록 왕대별 권수" }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    })
  });