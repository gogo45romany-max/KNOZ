import React from 'react';

const interpreters = [
    {
        name: "القمص تادرس يعقوب ملطي",
        role: "المفسر الآبائي",
        desc: "صاحب التفسير الآبائي الشامل للكتاب المقدس بعهديه، الذي أعاد إحياء تراث الآباء.",
        color: "bg-amber-100 text-amber-800"
    },
    {
        name: "القمص داود لمعي",
        role: "الواعظ المعاصر",
        desc: "يتميز بأسلوب شرح مبسط وعميق يربط الكتاب بالحياة العملية والتطبيق اليومي.",
        color: "bg-blue-100 text-blue-800"
    },
    {
        name: "البابا شنودة الثالث",
        role: "معلم الأجيال",
        desc: "تأملات روحية عميقة وأجوبة لاهوتية دقيقة شكلت وجدان الكنيسة المعاصرة.",
        color: "bg-stone-100 text-stone-800"
    },
    {
        name: "القمص أنطونيوس فكري",
        role: "الشرح التفصيلي",
        desc: "تفسير منهجي رائع يجمع بين العمق الروحي والشرح اللغوي الدقيق للآيات.",
        color: "bg-green-100 text-green-800"
    }
];

const InterpretersSection: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-12 border-t border-stone-200 mt-12">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-stone-800 mb-2">مدارس التفسير</h2>
                <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
                <p className="text-stone-500 mt-4 max-w-2xl mx-auto">
                    نستنير في شروحاتنا بمدارس تفسيرية متنوعة لآباء ومعلمين كبار، لنقدم لكم غنى كلمة الله.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {interpreters.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 hover:shadow-md transition-all hover:-translate-y-1 text-center group">
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-4 ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                            {item.name.split(' ')[1] ? item.name.split(' ')[1].charAt(0) : item.name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-bold text-stone-800 mb-1">{item.name}</h3>
                        <span className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3 block">{item.role}</span>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterpretersSection;