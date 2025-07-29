let input = document.querySelector("input");
let btn = document.querySelector("button");
let box1 = document.querySelector(".addTask");
let box2 = document.querySelector(".tasksList");
let ul = document.querySelector("ul");

let delBtn = document.createElement("button");
delBtn.innerText = "Delete task";
box1.append(delBtn);

btn.addEventListener("click", function () {
    // let value = input.value;
    if (input.value != "") {
        let li = document.createElement('li');
        li.innerText = input.value;
        ul.append(li);
        input.value = "";
    }
});


delBtn.addEventListener("click", function () {
    let items = document.querySelectorAll("li");    //WHEN THIS STATEMENT IS OUTSIDE THIS EVENT LISTENER ITEMS COULD NOT ACCESS THE li ELEMENTS!
    let i = 0;

    for (item of items) {
        if (input.value == item.innerText) {
            item.remove();
            i = 1;
        }
    }
    if (i == 0) {
        alert("Task not found!");

    }
    if (i == 1) {
        alert("Task deleted successfully!");
    }
    input.value = "";
});

// ul.addEventListener("click", function(){
//     let items = document.querySelectorAll("li");

//     for (item of items) {
//         console.log(item.innerText);
//     }
// });