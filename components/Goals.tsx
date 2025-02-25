// components/Goals.tsx
export default function Goals() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Metas Financeiras</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-200">Economizar para viagem:</span>
          <span className="text-gray-900 dark:text-white font-semibold">R$ 2.000 / R$ 5.000</span>
        </div>
      </div>
    </div>
  );
}