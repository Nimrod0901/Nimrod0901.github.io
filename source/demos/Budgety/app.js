//BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
        this.percentage = -1
    }
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else{
            this.percentage = -1
        }
    }
    
    Expense.prototype.getPercentage = function() {
        return this.percentage
    }
    
    var Income = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }
    
    var allExpenses = []
    var allIncomes = []
    var totalExpenses = 0
    
    var calculateTotal = function(type) {
        var sum = 0
        data.allItems[type].forEach(function(cur) {
            sum += cur.value
        })
        data.totals[type] = sum
    }
    
    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
    }
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID
            
            // Create new Id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }
            
            
            // Create new Item based on 'inc' or 'exp' type
            if(type === 'expense') {
                newItem = new Expense(ID, des, val)
            } else if(type === 'income') {
                newItem = new Income(ID, des, val)
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem)
            return newItem
        },
        
        deleteItem: function(type, id) {
            
            var idArr = data.allItems[type].map(function(current) {
                return current.id
            })
            
            var index = idArr.indexOf(id)
            
            if(index !== -1) {
                data.allItems[type].splice(index, 1)
            }
        },
        
        calculateBudget: function() {
            calculateTotal('income')
            calculateTotal('expense')
            
            data.budget = data.totals.income - data.totals.expense
            
            if(data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100)
            } else {
                data.percentage = -1
            }
        },
        
        calculatePercentages: function() {
            data.allItems.expense.forEach(function(cur) {
                cur.calcPercentage(data.totals.income)
            })
        },
        
        getPercentages: function() {
            var allPercentages = data.allItems.expense.map(function(cur) {
                return cur.getPercentage()
            })
            return allPercentages
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.income,
                totalExp: data.totals.expense,
                percentage: data.percentage
            }
        },
        
        test: function() {
            console.log(data)
        }
    }
})()

// UI CONTROLLER
var UIController = (function() {
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn', 
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }
    
    var formatNumber = function(num, type) {
            var numsplit, int, dec
            /**
            2000 -> 2,000.00
            -2102.3414 -> -2102.34
            */
            
            num = Math.abs(num)
            num = num.toFixed(2)
            
            numsplit = num.split('.')
            int = numsplit[0]
            dec = numsplit[1]
            
            if(int.length > 3) {
                int = int.substring(0, int.length - 3) + ',' + int.substring(int.length - 3)
            }
            
            return (type === 'income' ? '+' : '-') + ' ' + int + '.' + dec
        }
    
    var nodeListForEach = function(list, callback) {
                for(var i = 0; i < list.length; i++) {
                    callback(list[i], i)
                }
            }
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // Will be either income or expense
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        
        addListItem: function(obj, type) {
            var html, newHtml, element
            // 1. Create HTML string with placeholder text
            
            if(type === 'income') {
                element = DOMStrings.incomeContainer
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete">  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>'
            } else if (type == 'expense') {
                element = DOMStrings.expenseContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'    
            }
            
            
            // 2. Replace the palceholder text with some actual data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))
            
            // 3. Insert
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },
        
        deleteItem: function(selectorID) {
            var el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)
        },
        
        clearFields: function() {
            var fields, fieldsArr
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)
            
            fieldsArr = Array.prototype.slice.call(fields)
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = ""
            })
            
            fieldsArr[0].focus()
        },
        
        displayBudget: function(obj) {
            var type;
            
            obj.budget >= 0 ? type = 'income' : type = 'expense'
            
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type)
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'expense')
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'income')
            
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '----'
            }
            
        },
        
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel)
            
            nodeListForEach(fields, function(current, index) {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + "%"
                } else {
                    current.textContent = '----'
                }
            })
        },
        
        displayMonth: function() {
            var now, year
            
            now = new Date()
            
            year = now.getFullYear()
            console.log(now)
            document.querySelector(DOMStrings.dateLabel).textContent = year
        },
        
        getDOMstrings: function() {
            return DOMStrings
        },
        
        changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            )
            
            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus')
            })
            
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
            
            
        }
    }
    
})()


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
    
        var DOM = UICtrl.getDOMstrings()
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
    
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                ctrlAddItem()
            } 
        })
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType)
    }
       
    var updateBudget = function() {
        
        //1. Calculate the budget
        budgetCtrl.calculateBudget()
        
        //2.return the budget
        var budget = budgetCtrl.getBudget()

        //3.Display the budget on the UI
        UICtrl.displayBudget(budget)
    }
    
    var updatePercentage = function() {
        var percentages
        // 1.Calculate percentages
        budgetCtrl.calculatePercentages()
        
        // 2.Read percentages from the budget controller
        percentages = budgetCtrl.getPercentages()
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages)
    }
                  
    var ctrlAddItem = function() {
        var input, newItem
        //1. Get input data
        input = UICtrl.getInput()
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
        //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            
            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type)
            
            //4. Calculate the budget
            UICtrl.clearFields()
            
            //5. Display the budget on the UI
            updateBudget()
            
            // 6. Update percentages
            updatePercentage()
        }
    }
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
        
        if(itemID) {
            splitID = itemID.split('-')
            type = splitID[0]
            ID = parseInt(splitID[1])
            budgetCtrl.deleteItem(type, ID)
            updateBudget()
            UICtrl.deleteItem(itemID)
        }
    }
    
    return {
        init: function() {
            UICtrl.displayMonth()
            setupEventListeners()
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0, 
                totalExp: 0, 
                percentage: -1
            })
        }
    }
    

})(budgetController, UIController)


controller.init()
