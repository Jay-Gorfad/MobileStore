import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Reviews = () => {
    const [reviews, setReviews] = useState([
        {
          id: 1,
          productImage: "66ee9001ceeaeapple.webp",
          productName: "Product 1",
          productId: 101,
          userName: "John Doe",
          userId: 201,
          rating: 4,
          review: "Great product!",
          reply: "Thank you!",
        },
        {
          id: 2,
          productImage: "cookiecake.webp",
          productName: "Product 2",
          productId: 102,
          userName: "Alice Smith",
          userId: 202,
          rating: 5,
          review: "Excellent quality!",
          reply: "Glad you liked it!",
        },
        {
          id: 3,
          productImage: "vaghbakri.webp",
          productName: "Product 3",
          productId: 103,
          userName: "Bob Johnson",
          userId: 203,
          rating: 3,
          review: "Average experience.",
          reply: "Thank you for your feedback!",
        },
        {
          id: 4,
          productImage: "66ee9001ceeaeapple.webp",
          productName: "Product 4",
          productId: 104,
          userName: "Emma Brown",
          userId: 204,
          rating: 4,
          review: "Satisfied with the purchase.",
          reply: "We appreciate your support!",
        },
        {
          id: 5,
          productImage: "cookiecake.webp",
          productName: "Product 5",
          productId: 105,
          userName: "David White",
          userId: 205,
          rating: 2,
          review: "Not as expected.",
          reply: "",
        },
        {
          id: 6,
          productImage: "vaghbakri.webp",
          productName: "Product 6",
          productId: 106,
          userName: "Sophia Green",
          userId: 206,
          rating: 5,
          review: "Highly recommended!",
          reply: "",
        }
      ]);

  const [reply, setReply] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The review has been deleted.", "success");
      }
    });
  };

  const handleReplySubmit = () => {
    if (reply.trim() === "") {
      setError("Reply cannot be empty!");
      return;
    }
  
    const isNewReply = !selectedReview.reply; // Check if it's a new reply
  

  
    setReply("");
    setError("");
  
    Swal.fire("Success", isNewReply ? "Reply added successfully!" : "Reply updated successfully!", "success");
  };
  
  return (
    <div>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
            <div>
                <h1 className="mt-4">Review Management</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Reviews</li>
                </ol>
            </div>
            <Link to="/admin/add-review" className="btn btn-primary text-nowrap">Add Review</Link>
        </div>
      <div className="card-body">
        <table className="table border text-nowrap">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Username</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Reply</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length ? (
              reviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`/img/items/products/${review.productImage}`}
                        alt={review.productName}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                        className="me-2"
                      />
                      <Link to="/admin/view-product">{review.productName}</Link>
                    </div>
                  </td>
                  <td>
                    <Link to="/admin/user-details">{review.userName}</Link>
                  </td>
                  <td>
                    <span className="text-warning">
                      {Array.from({ length: 5 }, (_, i) =>
                        i < review.rating ? "★" : "☆"
                      )}
                    </span>
                  </td>
                  <td>{review.review}</td>
                  <td>{review.reply ? review.reply : "-"}</td>
                  <td>
                    <div className="d-flex flex-nowrap gap-1">
                      <button
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#replyModal"
                        onClick={() => {
                          setSelectedReview(review);
                          setReply(review.reply || "");
                          setError("");
                        }}
                      >
                        {review.reply ? "Update Reply" : "Reply"}
                      </button>
                      <Link className="btn btn-info btn-sm" to="/admin/update-review">Update</Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(review.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No reviews found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      <div
        className="modal fade"
        id="replyModal"
        tabIndex="-1"
        aria-labelledby="replyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="replyModalLabel">
                {selectedReview?.reply ? "Update Reply" : "Reply to Review"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="reviewReply" className="form-label">
                    Your Reply
                  </label>
                  <textarea
                    className="form-control"
                    id="reviewReply"
                    rows="3"
                    value={reply}
                    onChange={(e) => {
                      setReply(e.target.value);
                      setError("");
                    }}
                  ></textarea>
                  {error && <div className="text-danger mt-1">{error}</div>}
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReplySubmit}
                    >
                    {selectedReview?.reply ? "Update Reply" : "Add Reply"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
