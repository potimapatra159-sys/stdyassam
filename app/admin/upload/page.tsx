export default function AdminUpload() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Stdyassam Admin - Upload PDF</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Book Title" className="w-full border p-2" required />
        <input type="text" placeholder="Subject" className="w-full border p-2" required />
        <select className="w-full border p-2">
           <option>PDF</option>
           <option>ePub</option>
        </select>
        <input type="number" placeholder="Price (INR)" className="w-full border p-2" required />
        <input type="file" accept=".pdf" className="w-full" />
        <button className="bg-green-600 text-white w-full py-2 rounded">Upload to Vault</button>
      </form>
    </div>
  );
}
