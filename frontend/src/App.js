import Input from './components/Input/Input';
import './App.css';
import TransactionForm from './components/NewTransaction'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          ChainSite
        </p>
        <Input />
        <TransactionForm />
        <BlockchainViewer />
        
      </header>
    </div>
  );
}

export default App;
