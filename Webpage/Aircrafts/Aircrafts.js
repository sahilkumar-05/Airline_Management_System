const Aircraft_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/aircrafts";

// Function to fetch and display aircraft data
function fetchAircraftData() {
    fetch(Aircraft_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector("#Aircraft tbody");
            tbody.innerHTML = ""; // Clear existing rows
            
            if (data.length === 0) {
                const row = document.createElement("tr");
                row.innerHTML = `<td colspan="6" class="text-center py-4">No aircraft found</td>`;
                tbody.appendChild(row);
                return;
            }

            data.forEach(aircraft => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${aircraft.aircraft_id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${aircraft.model}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${aircraft.manufacturer}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${aircraft.capacity}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${aircraft.registration_number}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${aircraft.airline_id}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error("Error fetching aircraft data:", err);
            });
}

// Initial data load
fetchAircraftData();

// Form submission handler
document.getElementById("AircraftForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const model = document.getElementById("model").value;
    const manufacturer = document.getElementById("manufacturer").value;
    const capacity = document.getElementById("capacity").value;
    const registration_number = document.getElementById("registration_number").value;
    const airline_id = document.getElementById("airline_id").value;

    try {
        const response = await fetch(Aircraft_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, manufacturer, capacity, registration_number, airline_id })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.Error || "Failed to add aircraft");
        }

        // Refresh the aircraft list
        fetchAircraftData();
        
        // Reset the form
        e.target.reset();
        
        // Show success message
        alert("Aircraft added successfully!");
    } catch (err) {
        console.error("Error adding aircraft:", err);
        alert(err.message);
    }
});