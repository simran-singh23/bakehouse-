import { useState } from 'react'

const ownerWhatsappNumber = '917626900391'

function Contact() {
  const [note, setNote] = useState({
    name: '',
    item: '',
    message: '',
  })

  function handleChange(event) 
  {
    const { name, value } = event.target

    setNote((oldNote) => ({
      ...oldNote,
      [name]: value,
    }))
  }

 
  function sendEnquiry(event)
   {
    event.preventDefault()

    const whatsappMessage = `
New Enquiry - Bawra Bake House

Customer Name: ${note.name}
Item Needed: ${note.item}
Message: ${note.message}
`

    const whatsappLink = `https://wa.me/${ownerWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappLink, '_blank')

    setNote({
      name: '',
      item: '',
      message: '',
    })
  }

  return (
    <section className="section-wrap">

      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="tag">Visit us</p>
          <h2 className="mt-3 text-4xl font-black text-stone-950">Patiala Chowk, Shiva Enclave</h2>

          <p className="mt-4 leading-8 text-stone-600">
            Bawra Bake House, Zirakpur. Drop by for fresh cakes, dessert cups and warm savouries.
          </p>
          <div className="mt-6 space-y-3 text-stone-700">
            <p>
              <strong>Location:</strong> Shiva Enclave, Patiala Chowk, Zirakpur
            </p>
            <p>
              <strong>Timing:</strong> 10:00 AM to 9:00 PM
            </p>
            <p>
              <strong>Orders:</strong> Custom cakes available on advance booking
            </p>
          </div>
        </div>


        <div className="rounded-lg border border-rose-100 bg-rose-50 p-6">

          <h3 className="text-2xl font-bold text-stone-950">Quick order note</h3>

          <form className="mt-5 grid gap-4" onSubmit={sendEnquiry}>
            <input
              className="field" name="name"  onChange={handleChange}  placeholder="Your name"  required value={note.name}
            />
            <input className="field" name="item"  onChange={handleChange}
              placeholder="Cake or item needed"
              required
              value={note.item}
            />

            <textarea    className="field min-h-32"name="message"  onChange={handleChange}
              placeholder="Flavour, date, message on cake..."   required
              value={note.message}
            />

            <button className="btn-main w-fit" type="submit">
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
