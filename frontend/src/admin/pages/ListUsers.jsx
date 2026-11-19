import {
    Button,
    Container,
    Row,
    Table,
    Modal,
    Form,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
    deleteUser,
    userRoleChange,
    userStatusChange,
} from "../../redux/userSlice";

import { toast } from "react-toastify";
import instance from "../../axios/instance";

function ListUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        instance
            .get("/users/allusers")
            .then(({ data }) => setUsers(data.users))
            .catch((error) => console.log(error));
    }, []);

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };


    const handleDelete = async () => {
        if (selectedUser) {
            try {
                await instance.delete(`/users/${selectedUser._id}`);

                setUsers((prev) =>
                    prev.filter((u) => u._id !== selectedUser._id)
                );

                toast.success("User deleted successfully!");
            } catch (error) {
                toast.error(error?.response?.data?.message || error.message);
            }
        }

        setShowModal(false);
        setSelectedUser(null);
    };


    const handleStatus = async (id) => {
        try {
            const { data } = await instance.patch(`/users/status-updated/${id}`);

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === id ? { ...u, status: data.user.status } : u
                )
            );

            toast.success(data?.message || "Status updated successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const handleRoleChange = async (e, userId) => {
        const newRole = e.target.value;

        try {
            const { data } = await instance.patch(`/users/role-updated/${userId}`, {
                role: newRole,
            });

            setUsers((prev) =>
                prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
            );

            toast.success(data?.message || "Role updated successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };
    return (
        <>
            <h2 className="text-center">
                User List
            </h2>

            <Container fluid>

                <Row className="bg-dark-subtle p-5">

                    <Table
                        striped
                        bordered
                        hover
                        className="tableList bg-success-subtle rounded-5 shadow-lg table-light"
                    >

                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user._id}>
                                    <td>
                                        {user.fullname}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>
                                        <Form.Select
                                            defaultValue={user?.role}
                                            onChange={(event) => handleRoleChange(event, user._id)}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="seller">Seller</option>
                                            <option value="user">User</option>
                                        </Form.Select>
                                    </td>

                                    <td>
                                        <Form.Check
                                            type="switch"
                                            checked={user.status}
                                            onChange={() =>
                                                handleStatus(user._id, user.status)
                                            }
                                            label={user.status ? "Active" : "Inactive"}
                                        />
                                    </td>

                                    <td>

                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                handleDeleteClick(user)
                                            }
                                        >
                                            Delete
                                        </Button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </Table>

                </Row>

            </Container>



            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Delete User
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <p>
                        Are you sure you want to delete this user?
                    </p>

                    {selectedUser && (
                        <p>
                            <strong>
                                {selectedUser.fullname}
                            </strong>
                        </p>
                    )}

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                </Modal.Footer>

            </Modal>
        </>
    );
}

export default ListUsers;