function processDataCount(data) {
    var ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0
    };
    data.forEach((rate, index) => {
        console.log(rate);
        const voteString = rate.number_people_vote;
        var voteNumber = 0;

        if (voteString.includes("K")) {
            voteNumber = parseFloat(voteString.replace("K", "")) * 1000;
        } else if (voteString.includes("M")) {
            voteNumber = parseFloat(voteString.replace("M", "")) * 1000000;
        } else {
            voteNumber = parseFloat(voteString);
        }

        ratingCounts[10 - index] = voteNumber;
    });

    console.log(ratingCounts);

    const xAxiss = Object.keys(ratingCounts);
    const totalCounts = xAxiss.map(xAxis => ratingCounts[xAxis]);
    console.log(xAxiss);
    console.log(totalCounts);
    drawChartCount(xAxiss, totalCounts, "rgb(240, 240, 9)");
}

function drawChartCount(xAxiss, totalCounts, backgroundColor) {
    // Xóa biểu đồ cũ nếu đã tồn tại
    if (currentChartCount) {
        currentChartCount.destroy();
    }

    const movieData = {
        labels: xAxiss,
        datasets: [{
            label: 'Number of Votes',
            backgroundColor: backgroundColor,
            data: totalCounts
        }]
    };

    const ctx = document.getElementById('bar-chart-all-rating').getContext('2d');
    currentChartCount = new Chart(ctx, {
        type: 'bar', 
        data: movieData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Votes'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Star Rating'
                    }
                }
            }
        }
    });
}


function LoadGraphRating(data, dataDetail) {
    document.getElementById("p-movie-rating-rating").innerHTML = dataDetail.data[0].rating;
    document.getElementById("p-movie-vote-rating").innerHTML = dataDetail.data[0].total_vote;

    processDataCount(data.data)
}

export { LoadGraphRating }