import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import DataTable from 'react-data-table-component'; // Import DataTable component

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null); // New state to track which category is being deleted

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get(`http://localhost:8000/categories`); // Adjust URL if needed
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch categories.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this category? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingCategoryId(categoryId); // Set the category being deleted
        try {
          await axios.delete(`http://localhost:8000/categories/${categoryId}`);
          setCategories(categories.filter(category => category._id !== categoryId));
          Swal.fire({
            title: "Deleted!",
            text: "Category has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to delete category.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        } finally {
          setDeletingCategoryId(null); // Reset the deleting state after the operation
        }
      }
    });
  };

  const columns = [
    {
        name: "No.", // Column name changed to "Serial Number"
        selector: (row, index) => index + 1, // Use the index to show serial number (1-based)
        sortable: true,
        width: "10%", // Adjust width
        grow: 0,
      },
    {
      name: "Category Image",
      selector: row => row.image,
      sortable: true,
      cell: (row) => (
        <img 
          src={row.image} 
          alt={row.name} 
          style={{ width: "75px", height: "75px", objectFit: "cover" }} 
        />
      ),
      width: "25%", // Percentage width
      grow: 0, 
    },
    {
      name: "Category Name",
      selector: row => row.name,
      sortable: true,
      wrap: true, // Wrap text for longer category names
      width: "20%", // Percentage width
      grow: 2, // Allows column to grow on smaller screens
    },
    {
      name: "Category Color",
      selector: row => row.color,
      sortable: true,
      cell: (row) => (
        <div 
          style={{
            backgroundColor: row.color, 
            width: "40px", 
            height: "40px", 
            borderRadius: "50%"
          }} 
          title={`Color: ${row.color}`} // Hover text showing the exact color value
        ></div>
      ),
      width: "20%", // Percentage width
      grow: 0, // Prevents this column from growing on smaller screens
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="d-flex flex-nowrap">
          <Link 
            className="btn btn-success btn-sm me-1" 
            to={`/admin/update-category/${row._id}`} 
            aria-label={`Edit category ${row.name}`}
          >
            <i className="fas fa-edit"></i> Edit
          </Link>
          <button 
            className="btn btn-danger btn-sm" 
            onClick={() => handleDelete(row._id)} 
            aria-label={`Delete category ${row.name}`}
            disabled={deletingCategoryId === row._id} // Disable button while deleting
          >
            {deletingCategoryId === row._id ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Deleting...
              </>
            ) : (
              <>
                <i className="fas fa-trash"></i> Delete
              </>
            )}
          </button>
        </div>
      ),
      width: "20%", // Percentage width
      grow: 1, // Allows column to grow on smaller screens
    }
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCategories = Array.isArray(categories)
  ? categories.filter((category) =>
      (category.name || '').toLowerCase().includes(searchText.toLowerCase())
    )
  : [];


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <div>
          <h1>Categories</h1>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
            <li className="breadcrumb-item active">Categories</li>
          </ol>
        </div>
        <Link className="btn btn-primary text-nowrap" to="/admin/add-category">Add Category</Link>
      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <div className="card-body">
        <DataTable
          columns={columns}
          data={filteredCategories}
          pagination
          highlightOnHover
          responsive
          search
          progressPending={loading}
          customStyles={{
            headCells: {
              style: {
                fontSize: '16px', // Set font size for header cells
                fontWeight: 'bold',
              },
            },
            cells: {
              style: {
                fontSize: '14px', // Set font size for data cells
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Categories;
