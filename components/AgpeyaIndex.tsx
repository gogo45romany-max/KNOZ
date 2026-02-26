import React from 'react';
import { Link } from 'react-router-dom';
import { AGPEYA_HOURS } from '../constants';

const AgpeyaIndex: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">الأجبية المقدسة</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
                "سبع مرات في النهار سبحتك على أحكام عدلك". صلوات السواعي القبطية المرتبة لتقديس اليوم وتذكار أعمال الخلاص.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {AGPEYA_HOURS.map((hour) => (
                <div 
                    key={hour.id} 
                    className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col gap-6 hover:shadow-md transition-shadow group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            {hour.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-800 group-hover:text-primary-700 transition-colors">
                                {hour.name}
                            </h3>
                            <span className="text-sm text-stone-500 font-medium bg-stone-50 px-2 py-0.5 rounded-md inline-block mt-2">
                                {hour.time}
                            </span>
                        </div>
                    </div>
                    
                    <Link 
                        to={`/agpeya/${hour.id}`}
                        className="w-full py-3 bg-stone-100 hover:bg-primary-600 text-stone-700 hover:text-white rounded-xl font-bold transition-all text-center flex items-center justify-center gap-2"
                    >
                        <span>الذهاب للصلاة</span>
                        <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>
            ))}
        </div>
        
        <div className="mt-12 text-center bg-stone-50 rounded-xl p-8 border border-stone-100 max-w-3xl mx-auto">
             <h3 className="font-bold text-stone-700 mb-2">عن صلاة الأجبية</h3>
             <p className="text-stone-600 leading-relaxed">
                كلمة "أجبية" قبطية الأصل (أجيب) وتعني "ساعة". وهي كتاب الصلوات الليتورجية المستخدم في الكنيسة القبطية الأرثوذكسية، يحتوي على سبع صلوات موزعة على ساعات النهار والليل، ليتذكر المؤمن حياة المسيح وآلامه وقيامته على مدار اليوم.
             </p>
        </div>
    </div>
  );
};

export default AgpeyaIndex;