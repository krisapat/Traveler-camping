"use client"
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useState } from "react"
import { Label } from "../ui/label"

const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png"
const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
})

type Latlng = [number, number]
type LocationMarkerProps = {
  position: Latlng | null
  setPosition: (position: Latlng) => void
}

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      const newLocation: Latlng = [e.latlng.lat, e.latlng.lng]
      setPosition(newLocation)
      map.flyTo(e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default function MapLandmarkInner({
  className,
  Location,
}: {
  className?: string
  Location?: { lat: number; lng: number }
}) {
  const defaultLocation: Latlng = [13.75, 100.5]
  const [position, setPosition] = useState<Latlng | null>(null)

  return (
    <>
      <Label className="mb-2">Where am I?</Label>
      <input name="lat" value={position ? position[0] : ""} type="hidden" />
      <input name="lng" value={position ? position[1] : ""} type="hidden" />

      <MapContainer
        className={className}
        center={Location || defaultLocation}
        zoom={8}
        scrollWheelZoom={true}
      >
        <Marker position={Location || defaultLocation} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <LocationMarker position={position} setPosition={setPosition} />

        <LayersControl>
          <LayersControl.BaseLayer name="OpenStreetMap.Mapnik" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="ESRI.WorldImagery">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  )
}
