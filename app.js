
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1,
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
        },

        deleteBudget: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },


        calculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            data.allItems.exp.forEach(function (curr) {
                curr.calcPercentage(data.totals.inc);
            })
        },
        getPercentages: function () {
            var allPercentages = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPercentages;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalINC: data.totals.inc,
                totalEXP: data.totals.exp,
                percentage: data.percentage

            }
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
        expenseContainer: '.expense__list',
        budgetTitle: '.budget__value',
        incomeTitle: '.budget__income--value',
        expenseTitle: '.budget__expenses--value',
        percentageTitle: '.budget__expenses--percentage',
        container: '.container',
        expensesPercTitle: '.item__percentage',
        dateTitle: '.budget__title--month'
    }
    var formatNum = function (num, type) {
        var numSplit, int, dec;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        type === 'inc' ? sign = '+' : sign = '-';

        return sign + ' ' + int + '.' + dec;
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

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
            element = StringLibrary.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'


        } else if (type === 'exp') {
            element = StringLibrary.expenseContainer;
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }


        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', formatNum(obj.value, type));

        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    deleteListItem: function (selectorID) {
        var el = document.getElementById(selectorID)
        el.parentNode.removeChild(el);
    },

    clearFields: function () {
        var fields = document.querySelectorAll(StringLibrary.descType + ', ' + StringLibrary.valueType)
        var newFields = Array.prototype.slice.call(fields);

        newFields.forEach(function (current) {
            current.value = ''
        })
        newFields[0].focus();
    },

    displayBudget: function (obj) {
        var type;
        if (obj.budget > 0) {
            type = 'inc'
        } else {
            type = 'exp'
        }
        document.querySelector(StringLibrary.budgetTitle).textContent = formatNum(obj.budget, type);
        document.querySelector(StringLibrary.incomeTitle).textContent = formatNum(obj.totalINC, 'inc');
        document.querySelector(StringLibrary.expenseTitle).textContent = formatNum(obj.totalEXP, 'exp');

        if (obj.percentage > 0) {
            document.querySelector(StringLibrary.percentageTitle).textContent = obj.percentage + '%';
        } else {
            document.querySelector(StringLibrary.percentageTitle).textContent = '-:-';
        }

    },

    displayPercentages: function (percentages) {
        var fields = document.querySelectorAll(StringLibrary.expensesPercTitle);

        nodeListForEach(fields, function (current, index) {

            if (percentages[index] > 0) {
                current.textContent = percentages[index] + '%';
            } else {
                current.textContent = '---';
            }
        });

    },

    displayMonth: function () {
        var now, year, month;
        now = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        month = now.getMonth();
        year = now.getFullYear();
        document.querySelector(StringLibrary.dateTitle).textContent = months[month] + ' ' + year;
    },

    changedType: function () {
        var fields = document.querySelectorAll(
            StringLibrary.inputType + ',' +
            StringLibrary.descType + ',' +
            StringLibrary.valueType
        );
        nodeListForEach(fields, function (cur) {
            cur.classList.toggle('red-focus');
        });

        document.querySelector(StringLibrary.inputBtn).classList.toggle('red');
    },
    getStringLib: function () {
        return StringLibrary;
    }
}
})();



var controller = (function (budget_CT, UI_CT) {
    var ctrlAddItem, DOM, eventListeners, updateBudget, ctrlDeleteItem, updatePercentages;

    eventListeners = function () {
        DOM = UI_CT.getStringLib();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keycode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UI_CT.changedType);

    };

    updateBudget = function () {

        budget_CT.calculateBudget()

        var budget = budget_CT.getBudget();

        UI_CT.displayBudget(budget);
    };

    updatePercentages = function () {
        budget_CT.calculatePercentages();

        var percentages = budget_CT.getPercentages();

        UI_CT.displayPercentages(percentages);
    };

    ctrlAddItem = function () {
        var input, newItem;

        input = UI_CT.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            newItem = budget_CT.addITEM(input.type, input.description, input.value)

            UI_CT.addListItem(newItem, input.type);

            UI_CT.clearFields();

            updateBudget();

            updatePercentages();
        };
    };

    ctrlDeleteItem = function (event) {
        var itemID, splitID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budget_CT.deleteBudget(type, ID);

            UI_CT.deleteListItem(itemID);

            updateBudget();

            updatePercentages();
        }
    }

    return {
        init: function () {
            UI_CT.displayBudget({
                budget: 0,
                totalINC: 0,
                totalEXP: 0,
                percentage: -1
            });
            eventListeners();
            UI_CT.displayMonth();
        }
    }


})(budgetController, UIcontroller);



controller.init();