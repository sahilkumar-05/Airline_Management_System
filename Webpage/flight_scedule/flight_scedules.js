const flight_scedule_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/flight_schedules";
fetch(flight_scedule_URL).then(response => {
    if (!response.ok)
        throw new Error("Failed to Fetch flight_scedule Data");
    return response.json();
}).then(data => {
    const tbody = document.querySelector("#flight_scedule tbody");
    data.forEach(flight_scedule => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${flight_scedule.schedule_id}</td>
        <td>${flight_scedule.flight_id}</td>
        <td>${flight_scedule.departure_time}</td>
        <td>${flight_scedule.arrival_time}</td>
        <td>${flight_scedule.status}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err => {
    console.log(err.message);
});