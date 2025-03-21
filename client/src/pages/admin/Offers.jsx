import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Offers = () => {
	const [offers, setOffers] = useState([
		{
			Offer_Id: 1,
			Offer_Code: "DISCOUNT10",
			Offer_Description: "Get 10% off on orders above ₹500",
			Discount: 10,
			Minimum_Order: 500,
			active_status: 1,
		},
		{
			Offer_Id: 2,
			Offer_Code: "SAVE20",
			Offer_Description: "Save ₹20 on orders above ₹300",
			Discount: 20,
			Minimum_Order: 300,
			active_status: 0,
		},
	]);

	const handleDelete = () => {
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
				Swal.fire("Deleted!", "Offer has been deleted.", "success");
			}
		});
	};

	const handleToggleStatus = (offerId) => {
		setOffers(
			offers.map((offer) =>
				offer.Offer_Id === offerId
					? {
							...offer,
							active_status: offer.active_status === 1 ? 0 : 1,
					  }
					: offer
			)
		);
		Swal.fire(
			"Success!",
			`Offer has been ${
				offers.find((offer) => offer.Offer_Id === offerId)
					.active_status === 1
					? "deactivated"
					: "activated"
			}.`,
			"success"
		);
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<div>
					<h1 className="mt-4">Offers Management</h1>
					<ol class="breadcrumb mb-4">
						<li class="breadcrumb-item">
						<Link to="/admin" style={{ color: "blue", textDecoration: "none" }}>
  Dashboard
</Link>
						</li>
						<li class="breadcrumb-item active">Offers</li>
					</ol>
				</div>
				<Link to="/admin/add-offer" className="btn btn-primary">
					Add Offer
				</Link>
			</div>

			<h4 className="mt-2">Discount Offers</h4>
			<div className="card-body">
				<table className="table border text-nowrap">
					<thead className="table-light">
						<tr>
							<th>Offer Description</th>
							<th>Offer Code</th>
							<th>Discount</th>
							<th>Minimum Order</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{offers.length > 0 ? (
							offers.map((offer) => (
								<tr key={offer.Offer_Id}>
									<td>{offer.Offer_Description}</td>
									<td>{offer.Offer_Code}</td>
									<td>{offer.Discount}%</td>
									<td>₹{offer.Minimum_Order}</td>
									<td>
										<div className="d-flex">
											<Link
												to="/admin/update-offer"
												className="btn btn-secondary btn-sm me-1"
											>
												Update
											</Link>
											<button
												className="btn btn-danger btn-sm me-1"
												onClick={() =>
													handleDelete(offer.Offer_Id)
												}
											>
												Delete
											</button>
											<button
												className={
													offer.active_status === 1
														? "btn btn-warning btn-sm"
														: "btn btn-success btn-sm"
												}
												onClick={() =>
													handleToggleStatus(
														offer.Offer_Id
													)
												}
											>
												{offer.active_status === 1
													? "Deactivate"
													: "Activate"}
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="text-center">
									No offers available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Offers;
