const Airline_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/airline";

// Fetch and display existing airline data
fetch(Airline_URL).then(response => {
    if (!response.ok)
        throw new Error("Failed to Fetch Airline Data");
    return response.json();
}).then(data => {
    const tbody = document.querySelector("#Airline tbody");
    data.forEach(Airline => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${Airline.airline_id}</td>
        
            <td class="px-6 py-4 whitespace-nowrap">${Airline.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${Airline.country}</td>
        `;
        tbody.appendChild(row);
    });
}).catch(err => {
    console.log(err.message);
});

// Handle form submission to add a new airline
const form = document.getElementById("AirlineForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const airline_id = document.getElementById("airline_id").value;
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;

    try {
        const response = await fetch(Airline_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ airline_id, name, country }),
        });

        if (!response.ok) throw new Error("Failed to add airline");

        const newAirline = await response.json();

        // Add new airline to table
        const tbody = document.querySelector("#Airline tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${newAirline.airline_id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newAirline.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newAirline.country}</td> 
            `;
        tbody.appendChild(row)
        
form.reset();
        
    } catch (err) {
        console.error(err.message);
        alert("Error: " + err.message);
    }
});