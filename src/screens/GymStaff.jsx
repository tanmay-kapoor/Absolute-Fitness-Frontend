import React, { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import { getGymStaff } from "../api/gym";
import { useParams } from "react-router-dom";
import { deleteStaff, updateStaff } from "../api/staff";

function GymStaff() {
  const { gymId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [staffs, setStaffs] = useState([]);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const [showEditForm, setShowEditForm] = useState(false);
  const [staffDetails, setStaffDetails] = useState({});

  const displayEditForm = (e) => {
    setShowEditForm(true);
  };

  const handleSubmit = async (updatedStaff) => {
    if (updatedStaff && updatedStaff.phone.length !== 10) {
      alert("Phone needs to be 10 digits long");
      return;
    }

    const status = await updateStaff(updatedStaff);
    console.log(status);
    if (status === 200) {
      setStaffs(
        staffs.map((s) =>
          s.staff_id === updatedStaff.staff_id ? updatedStaff : s
        )
      );
    } else {
      alert("Error updating staff");
    }

    setShowEditForm(false);
  };

  const deleteGymStaff = async (e, staffId) => {
    if (staffId === user.staff_id) {
      alert("You cannot delete yourself!");
      return;
    }

    const ans = window.confirm("Are you sure you want to delete this staff?");
    if (ans) {
      const status = await deleteStaff(staffId);

      if (status === 200) {
        setStaffs(staffs.filter((s) => s.staff_id !== staffId));
        alert("Staff deleted successfully");
      }
    }
  };

  const getStaff = async () => {
    const res = await getGymStaff(gymId);
    setStaffs(res);

    // table columns and rows
    setCols(Object.keys(res[0]));
    const _rows = res.map((staff) => Object.values(staff));
    setRows(_rows);
  };

  useEffect(() => {
    getStaff();
  }, []);

  const renderEditForm = showEditForm && (
    <div className="edit-form-div">
      <form
        className="m-4 popup-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(staffDetails);
        }}
      >
        <div className="mb-4 row">
          <div className="col">
            <label htmlFor="staffID" className="form-label">
              Email*
            </label>
            <input
              type="text"
              className="form-control"
              id="staffID"
              name="staff_id"
              value={staffDetails.username}
              placeholder="Immutable"
              disabled
              required
            />
          </div>
          <div className="col">
            <label htmlFor="partTime" className="form-label">
              Employment Type*
            </label>
            <select
              required
              className="custom-select w-100"
              id="partTime"
              name="part_time"
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value="0">Part Time</option>
              <option value="1" selected>
                Full Time
              </option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="salary" className="form-label">
              Salary*
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="salary"
              name="salary"
              value={staffDetails.salary}
              placeholder="10000"
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              Name*
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="firstName"
              name="name"
              value={staffDetails.name}
              placeholder="John"
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="col">
            <label htmlFor="phone" className="form-label">
              Phone*
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="phone"
              name="phone"
              value={staffDetails.phone}
              placeholder="9876543210"
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Job Description*
          </label>
          <textarea
            className="form-control"
            id="description"
            required
            rows="3"
            name="description"
            value={staffDetails.description}
            placeholder="Job Description"
            onChange={(e) =>
              setStaffDetails({
                ...staffDetails,
                [e.target.name]: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary mb-0">
              Update
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-danger mb-0"
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {staffs.length > 0 ? (
        <div className=" container gym-staff-div center">
          {renderEditForm}
          <button
            className="btn btn-outline-primary float-end"
            onClick={(e) => setShowEditForm(true)}
          >
            Add Staff
          </button>
          <h4>Gym Staff</h4>

          <table
            className="table mt-2"
            align="middle"
            style={{ maxWidth: "1400px", margin: "auto" }}
          >
            <thead className="bg-light">
              <tr className="center">
                {cols.map((item, index) => (
                  <th key={index} scope="col">
                    <strong>{item.replace("_", " ").toUpperCase()}</strong>
                  </th>
                ))}
                {(user.type === "admin" || user.type === "root") && (
                  <th scope="col">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="center">
                  {row.map((item, colIndex) => (
                    <td className="m-auto" key={colIndex}>
                      {item}
                    </td>
                  ))}

                  {(user.type === "admin" || user.type === "root") && (
                    <td className="d-flex justify-content-between align-items-center">
                      <i
                        className="fas fa-pen icon"
                        onClick={(e) => {
                          displayEditForm(true);
                          setStaffDetails(staffs[rowIndex]);
                        }}
                      ></i>

                      <i
                        className="fas fa-trash icon ms-2"
                        onClick={(e) => deleteGymStaff(e, row[0])}
                      ></i>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <AlertBox message="No Staff found" type="danger" />
      )}
    </>
  );
}

export default GymStaff;
