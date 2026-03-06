import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Purveyor } from '../types';
import { categories } from '../data/categories';

interface PurveyorMapProps {
  purveyors: Purveyor[];
  onPurveyorClick: (p: Purveyor) => void;
  userLocation?: { lat: number; lng: number } | null;
}

/** Re-centres the map whenever the filtered list changes */
function MapController({ purveyors }: { purveyors: Purveyor[] }) {
  const map = useMap();
  useEffect(() => {
    if (purveyors.length === 0) return;
    if (purveyors.length === 1) {
      map.setView([purveyors[0].lat, purveyors[0].lng], 13, { animate: true });
      return;
    }
    const lats = purveyors.map((p) => p.lat);
    const lngs = purveyors.map((p) => p.lng);
    map.fitBounds(
      [
        [Math.min(...lats) - 0.02, Math.min(...lngs) - 0.02],
        [Math.max(...lats) + 0.02, Math.max(...lngs) + 0.02],
      ],
      { animate: true, maxZoom: 13 }
    );
  }, [purveyors, map]);
  return null;
}

export default function PurveyorMap({ purveyors, onPurveyorClick, userLocation }: PurveyorMapProps) {
  const categoryColorMap = Object.fromEntries(
    categories.filter((c) => c.id !== 'all').map((c) => [c.id, c.color])
  );

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-brand-border" style={{ height: '560px' }}>
      <MapContainer
        center={[43.15, -79.25]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController purveyors={purveyors} />

        {/* User location dot */}
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={8}
            pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.8, weight: 3 }}
          >
            <Popup>
              <span className="text-sm font-medium">Your location</span>
            </Popup>
          </CircleMarker>
        )}

        {/* Purveyor markers */}
        {purveyors.map((p) => {
          const color = categoryColorMap[p.category] ?? '#4A5D3F';
          return (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={9}
              pathOptions={{
                color: '#fff',
                fillColor: color,
                fillOpacity: 0.92,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onPurveyorClick(p),
              }}
            >
              <Popup>
                <div style={{ minWidth: '160px' }}>
                  <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>{p.name}</p>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>{p.city}</p>
                  <button
                    onClick={() => onPurveyorClick(p)}
                    style={{
                      background: '#4A5D3F',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    View details →
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
