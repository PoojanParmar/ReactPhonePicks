import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useComments } from '../CommentsContext';  // Import the context
import './CommentsPage.css';

const CommentsPage = ({ product }) => {
  const { productId } = useParams();  // Get productId from URL
  const { comments, addComment } = useComments();  // Access context functions
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      alert('Please provide a rating and a comment.');
      return;
    }

    // Create new comment object
    const newComment = {
      rating,
      comment,
      image: image ? URL.createObjectURL(image) : null,
      date: new Date().toLocaleDateString(),
    };

    addComment(productId, newComment);  // Add comment to context

    // Reset form after submitting
    setRating(0);
    setComment('');
    setImage(null);
  };

  return (
    <div className="comments-page">
      <h2>Rate and Comment on {product.name}</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="comments-form">
        {/* Rating section */}
        <div className="rating">
          <label>Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment section */}
        <div className="comment">
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here"
            rows="5"
            required
          />
        </div>

        {/* Image upload */}
        <div className="image-upload">
          <label>Upload Photo (optional):</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className="preview-image" />}
        </div>

        {/* Submit button */}
        <button type="submit">Submit Comment</button>
      </form>

      {/* Display existing comments */}
      <div className="comments-list">
        <h3>Comments</h3>
        {comments[productId] && comments[productId].length > 0 ? (
          comments[productId].map((comment, index) => (
            <div key={index} className="comment-item">
              {/* Display rating */}
              <div className="comment-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${star <= comment.rating ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <p>{comment.comment}</p>
              {comment.image && <img src={comment.image} alt="Uploaded" className="uploaded-image" />}
              <p className="comment-date">{comment.date}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
