import { useState, useRef } from 'react'
import { Heading } from 'course-platform/Heading'

const initialFormValues = {
  fullName: '',
  username: '',
}

export function AddStudentForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [autoUsername, setAutoUsername] = useState(true)

  const fullNameRef = useRef<HTMLInputElement>(null!)

  function setField(field: string, value: string) {
    setFormValues({ ...formValues, [field]: value })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    console.log(formValues)
    setFormValues(initialFormValues)
    fullNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="card spacing">
      <Heading>Add Student</Heading>
      <div className="field-wrap">
        <label htmlFor="full-name">Full Name</label>
        <input
          ref={fullNameRef}
          id="full-name"
          type="text"
          className="form-field"
          value={formValues.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
          required
        />
      </div>

      <div className="field-wrap">
        <label htmlFor="username">Username</label>
        <input
          value={
            autoUsername
              ? formValues.fullName.toLowerCase().replaceAll(/\s/g, '')
              : formValues.username
          }
          id="username"
          type="text"
          className="form-field"
          onChange={(e) => setField('username', e.target.value)}
          required
          autoComplete="off"
        />
      </div>

      <div>
        <label className="vertical-middle horizontal-spacing">
          <input
            type="checkbox"
            checked={autoUsername}
            onChange={(e) => setAutoUsername(!autoUsername)}
          />
          <span>Auto Username</span>
        </label>
      </div>

      <hr />
      <button type="submit" className="button">
        s Add Student
      </button>
    </form>
  )
}
