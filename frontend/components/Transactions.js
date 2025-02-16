import { addTransaction } from '../../backend/src/services/transactionsService';

export default function Transactions() {
  const handleAddTransaction = () => {
    const transaction = {
      amount: 100,
      description: "Exemplo de transação"
    };
    addTransaction(transaction);
  };

  return (
    <div>
      <h2>Lista de Transações</h2>
      <button onClick={handleAddTransaction}>Adicionar Transação</button>
    </div>
  );
}
