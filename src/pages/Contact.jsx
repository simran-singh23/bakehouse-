function Contact() {
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
            <p>     <strong>Orders:</strong> Custom cakes available on advance booking

            </p>
          </div>
        </div>

   <div className="rounded-lg border border-rose-100 bg-rose-50 p-6">
          <h3 className="text-2xl font-bold text-stone-950">Quick order note</h3>

          <form className="mt-5 grid gap-4">
      <input className="field" placeholder="Your name" />
            <input className="field" placeholder="Cake or item needed" />

            <textarea className="field min-h-32" placeholder="Flavour, date, message on cake..." />

            <button className="btn-main w-fit" type="button">          Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
