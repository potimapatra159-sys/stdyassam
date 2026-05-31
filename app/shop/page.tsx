'use client'
import { useState } from 'react';

export default function Shop() {
  const [filter, setFilter] = useState({ subject: '', format: '', maxPrice: 1000 });

  // In a real app, this would be a Prisma query
  const products = []; 

  return (
    <div className="flex gap-8 p-10">
      {/* Sidebar Filters */}
      <aside className="w-64 space-y-6">
        <h2 className="font-bold">Filters</h2>
        <div>
          <label>Subject</label>
          <select onChange={(e) => setFilter({...filter, subject: e.target.value})} className="w-full border p-2">
            <option value="">All Subjects</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
          </select>
        </div>
        <div>
          <label>Format</label>
          <select onChange={(e) => setFilter({...filter, format: e.target.value})} className="w-full border p-2">
            <option value="">All Formats</option>
            <option value="PDF">PDF</option>
            <option value="ePub">ePub</option>
          </select>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="grid grid-cols-3 gap-6">
        {/* Map through products here */}
        <p>Product listings for Stdyassam...</p>
      </main>
    </div>
  );
}
