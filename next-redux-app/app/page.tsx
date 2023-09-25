import Image from 'next/image';
import styles from './page.module.css';
import UpdateState from './components/UpdateState';
export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const jsonData = await res.json();
  console.log('json data from home page: ', jsonData);

  return (
    <main className={styles.main}>
      <UpdateState jsonData={jsonData} />
    </main>
  );
}
