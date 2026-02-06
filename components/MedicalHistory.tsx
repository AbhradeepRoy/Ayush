
import React, { useState } from 'react';
import { HealthState, UserProfile } from '../types';
import { FileText, Plus, ShieldCheck, Loader2 } from 'lucide-react';
import { compressMedicalHistory } from '../services/geminiService';

interface MedicalHistoryProps {
  state: HealthState;
  updateProfile: (profile: UserProfile) => void;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ state, updateProfile }) => {
  const [newInfo, setNewInfo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdate = async () => {
    if (!newInfo.trim()) return;
    setIsProcessing(true);
    try {
      const newSummary = await compressMedicalHistory(newInfo, state.profile.medicalHistorySummary);
      updateProfile({
        ...state.profile,
        medicalHistorySummary: newSummary
      });
      setNewInfo('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="text-teal-500" /> Compressed Medical Profile
            </h2>
            <div className="flex items-center gap-1 text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">
              <ShieldCheck size={12} /> SECURE & PRIVATE
            </div>
          </div>
          
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {state.profile.medicalHistorySummary}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="font-semibold text-slate-800 dark:text-white">Add New Medical Information</h3>
            <p className="text-xs text-slate-500">Paste lab reports, doctor notes, or describe recent health events. AyushAI will merge them into your profile summary.</p>
            <textarea 
              className="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all min-h-[120px] text-sm"
              placeholder="e.g., Blood report showed Hemoglobin 12.5. Diagnosed with mild Vitamin D deficiency today..."
              value={newInfo}
              onChange={(e) => setNewInfo(e.target.value)}
            />
            <button 
              onClick={handleUpdate}
              disabled={!newInfo.trim() || isProcessing}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2 font-bold transition-all"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
              Update Medical Profile
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-4">Why compress?</h3>
          <ul className="space-y-4">
            {[
              { title: 'Privacy', text: 'We summarize key facts to minimize raw sensitive data storage.' },
              { title: 'Inference Cost', text: 'Shorter profiles save processing tokens while keeping context.' },
              { title: 'Speed', text: 'AyushAI processes summaries faster than long PDF files.' }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-1">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 leading-normal">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <h4 className="font-bold text-indigo-700 dark:text-indigo-400 text-sm mb-2">Upload File (Simulated)</h4>
          <div className="border-2 border-dashed border-indigo-200 dark:border-indigo-700 rounded-xl p-4 text-center cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800/40 transition-colors">
            <input type="file" className="hidden" id="report-upload" />
            <label htmlFor="report-upload" className="cursor-pointer">
              <div className="text-indigo-500 mb-2">📄</div>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">CLICK TO UPLOAD PDF/JPG</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
