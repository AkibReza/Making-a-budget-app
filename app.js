var budgetController = (function () {

})();


var UIcontroller = (function () {

    var StringLibrary = {
        inputType: '.add__type',
        descType: '.add__description',
        valueType: '.add__value'
    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(StringLibrary.inputType).value,
                description: document.querySelector(StringLibrary.descType).value,
                value: parseFloat(document.querySelector(StringLibrary.valueType).value)
            }

        },
        getStringLib: function () {
            return StringLibrary;
        }
    }
})();



var controller = (function (budget_CT, UI_CT) {
    var ctrlAddItem;

    ctrlAddItem = function () {

        var input = UI_CT.getInput();

    }


    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.keycode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIcontroller);