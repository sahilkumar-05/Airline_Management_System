const Passenger_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/passengers";

fetch(Passenger_URL).then(response => {
    if (!response.ok)
        throw new Error("Failed to Fetch Passenger Data");
    return response.json();
}).then(data => {
    const tbody = document.querySelector("#Passenger tbody");
    data.forEach(passenger => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${passenger.passenger_id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${passenger.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${passenger.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">${passenger.phone}</td>
            <td class="px-6 py-4 whitespace-nowrap">${passenger.passport_number}</td>
            <td class="px-6 py-4 whitespace-nowrap">${passenger.nationality}</td>
            <td class="px-6 py-4 whitespace-nowrap">${passenger.dob}</td>
        `;
        tbody.appendChild(row);
    });
}).catch(err => {
    console.log(err.message);
});

const form = document.getElementById("PassengerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const passenger_id = document.getElementById("passenger_id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const passport_number = document.getElementById("passport_number").value;
    const nationality = document.getElementById("nationality").value;
    const dob = document.getElementById("dob").value;

    try {
        const response = await fetch(Passenger_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passenger_id, name, email, phone, passport_number, nationality, dob }),
        });

        if (!response.ok) throw new Error("Failed to add passenger");

        const newPassenger = await response.json();

        const tbody = document.querySelector("#Passenger tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${newPassenger.passenger_id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newPassenger.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newPassenger.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newPassenger.phone}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newPassenger.passport_number}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newPassenger.nationality}</td>
            <td class="px-6 py-4 whitespace-nowrap">${newPassenger.dob}</td>
        `;
        tbody.appendChild(row);
        form.reset();
    } catch (err) {
        console.error(err.message);
        alert("Error: " + err.message);
    }
});