import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { List } from "../../types";
import { iconById } from "../../constants";
import dayjs from "dayjs";
import { setSelectedHourWeatherData } from "../../reducers/selectedHourReducer";

type Props = {
  data: List[];
};

const ForecastByHour = ({ data }: Props) => {
  const dispatch = useDispatch();

  return (
    <>
      {data.map((hour) => (
        <div key={hour.dt}>
          <button onClick={() => dispatch(setSelectedHourWeatherData(hour))}>
            <div>
              <p>{dayjs(hour.dt_txt).format("HH:mm")}</p>{" "}
              <img
                style={{ width: "100px" }}
                src={`/assets/${iconById(hour.weather[0].id)}.png`}
                alt=""
              />
              <p>{hour.main.temp}</p>
            </div>
          </button>
        </div>
      ))}
    </>
  );
};

export default ForecastByHour;
