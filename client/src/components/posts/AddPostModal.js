import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AppPostModal = () => {
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    });

    const { title, description, url } = newPost;

    const onChangeNewPostForm = event => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    };

    const onSubmit = async event => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        resetAddPostData();
        setShowToast({
            show: true,
            message: success ? "Post added successfully!" : message,
            type: success ? "success" : "danger"
        });
    }


    const resetAddPostData = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setShowAddPostModal(false);
    };

    return (
        <Modal show={showAddPostModal} animation={false} onHide={resetAddPostData}>
            <Modal.Header>
                <Modal.Title>What do you want to learn?</Modal.Title>
                <button
                    style={{ border: 'none', backgroundColor: 'white', fontSize: '20px' }}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={resetAddPostData}
                >
                    x
                </button>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            placeholder="Description"
                            rows={3}
                            name="description"
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube URL"
                            name="url"
                            required
                            aria-describedby="url-help"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetAddPostData}>Cancel</Button>
                    <Button variant="primary" type="submit">Learn IT</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AppPostModal;
