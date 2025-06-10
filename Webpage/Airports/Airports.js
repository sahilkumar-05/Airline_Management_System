const Airport_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/airports";

// Fetch and display existing airport data
fetch(Airport_URL).then(response => {
    if (!response.ok)
        throw new Error("Failed to Fetch Airport Data");
    return response.json();
}).then(data => {
    const tbody = document.querySelector("#Airport tbody");
    data.forEach(airport => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${airport.airport_id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${airport.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${airport.city}</td>
            <td class="px-6 py-4 whitespace-nowrap">${airport.country}</td>
        `;
        tbody.appendChild(row);
    });
}).catch(err => {
    console.error(err.message);
});

// Handle form submission to add a new airport
const form = document.getElementById("AirportForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const airport_id = document.getElementById("airport_id").value;
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;

    try {
        const response = await fetch(Airport_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ airport_id, name, city, country }),
        });

        if (!response.ok) throw new Error("Failed to add airport");

        const newAirport = await response.json();

        // Add new airport to table
        const tbody = document.querySelector("#Airport tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${newAirport.airport_id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newAirport.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newAirport.city}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newAirport.country}</td>
        `;
        tbody.appendChild(row);

        // Clear form after successful submission
        form.reset();
        
    } catch (err) {
        console.error(err.message);
        alert("Error: " + err.message);
    }
});
