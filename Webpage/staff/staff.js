const Staff_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/staff";
fetch(Staff_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch Staff Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Staff tbody");
    data.forEach(Staff=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Staff.staff_id}</td>
        <td>${Staff.name}</td>
        <td>${Staff.role_id}</td>
        <td>${Staff.phone}</td>
        <td>${Staff.email}</td>
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});