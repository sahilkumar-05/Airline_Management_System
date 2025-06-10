const Aircraft_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/aircrafts";
fetch(Aircraft_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch Aircraft Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Aircraft tbody");
    data.forEach(Aircraft=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Aircraft.aircraft_id}</td>
        <td>${Aircraft.model}</td>
        <td>${Aircraft.manufacturer}</td>
        <td>${Aircraft.capacity}</td>
        <td>${Aircraft.registration_number}</td>
        <td>${Aircraft.airline_id}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});