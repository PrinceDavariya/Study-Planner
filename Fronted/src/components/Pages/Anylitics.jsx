// src/pages/Analytics.jsx
import { useEffect, useState } from 'react';

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching analytics:', err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analyticse</h1>
      <ul className="space-y-2">
        {data.map(item => (
          <li key={item.id} className="bg-gray-100 p-3 rounded">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
