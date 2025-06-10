const flight_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/flights";
fetch(flight_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch flight Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Flights tbody");
    data.forEach(flight=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${flight.flight_id}</td>
        <td>${flight.flight_code}</td>
        <td>${flight.origin_airport}</td>
        <td>${flight.destination_airport}</td>
        <td>${flight.aircraft_id}</td>
        <td>${flight.airline_id}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});