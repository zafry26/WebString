import * as React from "react";
import { Helmet } from "react-helmet";
import '@Styles/webcast/style.scss';
import { connect } from "react-redux";
import * as webshopStore from "@Store/webShopStore";
import * as s3Store from "@Store/s3Store";
import { Redirect, withRouter, useHistory  } from "react-router";
import { useState, useEffect } from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import { useFormik, Field, FieldArray, FieldProps, Form, Formik, getIn } from 'formik';
//import external JS
import { webCast} from "@WebCastUtils";

const validateStoreSummary = values => {
    const errors = {};
  
    if (!values.storeName) {
      errors.storeName = 'Required';
    } else if (values.storeName.length > 50) {
      errors.storeName = 'Must be 50 characters or less';
    }
  
    if (values.standout.length > 50) {
        errors.standout = 'Must be 50 characters or less';
    }
  
    return errors;
};

const validateCategory = values => {
    const errors = [{}];
    let hasError = false;

    //console.log(values);

    values.storeCategories.forEach((element, index) => {
        //console.log(element)
        if (element.categoryId == undefined ? !element.admStoreCategory?.id : !element.categoryId) {
            //console.log("masuk check error for store categories")
            errors[index] = {category : "Required"};
            hasError = true;
        } 
    });

    if(!hasError)
    {
        const errors = {};
        return errors;
    }

    return errors;
};

const validatePayment = values => {
    const errors = {};

    values.heroEducations.forEach(element => {
        if (element.qualification.length > 100) {
            errors.qualification = 'Must be 100 characters or less';
        }
    
        if (element.fromYear.length > 5) {
            errors.fromYear = 'Must be 5 characters or less';
        }
    
        if (element.toYear.length > 5) {
            errors.toYear = 'Must be 5 characters or less';
        }
    
        if (element.university.length > 100) {
            errors.university = 'Must be 100 characters or less';
        }
    
        if (element.state.length > 20) {
            errors.state = 'Must be 20 characters or less';
        }
    
        if (element.country.length > 20) {
            errors.country = 'Must be 20 characters or less';
        }
    });
  
    return errors;
};

const WebShopStore = (props) => {

    const [initialValues, setInitialValues] = React.useState({
        id: '',
        storeName: '',
        standout: '',
        fbUrl: '',
        instagramUrl: '',
        linkedInUrl: '',
        logo: '',
        storeCategories:[{
            id: '',
            categoryId : '',
            categoryName: '',
            storeCategorySizes : []
        }],
        storePayments:[{
            id:'',
            paymentId: ''
        }],
    });

    const [storeCategories, setStoreCategories] = React.useState([]);

    const handleAddition = (e, tag ,values) => {
        const storeCategory = values.storeCategories.map((image, index) => index === e ? 
            {
                ...values.storeCategories[e],
                storeCategorySizes : [...values.storeCategories[e].storeCategorySizes, {id:0, sizeCode: tag}]
            } 
            : {...values.storeCategories[index]}
        )

        setInitialValues((prevState) => ({
            ...prevState,
            storeCategories: storeCategory
        }));
    };

    const handleDeletion = (e, indexTo, values) => {
        let categorySizes = values.storeCategories[e].storeCategorySizes.splice(indexTo, 1)

        const categorySizesSplit = values.storeCategories.map((image, index) => index === e ? 
            {
                ...values.storeCategories[e],
                storeCategorySizes : values.storeCategories[e].storeCategorySizes
            } 
            : {...values.storeCategories[index]}
        )

        setInitialValues((prevState) => ({
            ...prevState,
            categorySizes: categorySizesSplit
        }));
    };

    useEffect(() => {
    }, [initialValues.storeCategories])

    useEffect(() => {
        async function getStore() {  
            await props.getAdmCategories().then((response) => {
                if(!response.hasErrors)
                {
                    if(response.value.value !== null && response.value.value !== undefined)
                    {
                        let responseData = response.value.value;
                       
                        setStoreCategories(responseData);
                    }
                }
            });

            await props.getStore().then((response) => {
                if(!response.hasErrors)
                {
                    if(response.value.value !== null && response.value.value !== undefined)
                    {
                        let responseData = {...response.value.value};

                        setInitialValues((prevState) => ({
                            ...prevState,
                            storeName : responseData.storeName,
                            logo : responseData.logo,
                            fbUrl : responseData.fbUrl,
                            standout : responseData.standout,
                            instagramUrl : responseData.instagramUrl,
                            linkedInUrl : responseData.linkedInUrl,
                        }));

                        if(responseData.storeCategories !== null && responseData.storeCategories.length > 0)
                        {
                            setInitialValues((prevState) => ({
                                ...prevState,
                                storeCategories : responseData.storeCategories.map(elem => (
                                {
                                    id: elem.id,
                                    categoryName: elem.admStoreCategory.categoryName,
                                    categoryId : elem.admStoreCategory.id,
                                    storeCategorySizes : elem.storeCategorySizes.map(elem => (
                                    {
                                        id: elem.id,
                                        sizeCode: elem.sizeCode,
                                    } 
                                    )),
                                } 
                                )),
                            }));
                        }
                    }
                }
            });
        }

        getStore()
    }, [])

    const selectFileHandler = async (event, value, module, section, index) =>{
        //1. define the array for the file type e.g. png, jpeg
        const fileTypes = ['image/png', 'image/jpeg'];
 
        // 2. set the file type
        let file = event.target.files[0];
        let fileName = event.target.files[0].name;
        //  console.log(`File ${file}`);
        //  console.log(`File ${fileName}`);

        // 3. the message for error if the file type of not matched
        let errMessage = [];

        // 4. to check the file type to match with the fileTypes array iterate 
        // through the types array
        // if(fileTypes.every(extension=> file[0].type !=extension)){
        //     errMessage.push(`The file ${file.type} extension is not supported`);
        // } else {}

        // 5. upload to s3 bucket
        await UploadS3(value, file, fileName, module, section, index)
     };

    const UploadS3 = async (value, file, fileName, module, section, index) => {
        await props.uploadImage(file, fileName, module, section).then((response) => {
            if(!response.hasErrors)
            {
                setInitialValues((prevState) => ({
                    ...value,
                    logo : response.value,
                }));
            
            }
        });
    }

    const history = useHistory()

    const routeChange=()=> {
        const current = props.location.pathname;
        props.history.replace(`/reload`);
        setTimeout(() => {
            props.history.replace(current);
        });
    }

    return <div>
        <Helmet>
            <title>Web Cask - Manage Casting</title>
        </Helmet>
        
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 text-center p-0 mt-3 mb-2">
                    <div className="card px-0 pt-1 pb-0 mt-0 mb-3">
                        <h2 id="heading">Create your own Webshop Store</h2>
                        <p>Fill necessary form field to register your own store</p>
                        <div id="msform">
                            <ul id="progressbar">
                                <li className="bi bi-person-bounding-box active" id="heroField"><strong>Store Summary</strong></li>
                                <li className="bi bi-person-lines-fill" id="summaryField"><strong>Store Category</strong></li>
                                <li className="bi bi-briefcase-fill" id="experienceField"><strong>Store Payment</strong></li>
                                <li className="bi bi-check-lg" id="confirm"><strong>Finish</strong></li>
                            </ul>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <br/>
                            <Formik enableReinitialize={true} className="needs-validation"
                                initialValues={initialValues}
                                onSubmit= { async (values, event) => {
                                    await props.addStoreSummary(values).then((response) => {
                                        if(!response.hasErrors)
                                        {
                                           webCast();
                                        }
                                    });
                                }}
                                validate={validateStoreSummary}
                            >
                                {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
                                <Form>
                                    <div className="form-card">
                                        <div className="row">
                                            <div className="col-6">
                                                <h3 className="fs-title">Store Summary:</h3>
                                            </div>
                                        </div>
                                        <div className="webcast-input-field position-relative">
                                            <label htmlFor="storeName" className="fieldlabels">Store Name: *</label>
                                            <input type="text" name="storeName" id="storeName" placeholder="Store Name" 
                                            className={(errors.storeName) ? 'form-control is-invalid' : 'form-control'}
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.storeName}/>
                                            {errors.storeName ? <div className="invalid-tooltip">{errors.storeName}</div> : null}
                                        </div>
                                        <div className="webcast-input-field position-relative">
                                            <label htmlFor="standout" className="fieldlabels">Standout Message: </label>
                                            <input id="standout" type="text" name="standout" placeholder="Standout Message" 
                                            className={(errors.standout) ? 'form-control is-invalid' : 'form-control'}
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.standout}/>
                                            {errors.standout ? <div className="invalid-tooltip">{errors.standout}</div> : null}
                                        </div>
                                        <div className="webcast-input-field position-relative">
                                            <label htmlFor="fbUrl" className="fieldlabels">FB Link: </label>
                                            <input id="fbUrl" type="text" name="fbUrl" placeholder="FB Link" 
                                            className={(errors.fbUrl) ? 'form-control is-invalid' : 'form-control'}
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.fbUrl}/>
                                            {errors.fbUrl ? <div className="invalid-tooltip">{errors.fbUrl}</div> : null}
                                        </div>
                                        <div className="webcast-input-field position-relative">
                                            <label htmlFor="instagramUrl" className="fieldlabels">Instagram Link: </label>
                                            <input type="text" name="instagramUrl" id="instagramUrl" placeholder="Instagram Link" 
                                            className={(errors.instagramUrl) ? 'form-control is-invalid' : 'form-control'}
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.instagramUrl}/>
                                            {errors.instagramUrl ? <div className="invalid-tooltip">{errors.instagramUrl}</div> : null}
                                        </div>
                                        <div className="webcast-input-field position-relative">
                                            <label htmlFor="linkedInUrl" className="fieldlabels">LinkedIn Link: </label>
                                            <input id="linkedInUrl" type="text" name="linkedInUrl" placeholder="LinkedIn Link" 
                                            className={(errors.linkedInUrl) ? 'form-control is-invalid' : 'form-control'}
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.linkedInUrl}/>
                                            {errors.linkedInUrl ? <div className="invalid-tooltip">{errors.linkedInUrl}</div> : null}
                                        </div>
                                        <div className="webcast-input-field position-relative">
                                            <label htmlFor="logo" className="fieldlabels">Logo: </label>
                                            <input id="logo" type="file" name="logo" placeholder="Logo"
                                            onChange={(e) => selectFileHandler(e, values, "webshop", "storeSummary")}/>
                                            {errors.logo ? <div className="invalid-tooltip">{errors.logo}</div> : null}
                                        </div>
                                        {values.logo !== "" && values.logo !== undefined ? 
                                            <div className="webcast-input-field position-relative">
                                                <img id="background" style={{width:"100%"}} src={values.logo} alt="your image" />
                                            </div>
                                            : null
                                        }
                                    </div>
                                    <input type="submit" name="next" className="next action-button" disabled={isSubmitting} value="Next"/>
                                </Form>
                                )}
                            </Formik>
                            <Formik enableReinitialize={true} className="needs-validation"
                                initialValues={initialValues}
                                onSubmit= { async (values, event) => {
                                    await props.addStoreCategory(values).then((response) => {
                                       if(!response.hasErrors)
                                       {
                                            let responseData = {...response.value.value};

                                            if(responseData.storeCategories.length > 0)
                                            {
                                                setInitialValues((prevState) => ({
                                                    ...prevState,
                                                    storeCategories : responseData.storeCategories,
                                                }));
                                            }
                                       }
                                    });
                                }}
                                validate={validateCategory}
                            >
                                {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
                                <Form>
                                    <div className="form-card">
                                        <div className="row">
                                            <div className="col-6">
                                                <h2 className="fs-title">Store Category:</h2>
                                            </div>
                                        </div>
                                        <FieldArray name="storeCategories">
                                        {({ push, remove }) => (
                                            <div>
                                            {values.storeCategories.map((value, index) => {
                                                return (
                                                    <div className="row mb-2">
                                                        <fieldset className="border p-2" key={index}>
                                                            <div className="webcast-input-field position-relative">
                                                                <label className="fieldlabels">Category: *</label>
                                                                <select
                                                                    name={`storeCategories[${index}].categoryId`}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={value.categoryId}
                                                                    style={{ display: "block" }}
                                                                    className={(errors[index]?.category) ? 'form-control is-invalid' : 'form-control'}
                                                                >
                                                                    <option value="" label="Select a category">
                                                                        Select a category{" "}
                                                                    </option>
                                                                    {
                                                                        storeCategories && storeCategories.map(value => (
                                                                            <option value={value.id} key={value.id}>{value.categoryName}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {errors[index]?.category ? <div className="invalid-tooltip">{errors[index]?.category}</div> : null}
                                                            </div>
                                                            <div className="webcast-input-field position-relative">
                                                                <label className="fieldlabels">Sizes: </label>
                                                                <ReactTags className="col-6"
                                                                    tags={values.storeCategories[index].storeCategorySizes.map(value => (
                                                                        {
                                                                            id: value.id,
                                                                            text: value.sizeCode
                                                                        } 
                                                                    ))}
                                                                    // suggestions={suggestions}
                                                                    // delimiters={delimiters}
                                                                    handleDelete={(e) => handleDeletion(index, e, values)}
                                                                    handleAddition={(e) => handleAddition(index, e, values)}
                                                                    // handleDrag={handleDrag}
                                                                    // handleTagClick={handleTagClick}
                                                                    //inputFieldPosition="bottom"
                                                                    //autocomplete
                                                                />
                                                            </div>
                                                        </fieldset>
                                                        <button type="button" onClick={() => remove(index)} 
                                                        className="btn btn-primary"><i className="bi bi-dash-circle"></i><span>&nbsp;&nbsp;</span>Remove Category</button>
                                                    </div>
                                                );
                                            })}
                                            <div className="row">
                                                <button type="button" onClick={() => push({ 
                                                    id: '',
                                                    categoryId: '',
                                                    categoryName: '',
                                                    storeCategorySizes: [],
                                                })} 
                                                className="btn btn-primary"><i className="bi bi-plus-circle"></i><span>&nbsp;&nbsp;</span>Add Category</button>
                                            </div>
                                            </div>
                                        )}
                                        </FieldArray>
                                    </div>
                                    <input type="submit" name="next" className="next action-button" disabled={isSubmitting} value="Next"/>
                                    <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                                </Form>
                                )}
                            </Formik>
                            <Formik enableReinitialize={true} className="needs-validation"
                                initialValues={initialValues}
                                onSubmit= { async (values, event) => {
                                    await props.storePayment(values).then((response) => {
                                       if(!response.hasErrors)
                                       {
                                            if(response.value.value !== null)
                                            {
                                                let responseData = {...response.value.value};

                                                if(responseData.heroEducations.length > 0)
                                                {
                                                   
                                                }
                                            }
                                            webCast();
                                       }      
                                    });
                                }}
                                validate={validatePayment}
                            >
                                {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
                                <Form>
                                    <div className="form-card">
                                        <div className="row">
                                            <div className="col-6">
                                                <h2 className="fs-title">Store Payment:</h2>
                                            </div>
                                        </div>
                                        <FieldArray name="storePayments">
                                        {({ push, remove }) => (
                                            <div>
                                            {values.storePayments.map((value, index) => {
                                                return (
                                                    <div className="row mb-2">
                                                        <fieldset className="border p-2" key={index}>
                                                            <div className="webcast-input-field position-relative">
                                                                {/* <div onClick={() => remove(index)}>x</div> */}
                                                                <label className="fieldlabels">Qualification: </label>
                                                                <input type="text" name={`storePayments[${index}].qualification`} placeholder="Qualification"
                                                                className={(errors.qualification) ? 'form-control is-invalid' : 'form-control'}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} 
                                                                value={value.qualification}/>
                                                                {errors.qualification ? <div className="invalid-tooltip">{errors.qualification}</div> : null}
                                                            </div>
                                                            <div className="webcast-input-field position-relative">
                                                                <label className="fieldlabels">From Year: </label>
                                                                <input id="fromYear" type="text" name={`heroEducations[${index}].fromYear`} placeholder="From Year"
                                                                className={(errors.fromYear) ? 'form-control is-invalid' : 'form-control'}
                                                                onChange={handleChange} 
                                                                onBlur={handleBlur} 
                                                                value={value.fromYear}/>
                                                                {errors.fromYear ? <div className="invalid-tooltip">{errors.fromYear}</div> : null}
                                                            </div>
                                                        </fieldset>
                                                        <button type="button" onClick={() => remove(index)} 
                                                        className="btn btn-primary"><i className="bi bi-dash-circle"></i><span>&nbsp;&nbsp;</span>Remove Education</button>
                                                    </div>
                                                );
                                            })}
                                            <div className="row">
                                                <button type="button" onClick={() => push({ qualification: '',
                                                fromYear: '',
                                                toYear: '',
                                                university: '',
                                                state: '',
                                                country: '', })} 
                                                className="btn btn-primary"><i className="bi bi-plus-circle"></i><span>&nbsp;&nbsp;</span>Add Education</button>
                                            </div>
                                            </div>
                                        )}
                                        </FieldArray>
                                    </div>
                                    <input type="submit" name="next" className="next action-button" disabled={isSubmitting} value="Next"/>
                                    <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                                </Form>
                                )}
                            </Formik>
                            <form>
                                <div className="form-card">
                                    <div className="row">
                                        <div className="col-6">
                                            <h2 className="fs-title">Finish:</h2>
                                        </div>
                                        <div className="col-6">
                                        </div>
                                    </div>
                                    <br></br>
                                    <h2 className="purple-text text-center"><strong>SUCCESS !</strong></h2>
                                    <br/>
                                    <div className="row justify-content-center">
                                        <div className="col-3">
                                            <img src="https://i.imgur.com/GwStPmg.png" className="fit-image" />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row justify-content-center">
                                        <div className="col-8 text-center">
                                            <h5 className="purple-text text-center">You Have Successfully Created Webcast</h5>
                                        </div>
                                    </div>
                                </div>
                                <input type="button" name="done" className="next action-button" onClick={routeChange} value="Done"/>
                                <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

// Connect component with Redux store.
var connectedComponent = connect(
    state => state.webshop, // Selects which state properties are merged into the component's props.
    {...s3Store.actionCreators, ...webshopStore.actionCreators}, // Selects which action creators are merged into the component's props.
)(WebShopStore);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components, 
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);