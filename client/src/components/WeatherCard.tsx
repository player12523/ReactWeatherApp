import type { Location } from '../types/weather';
import type { User } from '../types/weather'; 

interface LocationCardProps {
  Location: Location;
  User: User | null;
}


export default function LocationCard({Location, User}: LocationCardProps) {

  return (
    <>
        <button
          key={Location.id}
          type="button"
          onClick={() => GoToPage(Location.id)}
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="bg-slate-700 px-4 py-2">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              {Location.ProvinceName}
            </span>

            <button
              type="button"
              onClick={() =>
                ToggleFavorite(Location, User?.favouratesIds || false)
              }
              className="text-xs font-semibold text-slate-200 uppercase tracking-wide"
            >
              {User?.favouratesIds?.includes(Location.id) ? "★" : "☆"}
            </button>

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

          <div className="bg-slate-700 p-6 px-4 py-2" >
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              Today
            </span>

            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              {Location.DailyWeather.Rainfall}mm
            </span>

            <img
              src={`public/images/${Location.DailyWeather.WeatherCodeNight}.png`}
              alt="Night"
              className="w-4 h-4 mx-1 inline"
            />

            <img
              src={`public/images/${Location.DailyWeather.WeatherCodeDay}.png`}
              alt="Day"
              className="w-4 h-4 mx-1 inline"
            />

            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              {Location.DailyWeather.TemperatureMax}°C
            </span>

            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              {Location.DailyWeather.TemperatureMin}°C
            </span>
          </div>
        </button>
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
