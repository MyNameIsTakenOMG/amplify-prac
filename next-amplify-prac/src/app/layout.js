import './globals.css';
import { Inter } from 'next/font/google';
import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';
import Header from './components/Header';
import Footer from './components/Footer';

Amplify.configure({ ...awsExports, ssr: true });

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
