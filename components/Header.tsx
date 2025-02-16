import ThemeToggle from "../components/ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-white dark:bg-gray-900">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Finanext</h1>
      <ThemeToggle />
    </header>
  );
}
