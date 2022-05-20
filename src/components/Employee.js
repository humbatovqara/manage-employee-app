import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditForm from "./EditForm";

const Employee = ({ employee }) => {

    const { dispatch } = useContext(EmployeeContext);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const deleteEmployee = () => {
        dispatch({ type: 'remove_employee', id: employee.id })
    }

    useEffect(() => {
        handleClose();
    }, [employee])

    return (
        <>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow} className="btn text-warning p-0 edit" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>

                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={deleteEmployee} className="btn text-danger p-0 delete" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theEmployee={employee} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Close Modal</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Employee;