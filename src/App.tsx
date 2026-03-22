import { useEffect, useState } from 'react'
import './App.css'

// Mendefinisikan tipe data untuk list
const nameList: string[] = ["John", "Doe"];

// Menggunakan React.FC (Functional Component) untuk typing komponen
const John: React.FC = () => {
    return <p>John</p>;
};

const Doe: React.FC = () => {
    return <p>Doe</p>;
};

function App() {
    // TypeScript secara otomatis mendeteksi counter sebagai 'number' dari nilai 0
    const [counter, setCounter] = useState<number>(0);
    const [counter2, setCounter2] = useState<number>(0);

    const handlingClick = (): void => {
        setCounter(prev => prev + 1);
    };

    const handlingClick2 = (): void => {
        setCounter2(prev => prev + 1);
    };

    useEffect(() => {
        console.log("Component App Mounted");
        return () => {
            console.log("Component App Unmounted");
        };
    }, []);

    useEffect(() => {
        console.log("Counter 1 updated:", counter);
    }, [counter]);

    useEffect(() => {
        console.log("Counter 2 updated:", counter2);
    }, [counter2]);

    return (
        <>
            <h1>Counter 1: {counter} {counter % 2 !== 0 ? <John /> : <Doe />}</h1>
            <button onClick={handlingClick}>Click Me</button>

            <h1>Counter 2: {counter2} {counter2 % 2 !== 0 ? <John /> : <Doe />}</h1>
            <button onClick={handlingClick2}>Click Me</button>

            <h1>Name List</h1>
            {
                nameList.map((name, index) => (
                    <p key={index}>{name}</p>
                ))
            }
        </>
    );
}

export default App
