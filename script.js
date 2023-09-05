"use strict";
const display = document.querySelector(".display-box");
const numbers = document.querySelectorAll(".btn-num");
const operators = document.querySelectorAll(".btn-operator");
const del = document.querySelector("#delete");
const reset = document.querySelector("#reset");
const compute = document.querySelector("#compute");
const decimal = document.querySelector("#decimal");

let final_str, temp_str, operator_list, num_list;
const init = () => {
   temp_str = "";
   final_str = "";
   operator_list = [];
   num_list = [];
   display.innerHTML = 0;
};
init();

function swapElements(arr, i1, i2) {
   [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

const computeNum = () => {
   console.log("before sort");
   console.log(num_list, operator_list);
   for (let i = 0; i < operator_list.length - 1; i++) {
      for (let j = 0; j < operator_list.length - 1; j++) {
         const temp_down =
            operator_list[j] === "divide"
               ? 4
               : operator_list[j] === "multiply"
               ? 3
               : operator_list[j] === "add"
               ? 2
               : 1;
         const temp_up =
            operator_list[j + 1] === "divide"
               ? 4
               : operator_list[j + 1] === "multiply"
               ? 3
               : operator_list[j + 1] === "add"
               ? 2
               : 1;
         if (temp_down < temp_up) {
            swapElements(num_list, j, j + 1);
            swapElements(operator_list, j, j + 1);
         }
      }
   }
   console.log("After sort");
   console.log(num_list, operator_list);
   let sum = num_list[0];
   console.log("sum after sort at first", sum);
   for (let i = 0; i < operator_list.length; i++) {
      if (operator_list[i] === "add") {
         sum += num_list[i + 1];
      } else if (operator_list[i] === "multiply") {
         sum *= num_list[i + 1];
      } else if (operator_list[i] === "divide") {
         sum /= num_list[i + 1];
      } else {
         sum -= num_list[i + 1];
      }
      console.log("sum", sum);
      console.log("num2", num_list[i + 1]);
      console.log("Operator", operator_list[i]);
   }
   return sum;
};
numbers.forEach((item) =>
   item.addEventListener("click", () => {
      temp_str += item.id;
      final_str += item.id;
      display.innerHTML = final_str;
   })
);

operators.forEach((item) =>
   item.addEventListener("click", () => {
      console.log(temp_str);
      console.log(num_list, operator_list);
      if (temp_str.length > 0) {
         num_list.push(Number(temp_str));
         operator_list.push(item.id);
         final_str += ` ${item.innerHTML} `;
         display.innerHTML = final_str;
         temp_str = "";
         console.log(num_list);
         console.log(operator_list);
      }
   })
);

decimal.addEventListener("click", () => {
   if (!temp_str.includes(".")) {
      temp_str += ".";
      final_str += `.`;
      display.innerHTML = final_str;
   }
});

del.addEventListener("click", () => {
   console.log(final_str);
   const temp = final_str.split(" ");
   console.log(temp);
   temp.pop();
   console.log(temp);
   final_str = temp.join(" ");
   display.innerHTML = final_str;
});

compute.addEventListener("click", () => {
   if (temp_str !== "") {
      num_list.push(Number(temp_str));
   }

   if (num_list.length > 0 && operator_list.length > 0) {
      const final_num = computeNum();
      if (isFinite(final_num)) {
         final_str = `${final_num}`;
         temp_str = final_str;
         display.innerHTML = final_str;
      } else {
         final_str = `Infinity (Resetting...)`;
         display.innerHTML = final_str;
         setTimeout(() => {
            temp_str = 0;
            final_str = "0";
            display.innerHTML = final_str;
         }, 1000);
      }
   }
   operator_list = [];
   num_list = [];
});

reset.addEventListener("click", init);

document.addEventListener("keypress", (event) => {
   const key = event.key;

   // Check if the pressed key is a number
   if (!isNaN(key) && key !== " ") {
      const numberButton = document.getElementById(key);
      if (numberButton) {
         numberButton.click();
      }
   } else if (key.toUpperCase() === "D") {
      event.preventDefault();
      document.getElementById("delete").click();
   } else if (key.toUpperCase() === "E") {
      event.preventDefault();
      document.getElementById("reset").click();
   } else {
      // Handle operator keys
      switch (key) {
         case "+":
            document.getElementById("add").click();
            break;
         case "-":
            document.getElementById("subtract").click();
            break;
         case "*":
            document.getElementById("multiply").click();
            break;
         case "/":
            document.getElementById("divide").click();
            break;
         case ".":
            document.getElementById("decimal").click();
            break;
         case "Enter":
            document.getElementById("compute").click();
            break;
         default:
            break;
      }
   }
});
