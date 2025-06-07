const Booking_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/bookings";
fetch(Booking_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch Booking Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Booking tbody");
    data.forEach(Booking=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Booking.booking_id}</td>
        <td>${Booking.passenger_id}</td>
        <td>${Booking.booking_date}</td>
        <td>${Booking.status}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});