//Inner work
var budgetController = (function () {

    //Function constructor for each and every item of Expense
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Function constructor for each and every item of Income
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Storing all the items into one place
    var allExpenses = [];
    var allIncome = [];

    //Starting value = 0;
    var totalExpenses = 0;

    // Storing all the values into one place (? not sure)
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //Create new item depending on exp or inc
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //Add the new item into the array
            data.allItems[type].push(newItem);

            return newItem;
        }
    };



})();

//Display work
var UIcontroller = (function () {
    // All the HTML class strings
    var StringLibrary = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expenseItem:'.expenses__list',
        incomeItem: '.income__list'
    }
    return {
        //Sometimes, no comment is the best comment. 
        getInput: function () {
            return {
                type: document.querySelector(StringLibrary.inputType).value, // Income or Expense 
                description: document.querySelector(StringLibrary.inputDescription).value, //The name of the entry
                value: parseFloat(document.querySelector(StringLibrary.inputValue).value) //Amount
            };
        },

        // Here a new item and it's type(expense or income) goes. 
        addListItem: function (obj, type) {
            var html, newHtml, element;
            //Create an HTML string with placeholder texts
            if (type === 'inc') {
                element = StringLibrary.incomeItem;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if(type === 'exp') {
                element = StringLibrary.expenseItem;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder texts with actual code 
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert the HTML into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        clearInput: function(){
            var field, newField;

            field = document.querySelectorAll(StringLibrary.inputDescription + ', ' + StringLibrary.inputValue);
            newField = Array.prototype.slice.call(field);

            newField.forEach(function(curr, i, arr){
                curr.value = ""
            });

            newField[0].focus();

        },


        //StringLibrary can be used outside of the function with this
        getStringLibrary: function () {
            return StringLibrary;
        },
    }
})();



//Handles input
var controller = (function (budgetCtrl, UIctrl) {

    //Keeping all the event listeners in one place

    var setupEventListeners = function () {

        /*Taking the UIcontroller strings into controller function
         This works because UI controller returned methods that are available in global scope. (?)*/
        var DOM = UIctrl.getStringLibrary();

        //When left mouse button is clicked
        document.querySelector(DOM.inputBtn).addEventListener('click', itemAdder);

        // When Enter key is pressed
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                itemAdder();
            }
        });
    };

    var updateBudget = function(){
        //1. Calculate the budget

        //2. Return the budget

        //3. Display the budget in display(UI)


    }



    var itemAdder = function () {
        var input, newItem;
        // 1. Get the field input data.
        input = UIctrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0)

        // 2. Add the item to the inner work controller.
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the Display controller.
        UIctrl.addListItem(newItem, input.type)

        // 4. Clear the boxes
        UIctrl.clearInput(); 

        // 5. Calculate and update the budget
        updateBudget();

    }
    /*The above event handler won't get executed because it's not an IIFE
    So the best choice is to create an INITIALIZATION FUNCTION*/
    return {
        init: function () {
            console.log("Nicely started")
            setupEventListeners();
        }
    };

})(budgetController, UIcontroller);


//Calling the INITIALIZATION FUNCTION
controller.init();


