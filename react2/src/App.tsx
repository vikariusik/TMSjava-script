import './App.css';
import PostContainer from './components/PostContainer';
import Title from './components/Title';

function App() {
  const handleLoginClick = () => {
    console.log('Menu clicked');
  };

    const handleShowAllClick = () => {
    console.log('Show all clicked');
  };

  return (
    <div className="app">
      <header className="app-header">
        <button onClick={handleLoginClick} className="menu-button">
          Login
        </button>
        <button onClick={handleShowAllClick} className="menu-button">
          Показать все
        </button>
      </header>
      <main className="app-main">
        <Title text="Posts" />
        <PostContainer />
      </main>
      <footer className="app-footer">
        <p>© 2025 Vital Kisel Blog</p>
      </footer>
    </div>
  );
}

export default App;
