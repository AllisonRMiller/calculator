class View {
    constructor(controller) {
        this.controller = c;
    }

    setController(c) {
        this.controller = c;
    }



    build() {

        var container1 = new Element("div", "container container-lg bg-dark", "topLevelContainer");
        console.log(container1);
        var displayRow = new Element("div", "row", "displayRow");
        console.log(displayRow);
        var display = new Column("div", "col bg-light border border-muted p-4 text-right text-break font-weight-bold", "display", "hello");
        console.log(display);
        var clearRow = new Element("div", "row", "clearRow")
        var clearButton = new Column("div", "col-3 p-5 border border-rounded border-muted text-danger text-center", "clear", "C")
        clearButton.element.addEventListener("click", this.controller.clear.bind(this.controller));
        console.log(clearButton);
        clearButton.add(clearRow, clearButton);
        display.add(displayRow, display);

        displayRow.add(container1, displayRow);
        clearRow.add(container1, clearRow);

        for (var i = 0; i < 4; i++) {
            var gridRow = new Element("div", "row", "gridRow_" + i);
            for (var j = 0; j < 4; j++) {
                var buttonNum = buttons[i][j];
                var gridCol = new Column("div", "col-3 p-5 border border-rounded border-muted text-primary text-center", "gridCol_" + i + "_" + j, buttonNum);
                gridCol.element.addEventListener("click", this.controller.takeNumber.bind(this.controller));
                gridCol.add(gridRow, gridCol);
            }
            console.log(gridRow);
            gridRow.add(container1, gridRow);
        }

        console.log("add worked");
        container1.bodyAdd(container1)

    }
    // 
    update(newSays) {
        this.says = newSays;
        display.innerHTML = newSays;
    }

    // todo: random welcome symbols
}

// Class to make anything
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


// class for columns
class Column extends Element {
    constructor(element, classList, id, says) {
        super(element, classList, id);
        this.element.says = says;
        this.element.innerHTML = says;
    }

}


// Map of buttons across calculator
buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
];



class Model {

    constructor(view) {
        this.view = null;
        this.input = [];
        this.formula = [];
    }

    setView(v) {
        this.view = v;
    }


    // when operator is clicked
    operator(character) {
        if (this.input.length == 0 && this.formula.length == 0) { return };
        if (this.input.length >= 1) {
            this.formula.push(this.input.join(""));
            console.log(this.formula, "operator ran");
        }
        if (this.formula.length == 3) {
            calculate(character);
            this.formula.push(character);
            console.log("new formula:", this.formula)
            this.input = [];
        } else {
            this.formula.push(character);
            console.log(this.formula, "second part of operator");
            this.input = [];
        }
    }
    // When number or decimal is clicked
    numbers(character) {
        if (this.input.includes(".") && character == ".") {

        } else if(this.formula.length==1){
            this.formula=[];
            this.input.push(character);
            console.log(this.input, "character ran and formula cleared")
        } else{
            this.input.push(character);
            console.log(this.input, "character ran")
        }
    }

    // When equals is clicked 
    calculate() {
        if (this.input.length >= 1) {
            this.formula.push(this.input.join(""));
            console.log(this.formula, "calc operator ran");
        }
        var x = parseFloat(this.formula[0]);
        var y = parseFloat(this.formula[2]);
        var op = this.formula[1]
        switch (op) {
            case "+":
                var calc = (x) + (y);
                break;
            case "-":
                var calc = (x) - (y);
                break;
            case "*":
                var calc = (x) * (y);
                break;
            case "/":
                if (y==0){calc="ERROR: Cannot divide by zero"}else{
                var calc = (x) / (y);}
                break;
            default:
                var calc = x;
                break;
        }
        this.formula = [];
        this.input = [];
        this.formula.push(calc);
        console.log("calc equals:", calc);
        console.log("new formula:", this.formula);
    }
}

// class Controller 

class Controller {
    constructor(m, page) {
        this.model = m;
        this.view = page;
    }
    setView(v) {
        this.view = v;
    }
    // When anything is clicked
    takeNumber(e) {
        var character = e.target.says
        var displayContent = "";
        var ops = ["/","-","+","*"]
        if (ops.includes(character)) {
            this.model.operator(character);
            console.log("firing operator")
            if (this.model.formula.length >= 1) {
                displayContent = this.model.formula.join("");
            }
            else { displayContent = "0" }
        } else if (character === "=") {
            this.model.calculate();
            console.log("calculate fired");
            displayContent = this.model.formula.join("");
        } else {
            this.model.numbers(character);
            console.log("numbers fired");
            displayContent = this.model.input.join("");
        }
        this.view.update(displayContent);
        console.log(character, "click worked");

    }

    // When clear is clicked
    clear() {
        // reset input and formula, call update
        this.model.input = [];
        this.model.formula = [];
        this.view.update("0");
    }
}




var m = new Model();

var c = new Controller(m);
let page = new View;


page.build();
m.setView(page);
c.setView(page);
page.setController(c);
