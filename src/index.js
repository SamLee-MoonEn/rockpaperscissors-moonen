import ReactDOM from 'react-dom/client';
import App from './App.js'
import './index.css'

ServiceWorkerRegistration.register()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);



