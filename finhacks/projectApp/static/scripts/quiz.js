var questions = [
    [
        "Bruce has 1000$ as salary for his job, he wants to spend his money wisely and adopt the 'Spend Less Than You Earn, Save The Difference' rule. Suddenly an Avril Lavign concert is in town and the tickets cost 2000$. Bruce is thinking of borrowing the rest of the money from his friends. Is this a good idea?",
        "Yes",
        "No",
        "Maybe",
        "I don't know",
        "2",
    ],
    [
        "What should you do when you first earn some money?",
        "Make it rain",
        "Get yourself something nice",
        "Save a portion",
        "Give it all away",
        "3",
    ],
    [
        "What do we call people who put money into a business?",
        "Owners",
        "Investors",
        "CEOs",
        "Good People",
        "2",
    ],
    [
        'What does the term "Keeping up with the Jones" mean?',
        "Racing the Jones",
        "You want it because someone else has it.",
        "Having the same last name",
        "Wanting something really bad",
        "2",
    ],
    [
        "What two things have we learned about money so far?",
        "Earn and Save",
        "Trade and Buy",
        "Lend and Accumulate",
        "Interest and Rates",
        "1",
    ],
];

var quiz = document.getElementById("quiz");
var ques = document.getElementById("question");
var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var opt4 = document.getElementById("option4");
var res = document.getElementById("result");
var nextbutton = document.getElementById("next");
// var q = document.getElementById("quit");

var tques = questions.length;
var score = 0;
var quesindex = 0;
function quit() {
    quiz.style.display = "none";
    result.style.display = "";
    var f = score / tques;
    result.textContent = "SCORE =" + f * 100;
    // q.style.display = "none";
}
function give_ques(quesindex) {
    ques.textContent = quesindex + 1 + ". " + questions[quesindex][0];
    opt1.textContent = questions[quesindex][1];
    opt2.textContent = questions[quesindex][2];
    opt3.textContent = questions[quesindex][3];
    opt4.textContent = questions[quesindex][4];
    return; // body...
}
give_ques(0);
function nextques() {
    var selected_ans = document.querySelector("input[type=radio]:checked");
    if (!selected_ans) {
        alert("SELECT AN OPTION");
        return;
    }

    if (selected_ans.value == questions[quesindex][5]) {
        score = score + 1;
    }
    selected_ans.checked = false;
    quesindex++;
    if (quesindex == tques - 1) nextbutton.textContent = "Finish";
    var f = score / tques;
    if (quesindex == tques) {
        // q.style.display = "none";
        quiz.style.display = "none";
        result.style.display = "flex";
        result.innerHTML = `
            <div>
            SCORED:   ${(f * 100).toFixed(2)} %
            </div>
            <a href="wish_list" class="btn"> Next </a>
        `;
        return;
    }
    give_ques(quesindex);
}
