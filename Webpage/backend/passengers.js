const passenger_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/passengers";
fetch(passenger_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch passanger Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Passengers tbody");
    data.forEach(passenger=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${passenger.passenger_id}</td>
        <td>${passenger.name}</td>
        <td>${passenger.email}</td>
        <td>${passenger.phone}</td>
        <td>${passenger.passport_number}</td>
        <td>${passenger.nationality}</td>
        <td>${passenger.dob}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});