
import './App.css';
import MobileCompany from './components/MobileCompany/MobileCompany';



function App({clients}) {
  return (
    <div className="App">
      <MobileCompany
        clients={clients}
      />
    </div>
  );
}

export default App;
