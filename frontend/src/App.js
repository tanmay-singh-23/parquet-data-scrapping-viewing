import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import TripsComponent from './TripsComponent';
import TripComponent from './TripComponent';
import TripDetailsComponent from './TripDetailsComponent';
import LocationTripsComponent from './LocationTripsComponent';
import DateRangeComponent from './DateRangeComponent';
import FareRangeComponent from './FareRangeComponent';
import TimeRangeComponent from './TimeRangeComponent';
import TotalPerLocationComponent from './TotalPerLocationComponent';
import AverageFarePerLocationComponent from './AverageFarePerLocationComponent';
import GroupedDataComponent from './GroupedDataComponent';
import TipsRangeComponent from './TipsRangeComponent';
import DriverPayRangeComponent from './DriverPayRangeComponent';
import SharedTripsComponent from './SharedTripsComponent';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/trips" activeClassName="active">All Trips</NavLink></li>
            <li><NavLink to="/trip" activeClassName="active">Single Trip</NavLink></li>
            <li><NavLink to="/trips-details" activeClassName="active">Trip Details</NavLink></li>
            <li><NavLink to="/location-trips" activeClassName="active">Trips by Location</NavLink></li>
            <li><NavLink to="/date-range" activeClassName="active">Trips by Date Range</NavLink></li>
            <li><NavLink to="/fare-range" activeClassName="active">Trips by Fare Range</NavLink></li>
            <li><NavLink to="/time-range" activeClassName="active">Trips by Time Range</NavLink></li>
            <li><NavLink to="/total-per-location" activeClassName="active">Total Trips per Location</NavLink></li>
            <li><NavLink to="/average-fare-per-location" activeClassName="active">Average Fare per Location</NavLink></li>
            <li><NavLink to="/grouped-data" activeClassName="active">Grouped Data</NavLink></li>
            <li><NavLink to="/tips-range" activeClassName="active">Trips by Tips Range</NavLink></li>
            <li><NavLink to="/driver-pay-range" activeClassName="active">Trips by Driver Pay Range</NavLink></li>
            <li><NavLink to="/shared-trips" activeClassName="active">Shared Trips</NavLink></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/trips" element={<TripsComponent />} />
          <Route path="/trip" element={<TripComponent />} />
          <Route path="/trips-details" element={<TripDetailsComponent />} />
          <Route path="/location-trips" element={<LocationTripsComponent />} />
          <Route path="/date-range" element={<DateRangeComponent />} />
          <Route path="/fare-range" element={<FareRangeComponent />} />
          <Route path="/time-range" element={<TimeRangeComponent />} />
          <Route path="/total-per-location" element={<TotalPerLocationComponent />} />
          <Route path="/average-fare-per-location" element={<AverageFarePerLocationComponent />} />
          <Route path="/grouped-data" element={<GroupedDataComponent />} />
          <Route path="/tips-range" element={<TipsRangeComponent />} />
          <Route path="/driver-pay-range" element={<DriverPayRangeComponent />} />
          <Route path="/shared-trips" element={<SharedTripsComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
