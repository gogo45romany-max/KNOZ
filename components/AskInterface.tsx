import React, { useState } from 'react';
import { askSpiritualQuestion } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const AskInterface: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);
    try {
      const result = await askSpiritualQuestion(question);
      setAnswer(result);
    } catch (error) {
        console.error(error);
      setAnswer("حدث خطأ ما. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fadeIn">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">اسأل مرشد روحي</h2>
            <p className="text-stone-500">مساحة آمنة لطرح الأسئلة الروحية والعقائدية والحصول على إجابات مدعمة بالكتاب المقدس.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-primary-50 to-white border-b border-stone-100">
                <form onSubmit={handleSubmit} className="relative">
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="اكتب سؤالك هنا... مثلاً: لماذا يسمح الله بالألم؟"
                        className="w-full p-4 pr-4 pl-12 h-32 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none text-lg text-stone-800 placeholder:text-stone-400"
                    />
                    <button
                        type="submit"
                        disabled={loading || !question.trim()}
                        className="absolute bottom-4 left-4 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                    >
                        {loading ? (
                            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        )}
                    </button>
                </form>
            </div>

            {answer && (
                <div className="p-8 animate-slideUp bg-white">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xl font-bold">
                                †
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-stone-800 mb-2">الإجابة:</h3>
                            <article className="prose prose-stone prose-lg max-w-none prose-headings:text-primary-800 prose-headings:font-bold prose-p:text-stone-700 prose-p:leading-8 prose-li:text-stone-700 prose-strong:text-primary-700 prose-a:text-primary-600 prose-blockquote:border-primary-300 prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic">
                                <ReactMarkdown>{answer}</ReactMarkdown>
                            </article>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* FAQ Suggestions */}
        <div className="mt-12">
            <h3 className="text-lg font-bold text-stone-700 mb-4 text-center">أسئلة شائعة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["كيف أتغلب على القلق؟", "ما هو مفهوم الثالوث؟", "كيف أغفر لمن أساء إلي؟", "أهمية الصلاة في حياة المسيحي"].map((q, i) => (
                    <button 
                        key={i}
                        onClick={() => setQuestion(q)}
                        className="text-right p-4 bg-white border border-stone-200 rounded-xl hover:border-primary-300 hover:shadow-sm transition-all text-stone-600 hover:text-primary-700"
                    >
                        {q}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AskInterface;