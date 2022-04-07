import { useState, useEffect, useRef } from 'react';
import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import FormDialog from './components/dialog';


const initialValue = { name: "", email: "", phone: "", dob: "" }

function App() {
  const gridRef = useRef();

  let gridApi;

  const [ag, setAg] = useState(true);
  const [filter, setFilter] = useState(false);
  const [floatingFilter, setFloatingFilter] = useState(false);
  const [sortable, setSortable] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [editable, setEditable] = useState(false);
  const [resizable, setResizable] = useState(false);
  const [hide, setHide] = useState(false);
  const [checkboxSelection, setCheckBoxSelection] = useState(true);
  const [filterButton, setFilterButton] = useState(null);
  const [rowGroup, setRowGroup] = useState(false);
  const [sort, setSort] = useState('');
  const [theme, setTheme] = useState('alpine');

  // replaced rowData with table data 


  /* const [rowData] = useState([
     { make: 'Toyota', model: 'Celica', price: 35000 },
     { make: 'Ford', model: 'Mondeo', price: 32000 },
     { make: 'Porsche', model: 'Boxter', price: 72000 },
   ]);
 */


  const [tableData, setTableData] = useState(null)
  const url = 'http://localhost:4000/users'

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };


  const [columnDefs] = useState([
   // { field: 'make' },
   // { field: 'model' },
    //{ field: 'price' },
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name", },
    { headerName: "Email", field: "email", },
    { headerName: "phone", field: "phone" },
    { headerName: "Date of Birth", field: "dob" },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)} > Update</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)} > Delete</Button>
      </div>
    }
  ]);

  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }

  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value, id)
    //console.log(e)
    setFormData({ ...formData, [id]: value })
  }


  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }

  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }




  const defaultColDef = {
    filter,
    flex: 1,
    sortable,
    editable,
    resizable,
    hide,
    floatingFilter,
    sort,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    rowGroup,
    //checkboxSelection,
    filterParams: {
      buttons: filterButton,
    },
  };

  const gridOptions = {
    // rowData,
    columnDefs,
    pagination,
    enableCharts: true,
    enableRangeSelection: true,
  };

  const sortableHandler = () => {
    setSortable(prev => !prev);
  };

  const filterHandler = () => {
    setFilter(prev => !prev);
  };

  const paginationHandler = () => {
    setPagination(prev => !prev);
    setAg(false);
  };

  const editableHandler = () => {
    setEditable(prev => !prev);
  };

  const resizableHandler = () => {
    setResizable(prev => !prev);
  };

  const hideHandler = () => {
    setHide(prev => !prev);
  };

  useEffect(() => {
    setAg(true);
  }, [pagination]);

  const onGridReady = params => {
    gridApi = params.api;
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <>
      <Container fluid className=" my-3 mb-5">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="rounded"
        >
          <Container className="mb-20">
            <Navbar.Brand>
              <img
                alt=""
                src="https://i.pinimg.com/originals/b6/a8/aa/b6a8aa222d1c7867a60e2808d684b3fd.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {'   '}
              Tuto
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Grid list</Nav.Link>
                <Nav.Link href="#pricing">Add New Grid</Nav.Link>
              </Nav>
              <Nav>
                <Form.Select
                  aria-label="Default select example"
                  onClick={e => setTheme(e.target.value)}
                >
                  <option disabled>{'   '}- Theme -</option>
                  <option value="alpine">alpine</option>
                  <option value="alpine-dark">alpine-dark</option>
                  <option value="balham">balham</option>
                  <option value="balham-dark">balham-dark</option>
                  <option value="material">material</option>
                </Form.Select>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <Container fluid className=" my-3">

        <Row>
          <Col sm={2}>

            <div className="border border-black rounded">

              <div className=" rounded m-3">
                <Stack gap={3}>
                  <Button
                    variant={sortable ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={sortableHandler}
                  >
                    Sortable
                  </Button>
                  {sortable && (
                    <Row className="justify-content-center">
                      <Col sm={3}>
                        <Button
                          variant={
                            sort === 'asc' ? 'secondary' : 'outline-secondary'
                          }
                          size="sm"
                          onClick={
                            sort === 'asc'
                              ? () => {
                                setSort('');
                              }
                              : () => {
                                setSort('asc');
                              }
                          }
                        >
                          asc
                        </Button>
                      </Col>
                      <Col sm={3}>

                        <Button
                          variant={
                            sort === 'desc' ? 'secondary' : 'outline-secondary'
                          }
                          size="sm"
                          onClick={
                            sort === 'desc'
                              ? () => {
                                setSort('');
                              }
                              : () => {
                                setSort('desc');
                              }
                          }
                        >
                          desc
                        </Button>
                      </Col>
                    </Row>
                  )}
                  <Button
                    variant={filter ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={filterHandler}
                  >
                    Filter
                  </Button>
                  {filter && (
                    <Button
                      variant={filterButton ? `primary` : `outline-primary`}
                      size="sm"
                      onClick={
                        filterButton
                          ? () => {
                            setFilterButton(null)
                            gridApi.refreshCells()
                          }
                          : () => {
                            setFilterButton([
                              'apply',
                              'clear',
                              'cancel',
                              'reset',
                            ])
                            gridApi.refreshCells(defaultColDef)
                          }
                      }
                    >
                      Filter buttons
                    </Button>
                  )}
                  <Button
                    variant={floatingFilter ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={() => setFloatingFilter(prev => !prev)}
                  >
                    Floating filter
                  </Button>
                  <Button
                    variant={pagination ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={paginationHandler}
                  >
                    Pagination
                  </Button>
                  <Button
                    variant={editable ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={editableHandler}
                  >
                    editable
                  </Button>
                  <Button
                    variant={resizable ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={resizableHandler}
                  >
                    resizable
                  </Button>
                  <Button
                    variant={hide ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={hideHandler}
                  >
                    hide
                  </Button>
                  <Button
                    variant={rowGroup ? `primary` : `outline-primary`}
                    size="sm"
                    onClick={() => setRowGroup(p => !p)}
                  >
                    rowGroup
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => onExportClick()}
                  >
                    Export
                  </Button>
                </Stack>
              </div>
            </div>

          </Col>
          <Col sm={10}>
            <Button onClick={handleClickOpen} >Add new User</Button>
            <div className="ml-2 bg-dark border border-black rounded">
              <div
                className={`ag-theme-${theme} m-3`}
                style={{ height: '400px' }}
              >
                {ag && (
                  <AgGridReact
                    rowData={tableData}
                    ref={gridRef}
                    gridOptions={gridOptions}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    rowGroupPanelShow="always"
                    animateRows={true}
                    rowSelection="multiple"
                    enableBrowserTooltips={true}
                  />
                )}
              </div>
              <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
