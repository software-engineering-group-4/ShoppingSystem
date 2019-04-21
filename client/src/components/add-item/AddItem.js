import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addItem, getCategories } from '../../actions/itemActions';
import {InputGroup, DropdownButton, Image, Row, Col, FormControl} from 'react-bootstrap';
import axios from 'axios';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      category: '',
      value: 0.0,
      images:[{}],
      img:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
     axios.get('api/items/images')
      .then(function(response){
        this.setState({images:response.data});
      }.bind(this))
      .catch(function(err){
        this.setState({images:'error loading image files from the server', img:''})
      }.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const itemData = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      images: this.state.img,
      value: this.state.value
    };
    console.log(itemData)
    this.props.addItem(itemData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

   handleSelect(img){
    this.setState({
      img: '/images/'+ img
    })
  }

  render() {
    const { errors } = this.state;

    const imgList = this.state.images.map(function(imgArr, i){
      return(
        <DropdownButton key={i} eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</DropdownButton>
      )
    }, this)

    // Select options for status

    const { categories } = this.props.category;

    let categoryOptions = [{}];
    if (
      categories !== null &&
      categories !== undefined &&
      categories.length > 0
    ) {


      categories.map(ca => {
        categoryOptions.push({ label: ca.category, value: ca.category });
      });
    } else {
      categoryOptions.push({ label: 'No available category', value: 0 });
    }

    return (
        <Row>
      <Col xs={12} sm={6}>
      <div className="add-item-">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add New Item</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Item Name"
                />

                <TextFieldGroup
                  placeholder="* Detail Information"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Detail Information"
                />

                <SelectListGroup
                  placeholder="* Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  options={categoryOptions}
                  error={errors.category}
                  info="Category"
                />

                <TextFieldGroup
                  placeholder="* Value"
                  name="value"
                  type="number"
                  value={this.state.value}
                  onChange={this.onChange}
                  info="Price"
                  error={errors.value}
                />

                <TextFieldGroup
                  type="submit"
                  value="Submit"
                  className="btn btn-secondary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      </Col>

      <Col xs={12} sm={6}>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an image"
                  bsStyle="primary">
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive/>
      </Col>
        </Row>
    );
  }
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  item: state.item,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addItem, getCategories }
)(AddItem);
