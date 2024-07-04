import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Row, Spinner, Toast } from "react-bootstrap";
import NavbarMenu from "../components/layout/NavbarMenu";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  // Contexts
  const { authState: { user } } = useContext(AuthContext);
  const { postState, getPosts, setShowAddPostModal, showToast ,setShowToast,deletePost} = useContext(PostContext);
  const { post,posts, postLoading } = postState;

  // Effect to fetch posts on initial render
  useEffect(() => {
    getPosts();
  }, []);

  let body = null;
  let checkPost = posts.length;

  // Loading state while posts are being fetched
  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } 
  // Display message if no posts are available
  else if (checkPost === 0) {
    body = (
      <Card className="text-center mx-5 my-5">
        <Card.Header>
          <Card.Title>Hi {user ? user.username : 'User'}</Card.Title>
          <Card.Subtitle>No Posts Yet</Card.Subtitle>
          <Card.Text>
            Click the button below to track your first skill to learn
          </Card.Text>
          <Button variant="primary" onClick={setShowAddPostModal}>Learn IT</Button>
        </Card.Header>
      </Card>
    );
  } 
  // Display posts if available
  else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* open add Post modal */}
        <Button className="btn-floating" onClick={() => setShowAddPostModal(true)}>
          <img src={addIcon} alt="add-post" width="60" height="60" />
        </Button>
      </>
    );
  }

  return (
    <div>
      <NavbarMenu />
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}  
      <Toast
        show={showToast.show}
        style={{ position: 'fixed', top: '20%', right: '10px' }}
        className={`bg-${showToast.type} text-white`}
        onClose={() => setShowToast({
          show: false,
          message: '',
          type: null
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{showToast.message}</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Dashboard;
