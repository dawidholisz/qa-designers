import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const validationSchema = Yup.object().shape({
  location: Yup.string().required('Required'),
})

const DialogModal = ({ isVisible, setLocation, closeModal, header, description }) => {
  return (
    <div className={classNames('modal', { '-visible': isVisible })} data-testId="location-modal">
      <Formik
        initialValues={{ location: localStorage.getItem('weatherLocation') }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setLocation(values.location)
            setSubmitting(false)
          }, 400)
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <div className="modal__dialog">
            <button className="close-button" data-testid="close-button" onClick={closeModal}>
              <FontAwesomeIcon icon="times" size="lg" />
            </button>

            <h1>{header}</h1>
            <form onSubmit={handleSubmit}>
              <div className="modal__description">
                <p>{description}</p>
              </div>
              <div className="modal__input">
                <label htmlFor="location">Localization:</label>
                <input
                  name="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Weather Location"
                  type="text"
                  value={values.location}
                  data-testId="city-input"
                />
                {errors.location && touched.location && errors.location}
              </div>
              <button className="set-button" disabled={isSubmitting} type="submit" data-testid="save-city-btn">
                Set
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

DialogModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string,
  setLocation: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default DialogModal
