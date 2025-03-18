import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Responses = () => {
	const [responses, setResponses] = useState([
		{
			id: 1,
			userName: "Jay Gorfad",
			email: "jaygorfad000@gmail.com",
			phone: "7600245040",
			message: "I have an issue with my order.",
			reply: "",
		},
		{
			id: 2,
			userName: "Jay Barasiya",
			email: "jaybarasiya07@gmail.com.com",
			phone: "8141809467",
			message: "Great service!",
			reply: "Thank you!",
		},
		{
			id: 2,
			userName: "Prince Bhatt",
			email: "princebhatt749@gmail.com.com",
			phone: "9106551273",
			message: "Great service!",
			reply: "Thank you!",
		},
	]);

	const [reply, setReply] = useState("");
	const [selectedResponse, setSelectedResponse] = useState(null);
	const [error, setError] = useState("");
	const [showModal, setShowModal] = useState(false);

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
				Swal.fire(
					"Deleted!",
					"The response has been deleted.",
					"success"
				);
			}
		});
	};

	const handleReplySubmit = () => {
		if (reply.trim() === "") {
			setError("Reply cannot be empty!");
			return;
		}

		setReply("");
		setError("");
		setShowModal(false);
		Swal.fire("Success", "Reply added successfully!", "success");
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mt-4 mb-4">
				<div>
					<h1>Responses</h1>
					<ol className="breadcrumb mb-0">
						<li className="breadcrumb-item">
							<Link to="/admin">Dashboard</Link>
						</li>
						<li className="breadcrumb-item active">Responses</li>
					</ol>
				</div>
				{/* <Link
					className="btn btn-primary text-nowrap"
					to="/admin/add-response"
				>
					Add Response
				</Link> */}
			</div>
			<div className="card-body">
				<table className="table border text-nowrap">
					<thead className="table-light">
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Message</th>
							<th>Reply</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{responses.length ? (
							responses.map((response) => (
								<tr key={response.id}>
									<td>{response.userName}</td>
									<td>{response.email}</td>
									<td>{response.phone}</td>
									<td>{response.message}</td>
									<td>
										{response.reply ? response.reply : "-"}
									</td>
									<td>
										<div className="d-flex flex-nowrap">
											<button
												className="btn btn-primary btn-sm me-2"
												onClick={() => {
													setSelectedResponse(
														response
													);
													setReply(
														response.reply || ""
													);
													setError("");
													setShowModal(true);
												}}
												disabled={response.reply !== ""}
											>
												{response.reply
													? "Replied"
													: "Reply"}
											</button>
											<button
												className="btn btn-danger btn-sm"
												onClick={() =>
													handleDelete(response.id)
												}
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
									No responses found!
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Reply Modal */}
			{showModal && selectedResponse && (
				<div
					className="modal fade show d-block"
					style={{ background: "rgba(0,0,0,0.5)" }}
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									Reply to Response
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<div className="mb-3">
									<label className="form-label">
										Message
									</label>
									<textarea
										className="form-control"
										rows="3"
										value={reply}
										onChange={(e) =>
											setReply(e.target.value)
										}
									></textarea>
									{error && (
										<small className="text-danger">
											{error}
										</small>
									)}
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setShowModal(false)}
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleReplySubmit}
								>
									Send Reply
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Responses;
