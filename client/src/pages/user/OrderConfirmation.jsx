import { Link } from "react-router-dom";

const OrderConfirmation = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center p-5">
                            <div className="mb-4">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                    <i className="fa-solid fa-check fa-2x"></i>
                                </div>
                            </div>
                            <h4 className="mb-3 fw-bold">Thank you for ordering!</h4>
                            <p className="text-muted mb-4">Your order has been successfully placed and will be processed shortly.</p>
                            <div className="d-grid gap-2 d-md-flex justify-content-center">
                                <Link className="btn btn-primary px-4" to="/order-history">View Orders</Link>
                                <Link className="btn btn-outline-primary px-4" to="/shop">Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
