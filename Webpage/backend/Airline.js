const Airline_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/airline";
fetch(Airline_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch Airline Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Airline tbody");
    data.forEach(Airline=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Airline.airline_id}</td>
        <td>${Airline.name}</t>
        <td>${Airline.country}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});