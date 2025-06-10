const Ticket_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/tickets";

// Fetch and display existing tickets
fetch(Ticket_URL)
  .then(response => {
    if (!response.ok) throw new Error("Failed to Fetch Ticket Data");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#Ticket tbody");
    data.forEach(ticket => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${ticket.ticket_id}</td>
        <td>${ticket.booking_id}</td>
        <td>${ticket.seat_number}</td>
        <td>${ticket.class}</td>
        <td>${ticket.price}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error(err.message));

// Handle form submission to insert new ticket
document.getElementById("ticketForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const booking_id = document.getElementById("booking_id").value;
  const seat_number = document.getElementById("seat_number").value;
  const className = document.getElementById("class").value;
  const price = document.getElementById("price").value;

  try {
    const response = await fetch(Ticket_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        booking_id,
        seat_number,
        class: className,
        price
      })
    });

    if (!response.ok) throw new Error("Failed to add ticket");

    const newTicket = await response.json();

    // Add new ticket to the table
    const tbody = document.querySelector("#Ticket tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${newTicket.ticket_id}</td>
      <td>${newTicket.booking_id}</td>
      <td>${newTicket.seat_number}</td>
      <td>${newTicket.class}</td>
      <td>${newTicket.price}</td>
    `;
    tbody.appendChild(row);

    // Reset the form without popup
    document.getElementById("ticketForm").reset();

  } catch (err) {
    console.error("Error:", err.message);
  }
});
