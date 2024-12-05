import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { List } from "../../types";
import { iconById } from "../../constants";
import dayjs from "dayjs";

const ForecastDetail = () => {
  const { id } = useParams();
  const detailData: List[] = useSelector((state) => state.weather[id]);
  console.log(detailData);
  return (
    <div className="flex">
      {detailData.map((hour) => (
        <div key={hour.dt}>
          <Link to={dayjs(hour.dt_txt).format("HH:mm")}>
            <div>
              <p>{dayjs(hour.dt_txt).format("HH:mm")}</p>{" "}
              <img
                style={{ width: "100px" }}
                src={`/assets/${iconById(hour.weather[0].id)}.png`}
                alt=""
              />
              <p>{hour.main.temp}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ForecastDetail;
