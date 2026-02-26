import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BIBLE_BOOKS } from '../constants';
import { Testament } from '../types';

const BookList: React.FC = () => {
  const [activeTestament, setActiveTestament] = useState<Testament>(Testament.NEW);
  const [searchQuery, setSearchQuery] = useState('');

  // If search query exists, show matches from ALL books. Otherwise obey the testament tab.
  const filteredBooks = searchQuery.trim() !== ''
    ? BIBLE_BOOKS.filter(b => b.name.includes(searchQuery.trim()))
    : BIBLE_BOOKS.filter(b => b.testament === activeTestament);

  return (
    <div className="w-full animate-fadeIn">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن سفر..."
                className="w-full px-5 py-3 pr-12 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white shadow-sm transition-all text-stone-800"
            />
            <svg 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5 pointer-events-none" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        {/* Testament Switcher - Only show if not searching */}
        {searchQuery.trim() === '' && (
            <div className="flex justify-center mb-8 bg-stone-100 p-1 rounded-xl w-fit mx-auto shadow-inner">
                <button
                    onClick={() => setActiveTestament(Testament.NEW)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        activeTestament === Testament.NEW 
                        ? 'bg-white text-primary-700 shadow-md' 
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    {Testament.NEW}
                </button>
                <button
                    onClick={() => setActiveTestament(Testament.OLD)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        activeTestament === Testament.OLD 
                        ? 'bg-white text-primary-700 shadow-md' 
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    {Testament.OLD}
                </button>
            </div>
        )}

        {filteredBooks.length === 0 ? (
             <div className="text-center py-12 text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                لا توجد أسفار تطابق بحثك "{searchQuery}"
             </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredBooks.map((book) => (
                    <Link 
                        key={book.id}
                        to={`/book/${book.id}`}
                        className="bg-white border border-stone-200 rounded-xl p-4 hover:shadow-lg hover:border-primary-300 transition-all duration-200 group text-center flex flex-col justify-between h-32 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-stone-50 to-transparent -mr-8 -mt-8 rounded-full z-0 group-hover:from-primary-50 transition-colors"></div>
                        
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <span className="text-xs text-stone-400 mb-1 font-medium">{book.category}</span>
                            <h3 className="text-xl font-bold text-stone-800 group-hover:text-primary-700">{book.name}</h3>
                            <span className="text-xs text-primary-500 mt-2 bg-primary-50 px-2 py-0.5 rounded-full">{book.chapters} أصحاح</span>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
  );
};

export default BookList;