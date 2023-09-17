import type { CityType, Coordinate } from '@/types';
import ReactMap, {
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	Popup,
	ScaleControl,
} from 'react-map-gl';

import CITIES from '../data/bounty-pin.json';
import { Pin as DefaultPin } from '@/components/pin';
import { SlideOver } from '@/components/slide-over';
import { useState } from 'react';

function Map() {
	const [selectedCord, setSelectedCord] = useState<Coordinate | null>(null);
	const [popupInfo, setPopupInfo] = useState<CityType | null>(null);
	const [viewState, setViewState] = useState({
		latitude: 42.3601,
		longitude: -71.0942,
		zoom: 14,
	});

	const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
		console.log('Point selected:', event);
		if (selectedCord) {
			setSelectedCord(null);
			return;
		}
		setSelectedCord(event.lngLat);
	};

	const onCityClick = (city: CityType) => (e) => {
		e.stopPropagation();
		setPopupInfo(city);
	};

	const CityPin = ({ onClick }) => (
		<div onClick={onClick}>
			<DefaultPin />
		</div>
	);

	return (
		<div className="relative w-full h-full">
			<ReactMap
				{...viewState}
				reuseMaps
				style={{ height: '100%', width: '100%' }}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle="mapbox://styles/mapbox/satellite-v9"
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				onClick={onClick}
			>
				<GeolocateControl position="top-left" />
				<NavigationControl position="top-left" />

				{CITIES.map((city, index) => (
					<Marker
						key={`marker-${index}`}
						longitude={city.longitude}
						latitude={city.latitude}
						anchor="bottom"
					>
						<CityPin onClick={onCityClick(city)} />
					</Marker>
				))}

				{selectedCord && (
					<Marker
						longitude={selectedCord.lng}
						latitude={selectedCord.lat}
						anchor="bottom"
					>
						<DefaultPin size={20} />
					</Marker>
				)}

				{popupInfo && (
					<Popup
						anchor="top"
						longitude={Number(popupInfo.longitude)}
						latitude={Number(popupInfo.latitude)}
						onClose={() => setPopupInfo(null)}
					>
						<div>
							{popupInfo.city}, {popupInfo.state} |{' '}
							<a
								target="_new"
								href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
							>
								Wikipedia
							</a>
						</div>
						{popupInfo.image && <img width="100%" src={popupInfo.image} />}
					</Popup>
				)}

				<SlideOver coord={selectedCord} onClose={() => setSelectedCord(null)} />
			</ReactMap>
		</div>
	);
}

export default Map;
