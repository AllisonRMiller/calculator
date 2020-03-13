//Display stuff
//class to make elements

class View {




    build() {

        var container1 = new Element("div", "container bg-dark", "topLevelContainer");
        console.log(container1);
        var displayRow = new Element("div", "row", "displayRow");
        console.log(displayRow);
        var display = new Column("div", "col bg-light border border-dark p-5 text-right", "display", "hello");
        console.log(display);

        display.add(displayRow, display);

        displayRow.add(container1, displayRow)


        for (var i = 0; i < 4; i++) {
            var gridRow = new Element("div", "row", "gridRow_" + i);
            for (var j = 0; j < 4; j++) {
                var buttonNum = buttons[i][j];
                var gridCol = new ButtonColumn("div", "col-3 p-5 border border-muted text-primary", "gridCol_" + i + "_" + j, buttonNum);
                gridCol.element.addEventListener("click", takeNumber);
                gridCol.add(gridRow, gridCol);
            }
            console.log(gridRow);
            gridRow.add(container1, gridRow);
            console.log("add worked");
        }


        container1.bodyAdd(container1)
    }

    update() {
        display.innerHTML
    }
}


class Element extends View {
    constructor(element, classList, id) {
        super();
        this.element = document.createElement(element);
        this.element.classList = classList;
        this.element.id = id;
    }

    bodyAdd(child) {
        document.body.appendChild(child.element)
    }

    add(parent, child) {
        console.log("add is running", parent, child)
        parent.element.appendChild(child.element)
    }
}
// constructor (element,class,id)
// this.element=document.createelement(element)
// this.element.class = classList
// this.element.id = id
// 
// append function (parent)



// class for containers
// Is this really necessary?  No special parameters vs. element
// class for rows
// is this really necessary? No special parameters vs. element


// class for columns
class Column extends Element {
    constructor(element, classList, id, says) {
        super(element, classList, id);
        this.element.says = says;
        this.element.innerHTML = says;
    }

    update(newSays) {
        this.says = newSays;
    }
}
// this.element.innerhtml
class ButtonColumn extends Column {
    constructor(element, classList, id, says) {
        super(element, classList, id, says);
        // this.element.clicky = element.addEventListener("click", takeNumber);
    }
}
// class for button columns
// this.element.addeventlistener("click",takenumber)
// container
// display
// row > column
// buttons
// row x4 + column x 4

buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
];

input = [];
formula = [];


// When any button is clicked
// get "says"
// var character = e.target.says
// console.log(character);
// // determine if says is an operator, number+decimal, equals, or clear
// // trigger appropriate function based on above determination
// if (character == buttons[3] || buttons[7] || buttons[11] || buttons[14]){
//     operator();
// }else if (character == buttons[13]){
//     calculate();
// }else {numbers();}


function operator(character) {

    formula.push(input.join(""));
    console.log(formula, "operator ran");
    if (formula.length==3){
        calculate(character);
        formula.push(character);
        console.log("new formula:",formula)
        input = [];
    }else{
    formula.push(character);
    console.log(formula, "second part of operator");
    input = [];
}
}
// When number or decimal is clicked
function numbers(character) {
    // input.push(character)
    input.push(character);
    console.log(input, "character ran")
}

// When equals is clicked 
function calculate() {
    formula.push(input.join(""));
    console.log(formula, "calc operator ran");
    var x = formula[0];
    var y = formula[2];
    var op = formula[1]
    switch (op){
        case "+":
            var calc = parseInt(x)+parseInt(y);
            break;
        case "-":
            var calc = parseInt(x)-parseInt(y);
            break;
        case "*":
            var calc = parseInt(x)*parseInt(y);
            break;
        case "/":
            var calc = parseInt(x)/parseInt(y);
            break;
    }
    formula = [];
    input=[];
    formula.push(calc);
    console.log("calc equals:", calc);
    console.log("new formula:",formula)
    // answer = string(formula)
    // formula.push(input.join(""));
    // console.log(formula, "operator ran");
    // var form = formula.join(" ");
    // console.log(form);
    // var bt = form.toString();
    // console.log(bt);
    // var answer = form.toString();

    // console.log(answer, "calculate ran");
}
// When clear is clicked
// function clear(){
//     // reset input and formula, call update
//     input = [];
//     formula = [];
// }
// class Controller {


    function takeNumber(e) {
        // 
        var character = e.target.says
        // console.log(character);
        // var pos = e.target.id;
        // // get row coordinates
        // var charIndex1 = 8;
        // // console.log(pos.charAt(charIndex1));
        // var rowIndex = pos.charAt(charIndex1);
        // // get column coordinates
        // var charIndex2 = 10;
        // // console.log(pos.charAt(charIndex2));
        // var colIndex = pos.charAt(charIndex2);
        // // console.log(pos);
        // // calculate index
        // var operators = ["/","+","-","*"];
        // var buttonIndex = (4 * parseInt(rowIndex) + parseInt(colIndex));
        if (character == buttons[0][3] || character == buttons[1][3] || character == buttons[2][3] || character == buttons[3][3]) {
            operator(character);
            console.log("firing operator")
            // convert to switch case? if says = etc. then 
        } else if (character === buttons[3][2]) {
            calculate();
            console.log("calculate fired")
        } else { numbers(character); 
        console.log("numbers fired")}
        // // if button index is 3, 7, 11, 15 then do join array 1 function
        // // if (buttonIndex == )
        // // if button index is 14 then perform calculation function
        // // else push item at button index to array 1

        // buttons[buttonIndex] ;
        console.log(character, "click worked");
    }
// }


// function build() {

//     var container1 = new Element("div", "container bg-dark", "topLevelContainer");
//     console.log(container1);
//     var displayRow = new Element("div", "row", "displayRow");
//     console.log(displayRow);
//     var display = new Column("div", "col bg-light border border-dark p-5", "display");
//     console.log(display);

//     display.add(displayRow, display);

//     displayRow.add(container1, displayRow)


//     for (i = 0; i < 4; i++) {
//         var gridRow = new Element("div", "row", "gridRow_" + i);
//         for (j = 0; j < 4; j++) {
//             var buttonNum = buttons[i][j];
//             var gridCol = new ButtonColumn("div", "col-3 p-5 border border-muted text-primary", "gridCol_" + i + "_" + j, buttonNum);
//             gridCol.element.addEventListener("click", takeNumber);
//             gridCol.add(gridRow,gridCol);
//         }
//         console.log(gridRow);
//         gridRow.add(container1,gridRow);
//         console.log("add worked");
//     }
//     container1.bodyAdd(container1)
// }

let page = new View
page.build();

// build();
    // make