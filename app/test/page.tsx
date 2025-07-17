import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Page - Next.js',
  description: 'Test page per verificare che Next.js funzioni correttamente',
};

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          ✅ Next.js Funziona!
        </h1>
        <p className="text-gray-600 mb-4">
          Questa è la versione Next.js di ChironHedge
        </p>
        <div className="space-y-2 text-left">
          <p>✅ Next.js App Router: Attivo</p>
          <p>✅ TypeScript: Configurato</p>
          <p>✅ Tailwind CSS: Funzionante</p>
          <p>✅ Build: Completato</p>
          <p>✅ Porta 3000: Accessibile</p>
        </div>
        <div className="mt-6">
          <a 
            href="/" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Vai alla Homepage
          </a>
        </div>
      </div>
    </div>
  );
}