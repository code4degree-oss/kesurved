'use client';

import { Layers, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

// TODO: Fetch from API
const INITIAL_CATEGORIES: { id: string; name: string; slug: string; products: number }[] = [];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');

  const addCategory = () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, '-');
    setCategories([...categories, { id: `c${Date.now()}`, name: newName, slug, products: 0 }]);
    setNewName('');
    setShowForm(false);
  };

  const deleteCategory = (id: string) => {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-brand-accent text-brand-dark font-bold px-5 py-2.5 rounded-lg hover:bg-brand-accent-hover transition-colors text-sm"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-light rounded-lg flex items-center justify-center">
                  <Layers size={20} className="text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-400">/{cat.slug}</p>
                </div>
              </div>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">{cat.products} products</p>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Category</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Category name"
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
              <button onClick={addCategory} className="px-5 py-2 text-sm font-bold bg-brand-accent text-brand-dark rounded-lg hover:bg-brand-accent-hover">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
