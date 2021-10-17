
import Posts from './components/posts'
import React, {useState} from "react";
import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-native';

function MyVerticallyCenteredModal(props)  {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        const obj = {
            user: inputs.username
        }

        const request = await fetch ("https://my-worker.krtky020.workers.dev/check-users", {
            method: 'POST',
            body: JSON.stringify(obj)
        });
        const value = JSON.parse(request.body)

        if(value == "SUCCESS") {
            const url = "https://p-roses-financing-malpractice.trycloudflare.com/auth/" + inputs.username
            await fetch(url, {method: "GET"})
        }
        else {
            const url = "https://p-roses-financing-malpractice.trycloudflare.com/verify"
            const resp = await fetch(url, {method: "GET"})
            if(resp.body.toString() !== inputs.username) {
                Alert.alert("You do not have permission to post with this username!")
                return
            }
        }

        const post = {
            title: inputs.title,
            username: inputs.username,
            content: inputs.content,
        };

        const url = "https://my-worker.krtky020.workers.dev/posts"
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(post),
        });

        window.location.reload(false);
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Submit a post!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-16 col-lg-6 offset-lg-3">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control my-3"
                            placeholder="Title"
                            type="text"
                            name="title"
                            value={inputs.title || ""}
                            onChange={handleChange}
                        />
                        <textarea
                            className="form-control my-3"
                            placeholder="Content"
                            value={inputs.content || ""}
                            name="content"
                            onChange={handleChange}
                        >
                        </textarea>
                        <input
                            className="form-control my-3"
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={inputs.username || ""}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-primary float-end" data-dismiss="modal" onClick={() => handleSubmit()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

const App = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="container">
            <div>

                <div className="pt-3 col-12 col-lg-6 offset-lg-3">
                    <h1 className="text-center">My Social Media</h1>
                </div>

                <div className="row pt-3">
                    <div className="text-center">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Make a post
                        </Button>
                    </div>
                </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <Posts />
            </div>
        </div>
    );
}

export default App;