import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import uuidv1 from "uuid/v1";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Table
} from "reactstrap";
import {
  getListPersonals,
  addPersonal,
  deletePersonal,
  editPersonal
} from "./actions/personals";
import "./App.css";
import phoneCode from "./phone-code";
import nationalityList from "./nationality";

function App(props) {
  const {
    getListPersonals,
    addPersonal,
    deletePersonal,
    editPersonal,
    personals
  } = props;
  useEffect(() => {
    getListPersonals();
  }, []);

  const [personalId, setPersonalId] = useState(null);

  const [firstName, firstNameInput, setFirstName] = useTextInput({
    type: "text",
    label: "First Name",
    name: "firstName",
    placeholder: "",
    data: ""
  });

  const [lastName, lastNameInput, setLastName] = useTextInput({
    type: "text",
    label: "Last Name",
    name: "lastName",
    placeholder: "",
    data: ""
  });

  const [passport, passportInput, setPassport] = useTextInput({
    type: "text",
    label: "Passport No",
    name: "passport",
    placeholder: "",
    data: ""
  });

  const [salary, salaryInput, setSalary] = useTextInput({
    type: "number",
    label: "Expected Salary",
    name: "salary",
    placeholder: "",
    data: ""
  });

  const [gender, setGender] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  const [code, setPhoneCode] = useState({
    value: "+66",
    label: "+66"
  });
  const [phone, setPhone] = useState(null);
  const [nationality, setNationality] = useState(null);

  function handleSubmit() {
    if (
      firstName &&
      lastName &&
      gender &&
      code &&
      phone &&
      birthDay &&
      nationality &&
      passport &&
      salary
    ) {
      if (personalId) {
        editPersonal({
          id: personalId,
          firstName,
          lastName,
          gender,
          code,
          phone,
          birthDay,
          nationality,
          passport,
          salary
        });
        clearState();
      } else {
        addPersonal({
          id: uuidv1(),
          firstName,
          lastName,
          gender,
          code,
          phone,
          birthDay,
          nationality,
          passport,
          salary
        });
        clearState();
      }
    } else {
      alert("Please enter all field");
    }
  }

  function clearState(params) {
    setFirstName("");
    setLastName("");
    setPassport("");
    setSalary("");
    setNationality(null);
    setPhone(null);
    setPhoneCode(null);
    setGender(null);
    setBirthDay(null);
    setPersonalId(null);
  }

  function handleEditPersonal(data) {
    const {
      id,
      firstName,
      lastName,
      gender,
      code,
      phone,
      birthDay,
      nationality,
      passport,
      salary
    } = data;
    setFirstName(firstName);
    setLastName(lastName);
    setPassport(passport);
    setSalary(salary);
    setNationality(nationality);
    setPhone(phone);
    setPhoneCode(code);
    setGender(gender);
    setBirthDay(new Date(birthDay));
    setPersonalId(id);
  }

  return (
    <div className="App">
      <Container className="container">
        <Form className="mb-4" inline>
          <FormGroup className="col line">
            <Label className="label-form">Personal Form</Label>
          </FormGroup>
          <FormGroup className="col line">
            {firstNameInput}
            {lastNameInput}
          </FormGroup>
          <FormGroup className="col line">
            <Label className="mr-sm-2 label">Gender:</Label>
            <FormGroup className="mr-sm-2" check>
              <Label check className="label">
                <Input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                />{" "}
                Male
              </Label>
            </FormGroup>
            <FormGroup className="mr-sm-2" check>
              <Label check className="label">
                <Input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                />{" "}
                Female
              </Label>
            </FormGroup>
            <FormGroup className="mr-sm-2" check>
              <Label check className="label">
                <Input
                  type="radio"
                  name="gender"
                  value="Unisex"
                  checked={gender === "Unisex"}
                  onChange={() => setGender("Unisex")}
                />{" "}
                Unisex
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup className="col line">
            <FormGroup className="mr-sm-2 w-30">
              <Label className="mr-sm-2 label">Birthday:</Label>
              <DatePicker
                className="input-date"
                dateFormat="MM/dd/yy"
                selected={birthDay}
                onChange={date => setBirthDay(date)}
                placeholderText="mm/dd/yy"
                maxDate={new Date()}
              />
            </FormGroup>
            <FormGroup className="w-50">
              <Label className="mr-sm-2 label">Nationality:</Label>
              <Select
                className="input-select"
                classNamePrefix="react-select"
                options={formatOptionNationality(nationalityList)}
                onChange={value => setNationality(value)}
                placeholder="--- Please Select ---"
                value={nationality || ""}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup className="col line">
            <Label className="mr-sm-2 label">Mobile Phone:</Label>
            <Select
              className="input-phone-code"
              classNamePrefix="react-select"
              options={formatOptionData(phoneCode)}
              onChange={value => setPhoneCode(value)}
              value={code}
            />
            <div className="mr-1 ml-1">-</div>
            <Input
              className="input-text"
              type="text"
              pattern="[0-9]*"
              value={phone || ""}
              onChange={e => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="col line">{passportInput}</FormGroup>
          <FormGroup className="col line justify-content-between">
            {salaryInput}
            <Button className="btn-submit" onClick={handleSubmit}>
              Submit
            </Button>
          </FormGroup>
        </Form>
        <TableListPersonals
          personals={personals}
          deletePersonal={deletePersonal}
          handleEditPersonal={handleEditPersonal}
        />
      </Container>
    </div>
  );
}

const TableListPersonals = props => {
  const { personals, deletePersonal, handleEditPersonal } = props;
  const countData = 5;
  const pageCount = Math.ceil(personals.length / countData);

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(personals.slice(0, countData));
  }, [personals]);

  function handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * countData);
    setData(personals.slice(offset, offset + countData));
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-end w-100">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="page-active"
          pageClassName="page"
          pageLinkClassName="page-link"
          nextLinkClassName="next-link"
          previousLinkClassName="previous-link"
        />
      </div>
      <Table hover>
        <thead>
          <tr className="font-white">
            <th></th>
            <th className="text-left">Name</th>
            <th>Gender</th>
            <th>Mobile Phone</th>
            <th>Nationality</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return (
              <tr key={item.id} className="font-white">
                <th scope="row">
                  <input type="checkbox" />
                </th>
                <td className="text-left">
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.gender}</td>
                <td>
                  {item.code.value}
                  {item.phone}
                </td>
                <td>{item.nationality.value}</td>
                <td>
                  <Button
                    className="btn-table light-green"
                    onClick={() => handleEditPersonal(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn-table light-purple"
                    onClick={() => deletePersonal(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

const formatOptionData = values => {
  return values.map(item => {
    return {
      value: `+${item.Code}`,
      label: `+${item.Code}`
    };
  });
};

const formatOptionNationality = values => {
  return values.map(item => {
    return {
      value: item.nationality,
      label: item.nationality
    };
  });
};

function useTextInput(props) {
  const { type, label, name, placeholder, data } = props;

  const [value, setValue] = useState(data);

  const input = (
    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      <Label className="mr-sm-2 label">{label}:</Label>
      <Input
        className="input-text"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </FormGroup>
  );
  return [value, input, setValue];
}

function bindActions(dispatch) {
  return {
    addPersonal: data => dispatch(addPersonal(data)),
    editPersonal: data => dispatch(editPersonal(data)),
    deletePersonal: id => dispatch(deletePersonal(id)),
    getListPersonals: () => dispatch(getListPersonals())
  };
}

const mapStateToProps = state => ({
  personals: state.personals
});

export default connect(mapStateToProps, bindActions)(App);
