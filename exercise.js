const inpWorkout = document.getElementById("inpWorkout");
const inpDate = document.getElementById("inpDate");
const inpWeight = document.getElementById("inpWeight");
const inpReps = document.getElementById("inpReps");
const btnInsert = document.getElementById("btnInsert");
const Output = document.getElementById("output");
// const totals = document.getElementById("totals");
const dateFilter = document.getElementById("dateFilter");
function getLocalDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const today = getLocalDateString();
inpDate.value = today;
dateFilter.value = today;

function getworkout() {
    return JSON.parse(localStorage.getItem("workoutLog") || "[]");
}

function saveworkouts(workouts) {
    localStorage.setItem("workoutLog", JSON.stringify(workouts));
}

function Log(){
    let workouts = getworkout();
    let selectedDate = dateFilter.value;
    let selectedworkouts = workouts.filter(m => m.date === selectedDate);
    // const totalIB  = selectedworkouts.reduce((sum, m) => sum + m.weight, 0);
    // const totalReps  = selectedworkouts.reduce((sum, m) => sum + m.reps, 0);    
    let color;
    const sets = {};



    if (selectedworkouts.length === 0) {
        Output.innerHTML = "No workouts logged yet.";
        return;
    }
    const grouped = {};
    selectedworkouts.forEach(function(entry) {
        if (!grouped[entry.workout]) {
            grouped[entry.workout] = [];
        }
        grouped[entry.workout].push(entry);
    });

    // Render grouped
    Output.innerHTML = "";
    Object.keys(grouped).forEach(function(exerciseName) {
        let setsHTML = "";
        grouped[exerciseName].forEach(function(set) {
            setsHTML += `<p>${set.weight} lbs x ${set.reps} reps</p>`;
        });
        Output.innerHTML += `
            <div>
                <strong>${exerciseName}</strong>
                ${setsHTML}
            </div>
        `;
    });
}


btnInsert.onclick = function(){
    const workout = inpWorkout.value.trim();
    const date = inpDate.value;
    const weight = parseInt(inpWeight.value);
    const reps = parseInt(inpReps.value);

    if(!workout || !date || isNaN(weight) || isNaN(reps)) {
        alert("please fill in all fields!");
        return;
    }

    const workouts = getworkout();
    workouts.push({ workout, date, weight, reps});
    saveworkouts(workouts)

    inpWorkout.value     = "";
    inpWeight.value = "";
    inpReps.value  = "";
    inpDate.value     = today;
    Log();
};
dateFilter.onchange = function() {
    Log();
};

document.getElementById("btnAll").onclick = function() {
    const workouts = getworkout();

    if (workouts.length === 0) {
        alert("No workouts logged yet!");
        return;
    }
    const grouped = {};
    workouts.forEach(function(entry){
        if(!grouped[entry.workout]){
            grouped[entry.workout] = [];
        }
        grouped[entry.workout].push(entry);
    })
    Output.innerHTML = "";
    Object.keys(grouped).forEach(function(exerciseName) {
        let setsHTML = "";
        grouped[exerciseName].forEach(function(set) {
            setsHTML += `<p>${set.weight} lbs x ${set.reps} reps ${set.date}</p>`;
        });
        Output.innerHTML += `
            <div>
                <strong>${exerciseName}</strong>
                ${setsHTML}
            </div>
        `;
    });
}

Log();
