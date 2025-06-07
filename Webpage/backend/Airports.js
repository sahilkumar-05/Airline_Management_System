const Airport_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/airports";
fetch(Airport_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch Airport Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Airport tbody");
    data.forEach(Airport=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Airport.airport_id}</td>
        <td>${Airport.name}</td>
        <td>${Airport.city}</td>
        <td>${Airport.country}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});