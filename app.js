//getting all required elements
const star_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".buttons .exit");
const continue_btn = info_box.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz-box");
const next_btn = document.querySelector(".next-btn");
let timer_sec = document.querySelector(".timer-sec"); //get timer
let time_Line = document.querySelector(".time-line"); //get time line
let option_list = document.querySelector(".option-list"); //get multiple choice from array
let tickIcon =
  '<span class="icon"><i class="fa-solid fa-circle-check tick"></i></span>'; // green tick
let crossIcon =
  '<span class="icon"><i class="fa-solid fa-circle-xmark cross"></i></span>'; // red cross
const result_box = document.querySelector(".result-box"); // result box
let result_text = document.querySelector(".result-text");
const restrat = document.querySelector(".restrat");
const quit = document.querySelector(".quit");

let count = 0;
let timeCount = 15;
let counter;
let counterLine;
let widthCount = 0;
let userScore = 0;

//Start Quiz when button clicked
star_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
};
//Exit quiz
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
};
//Continue quiz
continue_btn.onclick = () => {
  count = 0;
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show  quiz box
  showQuestion(count);
  startTime(timeCount);
  startTimeLine(widthCount);
};
//replay Quiz
restrat.onclick = () => {
  count = 0;
  result_box.classList.remove("activeResult"); // hide result box
  info_box.classList.add("activeInfo"); //show info box
};
//Quit Quiz
quit.onclick = () => {
  result_box.classList.remove("activeResult"); // hide result box
};
//next question, when click on next btn ,make an increment in count and display next object
next_btn.onclick = () => {
  if (count < questions.length - 1) {
    count++;
    showQuestion(count);
    // stop time
    clearInterval(counter);
    startTime(timeCount);
    // stop line
    clearInterval(counterLine);
    startTimeLine(widthCount);
    next_btn.style.display = "none"; //hide next btn
  } else {
    //show Quiz completion box
    quiz_box.classList.remove("activeQuiz"); //hide  quiz box
    result_box.classList.add("activeResult"); // show result box
    if (userScore >= 4) {
      let goodScore =
        '<div class="icon"><i class="fa-solid fa-crown"></i></div><div class="complete-text"><p>Congratulations!🎉 You,ve completed the Quiz!</p></div><div class="score-text"><p>and You got <span>' +
        userScore +
        "</span> out of <span>5</span><p></div>";
      result_text.innerHTML = goodScore;
    } else {
      let badScore =
        '<div class="icon"><i class="fa-solid fa-face-sad-tear"></i></div><div class="complete-text"><p>Try again, You,ve completed the Quiz!</p></div><div class="score-text"><p>and You got <span>' +
        userScore +
        "</span> out of <span>5</span><p></div>";
      result_text.innerHTML = badScore;
    }
  }
};

// getting questions and answer from array
function showQuestion(index) {
  let que_text = document.querySelector(".que-text"); //get question div
  let que_heading = questions[index].number + ". " + questions[index].question; // write a question
  que_text.innerHTML = que_heading; // insert new question

  let options =
    '<div class="option"><p>' +
    questions[index].options[0] +
    '</p><span class="icon"></span></div>' +
    '<div class="option"><p>' +
    questions[index].options[1] +
    '</p><span class="icon"></span></div>' +
    '<div class="option"><p>' +
    questions[index].options[2] +
    '</p><span class="icon"></span></div>' +
    '<div class="option"><p>' +
    questions[index].options[3] +
    '</p><span class="icon"></span></div>';
  option_list.innerHTML = options; //show multiple choice
  // bottom  question number counter line
  let total_que = document.querySelector(".total-que");
  let que_count =
    "<p><span>" +
    questions[index].number +
    "</span>of<span>5</span>Questions</p>";
  total_que.innerHTML = que_count;
  //select all options and add click evnet
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionsSelected(this)");
  }
}

// click event on option selected
function optionsSelected(answer) {
  clearInterval(counter); //stop time
  clearInterval(counterLine); //stop line when option selected
  let selected = answer.textContent;
  let allOptions = option_list.children.length;
  let correct = questions[count].answer;
  //for correct answer
  if (selected === correct) {
    userScore += 1;
    answer.classList.add("correct");
    answer.innerHTML = selected + tickIcon;
  } else {
    //for wrong answer
    answer.classList.add("wrong");
    answer.innerHTML = selected + crossIcon;

    //   automatically select correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correct) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].innerHTML =
          option_list.children[i].textContent + tickIcon;
      }
    }
  }
  //   after selecting one option disable all other
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

//time interval function
function startTime(time) {
  counter = setInterval(timer, 1000); // 1st argument of value to pass and 2nd is delay time
  //loop function
  function timer() {
    timer_sec.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timer_sec.textContent;
      timer_sec.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timer_sec.textContent = "00";
      //   automatically select correct answer
      let allOptions = option_list.children.length;
      let correct = questions[count].answer;
      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correct) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].innerHTML =
            option_list.children[i].textContent + tickIcon;
        }
      }
      next_btn.style.display = "block";
    }
  }
}

//Time line function
function startTimeLine(timeLine) {
  if (window.matchMedia("(max-width: 600px)").matches) {
    counterLine = setInterval(timerLine, 45);
    //loop function
    function timerLine() {
      timeLine += 1;
      time_Line.style.width = timeLine + "px";
      if (timeLine > 349) {
        // line width equal to quiz box width 550
        clearInterval(counterLine);
        time_Line.style.background = "#219f94";
      }
      if (timeLine > 250 && timeLine <= 349) {
        //change bg to red below 6 sec
        // line width equal to quiz box width 550
        time_Line.style.background = "#d82148";
      }
    }
  } else {
    counterLine = setInterval(timerLine, 29); // 1st argument of value to pass and 2nd is delay time
    //loop function
    function timerLine() {
      timeLine += 1;
      time_Line.style.width = timeLine + "px";
      if (timeLine > 549) {
        // line width equal to quiz box width 550
        clearInterval(counterLine);
        time_Line.style.background = "#219f94";
      }
      if (timeLine > 380 && timeLine <= 549) {
        //change bg to red below 6 sec
        // line width equal to quiz box width 550
        time_Line.style.background = "#d82148";
      }
    }
  }
}
