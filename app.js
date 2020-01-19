//Inner work
var budgetController = (function(){
  
})();

//Display work
var UIcontroller = (function(){
    // All the HTML class strings
    var StringLibrary = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getInput: function(){
        return {
            type: document.querySelector(StringLibrary.inputType).value, // Income or Expense 
            description: document.querySelector(StringLibrary.inputDescription).value, //The name of the entry
            value: document.querySelector(StringLibrary.inputValue).value //Amount
                };
        },
        getStringLibrary: function(){
        return StringLibrary;
    },
    }
})();



//Handles input
var controller = (function(budgetCtrl, UIctrl){
    /*Taking the UIcontroller strings into controller function
    This works because UI controller returned methods that are available in global scope. (?)
    */
    var DOM = UIctrl.getStringLibrary();

    var itemAdder = function(){
    // 1. Get the filed input data.

    var inpnp = UIctrl.getInput();
    console.log(inpnp)

    // 2. Add the item to the inner work controller.

    // 3. Add the item to the Display controller.

    // 4. Calculate the budget.

    // 5. Show the budget to the display.

    } 


    //When left mouse button is clicked
   document.querySelector(DOM.inputBtn).addEventListener('click', itemAdder);
   // When Enter key is pressed
   document.addEventListener('keypress', function(event){
       if(event.keyCode === 13 || event.which === 13){
            itemAdder();    
       }
   });






})(budgetController,UIcontroller);





