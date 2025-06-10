const Role_URL = "https://congenial-waffle-9p65p9r7pv4fpxj9-6008.app.github.dev/roles";

// Fetch and display existing roles
fetch(Role_URL)
  .then(response => {
    if (!response.ok) throw new Error("Failed to Fetch Role Data");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#Roles tbody");
    data.forEach(role => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${role.role_id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${role.role_name}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error(err.message);
  });

// Handle form submission to add a new role
const form = document.getElementById("RoleForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const role_id = document.getElementById("role_id").value;
  const role_name = document.getElementById("role_name").value;

  try {
    const response = await fetch(Role_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role_id, role_name }),
    });

    if (!response.ok) throw new Error("Failed to add role");

    const newRole = await response.json();

    // Add new role to table
    const tbody = document.querySelector("#Roles tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${newRole.role_id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${newRole.role_name}</td>
    `;
    tbody.appendChild(row);

    form.reset();
  } catch (err) {
    console.error(err.message);
    alert("Error: " + err.message);
  }
});