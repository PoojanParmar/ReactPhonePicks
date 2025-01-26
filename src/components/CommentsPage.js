import React, { useState } from 'react';
import './CommentsPage.css';

const CommentsPage = ({ product }) => {
  const [rating, setRating] = useState(0); // Rating (0-5 stars)
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null); // Photo upload
  const [comments, setComments] = useState([]); // Array to hold existing comments

  // Handle rating change (set star rating)
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handle comment text change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure the user provided a rating and comment
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide a rating and a comment.');
      return;
    }

    // Create new comment object
    const newComment = {
      rating,
      comment,
      image: image ? URL.createObjectURL(image) : null, // Display image preview
      date: new Date().toLocaleDateString(),
    };

    // Add the new comment to the existing list of comments
    setComments((prevComments) => [...prevComments, newComment]);

    // Reset the form
    setRating(0);
    setComment('');
    setImage(null);
    
    // User feedback for successful submission
    alert('Comment submitted successfully!');
  };

  return (
    <div className="comments-page">
      <h2>Rate and Comment on {product.name}</h2>

      <form onSubmit={handleSubmit} className="comments-form">
        {/* Rating section (stars) */}
        <div className="rating">
          <label className='rate'>Rating:</label>
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

        {/* Comment input */}
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

        {/* Image upload (optional) */}
        <div className="image-upload">
          <label>Upload Photo (optional):</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className="preview-image" />}
        </div>

        {/* Submit button */}
        <button type="submit">Submit Comment</button>
      </form>

      {/* Display comments */}
      <div className="comments-list">
        <h3>Comments</h3>
        {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
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
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
