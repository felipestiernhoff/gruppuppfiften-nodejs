import "./App.css";
import TransactionForm from "./components/NewTransaction";
import BlockchainViewer from "./components/BlockchainView";
import ValidateBlockchainButton from "./components/ValidateBlockchainButton";
import MineBlockButton from "./components/MineBlockButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>ChainSite</p>
        <BlockchainViewer />
        <ValidateBlockchainButton />
        <TransactionForm />
        <MineBlockButton />
      </header>
    </div>
  );
}

export default App;
