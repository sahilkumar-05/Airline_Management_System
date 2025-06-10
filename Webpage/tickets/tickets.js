const Ticket_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/tickets";
fetch(Ticket_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch Ticket Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Ticket tbody");
    data.forEach(Ticket=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Ticket.ticket_id}</td>
        <td>${Ticket.booking_id}</td>
        <td>${Ticket.seat_number}</td>
        <td>${Ticket.class}</td>
        <td>${Ticket.price}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});