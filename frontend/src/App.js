import Input from "./components/Input/Input";
import "./App.css";
import TransactionForm from "./components/NewTransaction";
import BlockchainViewer from "./components/BlockchainView";
import ValidateBlockchainButton from "./components/ValidateBlockchainButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>ChainSite</p>
        <BlockchainViewer />
        <ValidateBlockchainButton />
        <TransactionForm />
      </header>
    </div>
  );
}

export default App;
