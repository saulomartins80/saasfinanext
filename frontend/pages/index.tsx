<div className="flex h-screen text-red-500">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Overview />
      <Goals />
      <FinanceCharts />
    </div>
    <Transactions />
  </div>
</div>

