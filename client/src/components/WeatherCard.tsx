import type { Location } from '../types/weather';
import type { User } from '../types/weather'; 

interface LocationCardProps {
  Location: Location;
  User: User | null;
}


export default function LocationCard({Location, User}: LocationCardProps) {

  return (
    <>
        <div
          key={Location.id}
          onClick={() => GoToPage(Location.id)}
          className="bg-white rounded-xl shadow-sm border border-slate-200 
                    overflow-hidden hover:shadow-md transition-all 
                    cursor-pointer w-[480px] flex-shrink-0"
        >
          <div className="bg-slate-700 rounded-xl shadow-sm border
                        border-slate-200 overflow-hidden
                        hover:shadow-md transition-shadow">

            <dl className="flex items-start justify-between gap-4">
              
              {/* Left box: Star + Province */}
              <div className="flex flex-col items-start border 
                              border-slate-700 
                              rounded-md px-2 py-1 bg-slate-700">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    ToggleFavorite(Location, User?.favouratesIds || false);
                  }}
                  className="text-3xl text-yellow-400 leading-none"
                >
                  {User?.favouratesIds?.includes(Location.id) ? "★" : "☆"}
                </button>

                <span className="mt-1 text-3xl font-semibold text-slate-200 uppercase tracking-wide">
                  {Location.ProvinceName}
                </span>
              </div>
                
                {/* Right box: Weather Summary Box */}
              <div className="flex flex-col bg-slate-600/50 rounded-lg px-3 py-2 text-xs text-slate-200 min-w-[120px]">
                
                {/* Rainfall */}
                <div className="flex justify-between">
                  <span>Rainfall-</span>
                  <span>{Location.DailyWeather.Rainfall}%</span>
                </div>

                  {/* Weather Icons and temprate*/}
                <div className="flex justify-around items-center mt-2">
                  <div className="flex text-sm flex-col items-center">
                    Morning
                    <img
                      src={`public/images/${Location.DailyWeather.WeatherCodeDay}.png`}
                      alt="Day"
                      className="w-5 h-5"
                    />
                    <span className="mt-1">
                      {Location.DailyWeather.TemperatureMax}°C
                    </span>
                  </div>

                  <div className="flex text-sm flex-col items-center">
                    Evening
                    <img
                      src={`public/images/${Location.DailyWeather.WeatherCodeNight}.png`}
                      alt="Night"
                      className="w-5 h-5"
                    />
                    <span className="mt-1">
                      {Location.DailyWeather.TemperatureMin}°C
                    </span>
                  </div>
                </div>
              </div>
            </dl>


            <div className="p-4 sm:p-5">
              <h2 className="font-bold text-slate-900 text-lg leading-snug">
                {Location.LocationName}, {Location.CountryName}
              </h2>

              <p className="text-slate-600 text-sm mt-1">
                {Location.DailyWeather.DateTime}
              </p>

              <dl className="mt-3 space-y-1 text-sm text-slate-700">
                <div className="time-scroll flex overflow-x-auto space-x-2 py-2">
                  {generateTimeSlots(Location.DailyWeather.HourlyWeather)}
                </div>
              </dl>
            </div>
          </div>
        </div>
    </>
  );
}

const generateTimeSlots = (timeSlots) => {
  return timeSlots.map((slot, index) => (
    <div
      key={index}
      className="flex-shrink-0 w-24 bg-slate-100 rounded-lg p-2"
    >
      <p className="text-xs text-slate-500">
        {slot.DateTime}
      </p>

      <img
        src={`public/images/${slot.WeatherCode}.png`}
        alt="WeatherIcon"
        className="w-4 h-4 mx-auto my-1"
      />

      <p className="text-sm font-medium text-slate-900">
        {slot.Temperature}°C
      </p>

      <p className="text-sm font-medium text-slate-900">
        {slot.Rainfall}mm
      </p>
    </div>
    ));
  }
// this will move the user to the location page based on the id of the location when they click
function GoToPage(Location) {
  //window.location.href = `location.html?id=${Location}`;
}

// this will toggle the favorate status of the location for the user when they click the star button
const ToggleFavorite = (Location, user) => {
  //if user is logged in:
  if (user != false) {
    //fetch the user and add it to the favorite locations if it isn't there already
    fetch(`/api/${user.id}/favouritesIds/${Location.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(error => console.error('Error toggling favorite status:', error));
  } 
  // this pings the user consistantly not letting you access the page, to fix
  //if the user is not logged in:
  /*else {

    alert("Please log in to manage your favorite locations.");
  }*/
}
