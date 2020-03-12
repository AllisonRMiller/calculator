//Display stuff
//class to make elements

// class Show {

//     build() {

//         var container1 = new Element("div", "container bg-dark", "topLevelContainer");
//         console.log(container1);
//         var displayRow = new Element("div", "row", "displayRow");
//         console.log(displayRow);
//         var display = new Column("div", "col bg-light border border-dark p-5", "display");
//         console.log(display);
    
//         display.add(displayRow, display);
    
//         displayRow.add(container1, displayRow)
    
        
//         for (i = 0; i < 4; i++) {
//             var gridRow = new Element("div", "row", "gridRow_" + i);
//             for (j = 0; j < 4; j++) {
//                 var buttonNum = buttons[i][j];
//                 var gridCol = new ButtonColumn("div", "col-3 p-5 border border-muted text-primary", "gridCol_" + i + "_" + j, buttonNum);
//                 gridCol.element.addEventListener("click", takeNumber);
//                 gridCol.add(gridRow,gridCol);
//             }
//             console.log(gridRow);
//             gridRow.add(container1,gridRow);
//             console.log("add worked");
//         }
//         container1.bodyAdd(container1)
//     }

//     update(){
//         display.innerHTML
//     }
// }


class Element {
    constructor(element, classList, id) {
        this.element = document.createElement(element);
        this.element.classList = classList;
        this.element.id = id;
    }

    bodyAdd(child) {
        document.body.appendChild(child.element)
    }

    add(parent,child) {
        console.log("add is running", parent,child)
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

    update(newSays){
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

// When operator button is clicked
    // formula.push(input.join(""));
    // formula.push(buttons[buttonIndex])

// When number or decimal is clicked
    // input.push(buttons[buttonIndex])

// When equals is clicked 
    // string(formula)

// display should show whatever is in input
    // display.innerHTML = 


function takeNumber(e){
    // 
    var pos = e.target.id;
    // get row coordinates
    var charIndex1 = 8;
    console.log(pos.charAt(charIndex1));
    var rowIndex = pos.charAt(charIndex1);
    // get column coordinates
    var charIndex2 = 10;
    console.log(pos.charAt(charIndex2));
    var colIndex = pos.charAt(charIndex2);
    console.log(pos);
    // calculate index
    var buttonIndex = (4 * parseInt(rowIndex) + parseInt(colIndex));
    // if button index is 3, 7, 11, 15 then do join array 1 function
    // if (buttonIndex == )
    // if button index is 14 then perform calculation function
    // else push item at button index to array 1

    buttons[buttonIndex] ;
    console.log("click worked");
}



function build() {

    var container1 = new Element("div", "container bg-dark", "topLevelContainer");
    console.log(container1);
    var displayRow = new Element("div", "row", "displayRow");
    console.log(displayRow);
    var display = new Column("div", "col bg-light border border-dark p-5", "display");
    console.log(display);

    display.add(displayRow, display);

    displayRow.add(container1, displayRow)

    
    for (i = 0; i < 4; i++) {
        var gridRow = new Element("div", "row", "gridRow_" + i);
        for (j = 0; j < 4; j++) {
            var buttonNum = buttons[i][j];
            var gridCol = new ButtonColumn("div", "col-3 p-5 border border-muted text-primary", "gridCol_" + i + "_" + j, buttonNum);
            gridCol.element.addEventListener("click", takeNumber);
            gridCol.add(gridRow,gridCol);
        }
        console.log(gridRow);
        gridRow.add(container1,gridRow);
        console.log("add worked");
    }
    container1.bodyAdd(container1)
}

build();
    // make