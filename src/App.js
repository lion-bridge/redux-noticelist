import logo from './logo.svg';
import './App.css';
import {Notice} from './components/Notice'
import {OrderList} from './components/OrderList'
import {Shopping} from './components/Shopping'
import Store from './store'

const store = Store();
function App() {
  const {counter = {}} = store.getState();
  const {tip = '', phone = 0, toy = 0, shoes = 0} = counter;
  return (
    <div className="App">
      <Notice count={phone+toy+shoes} tip={tip}/>
      <Shopping/>
      <OrderList {...counter}/>

    </div>
  );
}

export default App;
