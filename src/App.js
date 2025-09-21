import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  Plus,
  Trash,
  CheckCircle,
  Shirt,
  WashingMachine,
  ArrowDownWideNarrow,
  CalendarDays,
  Tag,
  List,
  Grid,
  Settings
} from 'lucide-react';

// Helper function to get human-readable time
const getTimeSince = (date) => {
  if (!date) return 'Never';
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  return `${diffInDays} days ago`;
};

// Laundry item component (list view)
const LaundryItem = ({ item, onWear, onWash, onDelete }) => {
  const needsWashing = item.usageCount >= 3;
  const timeSinceWashed = getTimeSince(item.lastWashed);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Shirts': return 'bg-yellow-200 text-yellow-800';
      case 'Pants': return 'bg-blue-200 text-blue-800';
      case 'Nightwear': return 'bg-purple-200 text-purple-800';
      case 'Innerwear': return 'bg-pink-200 text-pink-800';
      case 'Towels': return 'bg-cyan-200 text-cyan-800';
      case 'Bedsheets': return 'bg-teal-200 text-teal-800';
      case 'Handkerchiefs': return 'bg-orange-200 text-orange-800';
      default: return 'bg-slate-200 text-slate-600';
    }
  };

  return (
    <div className={`p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-300 ${needsWashing ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'} shadow-sm border`}>
      {/* Left section: icon + text */}
      <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <div className={`p-2 rounded-full ${needsWashing ? 'bg-red-200 text-red-800' : 'bg-blue-100 text-blue-600'}`}>
            <Shirt size={20} />
          </div>
        )}
        <div className="flex-1 flex flex-col min-w-0 space-y-1">
          <h3 className="text-lg font-semibold text-slate-800 truncate">{item.name}</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span className="font-medium text-slate-700">Worn: {item.usageCount} times</span>
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(item.category)} flex items-center`}>
              <Tag size={12} className="inline mr-1" /> {item.category || 'Uncategorized'}
            </div>
          </div>
          <div className="flex items-center text-sm text-slate-500 mt-1">
            <CalendarDays size={16} className="mr-1" />
            <span className="font-medium text-slate-700">Last Washed: {timeSinceWashed}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row sm:flex-col gap-2 mt-3 sm:mt-0">
        <button onClick={() => onWear(item)} className="flex items-center justify-center p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200 transform hover:scale-105">
          <Plus size={20} />
        </button>
        <button onClick={() => onWash(item)} className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 transform hover:scale-105">
          <CheckCircle size={20} />
        </button>
        <button onClick={() => onDelete(item)} className="flex items-center justify-center p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors duration-200 transform hover:scale-105">
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

// Wardrobe item (grid view)
const WardrobeItem = ({ item, onWear, onWash, onDelete }) => {
  const needsWashing = item.usageCount >= 3;
  const timeSinceWashed = getTimeSince(item.lastWashed);

  return (
    <div className={`p-2 rounded-xl flex flex-col items-center text-center transition-all duration-300 ${needsWashing ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'} shadow-sm border`}>
      <img src={item.imageUrl} alt={item.name} className="h-28 w-28 rounded-xl object-cover" />
      <h3 className="text-sm font-semibold text-slate-800 mt-2 truncate">{item.name}</h3>
      <p className="text-xs text-slate-500">Worn: {item.usageCount}</p>
      <p className="text-xs text-slate-500">Last Washed: {timeSinceWashed}</p>
      <div className="flex flex-row sm:flex-col gap-2 mt-2">
        <button onClick={() => onWear(item)} className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200">
          <Plus size={16} />
        </button>
        <button onClick={() => onWash(item)} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
          <CheckCircle size={16} />
        </button>
        <button onClick={() => onDelete(item)} className="p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors duration-200">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4 w-full max-w-sm">
      <h3 className="text-xl font-bold text-slate-800">Confirm Deletion</h3>
      <p className="text-slate-600">{message}</p>
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <button onClick={onCancel} className="p-3 rounded-xl bg-slate-300 text-slate-800 font-semibold hover:bg-slate-400 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="p-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);

// Main App
const App = () => {
  const [laundryItems, setLaundryItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Shirts');
  const [customCategories, setCustomCategories] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [isWardrobeView, setIsWardrobeView] = useState(false);
  const [showWashModal, setShowWashModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newWashDate, setNewWashDate] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const defaultCategories = ['Shirts', 'Pants', 'Nightwear', 'Innerwear', 'Towels', 'Bedsheets', 'Handkerchiefs'];
  const allCategories = [...defaultCategories, ...customCategories];

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('laundryItems') || '[]');
    const storedCategories = JSON.parse(localStorage.getItem('laundryCategories') || '[]');
    setLaundryItems(storedItems);
    setCustomCategories(storedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('laundryItems', JSON.stringify(laundryItems));
  }, [laundryItems]);

  useEffect(() => {
    localStorage.setItem('laundryCategories', JSON.stringify(customCategories));
  }, [customCategories]);

  const addItem = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      usageCount: 0,
      category: selectedCategory,
      imageUrl: itemImageUrl || `https://placehold.co/150x150/e2e8f0/1a202c?text=${itemName.substring(0,3)}`,
      lastWashed: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setLaundryItems([newItem, ...laundryItems]);
    setItemName('');
    setItemImageUrl('');
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setCustomCategories([...customCategories, newCategoryName]);
    setNewCategoryName('');
    setShowCategoryModal(false);
  };

  const wearItem = (item) => {
    setLaundryItems(laundryItems.map(i => i.id === item.id ? {...i, usageCount: i.usageCount + 1} : i));
  };

  const openWashModal = (item) => {
    setSelectedItem(item);
    setNewWashDate(new Date().toISOString().substring(0,10));
    setShowWashModal(true);
  };

  const washItem = () => {
    setLaundryItems(laundryItems.map(i => i.id === selectedItem.id ? {...i, usageCount: 0, lastWashed: newWashDate} : i));
    setShowWashModal(false);
    setSelectedItem(null);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const deleteItem = () => {
    setLaundryItems(laundryItems.filter(i => i.id !== selectedItem.id));
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const sortedItems = [...laundryItems].sort((a,b) => {
    if(sortBy==='date') return new Date(b.lastWashed) - new Date(a.lastWashed);
    if(sortBy==='usage') return b.usageCount - a.usageCount;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-200 p-6 rounded-3xl shadow-2xl space-y-6 sm:space-y-8 border border-slate-300">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Laundry Tracker</h1>
          <p className="text-slate-600 text-sm sm:text-lg">Track clothes usage to know when to wash them.</p>
        </header>

        {/* View Toggle */}
        <div className="flex justify-between items-center gap-2">
          <button onClick={()=>setShowCategoryModal(true)} className="p-2 rounded-full bg-slate-300 text-slate-800">
            <Settings size={20}/>
          </button>
          <div className="flex space-x-2">
            <button onClick={()=>setIsWardrobeView(false)} className={`p-2 rounded-full ${!isWardrobeView?'bg-indigo-600 text-white':'bg-slate-300 text-slate-800'}`}>
              <List size={20}/>
            </button>
            <button onClick={()=>setIsWardrobeView(true)} className={`p-2 rounded-full ${isWardrobeView?'bg-indigo-600 text-white':'bg-slate-300 text-slate-800'}`}>
              <Grid size={20}/>
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        <form onSubmit={addItem} className="flex flex-col sm:flex-row gap-2 flex-wrap">
          <input type="text" value={itemName} onChange={e=>setItemName(e.target.value)} placeholder="Item Name" className="flex-1 p-3 rounded-xl border"/>
          <input type="text" value={itemImageUrl} onChange={e=>setItemImageUrl(e.target.value)} placeholder="Image URL" className="flex-1 p-3 rounded-xl border"/>
          <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} className="flex-1 p-3 rounded-xl border">
            {allCategories.map(cat=><option key={cat}>{cat}</option>)}
          </select>
          <button type="submit" className="flex items-center justify-center p-3 rounded-xl bg-indigo-600 text-white font-semibold">
            <Plus size={20} className="mr-2"/> Add Item
          </button>
        </form>

        {/* Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <ArrowDownWideNarrow size={18}/>
            <span className="text-sm sm:text-base">Sort by:</span>
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="p-2 rounded-lg border">
            <option value="date">Last Washed</option>
            <option value="usage">Usage Count</option>
          </select>
        </div>

        {/* Laundry Items */}
        {sortedItems.length === 0 ? (
          <div className="text-center p-8 text-slate-500">
            <AlertCircle size={48} className="mx-auto"/>
            <p className="mt-4 text-lg">No clothes added yet!</p>
          </div>
        ) : isWardrobeView ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sortedItems.map(item=><WardrobeItem key={item.id} item={item} onWear={wearItem} onWash={openWashModal} onDelete={openDeleteModal}/>)}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedItems.map(item=><LaundryItem key={item.id} item={item} onWear={wearItem} onWash={openWashModal} onDelete={openDeleteModal}/>)}
          </div>
        )}
      </div>

      {/* Modals */}
      {showWashModal && selectedItem && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4 w-full max-w-sm">
            <h3 className="text-xl font-bold">Mark as Washed</h3>
            <input type="date" value={newWashDate} onChange={e=>setNewWashDate(e.target.value)} className="w-full p-3 rounded-xl border"/>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button onClick={()=>setShowWashModal(false)} className="p-3 rounded-xl bg-slate-300">Cancel</button>
              <button onClick={washItem} className="p-3 rounded-xl bg-green-500 text-white">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedItem && (
        <ConfirmationModal message={`Delete "${selectedItem.name}"?`} onConfirm={deleteItem} onCancel={()=>setShowDeleteModal(false)}/>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4 w-full max-w-sm">
            <h3 className="text-xl font-bold">Add New Category</h3>
            <form onSubmit={addCategory} className="flex flex-col gap-4">
              <input type="text" value={newCategoryName} onChange={e=>setNewCategoryName(e.target.value)} placeholder="Category Name" className="w-full p-3 rounded-xl border"/>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button type="button" onClick={()=>setShowCategoryModal(false)} className="p-3 rounded-xl bg-slate-300">Cancel</button>
                <button type="submit" className="p-3 rounded-xl bg-indigo-600 text-white">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
