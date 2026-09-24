import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'GerakCerdas PID - PJOK Variasi & Kombinasi Gerak Dasar SD',
  description: 'Aplikasi pembelajaran interaktif PJOK SD materi Variasi dan Kombinasi Gerak Dasar dengan deteksi kamera Papan Interaktif Digital (PID), gamifikasi audio, dan modul Kurikulum Merdeka.',
  openGraph: {
    title: 'GerakCerdas PID - PJOK Variasi & Kombinasi Gerak Dasar SD',
    description: 'Aplikasi pembelajaran interaktif PJOK SD materi Variasi dan Kombinasi Gerak Dasar dengan deteksi kamera Papan Interaktif Digital (PID), gamifikasi audio, dan modul Kurikulum Merdeka.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GerakCerdas PID - PJOK Variasi & Kombinasi Gerak Dasar SD',
    description: 'Aplikasi pembelajaran interaktif PJOK SD materi Variasi dan Kombinasi Gerak Dasar dengan deteksi kamera Papan Interaktif Digital (PID), gamifikasi audio, dan modul Kurikulum Merdeka.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
