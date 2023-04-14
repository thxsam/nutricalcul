// Get the form element and add an event listener for when it is submitted

const caloriesForm = document.getElementById('calories-form');
caloriesForm.addEventListener('submit', function(event) {
    event.preventDefault();// prevent the form from submitting and refreshing the page
    
    // Get the values from the form inputs
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityLevel = parseFloat(document.getElementById('activity-level').value);
    const strategy = document.getElementById('strategy-selector').value;

    let calories = 0;
    if (gender === 'male') {
        calories = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
    } else {
        calories = Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
    }

    calories *= activityLevel;

    let protein = Math.round(weight * 2);
    let fat = Math.round(calories * 0.2 / 9);
    let carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);


    if (strategy === 'cutting') {
        let strategy_name = "Perte de poids";
        calories = calories * 0.8;
        protein = Math.round(weight * 2);
        fat = Math.round(calories * 0.2 / 9);
        carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    } else if (strategy === 'bulking') {
        let strategy_name = "Prise de poids";
        calories = calories * 1.2;
        protein = Math.round(weight * 2.2);
        fat = Math.round(calories * 0.2 / 9);
        carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    } else {
        let strategy_name = "Maintient de poids";
        protein = Math.round(weight * 2);
        fat = Math.round(calories * 0.2 / 9);
        carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    }
    //// Weight monthly variation  

    let weeklyCalories = 0;
    let monthlyCalories = 0;
    let caloriesPerKg = 7700;
    weeklyCalories = calories * 7
    monthlyCalories = weeklyCalories * 30

    const monthlyMaintenanceCalories = calories * 30;
    const monthlyWeightChange = (monthlyCalories - monthlyMaintenanceCalories) / caloriesPerKg;


    ////

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
        <th>Macronutriments</th>
        <th>Pourcentage</th>
        <th>Grammes</th>
        <th>kcal</th>
        </tr>
        <tr>
        <td>Protéines</td>
        <td>${Math.round(protein * 4 / calories * 100)}%</td>
        <td>${protein} g</td>
        <td>${protein * 4} kcal</td>
        </tr>
        <tr>
        <td>Glucides</td>
        <td>${Math.round(carbs * 4 / calories * 100)}%</td>
        <td>${carbs} g</td>
        <td>${carbs * 4} kcal</td>
        </tr>
        <tr>
        <td>Lipides</td>
        <td>${Math.round(fat * 9 / calories * 100)}%</td>
        <td>${fat} g</td>
        <td>${fat * 9} kcal</td>
        </tr>
    `;
    
    // Cela représentera une ${strategy_name} de poids d'environ ${monthlyWeightChange.toFixed(0)} par mois.
    
    const result = document.getElementById('result');
    result.innerHTML = `Votre objectif calorique personnalisé est de <strong>${calories.toFixed(0)} </strong> kcal par jour. <br>Voici ci-dessous la répartition des macronutriments que vous devez suivre : <br>`;
    result.appendChild(table);


    // Adding a chartpie
    const chartCanvas = document.createElement('canvas');
    const chartContext = chartCanvas.getContext('2d');

    const chartData = {
    datasets: [{
        data: [protein, carbs, fat],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
    }],
    labels: ['Protéines (g)', 'Glucides (g)', 'Lipides (g)']
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Répartition des macronutriments sur la journée',
            fontSize: 20
          }
        }
      };
      
    const chart = new Chart(chartContext, {
    type: 'pie',
    data: chartData,
    options: chartOptions
    });
    
    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');
    chartContainer.style.width = '450px'; // adjust width as needed
    chartContainer.style.height = '450px'; // adjust height as needed
    chartContainer.appendChild(chartCanvas);
    
    result.appendChild(chartContainer);
})

