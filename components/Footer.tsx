export default function Footer() {
  return (
    <footer className="w-full px-8 py-8 flex justify-between items-center bg-white border-t border-[#d1dce5] font-[Inter] text-xs text-slate-500 mt-auto">
      <div className="font-bold text-slate-700">GoQuiz</div>
      <div>© 2024 GoQuiz Learning Platform</div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-[#2b2d42] transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-[#2b2d42] transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-[#2b2d42] transition-colors">Help Center</a>
      </div>
    </footer>
  )
}
