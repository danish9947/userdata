import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

const URL = "http://localhost:3001/api";

function App() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserAge, setNewUserAge] = useState(0);
  // const [deleteUser, setDeleteUser] = useState([]);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/users/all`);
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const createUser = async () => {
    console.log({ newUserName, newUserAge });
    try {
      const response = await axios.post(`${URL}/users/create`,
        {
          name: newUserName,
          age: newUserAge,

        }

      );

      setUsers([...users, response.data]);
      // setNewUser("");
    } catch (error) {
      console.error("error creating user", error);
    }
  };

  
    const sdeleteUser = async (userId) => {
      try {
        await axios.delete(`${URL}/users/delete/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error("error deleting user", error);
      }
    };
    





  return (
    <div>
      <h2>USER DATA</h2>

      <div>
        <input
          style={{
            height: "2rem",
            width: "20rem"
          }}
          type="text"
          name={'name'}
          placeholder='Enter Your Name'
          // value={newUser.name}
          onChange={(e) => setNewUserName(e.target.value)}
        />


      </div>
      <div>
        <input
          style={{
            height: "2rem",
            width: "20rem",
            marginTop: "3rem"
          }}
          type="text"
          name={"age"}
          placeholder='Enter Your Age'
          // value={newUser.age}
          onChange={(e) => setNewUserAge(e.target.value)}
        />


      </div>
      <button
        style={{
          height: "3rem",
          marginTop: "5rem"

        }}

        onClick={createUser}
      >
        SUBMIT
      </button>

      {/* <div>
      <button
  style={{
    height: "3rem",
  }}
  onClick={() => sdeleteUser(it._id)}
>
  delete
</button>

      </div> */}

      <div>
        <ul>

          {
            users.map(it => (
              <li>
                {it.name}
                <div>

                  {it.age}
                </div>
              </li>
            ))
          }
        </ul>
      </div>

    </div>

  )
}

export default App
