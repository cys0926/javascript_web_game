const $app = document.getElementById("app");
const $calculator = document.createDocumentFragment();
const $operator = document.createElement("input");
const $result = document.createElement("input");
let prevNum = "";
let operator = "";
let nextNum = "";

const onClickNumber = (event) => {
  if (!operator) {
    prevNum += event.target.textContent;
    $result.value += event.target.textContent;
    return;
  }
  if (!nextNum) {
    $result.value = "";
  }
  nextNum += event.target.textContent;
  $result.value += event.target.textContent;
};

const onClickOperator = (op) => () => {
  if (prevNum) {
    operator = op;
    $operator.value = op;
  } else {
    alert("숫자를 먼저 입력해주세요");
  }
};

const onClickResult = () => {
  if (!operator) {
    alert("연산을 입력해주세요");
    return;
  }
  if (!nextNum) {
    alert("숫자를 먼저 입력해주세요");
    return;
  }

  switch (operator) {
    case "+":
      $result.value = parseInt(prevNum) + parseInt(nextNum);
      break;
    case "-":
      $result.value = prevNum - nextNum;
      break;
    case "*":
      $result.value = prevNum * nextNum;
      break;
    case "/":
      $result.value = prevNum / nextNum;
      break;
    default:
      break;
  }
  prevNum = $result.value;
  nextNum = "";
  $operator.value = "";
  operator = "";
};

const onClickClear = () => {
  prevNum = "";
  operator = "";
  nextNum = "";
  $operator.value = "";
  $result.value = "";
};

const createRow = (buttonList) => {
  const $row = document.createElement("div");
  $row.className = "row";
  buttonList.forEach((button) => {
    const $button = document.createElement("button");
    if (typeof button === "number") {
      $button.addEventListener("click", onClickNumber);
    } else if (button === "=") {
      $button.addEventListener("click", onClickResult);
    } else if (button === "C") {
      $button.addEventListener("click", onClickClear);
    } else {
      $button.addEventListener("click", onClickOperator(button));
    }

    $button.id = button;
    $button.textContent = button;
    $row.appendChild($button);
  });
  return $row;
};

$operator.readOnly = true;
$operator.id = "operator";
$result.readOnly = true;
$result.type = "number";
$result.id = "result";

// text, id을 가진 객체를 담은 배열

$calculator.append(
  $operator,
  $result,
  createRow([7, 8, 9, "+"]),
  createRow([4, 5, 6, "-"]),
  createRow([1, 2, 3, "/"]),
  createRow(["C", 0, "=", "x"])
);

$calculator.append();

$app.appendChild($calculator);
