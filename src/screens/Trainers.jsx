import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { getGymTrainers } from "../api/gym";
import { addNewTrainer } from "../api/trainer";

function Trainers() {
  const { gym_id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [trainers, setTrainers] = useState([]);
  const [partTime, setPartTime] = useState(false);
  const [displayAddTrainerForm, setDisplayAddTrainerForm] = useState(false);
  const [newTrainer, setNewTrainer] = useState({});

  useEffect(() => {
    const getTrainers = async () => {
      const res = await getGymTrainers(gym_id);
      setTrainers(res);
    };

    getTrainers();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    setNewTrainer((o) => ({
      ...newTrainer,
      [e.target.name]: e.target.value,
    }));
  };

  const addTrainer = async (e) => {
    e.preventDefault();

    try {
      const res = await addNewTrainer(newTrainer, gym_id);
      console.log(res.data);
      setTrainers((o) => [...o]);
      setNewTrainer({});
      setDisplayAddTrainerForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(trainers);

  const trainerForm = (
    <div className="container mb-4">
      <h2 className="mt-4">Trainer Information Form</h2>
      <form onSubmit={addTrainer}>
        <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-3">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newTrainer.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-3">
              <label for="phone" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                name="phone"
                value={newTrainer.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-3">
              <label for="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={newTrainer.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-3">
              <label for="sex" className="form-label">
                Sex
              </label>
              <select
                required
                className="custom-select w-100"
                id="sex"
                name="sex"
                onChange={handleChange}
                value={newTrainer.sex}
              >
                <option value="">Choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-3">
              <label for="speciality" className="form-label">
                Speciality
              </label>
              <input
                type="text"
                className="form-control"
                id="speciality"
                name="speciality"
                value={newTrainer.speciality}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-3">
              <label for="experience" className="form-label">
                Years of Experience
              </label>
              <input
                type="number"
                className="form-control"
                id="experience"
                name="yearsOfExp"
                value={newTrainer.yearsOfExp}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-3">
              <label for="salary" className="form-label">
                Salary ($)
              </label>
              <input
                type="number"
                className="form-control"
                id="salary"
                name="salary"
                value={newTrainer.salary}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3 m-auto">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value={partTime}
                id="part-time"
                onChange={(e) => setPartTime(!partTime)}
              />
              <label class="form-check-label" for="part-time">
                Part Time
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={newTrainer.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="mb-3">
              <label for="staff-id" className="form-label">
                Staff Email
              </label>
              <input
                type="email"
                className="form-control"
                id="staff-id"
                name="staffId"
                value={newTrainer.staffId}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="mb-3">
              <label for="image_url" className="form-label">
                Image URL (optional)
              </label>
              <input
                type="url"
                className="form-control"
                id="image_url"
                name="image_url"
                value={newTrainer.image_url}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Trainer
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={(e) => setDisplayAddTrainerForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  return trainers.length > 0 ? (
    <>
      {displayAddTrainerForm && trainerForm}
      <div
        id="trainer-div"
        className="container d-flex flex-column align-items-center"
      >
        <h4 className="page-title">Meet The Team</h4>
        {user.accessToken && user.type === "admin" && (
          <button
            className="btn btn-primary ms-auto"
            onClick={(e) => setDisplayAddTrainerForm(true)}
          >
            Add Trainer
          </button>
        )}
        <div className="row mt-3">
          {trainers.map((trainer, index) => (
            <div
              className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
              key={index}
            >
              <div className="card">
                <img
                  src={trainer.image_url}
                  className="card-img-top"
                  alt="trainer"
                />
                <div className="card-body">
                  <h5 className="card-title">{trainer.name}</h5>
                  <p className="card-text">
                    Speciality: {trainer.speciality}
                    <br />
                    Years of Experience: {trainer.years_of_exp}
                    <br />
                    {trainer.description}
                  </p>
                  <div>
                    <Link to={`/trainer/${trainer.staff_id}/memberRecords`}>
                      <button className="btn btn-primary">
                        See Performance
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className="no-data">No Trainers Data Found.</div>
  );
}

export default Trainers;
