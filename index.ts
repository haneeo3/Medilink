import React, { useState } from "react";

// MediLink UI Sketch (single-file React component)
// Uses Tailwind-style classes (you can adapt to your stack)

export default function MediLinkSketch() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [viewMap, setViewMap] = useState(false);
  const sampleProviders = [
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

  const [selectedProvider, setSelectedProvider] = useState(null);

  function search() {
    setPage("results");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold text-blue-600">MediLink</div>
            <div className="text-sm text-gray-500">Find the right care fast</div>
          </div>
          <nav className="flex gap-3 items-center">
            <button onClick={() => setPage("home")} className={`px-3 py-2 rounded ${page === "home" ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Home</button>
            <button onClick={() => setPage("results")} className={`px-3 py-2 rounded ${page === "results" ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Results</button>
            <button onClick={() => setPage("provider") } className={`px-3 py-2 rounded ${page === "provider" ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Provider</button>
            <button onClick={() => setPage("admin")} className={`px-3 py-2 rounded ${page === "admin" ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Admin</button>
            <button onClick={() => setPage("about")} className={`px-3 py-2 rounded ${page === "about" ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>About</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {page === "home" && (
          <section>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold">Find the right care fast.</h1>
              <p className="text-sm text-gray-600 mt-1">Search by condition, service, or drug.</p>

              <div className="mt-6 flex gap-3">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a condition or drug (e.g. appendicitis, amoxicillin)" className="flex-1 border rounded px-4 py-3" />
                <button onClick={search} className="bg-blue-600 text-white px-4 py-3 rounded">Search</button>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => { setQuery(""); setPage('results'); }} className="px-4 py-2 border rounded">Hospitals</button>
                <button onClick={() => { setQuery(""); setPage('results'); }} className="px-4 py-2 border rounded">Pharmacies</button>
              </div>

              <div className="mt-6 text-xs text-gray-500">Demo mode: verification badges and stock are mocked.</div>
            </div>
          </section>
        )}

        {page === "results" && (
          <section>
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Search Results</h2>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600">Verified only</label>
                    <input type="checkbox" />
                    <button onClick={() => setViewMap(!viewMap)} className="px-3 py-1 border rounded text-sm">{viewMap ? 'List view' : 'Map view'}</button>
                  </div>
                </div>

                <div className="space-y-3">
                  {sampleProviders.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{p.name}</div>
                          <div className={`text-xs px-2 py-1 rounded ${p.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.verified ? 'Verified' : 'Unverified'}</div>
                        </div>
                        <div className="text-sm text-gray-600">{p.services.join(' · ')}</div>
                        <div className="text-sm text-gray-500 mt-1">{p.distance} • {p.hours}</div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-gray-600">{p.contact}</div>
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedProvider(p); setPage('provider'); }} className="px-3 py-1 border rounded text-sm">Details</button>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Call</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-96">
                <div className="bg-white rounded p-4 shadow-sm h-80 flex items-center justify-center text-gray-400">Map placeholder (Mapbox / Leaflet)</div>

                <div className="mt-4 bg-white rounded p-4 shadow-sm">
                  <div className="text-sm text-gray-700 font-semibold">Filters</div>
                  <div className="mt-2 text-sm text-gray-600">Verified only • Open now • Closest first</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "provider" && (
          <section>
            <div className="bg-white p-6 rounded shadow-sm">
              {selectedProvider ? (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedProvider.name}</h3>
                      <div className={`text-xs mt-1 px-2 py-1 inline-block rounded ${selectedProvider.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{selectedProvider.verified ? 'Verified' : 'Unverified'}</div>
                    </div>
                    <div className="text-sm text-gray-600">{selectedProvider.distance}</div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Services</div>
                      <div className="mt-2 text-sm">{selectedProvider.services.join(', ')}</div>

                      <div className="mt-4 text-sm text-gray-600">Contact</div>
                      <div className="mt-2">{selectedProvider.contact}</div>

                      <div className="mt-4 text-sm text-gray-600">Opening Hours</div>
                      <div className="mt-2">{selectedProvider.hours}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">Call</button>
                      <button className="w-full px-4 py-2 border rounded">Get Directions</button>
                      <div className="mt-auto flex gap-2">
                        <button className="px-3 py-2 border rounded text-sm">Report</button>
                        <button className="px-3 py-2 border rounded text-sm">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-600">No provider selected. Go to Results and pick a provider.</div>
              )}
            </div>
          </section>
        )}

        {page === "admin" && (
          <section>
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-lg font-semibold">Admin Dashboard</h3>
              <div className="mt-4">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-600">
                    <tr>
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Verified</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleProviders.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="py-3">{p.name}</td>
                        <td>{p.type}</td>
                        <td>{p.verified ? 'Yes' : 'No'}</td>
                        <td className="space-x-2">
                          <button className="px-2 py-1 border rounded text-sm">Edit</button>
                          <button className="px-2 py-1 border rounded text-sm">Toggle Verify</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold">Add Provider (mock form)</h4>
                  <div className="mt-2 flex gap-2">
                    <input placeholder="Name" className="border px-3 py-2 rounded flex-1" />
                    <input placeholder="Type (Hospital/Pharmacy)" className="border px-3 py-2 rounded w-56" />
                    <button className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "about" && (
          <section>
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-lg font-semibold">About MediLink</h3>
              <p className="text-sm text-gray-600 mt-2">MediLink connects patients to verified hospitals and pharmacies, helping users find the right care fast.</p>

              <div className="mt-4">
                <h4 className="font-semibold">Team</h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>Haneef — Product Lead</li>
                  <li>Full-Stack Developer — Backend & Frontend</li>
                  <li>Data Engineer — Search & Matching</li>
                  <li>Operations Lead — Provider Onboarding</li>
                  <li>UX/UI Designer — Design & UX</li>
                </ul>

                <div className="mt-4">
                  <h4 className="font-semibold">Contact</h4>
                  <p className="text-sm text-gray-600 mt-1">Email: team@medilink.example</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-12 py-6 text-center text-sm text-gray-500">MediLink — MVP sketch for Futurize Hackathon</footer>
    </div>
  );
}     remember this, give me the neceesaary things to make it in a github repositry
