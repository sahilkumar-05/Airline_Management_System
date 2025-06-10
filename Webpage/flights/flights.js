const flight_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/flights";

// Fetch existing flights
fetch(flight_URL)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch flight data");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#Flights tbody");
    data.forEach(flight => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${flight.flight_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${flight.flight_code}</td>
        <td class="px-6 py-4 whitespace-nowrap">${flight.origin_airport}</td>
        <td class="px-6 py-4 whitespace-nowrap">${flight.destination_airport}</td>
        <td class="px-6 py-4 whitespace-nowrap">${flight.aircraft_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${flight.airline_id}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error(err.message));

// Handle form submission
document.getElementById("FlightForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const flight_id = document.getElementById("flight_id").value;
  const flight_code = document.getElementById("flight_code").value;
  const origin_airport = document.getElementById("origin_airport").value;
  const destination_airport = document.getElementById("destination_airport").value;
  const aircraft_id = document.getElementById("aircraft_id").value;
  const airline_id = document.getElementById("airline_id").value;

  try {
    const response = await fetch(flight_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flight_id, flight_code, origin_airport, destination_airport, aircraft_id, airline_id })
    });

    if (!response.ok) throw new Error("Failed to add flight");

    const newFlight = await response.json();

    // Add to table
    const tbody = document.querySelector("#Flights tbody");
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