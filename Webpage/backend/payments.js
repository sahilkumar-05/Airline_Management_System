const payment_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/payments";
fetch(payment_URL).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch payment Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#Payments tbody");
    data.forEach(payment=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${payment.payment_id}</td>
        <td>${payment.ticket_id}</td>
        <td>${payment.amount}</td>
        <td>${payment.payment_date}</td>
        <td>${payment.payment_method}</td>
        
        `;

        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});