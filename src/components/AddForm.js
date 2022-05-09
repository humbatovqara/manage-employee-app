import { Form, Button } from 'react-bootstrap';

const AddForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    placeholder="Address *"
                    rows={3}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Phone"
                />
            </Form.Group>

            <Button variant="success" className='w-100' type="submit">
                Add New Employee
            </Button>
        </Form>
    )
}

export default AddForm;