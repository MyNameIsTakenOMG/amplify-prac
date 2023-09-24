import styles from './page.module.css';
import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Get started by editing</p>
    </main>
  );
}
