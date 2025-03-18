import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Banners = () => {
    const banners = [
        { id: 1, image: "/img/banners/670a7ae6b300315promaxn1.jpg", order: -1, status: 1, label: "Banner for free delivery" },
        { id: 2, image: "/img/banners/banner1.webp", order: -2, status: 0, label: "Banner for first order discount" },
        { id: 3, image: "/img/banners/hero.png", order: 1, status: 1 },
        { id: 4, image: "/img/banners/banner4.webp", order: 2, status: 0 },
    ];

    const handleAction = (action, banner) => {
        let message = "";
        let confirmButtonText = "";

        if (action === "activate") {
            message = "Are you sure you want to activate this banner?";
            confirmButtonText = "Activate";
        } else if (action === "deactivate") {
            message = "Are you sure you want to deactivate this banner?";
            confirmButtonText = "Deactivate";
        } else if (action === "delete") {
            message = "Are you sure you want to delete this banner? This action cannot be undone.";
            confirmButtonText = "Delete";
        }

        Swal.fire({
            title: "Confirm Action",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: action === "delete" ? "#d33" : "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Success!", `Banner ${action}d successfully.`, "success");
            }
        });
    };

    return (
		<div>
			<div class="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1 class="mt-4">Banner Management</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li class="breadcrumb-item active">Banners</li>
                    </ol>
                </div>
                <Link to="/admin/add-banner" className="btn btn-primary text-nowrap">Add Banner</Link>
            </div>

			<div className="row">
				{banners
					.filter((b) => b.order < 0)
					.map((banner) => (
						<div className="col-md-6" key={banner.id}>
							<h5>{banner.label}</h5>
							<table className="table border text-nowrap">
								<thead className="table-light">
									<tr>
										<th>Image</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<img
												src={banner.image}
												alt={banner.label}
												width="200"
											/>
										</td>
										<td>
											<Link className="btn btn-secondary btn-sm ms-2" to="/admin/update-banner">
												Edit
											</Link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					))}
			</div>

			<h5>Banners for Slider</h5>
			<table className="table border text-nowrap">
				<thead className="table-light">
					<tr>
						<th>Image</th>
						<th>View Order</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{banners
						.filter((b) => b.order > 0)
						.map((banner) => (
							<tr key={banner.id}>
								<td>
									<img
										src={banner.image}
										alt={`Banner ${banner.id}`}
										width="200"
									/>
								</td>
								<td>{banner.order}</td>
								<td>
									{banner.status === 1 ? (
										<button
											className="btn btn-danger btn-sm"
											onClick={() =>
												handleAction(
													"deactivate",
													banner
												)
											}
										>
											Deactivate
										</button>
									) : (
										<button
											className="btn btn-success btn-sm"
											onClick={() =>
												handleAction("activate", banner)
											}
										>
											Activate
										</button>
									)}
                                    <Link className="btn btn-secondary btn-sm ms-2" to="/admin/update-banner">
										Edit
									</Link>
									<button
										className="btn btn-danger btn-sm ms-2"
										onClick={() =>
											handleAction("delete", banner)
										}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Banners;
