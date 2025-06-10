const Staff_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/staff";

// Fetch and display staff
fetch(Staff_URL)
  .then(response => {
    if (!response.ok) throw new Error("Failed to Fetch Staff Data");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#Staff tbody");
    data.forEach(staff => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-4 py-2">${staff.staff_id}</td>
        <td class="px-4 py-2">${staff.name}</td>
        <td class="px-4 py-2">${staff.role_id}</td>
        <td class="px-4 py-2">${staff.phone}</td>
        <td class="px-4 py-2">${staff.email}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error(err));

// Add new staff
const form = document.getElementById("StaffForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role_id = document.getElementById("role_id").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  try {
    const response = await fetch(Staff_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role_id, phone, email }),
    });

    if (!response.ok) throw new Error("Failed to add staff");

    const newStaff = await response.json();

    const tbody = document.querySelector("#Staff tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-4 py-2">${newStaff.staff_id}</td>
      <td class="px-4 py-2">${newStaff.name}</td>
      <td class="px-4 py-2">${newStaff.role_id}</td>
      <td class="px-4 py-2">${newStaff.phone}</td>
      <td class="px-4 py-2">${newStaff.email}</td>
    `;
    tbody.appendChild(row);

    form.reset();
  } catch (err) {
    console.error(err.message);
    alert("Error: " + err.message);
  }
});
