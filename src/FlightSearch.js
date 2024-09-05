import React, { useState } from 'react';
import axios from 'axios';
import './FlightSearch.css'; // Archivo CSS para los estilos

function FlightSearch() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter states and functions
  const [filterOriginEnabled, setFilterOriginEnabled] = useState(false);
  const [filterDestinationEnabled, setFilterDestinationEnabled] = useState(false);
  const [filterMaxPriceEnabled, setFilterMaxPriceEnabled] = useState(false);
  const [filterBaggageTypeEnabled, setFilterBaggageTypeEnabled] = useState(false);
  const [filterClassTypeEnabled, setFilterClassTypeEnabled] = useState(false);
  const [filterMaxPassengersEnabled, setFilterMaxPassengersEnabled] = useState(false);

  const [originValue, setOriginValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');
  const [baggageTypeValue, setBaggageTypeValue] = useState('');
  const [classTypeValue, setClassTypeValue] = useState('');
  const [maxPassengersValue, setMaxPassengersValue] = useState('');

  const handleSearch = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    if (filterOriginEnabled && originValue) {
      queryParams.append('origin', originValue);
    }
    if (filterDestinationEnabled && destinationValue) {
      queryParams.append('destination', destinationValue);
    }
    if (filterMaxPriceEnabled && maxPriceValue) {
      queryParams.append('maxPrice', maxPriceValue);
    }
    if (filterBaggageTypeEnabled && baggageTypeValue) {
      queryParams.append('baggageType', baggageTypeValue);
    }
    if (filterClassTypeEnabled && classTypeValue) {
      queryParams.append('classType', classTypeValue);
    }
    if (filterMaxPassengersEnabled && maxPassengersValue) {
      queryParams.append('maxPassengers', maxPassengersValue);
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/flights/search?${queryParams.toString()}`);
      setFlights(response.data);
    } catch (error) {
      console.log('Error en la carga de datos de vuelos:', error);
    }

    setLoading(false);
  };

  // Function to format date from yyyy-MM-dd to dd/MM/yyyy
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flight-search-container">
      <h2 className="title">Buscar Vuelos</h2>

      <div className="search-filters">
        <div className="filter-group">
          <input
            type="checkbox"
            id="filterOrigin"
            checked={filterOriginEnabled}
            onChange={() => setFilterOriginEnabled(!filterOriginEnabled)}
            className="filter-checkbox"
          />
          <label htmlFor="filterOrigin">Filtrar por Origen</label>
          {filterOriginEnabled && (
            <input
              type="text"
              value={originValue}
              onChange={(e) => setOriginValue(e.target.value)}
              placeholder="Ingrese el Origen"
              className="filter-input"
            />
          )}
        </div>
        <div className="filter-group">
          <input
            type="checkbox"
            id="filterDestination"
            checked={filterDestinationEnabled}
            onChange={() => setFilterDestinationEnabled(!filterDestinationEnabled)}
            className="filter-checkbox"
          />
          <label htmlFor="filterDestination">Filtrar por Destino</label>
          {filterDestinationEnabled && (
            <input
              type="text"
              value={destinationValue}
              onChange={(e) => setDestinationValue(e.target.value)}
              placeholder="Ingrese el Destino"
              className="filter-input"
            />
          )}
        </div>
        <div className="filter-group">
          <input
            type="checkbox"
            id="filterMaxPrice"
            checked={filterMaxPriceEnabled}
            onChange={() => setFilterMaxPriceEnabled(!filterMaxPriceEnabled)}
            className="filter-checkbox"
          />
          <label htmlFor="filterMaxPrice">Filtrar por Precio Máximo</label>
          {filterMaxPriceEnabled && (
            <input
              type="number"
              value={maxPriceValue}
              onChange={(e) => setMaxPriceValue(e.target.value)}
              placeholder="Precio Máximo"
              className="filter-input"
            />
          )}
        </div>
        <div className="filter-group">
          <input
            type="checkbox"
            id="filterBaggageType"
            checked={filterBaggageTypeEnabled}
            onChange={() => setFilterBaggageTypeEnabled(!filterBaggageTypeEnabled)}
            className="filter-checkbox"
          />
          <label htmlFor="filterBaggageType">Filtrar por Tipo de Equipaje</label>
          {filterBaggageTypeEnabled && (
            <input
              type="text"
              value={baggageTypeValue}
              onChange={(e) => setBaggageTypeValue(e.target.value)}
              placeholder="Tipo de Equipaje"
              className="filter-input"
            />
          )}
        </div>
        <div className="filter-group">
          <input
            type="checkbox"
            id="filterClassType"
            checked={filterClassTypeEnabled}
            onChange={() => setFilterClassTypeEnabled(!filterClassTypeEnabled)}
            className="filter-checkbox"
          />
          <label htmlFor="filterClassType">Filtrar por Tipo de Clase</label>
          {filterClassTypeEnabled && (
            <input
              type="text"
              value={classTypeValue}
              onChange={(e) => setClassTypeValue(e.target.value)}
              placeholder="Tipo de Clase"
              className="filter-input"
            />
          )}
        </div>
        <div className="filter-group">
          <input
            type="checkbox"
            id="filterMaxPassengers"
            checked={filterMaxPassengersEnabled}
            onChange={() => setFilterMaxPassengersEnabled(!filterMaxPassengersEnabled)}
            className="filter-checkbox"
          />
          <label htmlFor="filterMaxPassengers">Filtrar por Número de Pasajeros</label>
          {filterMaxPassengersEnabled && (
            <input
              type="number"
              value={maxPassengersValue}
              onChange={(e) => setMaxPassengersValue(e.target.value)}
              placeholder="Número de Pasajeros"
              className="filter-input"
            />
          )}
        </div>
      </div>

      <div className="search-dates">
        <div className="date-group">
          <label htmlFor="startDate">Fecha de Inicio:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-group">
          <label htmlFor="endDate">Fecha Fin:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      <button onClick={handleSearch} disabled={loading} className="search-button">
        {loading ? 'Cargando...' : 'Buscar'}
      </button>

      <div className="results">
        {flights.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha de Salida</th>
                <th>Tipo de Equipaje</th>
                <th>Tipo de Clase</th>
                <th>Número de Pasajeros</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(flight => (
                <tr key={flight.id}>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>{formatDate(flight.date)}</td>
                  <td>{flight.baggageType}</td>
                  <td>{flight.classType}</td>
                  <td>{flight.availableSeats}</td>
                  <td>${flight.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron vuelos</p>
        )}
      </div>
    </div>
  );
}

export default FlightSearch;
