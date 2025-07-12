import { useState } from 'react';
import { decrement, increment, incrementByAmount } from '../store/counterSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function HomePage() {
    const count: number = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    const [incValue, setIncValue] = useState<number>(0);
    
    return <div className='home'>
        <h1>This is the Home Page of our amazing app!</h1>
        
        <p>Counter value is: {count}</p>

        <input type="text" value={incValue} onChange={ (e) => setIncValue(+e.target.value)} />
        
        <button onClick={() => dispatch(increment())}>Increment</button>
        
        <button onClick={() => dispatch(decrement())}>Decrement</button>

        <button onClick={() => dispatch(incrementByAmount(incValue))}>Increment by Value</button>
    </div>
}