import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import Employee from "./Employee";
import { Button, Modal, Alert } from "react-bootstrap";
import AddForm from "./AddForm";
import Pagination from "./Pagination";

const EmployeeList = () => {

    const { sortedEmployees } = useContext(EmployeeContext);

    const [showAlert, setShowAlert] = useState(false);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(2);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // const handleShowAlert = () => setShowAlert(true);

    const handleShowAlert = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }

    useEffect(() => {
        setShowAlert(false);
    }, [])

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [sortedEmployees])

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployee = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage)

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i><span>Add New Employee</span></Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                Employee List successfully updated!
            </Alert>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployee.map((employee) => (
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination
                pages={totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentEmployee={currentEmployee}
                sortedEmployees={sortedEmployees}
            />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Close Modal</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeList;