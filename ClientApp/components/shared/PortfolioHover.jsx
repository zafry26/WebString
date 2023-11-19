import * as React from "react";
import { Formik, Field } from 'formik';
import FormValidator from "@Components/shared/FormValidator";
import { useState } from "react";

const PortfolioHover = ({stateChanger}) => {

    const formValidator = React.useRef(null);

    const onSubmitForm = (values) => {
        if (!formValidator.current.isValid()) {
            // Form is not valid.
            return;
        }
        props.onSubmit(values);
    }

    const handleClick = () => {
        stateChanger(true)
      }

    // This function will be passed to children components as a parameter.
    // It's necessary to build custom markup with controls outside this component.
    //const renderEditor = (values) => {
        return <div>
               <a onClick = {handleClick} data-gallery="portfolioGallery"
                    className="portfolio-lightbox" title="Stand Out App"><i className="bx bx-plus"></i></a>
                <a onClick = {handleClick} className="portfolio-details-lightbox" data-glightbox="type: external"
                    title="Portfolio Details"><i className="bx bx-link"></i></a>
        </div>;
    //}

    //return renderEditor;

    // <a href="assets/img/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery"
    //                 className="portfolio-lightbox" title="Stand Out App"><i className="bx bx-plus"></i></a>
    //             <a href="portfolio-details.html" className="portfolio-details-lightbox" data-glightbox="type: external"
    //                 title="Portfolio Details"><i className="bx bx-link"></i></a>

    {/* return <Formik
        enableReinitialize
        initialValues={props.data}
        onSubmit={(values, { setSubmitting }) => {
            onSubmitForm(values);
        }}
    >
        {({ values, handleSubmit }) => {
            // Let's say that the children element is a parametrizable function.
            // So we will pass other elements to this functional component as children
            // elements of this one:
            // <PersonEditor>
            // {(renderEditor, handleSubmit) => <>
            //     {renderEditor()}
            //     <button onClick={x => handleSubmit()}>Submit</button>
            // </>}
            // </PersonEditor>.
            return props.children(() => renderEditor(values), handleSubmit);
        }}
    </Formik>; */}
}

export default PortfolioHover;