import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 text-slate-900">
      <h2 className="text-3xl font-black mb-2">404 - Halaman Tidak Ditemukan</h2>
      <p className="text-slate-600 mb-6 text-sm">
        Halaman yang Anda cari tidak tersedia.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-sm hover:bg-sky-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
