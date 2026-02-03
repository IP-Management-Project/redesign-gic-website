"use client";
import { Upload, Trash2 } from "lucide-react";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase font-bold text-default-400">{label}</span>
      {children}
      <style jsx>{`
        input, textarea, select {
          background: #18181b;
          border: 1px solid #3f3f46;
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 12px;
          color: white;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #2563eb;
        }
      `}</style>
    </label>
  );
}

export function ImageUploadField({ 
    label, value, onFileSelect, onRemove 
}: { 
    label: string; value: string; onFileSelect: (file: File) => void; onRemove: () => void;
}) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold text-default-400">{label}</span>
            <div className={`
                relative w-full aspect-square rounded-lg border border-dashed border-default-300 
                bg-[#18181b] overflow-hidden flex flex-col items-center justify-center transition
                hover:border-blue-500 group cursor-pointer
            `}>
                {value ? (
                    <>
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                                className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </>
                ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-default-400 hover:text-white">
                        <Upload size={24} className="mb-2" />
                        <span className="text-[10px] font-mono">Upload Image</span>
                        <input 
                            type="file" accept="image/*" className="hidden" 
                            onChange={(e) => { if (e.target.files?.[0]) onFileSelect(e.target.files[0]); }}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}