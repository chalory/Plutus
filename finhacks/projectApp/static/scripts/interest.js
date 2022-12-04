// selectors
const depositSel = document.getElementById("deposit");
const interestSel = document.getElementById("interest");
const yearsRangeSel = document.querySelector('input[type="range"]');
const result = document.querySelector(".Result-number");
const resultNoInterest = document.querySelector(".Result-number--noInterest");
const resultDiff = document.querySelector(".Result-number--difference");
const yearCountSel = document.querySelector(".YearCount");

var dataset1 = [];
var dataset2 = [];
var total = 0;

const MAX_PLOTS = 48;

var { svg, g, width, height } = setupGraph();

function calc({
    deposit = Number(depositSel.value.replaceAll(",", "")),
    interest = Number(interestSel.value.replaceAll(",", "")),
    years = Number(yearsRangeSel.value),
}) {
    total = 0;
    dataset1.length = 0;
    dataset2.length = 0;
    var months = years * 12;
    var totalWithoutInterest = 0;
    var intPerc = interest / 12 / 100;
    let monthArr = [...Array(months + 1).keys()].slice(1);

    for (const month of monthArr) {
        totalWithoutInterest += Number(deposit);
        total = total + Number(deposit) + (total + Number(deposit)) * intPerc;

        if (monthArr.length >= MAX_PLOTS && month % Math.floor(monthArr.length / MAX_PLOTS) !== 0) {
            continue;
        }

        dataset1.push([Number(month) / 12, total]);
        dataset2.push([Number(month) / 12, totalWithoutInterest]);
    }

    const formattedTotal = abbrNum(total.toFixed(2) * 1).toLocaleString();
    const formattedTotalWithoutInterest = abbrNum(
        totalWithoutInterest.toFixed(2) * 1
    ).toLocaleString();

    result.innerHTML = `$${formattedTotal}`;
    resultNoInterest.innerHTML = `$${formattedTotalWithoutInterest}`;
    resultDiff.innerHTML = `$${abbrNum(
        (total - totalWithoutInterest).toFixed(2) * 1
    ).toLocaleString()}`;

    yearCountSel.innerHTML = `<span class="HighlightTwo">${years}</span> ${
        years > 1 ? "Years" : "Year"
    }`;

    updateGraph({ months, total });

    return { total };
}

// listeners
depositSel.addEventListener("change", e => {
    calc({ deposit: Number(e.target.value.replaceAll(",", "")) });
});
depositSel.addEventListener("keyup", e => {
    calc({ deposit: Number(e.target.value.replaceAll(",", "")) });
});

interestSel.addEventListener("change", e => {
    calc({ interest: Number(e.target.value.replaceAll(",", "")) });
});
interestSel.addEventListener("keyup", e => {
    calc({ interest: Number(e.target.value.replaceAll(",", "")) });
});

yearsRangeSel.addEventListener("input", e => {
    const yearCount = Number(e.target.value);
    calc({ years: yearCount });
    yearCountSel.innerHTML = `<span class="HighlightTwo">${yearCount}</span> ${
        yearCount > 1 ? "Years" : "Year"
    }`;
});

calc({
    deposit: Number(depositSel.value.replaceAll(",", "")),
    interest: Number(interestSel.value.replaceAll(",", "")),
    years: Number(yearsRangeSel.value),
});

function setupGraph() {
    const months = 1 * 12;
    // 1. Set width, height, and margin on SVG
    var svg = d3.select("svg"),
        margin = 100,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    // Add X label
    svg.append("text")
        .attr("x", 213)
        .attr("y", height - 15 + 100)
        .attr("text-anchor", "middle")
        .style("font-family", "Helvetica")
        .style("font-size", 12)
        .text("Years");

    // Add Y label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(95," + 158 + ")rotate(-90)")
        .style("font-family", "Helvetica")
        .style("font-size", 12)
        .text("Earnings");

    // Create "g" element to add axis to
    var g = svg
        .append("g")
        .attr("class", "axis-container")
        .attr("transform", "translate(" + 52 + "," + margin / 2 + ")");

    var xScale = d3.scaleLinear().domain([0, months]).range([0, width]),
        yScale = d3.scaleLinear().domain([0, total]).range([height, 0]);

    g.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g.append("g")
        .attr("class", "yaxis")
        .call(d3.axisLeft(yScale).tickFormat(d3.format("s")));

    return { svg, g, width, height };
}

function updateGraph({ months, total }) {
    // 2. Update range
    var xScale = d3
            .scaleLinear()
            .domain([0, months / 12])
            .range([0, width]),
        yScale = d3.scaleLinear().domain([0, total]).range([height, 0]);

    svg.select(".xaxis").call(d3.axisBottom(xScale));

    svg.select(".yaxis").call(d3.axisLeft(yScale).tickFormat(d3.format("s")));

    svg.selectAll(".plot").remove();

    svg.append("g")
        .attr("class", "plot")
        .attr("transform", "translate(" + 52 + "," + 50 + ")")
        .selectAll("dot")
        .data(dataset1)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", 2)
        .style("fill", "#21E6C1");

    svg.append("g")
        .attr("class", "plot")
        .attr("transform", "translate(" + 52 + "," + 50 + ")")
        .selectAll("dot")
        .data(dataset2)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", 2)
        .style("fill", "#ff4545");
}

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, 2);

    // Enumerate number abbreviations
    var abbrev = ["k", "m", "b", "t"];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round((number * decPlaces) / size) / decPlaces;

            // Handle special case where we round up to the next abbreviation
            if (number == 1000 && i < abbrev.length - 1) {
                number = 1;
                i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
        }
    }

    return number;
}
