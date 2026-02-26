import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import ChapterView from './components/ChapterView';
import AskInterface from './components/AskInterface';
import VerseOfDay from './components/VerseOfDay';
import ConfessionReminder from './components/ConfessionReminder';
import InterpretersSection from './components/InterpretersSection';
import BibleIndex from './components/BibleIndex';
import AgpeyaIndex from './components/AgpeyaIndex';
import AgpeyaPrayer from './components/AgpeyaPrayer';
import { BIBLE_BOOKS } from './constants';

// Landing Page Component inside App.tsx for simplicity of file structure
const LandingPage: React.FC = () => {
    const featuredBooks = BIBLE_BOOKS.slice(0, 5);
    
    return (
        <div className="space-y-16 pb-12">
            {/* Hero Section */}
            <div className="relative bg-stone-900 text-white py-24 px-4 overflow-hidden rounded-3xl mx-4 mt-4 shadow-2xl">
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
                
                <div className="relative z-10 container mx-auto text-center max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">كلمة الله حية وفعالة</h1>
                    <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed">
                        اكتشف عمق الكتاب المقدس من خلال شروحات الآباء، الدراسات التاريخية، والتأملات الروحية بأسلوب عصري ومتطور.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/bible" className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-primary-600/30 transform hover:-translate-y-1">
                            ابدأ القراءة
                        </Link>
                        <Link to="/ask" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold transition-all">
                            لديك سؤال؟
                        </Link>
                    </div>
                </div>
            </div>

            {/* Verse of the Day */}
            <VerseOfDay />

            {/* Features & Utilities Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Confession Reminder Widget - Takes 1 column */}
                    <div className="md:col-span-1">
                         <ConfessionReminder />
                    </div>

                    {/* Feature Cards - Take 3 columns */}
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">📚</div>
                            <h3 className="text-xl font-bold text-stone-800 mb-2">مكتبة شاملة</h3>
                            <p className="text-stone-600">شروحات لجميع أسفار العهد القديم والجديد.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-accent-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🕊️</div>
                            <h3 className="text-xl font-bold text-stone-800 mb-2">تأملات آبائية</h3>
                            <p className="text-stone-600">استمتع بكنوز أقوال الآباء القديسين وتفسيراتهم العميقة.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">💡</div>
                            <h3 className="text-xl font-bold text-stone-800 mb-2">ذكاء اصطناعي</h3>
                            <p className="text-stone-600">تحليل فوري وتطبيقات عملية للحياة اليومية.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Books Preview */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold text-stone-800 border-r-4 border-primary-500 pr-4">أسفار مختارة</h2>
                    <Link to="/bible" className="text-primary-600 hover:text-primary-700 font-medium text-sm">عرض الكل ←</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                     {featuredBooks.map((book) => (
                        <Link 
                            key={book.id}
                            to={`/book/${book.id}`}
                            className="bg-white border border-stone-200 rounded-xl p-4 hover:border-primary-400 hover:shadow-lg transition-all text-center"
                        >
                            <span className="block font-bold text-stone-800 mb-1">{book.name}</span>
                            <span className="text-xs text-stone-400">{book.category}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Interpreters Section */}
            <InterpretersSection />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-stone-50">
        <Header />
        <main className="flex-grow">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/bible" element={<BibleIndex />} />
                <Route path="/agpeya" element={<AgpeyaIndex />} />
                <Route path="/agpeya/:hourId" element={<AgpeyaPrayer />} />
                <Route path="/library" element={<div className="container mx-auto px-4 py-8"><BookList /></div>} />
                <Route path="/book/:bookId" element={<div className="container mx-auto px-4 py-8"><ChapterView /></div>} />
                <Route path="/ask" element={<div className="container mx-auto px-4 py-8"><AskInterface /></div>} />
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;