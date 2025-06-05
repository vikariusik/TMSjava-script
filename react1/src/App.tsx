import './App.css';
import Title from './components/Title';
import MenuHamburger from './components/MenuHamburger';

function App() {

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  return (
    <>
      <Title text="Sign up" />
      <MenuHamburger onClick={handleMenuClick} />
    </>
  );
}

export default App;
