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
        <td class="px-6 py-4 whitespace-nowrap">${payment.payment_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${payment.ticket_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${payment.amount}</td>
        <td class="px-6 py-4 whitespace-nowrap">${payment.payment_date}</td>
        <td class="px-6 py-4 whitespace-nowrap">${payment.payment_method}</td>
        
        `;  

        tbody.appendChild(row);
    });

 })
  .catch(err => console.error(err.message));

  // Handle form submission
document.getElementById("PaymentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payment_id = document.getElementById("payment_id").value;
  const ticket_id = document.getElementById("ticket_id").value;
  const amount = document.getElementById("amount").value;
  const payment_date = document.getElementById("payment_date").value;
  const payment_method = document.getElementById("payment_method").value;
  
  try {
    const response = await fetch(payemnt_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment_id, ticket_id, amount, payment_date, payment_method })
    });

    if (!response.ok) throw new Error("Failed to add payment");

    const newPayment = await response.json();

    // Add to table
    const tbody = document.querySelector("#Payments tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${newFlight.flight_id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newFlight.flight_code}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newFlight.origin_airport}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newFlight.destination_airport}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newFlight.aircraft_id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newFlight.airline_id}</td>
    `;
    tbody.appendChild(row);

    e.target.reset();
  } catch (err) {
    console.error(err.message);
    alert("Error: " + err.message);
  }
});