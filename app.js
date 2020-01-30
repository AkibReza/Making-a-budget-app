var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0,
        }
    }

    return {
        addITEM: function (type, des, val) {
            var newItem, ID, lastID;

            lastID = data.allItems[type]
            //Course 10
            if (lastID.length > 0) {
                ID = lastID[lastID.length - 1].id + 1;
            } else {
                ID = 0;
            }


            if (type === 'inc') {
                newItem = new Income(ID, des, val)
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            }

            lastID.push(newItem);
            return newItem;
        }
    };


})();


var UIcontroller = (function () {

    var StringLibrary = {
        inputType: '.add__type',
        descType: '.add__description',
        valueType: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expense__list'
    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(StringLibrary.inputType).value,
                description: document.querySelector(StringLibrary.descType).value,
                value: parseFloat(document.querySelector(StringLibrary.valueType).value)
            }

        },

        addListItem: function (obj, type) {
            var html, newHtml, element;

            if (type === 'inc') {
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
        },


        getStringLib: function () {
            return StringLibrary;
        }
    }
})();



var controller = (function (budget_CT, UI_CT) {
    var ctrlAddItem, DOM, eventListeners;

    eventListeners = function () {
        DOM = UI_CT.getStringLib();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keycode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };



    ctrlAddItem = function () {
        var input, newItem;

        input = UI_CT.getInput();

        newItem = budget_CT.addITEM(input.type, input.description, input.value)

    }

    return {
        init: function () {
            eventListeners();
        }
    }


})(budgetController, UIcontroller);



controller.init();