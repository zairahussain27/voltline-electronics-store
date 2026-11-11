import {createRoot} from 'react-dom/client';
import App from './App';
import {StoreProvider} from './context/Store';
import './index.css';
createRoot(document.getElementById('root')).render(<StoreProvider><App/></StoreProvider>);
