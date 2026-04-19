const inpFood = document.getElementById("inpFood");
const inpDate = document.getElementById("inpDate");
const inpCalories = document.getElementById("inpCalories");
const inpProtein = document.getElementById("inpProtein");
const btnInsert = document.getElementById("btnInsert");
const Output = document.getElementById("output");
const totals = document.getElementById("totals");
const dateFilter = document.getElementById("dateFilter");
const today = new Date().toISOString().split('T')[0];
inpDate.value = today;
dateFilter.value = today;

function getMeal() {
    return JSON.parse(localStorage.getItem("foodLog") || "[]");
}

function saveMeals(meals) {
    localStorage.setItem("foodLog", JSON.stringify(meals));
}

function Log(){
    let meals = getMeal();
    let selectedDate = dateFilter.value;
    let selectedMeals = meals.filter(m => m.date === selectedDate);
    const totalCal  = selectedMeals.reduce((sum, m) => sum + m.calories, 0);
    const totalPro  = selectedMeals.reduce((sum, m) => sum + m.protein, 0);    
    
    totals.innerHTML = `
        Calories: ${totalCal} kcal <br>
        Protein: ${totalPro}g <br>
    `;

    if (selectedMeals.length === 0) {
        Output.innerHTML = "No meals logged yet.";
        return;
    }
    Output.innerHTML = "";
    selectedMeals.forEach(function(meal){
        Output.innerHTML += `
        <p>
            <strong>${meal.food}</strong> - ${meal.date} <br>
            Calories: ${meal.calories} | Protein: ${meal.protein}G
        </p>  
        `;
    });
}

btnInsert.onclick = function(){
    const food = inpFood.value.trim();
    const date = inpDate.value;
    const calories = parseInt(inpCalories.value);
    const protein = parseInt(inpProtein.value);

    if(!food || !date || isNaN(calories) || isNaN(protein)) {
        alert("please fill in all fields!");
        return;
    }

    const meals = getMeal();
    meals.push({ food, date, calories, protein});
    saveMeals(meals)

    inpFood.value     = "";
    inpCalories.value = "";
    inpProtein.value  = "";
    inpDate.value     = today;
    Log();
};
dateFilter.onchange = function() {
    Log();
};

document.getElementById("btnAll").onclick = function() {
    const meals = getMeal();

    if (meals.length === 0) {
        alert("No meals logged yet!");
        return;
    }

    Output.innerHTML = "";
    meals.forEach(function(meal) {
        Output.innerHTML += `
        <p>
            <strong>${meal.food}</strong> - ${meal.date} <br>
            Calories: ${meal.calories} | Protein: ${meal.protein}g
        </p>
        `;
    });
}

Log();
