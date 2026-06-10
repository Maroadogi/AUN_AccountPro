import React from "react";
import { SavedInquiry } from "../types";
import { ListTodo, CheckCircle2, Trash2, ShieldCheck, Mail, Database } from "lucide-react";

interface ClientRequestsProps {
  inquiries: SavedInquiry[];
  onClearAll: () => void;
  onDeleteInquiry: (id: string) => void;
}

export default function ClientRequests({ inquiries, onClearAll, onDeleteInquiry }: ClientRequestsProps) {
  if (inquiries.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface py-12 border-t border-slate-blue/15">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-lavender-accent/10 rounded text-lavender-accent">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-ink-dark">БД Заявок (Локальная сессия)</h3>
              <p className="text-xs text-on-surface-variant font-medium">Поля сохраняются в реальном времени. Проверка целостности данных.</p>
            </div>
          </div>
          <button
            onClick={onClearAll}
            className="text-xs text-red-500 hover:text-red-700 font-sans font-semibold flex items-center gap-1 cursor-pointer hover:underline border border-red-200/50 hover:bg-red-50 px-2.5 py-1.5 rounded transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Очистить базу
          </button>
        </div>

        <div className="bg-white rounded-lg border border-slate-blue/15 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-sm">
              <thead>
                <tr className="bg-surface text-ink-dark font-semibold text-xs uppercase tracking-wider border-b border-slate-blue/15">
                  <th className="py-3 px-4">ID / Дата</th>
                  <th className="py-3 px-4">Организация</th>
                  <th className="py-3 px-4">Контакты</th>
                  <th className="py-3 px-4">Тариф / расчет</th>
                  <th className="py-3 px-4 text-right">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-blue/10">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-surface/30 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-ink-dark font-mono text-[11px]">{inq.id}</div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">{inq.submittedAt}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-ink-dark">
                      {inq.companyName}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono">
                      <div className="text-ink-dark font-sans text-sm flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {inq.email}
                      </div>
                      {inq.phone && <div className="text-gray-500 mt-0.5">{inq.phone}</div>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-lavender-accent/10 text-lavender-accent text-[11px] px-2 py-0.5 rounded font-medium">
                        {inq.tariff}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-xs text-mint-action font-semibold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Активна</span>
                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="p-1 rounded text-gray-400 hover:text-red-500 ml-2 hover:bg-gray-100 cursor-pointer"
                          title="Удалить запись"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-mint-action/[0.03] p-3 text-[12px] text-on-secondary-container flex items-center gap-2 border-t border-slate-blue/10">
            <ShieldCheck className="w-4 h-4 shrink-0 text-mint-action" />
            <span>Верификационная подпись: Все отправленные заявки безопасно хранятся в вашей локальной песочнице 1С-Cloud и готовы к экспорту.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
