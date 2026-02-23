console.log(`Hello from js`)
let today = new Date().toLocaleDateString();

let saved = localStorage.getItem(today);

let track = {
    weight: 151,
    food: []
};

track.food.push({name: "oatmeal",calories: 150, protien: 5});

let totalCalories = 0;

for (let i = 0; i < track.food.length; i++) {
    totalCalories += track.food[i].calories;
}

let track_cerealized = JSON.stringify(track);

localStorage.setItem(today,track_cerealized);

document.getElementById("date").textContent = today;
document.getElementById('weight').textContent = track.weight;



console.log(saved);









/* will need this later
window popups
window.alert(`boo`)

local storage
localStorage.setItem('The Name',input.value);
le track_cerealized = json.stringify(track)

*/
