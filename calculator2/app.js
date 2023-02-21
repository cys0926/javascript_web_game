import { addComma, unComma } from "./utils/commas";
import { calc } from "./utils/math";

const $operator = document.getElementById("operator");
const $result = document.getElementById("result");
let prevNumber = "";
let operator = "";
let currNumber = "";
let result = "0";
let flag = true;

const drawHistory = (prev, op, curr, res) => {
  const $historyList = document.getElementById("history_list");
  const $history = document.createElement("li");
  const $historyProcess = document.createElement("div");
  const $historyResult = document.createElement("div");

  $history.className = "history";
  $history.addEventListener("click", () => {
    operator = op;
    currNumber = curr;
    result = res;
    $operator.value = `${prev} ${op} ${curr} =`;
    $result.value = result;
  });
  $historyProcess.className = "history_process";
  $historyProcess.textContent = `${prev} ${op} ${curr} =`;
  $historyResult.className = "history_result";
  $historyResult.textContent = res;

  $history.append($historyProcess, $historyResult);

  $historyList.appendChild($history);
  $historyList.scrollTop = Number.MIN_SAFE_INTEGER;
};

const onClickNumber = (event) => {
  if (flag) {
    flag = false;
    result = "";
  }
  result = addComma(unComma(result) + event.target.textContent);
  $result.value = result;
};

const onClickOperator = (event) => {
  if (currNumber) {
    currNumber = "";
    prevNumber = result;
    operator = event.target.textContent;
  } else if (!prevNumber && !operator) {
    prevNumber = result;
    operator = event.target.textContent;
  } else if (prevNumber && operator) {
    prevNumber = calc(prevNumber, operator, result);
    operator = event.target.textContent;
    result = prevNumber;
    drawHistory(prevNumber, operator, currNumber, result);
  }
  $operator.value = prevNumber + operator;
  flag = true;
  $result.value = result;
};

const onClickEqual = () => {
  if (!operator) {
    currNumber = result;
  } else if (!currNumber) {
    currNumber = result;
  } else {
    prevNumber = result;
  }
  $operator.value = prevNumber + operator + currNumber + "=";
  result = calc(prevNumber, operator, currNumber);
  drawHistory(prevNumber, operator, currNumber, result);
  flag = true;
  $result.value = result;
};

const onClickBackSpace = () => {
  result = result.slice(0, -1) || "0";
  $result.value = result;
};

const onClickClearAll = () => {
  prevNumber = "";
  operator = "";
  currNumber = "";
  result = "0";
  flag = true;
  $operator.value = "";
  $result.value = result;
};

const onClickClearEntry = () => {
  result = "0";
  flag = true;
  $result.value = result;
};

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((value) => {
  const $number = document.getElementById(`num_${value}`);
  $number.addEventListener("click", onClickNumber);
});

["plus", "minus", "multiply", "divide"].forEach((value) => {
  const $button = document.getElementById(value);
  $button.addEventListener("click", onClickOperator);
});

document.getElementById("percent").addEventListener("click", () => {});
document
  .getElementById("clear_entry")
  .addEventListener("click", onClickClearEntry);
document.getElementById("clear_all").addEventListener("click", onClickClearAll);
document
  .getElementById("backspace")
  .addEventListener("click", onClickBackSpace);
document.getElementById("equal").addEventListener("click", onClickEqual);
document.getElementById("history_delete").addEventListener("click", () => {
  document.getElementById("history_list").replaceChildren();
});
