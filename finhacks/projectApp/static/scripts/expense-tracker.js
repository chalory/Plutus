const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//     { id: 1, text: "Breakfast", amount: -50 },
//     { id: 2, text: "Salary", amount: 300 },
//     { id: 3, text: "Book", amount: -10 },
//     { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please add a text and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = "";
        amount.value = "";
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `₱${total.toLocaleString("en", { minimumFractionDigits: 2 })}`;

    money_plus.innerText = `₱${income}`;
    money_minus.innerText = `₱${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();

    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);

const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

let RATES = [];

const lineGraph = document.querySelector("#line-graph");
if (lineGraph) {
    const MONTH_NAMES = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    for (let i = 0; i < 24; i++) {
        RATES.push(randomInRange(40_000, 60_000));
    }

    // const RATES = [
    //     9.3373, 9.309411, 9.1076, 9.5415, 10.6559, 10.830914, 11.487409, 10.7406, 10.689505,
    //     10.65632, 10.8854, 11.878485, 13.626412, 13.936211, 12.895415, 12.886791, 12.900309,
    //     13.185409, 15.049805, 15.137605, 15.012016, 16.515005, 14.123213,
    // ];
    // {
    //     label: "Predicted",
    //     data: lastPredictedYearData,
    //     borderColor: "red",
    // },

    const data = {
        labels: MONTH_NAMES,
        datasets: [
            {
                label: 2021,
                data: RATES.slice(0, 12),
                borderColor: "purple",
            },
            {
                label: 2022,
                data: RATES.slice(12),
                borderColor: "#00B526",
            },
        ],
    };

    const options = {
        responsive: true,
        lineTension: 0.5,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            title: {
                display: true,
                text: "Official Rates",
                padding: {
                    top: 10,
                    bottom: 20,
                },
                font: {
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Months",
                    crossAlign: "far",
                    font: {
                        weight: "bold",
                    },
                    padding: {
                        top: 10,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Rate",
                    font: {
                        weight: "bold",
                    },
                    padding: {
                        bottom: 10,
                    },
                },
            },
        },
    };

    new Chart("line-graph", {
        type: "line",
        data,
        options,
    });
}

const predictBtn = document.querySelector(".predict-btn");
const loadingSpinner = document.querySelector(".spinner-container");

const totalExpenses = document.querySelector("#total-expenses");
const lastMonthExpenses = document.querySelector("#last-month-expenses");
const predictedBill = document.querySelector("#predicted-bill");
const accuracy = document.querySelector("#accuracy");

lastMonthExpenses.textContent = `₱${RATES.slice(-1)[0].toLocaleString("en", {
    minimumFractionDigits: 2,
})}`;

const calculateAccuracy = (forecasted, actual) => {
    console.log(forecasted, actual);
    if (!forecasted || !actual) return 0;

    const errorRate = (Math.abs(forecasted - actual) / forecasted) * 100;
    const accuracy = (100 - errorRate).toFixed(2);

    return +accuracy;
};

predictBtn.addEventListener("click", e => {
    // if (!predictedBill.textContent.trim()) return;
    loadingSpinner.classList.add("show");

    setTimeout(() => {
        loadingSpinner.classList.remove("show");
        predictedBill.textContent = `₱${randomInRange(40_000, 75_000).toLocaleString("en", {
            minimumFractionDigits: 2,
        })}`;

        var predBill = +predictedBill.textContent.replace(/,/g, "").slice(1);

        const resAccuracy = calculateAccuracy(
            predBill,
            +totalExpenses.textContent.replace(/,/g, "").slice(1)
        );

        accuracy.textContent = `${resAccuracy.toFixed(2)}%`;
    }, 5000);

    totalExpenses.textContent = balance.textContent;
});
