export default function Transactions() {
  return (
    <div className="bg-white p-4 shadow rounded-lg mt-6">
      <h2 className="text-lg font-bold mb-2">Transações Recentes</h2>
      <ul>
        <li className="flex justify-between border-b p-2">
          <span>Salário</span>
          <span className="text-green-500">+R$ 4.000</span>
        </li>
        <li className="flex justify-between border-b p-2">
          <span>Aluguel</span>
          <span className="text-red-500">-R$ 1.500</span>
        </li>
      </ul>
    </div>
  );
}
