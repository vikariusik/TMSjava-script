import './App.css';
import PostContainer from './components/PostContainer';
import Title from './components/Title';

function App() {

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  return (
    <>
      <Title text="Posts" />
      <PostContainer />
    </>
  );
}

export default App;
