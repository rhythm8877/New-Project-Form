"use client"

import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../styles/ProjectForm.css"

const activityOptions = {
  'Elementary': [
    'New Govt. Primary School', 'Const. of New Building', 'Boys toilet',
    'Girls toilet', 'Boys toilet (Rejuvenation)', 'Girls toilet (Rejuvenation)',
    'Additional Classrooom', 'Augmentation of EBRC', 'Boundary Wall',
    'Boundary Wall (Rejuvenation)', 'Dilapidated Classrooms (Primary)',
    'Dilapilated Classroom (Upper Primary)', 'Drinking Water Facility',
    'Electrification', 'Electrification (Rejuvenation)', 'Major Repair',
    'Major Repair (Rejuvenation)', 'Rain Water Harvesting',
    'Upgradation of School (6-8)', 'Dilapilated Building (Primary)',
    'Dilapilated Building (Upper Primary)'
  ],
  'Secondary': [
    'Additional Classroom', 'Art & Craft Room', 'Boundary Wall (Rejuvenation)',
    'Boys Toilet', 'Boys Toilet (Rejuvenation)', 'Girls Toilet',
    'Girls Toilet (Rejuvenation)', 'Computer Room', 'Drinking Water',
    'Library Room', 'Major Repair', 'Major Repair (Rejuvenation)',
    'New Secondary School (Section 1)', 'New Secondary School (Section 2)',
    'Rain Water Harvesting', 'Ramp', 'Residential Quarter',
    'Integrated Science Lab', 'Dilapidated Building', 'Electrification',
    'Upgradation to Secondary'
  ],
  'Higher Secondary': [
    'Additional Classroom (Examination Hall)', 'Additional Classroom',
    'Art & Craft Room', 'Computer Room', 'Dilapidated Building',
    'Girls Toilet', 'Boys Toilet', 'Library Room',
    'New Higher Secondary (Arts Stream)', 'New Higher Secondary (Science Stream)',
    'Upgradation to Higher Secondary', 'Rainwater Harvesting', 'Electrification'
  ],
  'PM Shri': [
    'Major Repair', 'Solar Panel', 'Boys Toilet', 'Girls Toilet',
    'Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Library Room'
  ],
  'KGBV-IV': [
    'Boundary Wall'
  ],
  'NSCBAV': [],
  'DA JGUA': []
}

function ProjectForm() {
  const [formData, setFormData] = useState({
    udise: "",
    schoolCategory: "",
    schoolName: "",
    district: "",
    activity: ""
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted] = useState(false)

  const districts = [
    "Chümoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Meluri",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tuensang",
    "Tseminyü",
    "Wokha",
    "Zunheboto",
  ]

  const categories = ["Elementary", "Secondary", "Higher-Secondary", "PM Shri", "NSCBAV", "DA JGUA", "KGBV-IVEBRC"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
      // Clear activity when school category changes
      ...(name === 'schoolCategory' && { activity: '' })
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  if (isSubmitted) {
    return <SuccessAnimation />
  }

  const hasActivities = formData.schoolCategory && activityOptions[formData.schoolCategory]?.length > 0

  return (
    <div className="app-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <header>
        <p className="logo">New Project Form</p>
      </header>
      
      <div className="form-wrapper">
        <div className="form-field">
          <p className="udise-label" id="udise-label">
            UDISE (11 digits) <span className="required">*</span>
          </p>
          <input
            type="number"
            id="udise"
            name="udise"
            value={formData.udise}
            onChange={handleChange}
            className={errors.udise ? "error" : ""}
            placeholder="Enter 11-digit UDISE number"
          />
          {errors.udise && <div className="error-message">{errors.udise}</div>}
        </div>

        <div className="form-row">
          <div className="form-column">
            <div className="form-field">
              <p className="udise-label" id="schoolCategory-label">
                School Category <span className="required">*</span>
              </p>
              <select
                id="schoolCategory"
                name="schoolCategory"
                value={formData.schoolCategory}
                onChange={handleChange}
                className={errors.schoolCategory ? "error" : ""}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.schoolCategory && <div className="error-message">{errors.schoolCategory}</div>}
            </div>
          </div>

          <div className="form-column">
            <div className="form-field">
              <p className="udise-label" id="schoolName-label">
                School Name <span className="required">*</span>
              </p>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className={`common-input ${errors.schoolName ? "error" : ""}`}
                placeholder="Enter school name"
              />
              {errors.schoolName && <div className="error-message">{errors.schoolName}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <div className="form-field">
              <p className="udise-label" id="activity-label">
                Activity <span className="required">*</span>
              </p>
              {formData.schoolCategory ? (
                hasActivities ? (
                  <select
                    id="activity"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    className={errors.activity ? "error" : ""}
                  >
                    <option value="">Select Activity</option>
                    {activityOptions[formData.schoolCategory].map((activity, index) => (
                      <option key={index} value={activity}>
                        {activity}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    id="activity"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    className={`common-input ${errors.activity ? "error" : ""}`}
                    placeholder="Enter activity"
                  />
                )
              ) : (
                <select
                  id="activity"
                  name="activity"
                  value=""
                  disabled
                  className={errors.activity ? "error" : ""}
                >
                  <option value="">Please select a school category first</option>
                </select>
              )}
              {errors.activity && <div className="error-message">{errors.activity}</div>}
            </div>
          </div>

          <div className="form-column">
            <div className="form-field">
              <p className="udise-label" id="district-label">
                District <span className="required">*</span>
              </p>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={errors.district ? "error" : ""}
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && <div className="error-message">{errors.district}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Submit button removed */}
    </div>
  )
}

export default ProjectForm 