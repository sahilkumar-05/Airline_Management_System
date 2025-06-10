const flight_staff_assignment_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/flight_staff_assignment";
fetch(flight_staff_assignment_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch flight_staff_assignment Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#flight_staff_assignment tbody");
    data.forEach(flight_staff_assignment=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${flight_staff_assignment.assignment_id}</td>
        <td>${flight_staff_assignment.flight_id}</t>
        <td>${flight_staff_assignment.staff_id}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});