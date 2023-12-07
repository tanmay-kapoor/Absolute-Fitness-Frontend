import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import { useParams } from "react-router-dom";
import { getGym } from "../../api/gym";
import AlertBox from "../../components/AlertBox";

const Franchise = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { gym_id } = useParams();
  const [gymDetails, setGymDetails] = useState(null);

  const fetchGym = async () => {
    const res = await getGym(gym_id);
    setGymDetails(res);
  };

  useEffect(() => {
    fetchGym();
  }, []);

  return gymDetails ? (
    <div className="container center">
      <a className="btn btn-primary float-end" href={`/gym/edit-gym/${gym_id}`}>
        Edit Gym
      </a>
      <h4>Gym Gallery</h4>
      <Carousel images={gymDetails.image_urls} />

      <div>
        <p>
          <i class="fa-solid fa-phone"></i>: {gymDetails.phone}
        </p>
        <p>
          <i class="fa-solid fa-location-dot"></i> {gymDetails.location}
        </p>

        <div className="center">
          <a
            href={`/gym/${gymDetails.gym_id}/facilities`}
            className="btn btn-primary mt-2 btn-sm"
          >
            View Facilities
          </a>
          <a
            href={`/gym/${gymDetails.gym_id}/trainers`}
            className="btn btn-primary mt-2 ms-2 btn-sm"
          >
            View Trainers
          </a>
          <a
            href={`/gym/${gymDetails.gym_id}/equipments`}
            className="btn btn-primary mt-2 ms-2 btn-sm"
          >
            View Equipments
          </a>

          {((user.type === "admin" && user.gym_id == gym_id) ||
            user.type === "root") && (
            <>
              <a
                href={`/gym/${gymDetails.gym_id}/members`}
                className="btn btn-primary mt-2 ms-2 btn-sm"
              >
                View Members
              </a>
              <a
                href={`/gym/${gymDetails.gym_id}/staff`}
                className="btn btn-primary mt-2 ms-2 btn-sm"
              >
                View Staff
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <AlertBox type="danger" message="Gym not found" />
  );
};

export default Franchise;
