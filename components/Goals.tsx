export default function Goals() {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-2">Metas Financeiras</h2>
      <p>Economizar para viagem: R$ 2.000 / R$ 5.000</p>
      <progress value="2000" max="5000" className="w-full"></progress>
    </div>
  );
}
