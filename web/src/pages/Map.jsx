import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import kandyImage from '../assets/kandy.jpg';


// Fix for default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { image } from 'framer-motion/client';

const Map = () => {
  // Sri Lanka's approximate center coordinates
  const centerPosition = [7.8731, 80.7718];
  
  // Popular tourist attractions with coordinates
  const attractions = [
    {
        name: "Sigiriya Rock Fortress",
        position: [7.9575, 80.7603],
        description: "Ancient rock fortress with frescoes and lion's paw entrance",
        type: "cultural"
      },
      {
        name: "Temple of the Tooth Relic (Kandy)",
        position: [7.2937, 80.6413],
        description: "Sacred Buddhist temple housing the relic of Buddha's tooth",
        type: "cultural",
        image: kandyImage
      },
      {
        name: "Yala National Park",
        position: [6.3779, 81.5179],
        description: "Best place to see leopards and other wildlife in Sri Lanka",
        type: "nature"
      },
      {
        name: "Galle Fort",
        position: [6.0257, 80.2167],
        description: "Historic Portuguese and Dutch fort with charming streets",
        type: "cultural"
      },
      {
        name: "Adam's Peak",
        position: [6.8096, 80.4994],
        description: "Sacred mountain with the 'Sri Pada' footprint",
        type: "nature"
      },
      {
        name: "Ella",
        position: [6.8767, 81.0586],
        description: "Scenic mountain town with waterfalls and hiking trails",
        type: "nature"
      },
      {
        name: "Polonnaruwa Ancient City",
        position: [7.9403, 81.0189],
        description: "UNESCO World Heritage Site with well-preserved ruins",
        type: "cultural"
      },
      {
        name: "Mirissa Beach",
        position: [5.9496, 80.4599],
        description: "Beautiful beach famous for whale watching",
        type: "beach"
      },
      {
        name: "Anuradhapura Ancient City",
        position: [8.3356, 80.3889],
        description: "Ancient capital with well-preserved ruins and sacred temples",
        type: "cultural"
      },
      {
        name: "Nuwara Eliya",
        position: [6.9497, 80.7891],
        description: "Picturesque hill station known as 'Little England'",
        type: "nature"
      },
      {
        name: "Dambulla Cave Temple",
        position: [7.8567, 80.6492],
        description: "Golden temple with cave complexes and Buddhist murals",
        type: "cultural"
      },
      {
        name: "Udawalawe National Park",
        position: [6.4333, 80.8833],
        description: "Best place to see wild elephants in their natural habitat",
        type: "nature"
      },
      {
        name: "Bentota Beach",
        position: [6.4211, 80.0003],
        description: "Popular beach destination with water sports",
        type: "beach"
      },
      {
        name: "Pinnawala Elephant Orphanage",
        position: [7.3000, 80.3833],
        description: "Sanctuary for orphaned and injured elephants",
        type: "nature"
      },
      {
        name: "Horton Plains National Park",
        position: [6.8028, 80.8075],
        description: "Scenic plateau with World's End viewpoint",
        type: "nature"
      },
      {
        name: "Trincomalee",
        position: [8.5767, 81.2306],
        description: "Natural harbor with beautiful beaches and hot springs",
        type: "beach"
      },
      {
        name: "Arugam Bay",
        position: [6.8500, 81.8333],
        description: "Famous surfing destination on the east coast",
        type: "beach"
      },
      {
        name: "Sinharaja Forest Reserve",
        position: [6.4167, 80.5000],
        description: "UNESCO-listed tropical rainforest with endemic wildlife",
        type: "nature"
      },
      {
        name: "Negombo",
        position: [7.2111, 79.8386],
        description: "Fishing town with beaches near Colombo airport",
        type: "beach"
      },
      {
        name: "Nine Arches Bridge (Ella)",
        position: [6.8769, 81.0575],
        description: "Iconic colonial-era railway bridge in the hills",
        type: "nature"
      },
      {
        name: "Wilpattu National Park",
        position: [8.4500, 80.0833],
        description: "Oldest national park known for its leopard population",
        type: "nature"
      },
      {
        name: "Unawatuna Beach",
        position: [6.0167, 80.2500],
        description: "Picturesque crescent-shaped beach near Galle",
        type: "beach"
      },
      {
        name: "Mihintale",
        position: [8.3500, 80.5167],
        description: "Birthplace of Buddhism in Sri Lanka",
        type: "cultural"
      },
      {
        name: "Colombo",
        position: [6.9271, 79.8612],
        description: "Vibrant capital city with colonial architecture",
        type: "cultural"
      },
      {
        name: "Batticaloa",
        position: [7.7167, 81.7000],
        description: "Eastern coastal town with lagoons and beaches",
        type: "beach"
      }
  ];

  // Custom icons
  const iconTypes = {
    cultural: new L.Icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }),
    nature: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }),
    beach: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full">
      <h1 className="text-3xl font-bold text-center py-6 bg-gray-800 text-white">
        Sri Lanka's Top Attractions
      </h1>
      
      <MapContainer 
        center={centerPosition} 
        zoom={8} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"  
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {attractions.map((attraction, index) => (
          <Marker 
            key={index} 
            position={attraction.position}
            icon={iconTypes[attraction.type] || iconTypes.cultural}
          >
            <Popup>
            <div className="font-sans max-w-xs">
                <h3 className="font-bold text-lg">{attraction.name}</h3>
                {attraction.image && (
                <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    className="w-full h-32 object-cover mb-2 rounded"
                />
                )}
                <p className="text-gray-700">{attraction.description}</p>
                <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.position[0]},${attraction.position[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
                >
                Get Directions
                </a>
            </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;