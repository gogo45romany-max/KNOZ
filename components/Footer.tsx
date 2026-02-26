import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 mt-auto py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-primary-700 mb-2">كنوز</h2>
        <p className="text-stone-500 mb-4 text-sm max-w-md mx-auto">
          جميع الحقوق محفوظة. المحتوى المقدم هو نتاج ذكاء اصطناعي مدقق، ولكن يفضل دائماً الرجوع للكنيسة والآباء الكهنة للدراسة المتعمقة.
        </p>
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <span>© {new Date().getFullYear()}</span>
          <p className="text-xs text-stone-400 mt-2">Design by George Romani</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;