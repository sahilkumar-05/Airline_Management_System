const Booking_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/bookings";

// Fetch and display existing booking data
fetch(Booking_URL)
  .then(response => {
    if (!response.ok) throw new Error("Failed to Fetch Booking Data");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#Booking tbody");
    data.forEach(booking => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${booking.booking_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${booking.passenger_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${booking.schedule_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${booking.booking_date}</td>
        <td class="px-6 py-4 whitespace-nowrap">${booking.status}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading bookings:", err.message);
  });

// Handle form submission to add a new booking
const bookingForm = document.getElementById("BookingForm");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const booking_id = document.getElementById("booking_id").value;
  const passenger_id = document.getElementById("passenger_id").value;
  const schedule_id = document.getElementById("schedule_id").value;
  const booking_date = document.getElementById("booking_date").value;
  const status = document.getElementById("status").value;

  try {
    const response = await fetch(Booking_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id, passenger_id, schedule_id, booking_date, status }),
    });

    if (!response.ok) throw new Error("Failed to add booking");

    const newBooking = await response.json();

    // Add the new booking to the table
    const tbody = document.querySelector("#Booking tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${newBooking.booking_id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newBooking.passenger_id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newBooking.schedule_id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newBooking.booking_date}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newBooking.status}</td>
    `;
    tbody.appendChild(row);

    bookingForm.reset();

  } catch (err) {
    console.error("Error adding booking:", err.message);
    alert("Error: " + err.message);
  }
});
