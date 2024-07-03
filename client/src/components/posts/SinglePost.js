import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ActionButtons from './ActionButton';

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    // Determine the badge variant based on status
    let badgeClassName = 'badge rounded-pill ';

    if (status === 'LEARNED') {
        badgeClassName += 'bg-success'; // Add success class
    } else if (status === 'LEARNING') {
        badgeClassName += 'bg-warning'; // Add warning class
    } else {
        badgeClassName += 'bg-danger'; // Default to danger class
    }

    return (
        <Card className='shadow' border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{title}</p>
                            <Badge pill className={badgeClassName}>
                                {status}
                            </Badge>
                        </Col>
                        <Col className='text-right'>
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;
