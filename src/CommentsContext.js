import React, { createContext, useContext, useState } from 'react';

// Create a context to manage comments globally
const CommentsContext = createContext();

// Custom hook to use the CommentsContext
export const useComments = () => {
  return useContext(CommentsContext);
};

// Provider component to wrap your app and provide comment data
export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({}); // Store comments for each product by ID

  // Function to add a new comment to a specific product
  const addComment = (productId, newComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [productId]: prevComments[productId]
        ? [...prevComments[productId], newComment]  // If comments already exist for product, add to it
        : [newComment],  // Otherwise, create a new array with the new comment
    }));
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
};
