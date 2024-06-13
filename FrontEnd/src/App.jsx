import { useNavigate } from 'react-router-dom';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';



function App() {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={viteLogo} alt="Vite logo" />
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/auctions')}>Auctions</li>
            <li onClick={() => navigate('/categories')}>Categories</li>
            <li onClick={() => navigate('/policies')}>Policy</li>
            <li onClick={() => navigate('/abouts')}>Abouts</li>
            <li onClick={() => navigate('/dashboard')}>Dashboard</li>
            <li onClick={() => navigate('/login')}>Login</li>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Find Your Next Treasure</h1>
            <button onClick={() => navigate('/auctions')}>Browse Auctions</button>
          </div>
        </section>
        <section className="upcoming-auctions">
          <h2>Upcoming Auctions</h2>
          <div className="auction-grid">
            {/* Example auction item */}
            <div className="auction-item">Auction Item 1</div>
            <div className="auction-item">Auction Item 2</div>
          </div>
        </section>
        <section className="categories">
          <h2>Categories</h2>
          <div className="category-grid">
            {/* Example category */}
            <div className="category-item">Category 1</div>
            <div className="category-item">Category 2</div>
          </div>
        </section>
        <section className="featured-items">
          <h2>Featured Items</h2>
          <div className="item-grid">
            {/* Example featured item */}
            <div className="item">Featured Item 1</div>
            <div className="item">Featured Item 2</div>
          </div>

        </section>
      </main>
    </>

  );
}

export default App;