const main = document.getElementById("mainContent");
let currentPage = "home";
let selectedProvider = null;

const providers = [
  {
    id: 1,
    name: "St. Mercy General Hospital",
    type: "Hospital",
    verified: true,
    distance: "1.2 km",
    contact: "+234 800 123 4567",
    services: ["Emergency", "Surgery", "Maternity"],
    hours: "24/7",
  },
  {
    id: 2,
    name: "GoodHealth Pharmacy",
    type: "Pharmacy",
    verified: true,
    distance: "900 m",
    contact: "+234 800 987 6543",
    services: ["Drugs", "OTC"],
    hours: "8:00 - 22:00",
  },
  {
    id: 3,
    name: "Eastside Clinic",
    type: "Hospital",
    verified: false,
    distance: "3.4 km",
    contact: "+234 800 555 1212",
    services: ["General Practice"],
    hours: "9:00 - 17:00",
  },
];

function renderPage() {
  switch (currentPage) {
    case "home":
      main.innerHTML = `
      <section>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h1 class="text-2xl font-bold">Find the right care fast.</h1>
          <p class="text-sm text-gray-600 mt-1">Search by condition, service, or drug.</p>
          <div class="mt-6 flex gap-3">
            <input id="searchInput" placeholder="Type a condition or drug" class="flex-1 border rounded px-4 py-3" />
            <button onclick="goTo('results')" class="bg-blue-600 text-white px-4 py-3 rounded">Search</button>
          </div>
          <div class="mt-6 flex gap-3">
            <button onclick="goTo('results')" class="px-4 py-2 border rounded">Hospitals</button>
            <button onclick="goTo('results')" class="px-4 py-2 border rounded">Pharmacies</button>
          </div>
          <div class="mt-6 text-xs text-gray-500">Demo mode: verification badges and stock are mocked.</div>
        </div>
      </section>`;
      break;

    case "results":
      main.innerHTML = `
      <section>
        <div class="flex gap-6">
          <div class="flex-1">
            <h2 class="text-lg font-semibold mb-4">Search Results</h2>
            <div class="space-y-3">
              ${providers
                .map(
                  (p) => `
                <div class="bg-white p-4 rounded shadow-sm flex justify-between items-center">
                  <div>
                    <div class="flex items-center gap-2">
                      <div class="font-semibold">${p.name}</div>
                      <div class="text-xs px-2 py-1 rounded ${
                        p.verified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }">${p.verified ? "Verified" : "Unverified"}</div>
                    </div>
                    <div class="text-sm text-gray-600">${p.services.join(" · ")}</div>
                    <div class="text-sm text-gray-500 mt-1">${p.distance} • ${p.hours}</div>
                  </div>
                  <div class="flex flex-col items-end gap-2">
                    <div class="text-sm text-gray-600">${p.contact}</div>
                    <div class="flex gap-2">
                      <button onclick="viewProvider(${p.id})" class="px-3 py-1 border rounded text-sm">Details</button>
                      <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">Call</button>
                    </div>
                  </div>
                </div>`
                )
                .join("")}
            </div>
          </div>
          <div class="w-96">
            <div class="bg-white rounded p-4 shadow-sm h-80 flex items-center justify-center text-gray-400">
              Map placeholder (Mapbox / Leaflet)
            </div>
          </div>
        </div>
      </section>`;
      break;

    case "provider":
      if (!selectedProvider) {
        main.innerHTML = `<div class="bg-white p-6 rounded shadow-sm text-gray-600">No provider selected.</div>`;
        return;
      }
      const p = selectedProvider;
      main.innerHTML = `
      <div class="bg-white p-6 rounded shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold">${p.name}</h3>
            <div class="text-xs mt-1 px-2 py-1 inline-block rounded ${
              p.verified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
            }">${p.verified ? "Verified" : "Unverified"}</div>
          </div>
          <div class="text-sm text-gray-600">${p.distance}</div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">Services</div>
            <div class="mt-2 text-sm">${p.services.join(", ")}</div>
            <div class="mt-4 text-sm text-gray-600">Contact</div>
            <div class="mt-2">${p.contact}</div>
            <div class="mt-4 text-sm text-gray-600">Opening Hours</div>
            <div class="mt-2">${p.hours}</div>
          </div>
          <div class="flex flex-col gap-3">
            <button class="w-full px-4 py-2 bg-blue-600 text-white rounded">Call</button>
            <button class="w-full px-4 py-2 border rounded">Get Directions</button>
          </div>
        </div>
      </div>`;
      break;

    case "admin":
      main.innerHTML = `
      <div class="bg-white p-6 rounded shadow-sm">
        <h3 class="text-lg font-semibold">Admin Dashboard</h3>
        <table class="w-full text-sm mt-4">
          <thead><tr class="text-left text-gray-600">
            <th>Name</th><th>Type</th><th>Verified</th><th>Actions</th></tr></thead>
          <tbody>
            ${providers
              .map(
                (p) => `<tr class="border-t"><td>${p.name}</td><td>${p.type}</td><td>${p.verified ? "Yes" : "No"}</td>
                <td><button class="px-2 py-1 border rounded text-sm">Edit</button></td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>`;
      break;

    case "about":
      main.innerHTML = `
      <div class="bg-white p-6 rounded shadow-sm">
        <h3 class="text-lg font-semibold">About MediLink</h3>
        <p class="text-sm text-gray-600 mt-2">MediLink connects patients to verified hospitals and pharmacies, helping users find the right care fast.</p>
        <div class="mt-4">
          <h4 class="font-semibold">Team</h4>
          <ul class="mt-2 space-y-2 text-sm text-gray-700">
            <li>Haneef — Product Lead</li>
            <li>Full-Stack Developer — Backend & Frontend</li>
            <li>Data Engineer — Search & Matching</li>
            <li>Operations Lead — Provider Onboarding</li>
            <li>UX/UI Designer — Design & UX</li>
          </ul>
        </div>
      </div>`;
      break;
  }
}

function goTo(page) {
  currentPage = page;
  renderPage();
}

function viewProvider(id) {
  selectedProvider = providers.find((p) => p.id === id);
  goTo("provider");
}

// handle nav
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    goTo(btn.dataset.page);
  });
});

// initial render
renderPage();
