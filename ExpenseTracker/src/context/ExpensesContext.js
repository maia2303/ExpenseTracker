import React, { createContext, useContext, useState } from 'react';

const INITIAL_EXPENSES = [
  {
    id: '1',
    title: 'Supermercado',
    amount: 25000,
    category: 'Alimentación',
    notes: 'Compra semanal',
    createdAt: '2026-11-15T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'Combustible',
    amount: 18000,
    category: 'Transporte',
    notes: 'Carga de nafta',
    createdAt: '2026-11-16T14:15:00.000Z',
  },
  {
    id: '3',
    title: 'Internet',
    amount: 32000,
    category: 'Servicios',
    notes: 'Factura mensual fibra óptica',
    createdAt: '2026-11-17T09:00:00.000Z',
  },
];

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isLoaded] = useState(true);

  const addExpense = (data) => {
    const newExpense = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: String(data.title || '').trim(),
      amount: Number(data.amount),
      category: data.category || 'Otros',
      notes: String(data.notes || '').trim(),
      createdAt: new Date().toISOString(),
    };

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    return newExpense;
  };

  const removeExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        isLoaded,
        addExpense,
        removeExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses debe utilizarse dentro de un ExpensesProvider');
  }
  return context;
}
