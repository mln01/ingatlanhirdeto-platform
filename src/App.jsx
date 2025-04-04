import { useState } from 'react';
import './App.css';

function Header() {
  return (
    <header class="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
      <h1>
        <img 
          src="../public/images/android-chrome-192x192.png" 
          width={45} 
          height={45} 
          alt="Platform Logo" 
          style={{
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s', // Smooth animation
            cursor: 'pointer', // Changes cursor to pointer
            marginRight: '10px'
          }} 
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} // Zoom in on hover
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset on hover out
        />
        Ingatlanhirdető Platform
      </h1>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '10px', color: 'white', textAlign: 'center', marginTop: '20px' }}>
      <p>&copy; 2025 Ingatlanhirdető Platform. Minden jog fenntartva.</p>
    </footer>
  );
}

function Properties() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Luxury Beachfront Villa",
      location: "Malibu, California",
      room: 7,
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.exoticestates.com%2Ffiles%2Fpresets%2Fpg_xl%2Fproperty%2F1409%2Fgallery%2Fluxury_maui_beachfront_villa_vacation_rental_01.jpg&f=1&nofb=1&ipt=2767faa397ccdbc6d7fd50f980b4d773e0238cb175c69256f5b5db5821cdf09d&ipo=images",
      price: 1500000,
      amenities: ["Private Beach Access", "Infinity Pool", "Home Theater"]
    },
    {
      id: 2,
      name: "Charming Cottage",
      location: "Cotswolds, England",
      room: 3,
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2FcBy7dQi7XrqBeC5BGhkrLo-2560-80.jpg&f=1&nofb=1&ipt=ad3b3d9594c88e4ca82042c76a12361cfe5f919a6836b98a51325a85b0afb8fb&ipo=images",
      price: 400000,
      amenities: ["Fireplace", "Garden", "Country Views"]
    }
  ]);

  const [form, setForm] = useState({
    id: null,
    name: '',
    location: '',
    room: '',
    img: '',
    price: '',
    amenities: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProperty = () => {
    if (form.name && form.location && form.room && form.price) {
      const newProperty = {
        ...form,
        id: properties.length + 1,
        room: parseInt(form.room),
        price: parseFloat(form.price),
        amenities: form.amenities.split(',').map(a => a.trim())
      };
      setProperties([...properties, newProperty]);
      setForm({ id: null, name: '', location: '', room: '', img: '', price: '', amenities: '' });
    }
  };

  const handleRemoveProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const handleEditProperty = (property) => {
    setForm({ ...property, amenities: property.amenities.join(', ') });
  };

  const handleUpdateProperty = () => {
    setProperties(properties.map(property => 
      property.id === form.id 
        ? { ...form, room: parseInt(form.room), price: parseFloat(form.price), amenities: form.amenities.split(',').map(a => a.trim()) }
        : property
    ));
    setForm({ id: null, name: '', location: '', room: '', img: '', price: '', amenities: '' });
  };

  return (
    <div>
      <div className="form-container">
        <input type="text" name="name" placeholder="Név" value={form.name} onChange={handleInputChange} />
        <input type="text" name="location" placeholder="Hely" value={form.location} onChange={handleInputChange} />
        <input type="number" name="room" placeholder="Szobák száma" value={form.room} onChange={handleInputChange} />
        <input type="text" name="img" placeholder="Kép url" value={form.img} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="Ár" value={form.price} onChange={handleInputChange} />
        <input type="text" name="amenities" placeholder="Felszereltség (vesszővel elválasztva)" value={form.amenities} onChange={handleInputChange} />
        {form.id ? (
          <button onClick={handleUpdateProperty}>Ingatlan Frissítése</button>
        ) : (
          <button onClick={handleAddProperty}>Ingatlan Hozzáadása</button>
        )}
      </div>

      <div className="properties-container">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            <img src={property.img} alt={property.name} className="property-image" />
            <h2>{property.name}</h2>
            <p>Location: {property.location}</p>
            <p>Rooms: {property.room}</p>
            <p>Price: ${property.price.toLocaleString()}</p>
            <ul>
              {property.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
            <button onClick={() => handleEditProperty(property)}>Szerkesztés</button>
            <button onClick={() => handleRemoveProperty(property.id)}>Törlés</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Properties />
      <Footer />
    </>
  );
}

export default App;
