import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'
import Heading from 'YesterTech/Heading'

interface CheckoutBillingProps {
  onSubmit(fields: ReturnType<typeof serializeForm>): void
}

const states = []
let callCount = -1

function useState(defaultValue) {
  const id = ++callCount

  function setState(newValue) {
    // assign new value
    // re-render
    states[id][0] = typeof newValue === 'function' ? newValue(defaultValue) : newValue
  }

  const tuple = [defaultValue, setState]
  states.push(tuple)

  return tuple
}

const CheckoutBilling: React.FC<CheckoutBillingProps> = ({ onSubmit, someValue }) => {
  if (someValue) {
    return null
  }

  const [sameAsBilling, setSameAsBilling] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = serializeForm(event.target as HTMLFormElement, {
      hash: true,
    })
    onSubmit(fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing" autoComplete="off">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input id="billing:name" type="text" name="billingName" autoComplete="off" />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input id="billing:address" type="text" name="billingAddress" />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => {
              console.log('Changing')
              setSameAsBilling(!sameAsBilling)
            }}
          />{' '}
          <span>Same as Billing</span>
        </label>

        {!sameAsBilling ? (
          <div className="spacing">
            <div className="form-field">
              <label htmlFor="shipping:name">Name</label>
              <input id="shipping:name" type="text" name="shippingName" autoComplete="off" />
            </div>
            <div className="form-field">
              <label htmlFor="shipping:address">Address</label>
              <input id="shipping:address" type="text" name="shippingAddress" autoComplete="off" />
            </div>
          </div>
        ) : null}

        <footer>
          <button type="submit" className="button">
            Submit
          </button>
        </footer>
      </form>
    </div>
  )
}

export default CheckoutBilling
