import { useEffect, useState } from "react";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetch("https://itransition-task4-backend.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err.message));
  }, []);

  // CHECKBOX
  const handleCheckbox = (user) => {
    if (selectedUsers.includes(user._id)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user._id]);
    }
  };
  // DELETE
  const handleDelete = () => {
    selectedUsers.forEach((userId) => {
      fetch(
        `https://itransition-task4-backend.onrender.com/api/users/${userId}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then(() => {
          setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
          setSelectedUsers([]);
        })
        .catch((err) => console.log(err.message));
    });
  };

  // BLOCK

  const handleBlock = () => {
    selectedUsers.forEach((userId) => {
      fetch(
        `https://itransition-task4-backend.onrender.com/api/users/block/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "blocked" }),
        }
      )
        .then((res) => res.json())
        .then(() => {
          setUsers(
            users.map((user) =>
              user._id === userId ? { ...user, status: "blocked" } : user
            )
          );
          setSelectedUsers([]);
        })
        .catch((err) => console.log(err.message));
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(users.map((user) => user._id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </label>
              </th>
              <th>Name</th>
              <th>User Status</th>
              <th>Time of registration</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleCheckbox(user)}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl">Name {user.name}</h3>
                      <p className="font-semibold text-lg">
                        Status: {user.status}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="flex items-center gap-x-3 px-6">
                  <button
                    className="btn btn-info"
                    onClick={handleBlock}
                    disabled={!selectedUsers.includes(user._id)}
                  >
                    Block
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={handleDelete}
                    disabled={!selectedUsers.includes(user._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{new Date(user.registrationTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowUsers;
