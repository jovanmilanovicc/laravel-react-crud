import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios/axios.client";
import { useStateContext } from "../contexts/context-provider";


function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers()

    },[]);

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
        .then(({data}) => {
            console.log(data);
            setUsers(data.data)
            setLoading(false);

        })
    }

    const onDelete = (user) => {
        if(!window.confirm("Are u sure u want to delete?")) {
            return
        }else{
            setLoading(true);

        axiosClient.delete(`/users/${user.id}`)
        .then(() => {
            setNotification('User has been deleted');
            getUsers();
            setLoading(false);
            }
        )
        }
    }


    return (
        <div >
            <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to='/users/new' className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    { loading && <tbody>
                        <tr>
                            <td colSpan='5' className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>}
                    
                    {!loading && <tbody>
                        {users.map(data => (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.created_at}</td>
                                <td>
                                    <Link to={'/users/' + data.id} className='btn-edit'>Edit</Link>
                                    &nbsp;&nbsp;&nbsp;
                                    <button onClick={evet => onDelete(data)} className='btn-delete'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                     }  
                </table>
            </div>
        </div>
    );
}

export default Users;