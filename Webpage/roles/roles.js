const Role_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/roles";
fetch(Role_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch Role Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Roles tbody");
    data.forEach(Role=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Role.role_id}</td>
        <td>${Role.role_name}</td>
        
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});