import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Expense } from '@/types/expense';
import { Income } from '@/types/income';
import { BudgetFormData } from '@/types/budget';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function validateExpenseForm(data: {
  date: string;
  amount: string;
  category: string;
  description: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.date) {
    errors.date = 'Date is required';
  } else if (new Date(data.date) > new Date()) {
    errors.date = 'Date cannot be in the future';
  }

  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(parseFloat(data.amount)) || parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 3) {
    errors.description = 'Description must be at least 3 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterExpenses(expenses: Expense[], filters: {
  category: string;
  dateFrom: string;
  dateTo: string;
  searchTerm: string;
}) {
  return expenses.filter(expense => {
    const matchesCategory = filters.category === 'All' || expense.category === filters.category;
    const matchesDateRange = (!filters.dateFrom || expense.date >= filters.dateFrom) &&
                           (!filters.dateTo || expense.date <= filters.dateTo);
    const matchesSearch = !filters.searchTerm || 
                         expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesCategory && matchesDateRange && matchesSearch;
  });
}

export function getCategoryColor(category: string): string {
  const colors = {
    Food: 'bg-orange-100 text-orange-800',
    Transportation: 'bg-blue-100 text-blue-800',
    Entertainment: 'bg-purple-100 text-purple-800',
    Shopping: 'bg-pink-100 text-pink-800',
    Bills: 'bg-red-100 text-red-800',
    Tech: 'bg-green-100 text-green-800',
    Other: 'bg-gray-100 text-gray-800',
  };
  return colors[category as keyof typeof colors] || colors.Other;
}

export function getCategoryIcon(category: string): string {
  const icons = {
    Food: '🍽️',
    Transportation: '🚗',
    Entertainment: '🎬',
    Shopping: '🛍️',
    Bills: '💳',
    Tech: '💻',
    Other: '📝',
  };
  return icons[category as keyof typeof icons] || icons.Other;
}

export function validateIncomeForm(data: {
  date: string;
  amount: string;
  category: string;
  source: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.date) {
    errors.date = 'Date is required';
  } else if (new Date(data.date) > new Date()) {
    errors.date = 'Date cannot be in the future';
  }

  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(parseFloat(data.amount)) || parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.source.trim()) {
    errors.source = 'Source is required';
  } else if (data.source.trim().length < 2) {
    errors.source = 'Source must be at least 2 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterIncomes(incomes: Income[], filters: {
  category: string;
  dateFrom: string;
  dateTo: string;
  searchTerm: string;
}) {
  return incomes.filter(income => {
    const matchesCategory = filters.category === 'All' || income.category === filters.category;
    const matchesDateRange = (!filters.dateFrom || income.date >= filters.dateFrom) &&
                           (!filters.dateTo || income.date <= filters.dateTo);
    const matchesSearch = !filters.searchTerm || 
                         income.source.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesCategory && matchesDateRange && matchesSearch;
  });
}

export function getIncomeCategoryColor(category: string): string {
  const colors = {
    Salary: 'bg-green-100 text-green-800',
    Freelance: 'bg-blue-100 text-blue-800',
    Investment: 'bg-purple-100 text-purple-800',
    Gift: 'bg-pink-100 text-pink-800',
    Other: 'bg-gray-100 text-gray-800',
  };
  return colors[category as keyof typeof colors] || colors.Other;
}

export function getIncomeCategoryIcon(category: string): string {
  const icons = {
    Salary: '💼',
    Freelance: '🖥️',
    Investment: '📈',
    Gift: '🎁',
    Other: '💰',
  };
  return icons[category as keyof typeof icons] || icons.Other;
}

export function validateBudgetForm(data: BudgetFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Budget name is required';
  } else if (data.name.trim().length < 3) {
    errors.name = 'Budget name must be at least 3 characters';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(parseFloat(data.amount)) || parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  if (!data.period) {
    errors.period = 'Period is required';
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (data.endDate && data.startDate && new Date(data.endDate) <= new Date(data.startDate)) {
    errors.endDate = 'End date must be after start date';
  }

  if (!data.alertThreshold) {
    errors.alertThreshold = 'Alert threshold is required';
  } else {
    const threshold = parseFloat(data.alertThreshold);
    if (isNaN(threshold) || threshold < 1 || threshold > 100) {
      errors.alertThreshold = 'Alert threshold must be between 1 and 100';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getBudgetCategoryColor(category: string): string {
  const colors = {
    Total: 'bg-indigo-100 text-indigo-800',
    Food: 'bg-orange-100 text-orange-800',
    Transportation: 'bg-blue-100 text-blue-800',
    Entertainment: 'bg-purple-100 text-purple-800',
    Shopping: 'bg-pink-100 text-pink-800',
    Bills: 'bg-red-100 text-red-800',
    Tech: 'bg-green-100 text-green-800',
    Other: 'bg-gray-100 text-gray-800',
  };
  return colors[category as keyof typeof colors] || colors.Other;
}