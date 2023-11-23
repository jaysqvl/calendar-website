import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { getMonth } from './util'
import CalendarHeader from './components/CalendarHeader'
import Sidebar from './components/Sidebar'
import Month from './components/Month'
import GlobalContext from './context/GlobalContext';
import EventModel from './components/EventModel';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {monthIndex, showEventModel} = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;