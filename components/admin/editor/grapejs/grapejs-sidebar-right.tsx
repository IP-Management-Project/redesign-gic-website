"use client";

export function GrapesSidebarRight() {
  return (
    <aside className="w-[300px] border-l border-default-100 bg-[#0f0f10] text-white font-[900] flex flex-col">
       <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-2 bg-[#18181b] border-b border-default-100">
              <h3 className="text-xs font-bold text-center text-default-400 uppercase">Style Manager</h3>
          </div>
          <div id="styles" />
          
          <div className="p-2 bg-[#18181b] border-y border-default-100 mt-4">
              <h3 className="text-xs font-bold text-center text-default-400 uppercase">Component Settings</h3>
          </div>
          <div id="traits" />
       </div>
    </aside>
  );
}