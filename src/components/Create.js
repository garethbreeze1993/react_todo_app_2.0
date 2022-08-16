import React from "react"
import Nav from "./Navbar"
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';

function Create() {
    const [formValues, setFormValues] = React.useState({formTitle: '', formDescription: '', formDeadline: ''})
    const [formSubmitted, setFormsubmitted] = React.useState(false);


    function handleChange(event){
        const {name, value} = event.target
        setFormValues(prevState => {
            return {...prevState,
                    [name]: value}})
        setFormsubmitted(false)
    }

    function handleSubmit(event, valueObj){
        event.preventDefault();
        console.log(valueObj)
        setFormValues({formTitle: '', formDescription: '', formDeadline: ''})
        setFormsubmitted(true)
    }

    return (
      <main>
          <Nav />
          <Container>
              {formSubmitted && <Alert variant={"success"}>Form successfully submitted!</Alert>}
              <Form onSubmit={(event) => {handleSubmit(event, formValues)}}>
                  <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="Enter title" value={formValues['formTitle']} name={"formTitle"}
                                    onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" placeholder="Description" value={formValues['formDescription']}
                                  name={"formDescription"} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDeadline">
                      <Form.Label>Deadline</Form.Label>
                      <Form.Control type="date" placeholder="Deadline" value={formValues['formDeadline']}
                                    name={"formDeadline"} onChange={handleChange} />
                  </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
          </Container>
      </main>
  );
}

export default Create;