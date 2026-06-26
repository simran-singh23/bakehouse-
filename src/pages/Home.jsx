import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Hero from '../components/Hero'

const ownerWhatsappNumber = '917626900391'

function Home() {
  const [note, setNote] = useState({
    name: '',
    email: '',
    message: '',
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const sendEnquiry = (e) => {
    e.preventDefault()

    const whatsappMessage = `
New Enquiry from Bawra Bakehouse Website

Name: ${note.name}
Email: ${note.email}
Message: ${note.message}
`
    const whatsappLink = `https://wa.me/${ownerWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappLink, '_blank')
    setNote({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <>
      <Hero />

     
      <section className="py-24 bg-surface-container-low paper-texture" id="specialties">

        <div className="max-w-container-max mx-auto px-margin-desktop">

          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              The Baker's Signature
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Discover our collection of obsession-worthy treats, each crafted without eggs but with immense heart.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            
            <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container-high h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7CR71KjwsHqL6TIOOgsqvswkkfqd5rbpmYAleRBinComeLNDrGTkHGijF9mLOP5ulNhjVtoDsNhtKS4kzXsJmAnpaZNRl1-pGGN1zK1ZDZlR-Gw9x0hIen2iaO9YBPFfuKvIFxqt3ooFCEE6X9r2fMy8V3ba9Oeiy2oYnDLbQNzQXeW8NXGMbmoTtFMOUf-ZAWjMvoV6t8OmJtpYT1n8xQrN39K38vNcvlhU2GPcWyud2wLhvwTC2gPytMJkueSP1w6Q3fpNtGmc')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-[#d9e7cf] text-[#56624f] px-3 py-1 rounded-full text-xs font-label-md mb-3 inline-block">
                  Best Seller
                </span>
                <h3 className="font-headline-md text-headline-md mb-2">Velvety Red Velvet</h3>

                <p className="font-body-md text-body-md opacity-90">
                  A deep, cocoa-infused sponge topped with our signature clotted cream frosting.
                </p>
              </div>
            </div>

          
            <NavLink
              to="/brownies"
              aria-label="Open brownie order page"
              className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-surface-container-high h-[400px] block focus:outline-none focus:ring-4 focus:ring-secondary/40"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"

                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCagSgH5PWAoKImqVX2gfP9x2aollmVN4aIzPsEd51x47IrOLbUvtaB4jDpdOZ_Z0ZUw3kIDbC-SrFzd1dMlddwLllrDZkH8-h6hPK061uQTi1tBP1EW4DoC9938aMLVgQfce0CAng3AoP_61rRht62W93YXhUjRvae2Jq2WqOH0-BQ3IhnLkjdXTON_ZcS8v7_MvYV0iAMK0kMuDJkl4LtCVuMku7U2Y2Xzu4lIkIi1s_RB1SN5MGbyCXgnvXmMzUllkjpDCSmqso')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline-md text-headline-md mb-2">Crunchy Walnut Brownies</h3>
                <p className="font-body-md text-body-md opacity-90">
                  Fudgy dark chocolate bliss with toasted premium walnuts.
                </p>
              </div>
            </NavLink>


            <NavLink
              to="/ice-creams"
              aria-label="Open ice cream order page"
              className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-surface-container-high h-[400px] block focus:outline-none focus:ring-4 focus:ring-secondary/40"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5IIXvcSubsMwR2FXHuH-HTOpoNqiqWiS4Lb3W0jwR9MvF6h4RUMp_LpoW4wpy1koF3X4cu6XTD-wN3ezB3WxJmuxBlmC_wpmKRK0CGzm-cG3JGJVd4mJ9dJDXDVgnB8K3GPJEjiIVy05pfVvWZpzRR6rPU-VvCa3ZjZBqOFcnL5NjQG5WzNkAjIw6Luens0XOGMOOImte93TyugU9WRMACdDpai6B-qMZadTTKPvuAV1lRikLAhxgurDrqR4pZmu8HDxyC_qVG98')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline-md text-headline-md mb-2">hocco </h3>
                <p className="font-body-md text-body-md opacity-90">
                  good taste ice cream with chocolate and nuts
                </p>
              </div>
            </NavLink>

            <NavLink
              to="/menu"
              aria-label="Open cake order page"
              className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container-high h-[400px] block focus:outline-none focus:ring-4 focus:ring-secondary/40"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6Yg66lzCtJ8df0YXlXpOL-JVb1l0DOTydI4T-6WUqtCmVfm5EEFBHierF0f6PtMv0VkLz-Pt63RTBF0VQ5D8N59Z7lrv3prq--DSrbKZ_mgfeVXmQoB_EX_89FcVTS6_LA9105hDrsDpIDv13_IB7KsmiYDFo7wYbFJKFozP91HtGQc5uo_hz81z73nSUad8CJeI8WHHMNfcG_jzNh3xAcNeN9vDitG4sNm4UJwqYfLtcdw5ocEP_r4VLZ3QIhv9p0c3kv65CYoY')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline-md text-headline-md mb-2">The Bawra Assortment</h3>
                <p className="font-body-md text-body-md opacity-90">
                  A curated collection for those who want to experience every 
                  facet of our passion.
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-background" id="story">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
              <div className="relative rounded-[60px] overflow-hidden border-[12px] border-surface-container shadow-xl">
                <div
                  className="w-full aspect-[4/5] bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2F0CPngqU3VfMsPKfwBXAioykJc5zVcMxeddSxfSrSyX_ser58cs-98UOA2L9nLRJ38lrp4DENMP190rwl63W1qQYYexdhXBpInAB5ocZm890mS3Ab42XQWOq-5esxH7wfpgVumW-zwVW8agAI_EiKLJEAOwICRJgbc0dL7U4349vWLhF3UYUBosLiSvKNE31AKbaWG4gfG28IV372ggQRsY4G78Zb_kWgHUGDkXWXFlW3YQN0n8vLZAajG7pgvIt7vxIx4XqQo4')`
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-widest mb-4 inline-block">
              The Bawra Philosophy
            </span>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary mb-8 leading-tight">
              A Madness for <br /> <span className="text-tertiary italic">Baking Joy</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              In Hindi, "Bawra" means someone who is passionately obsessed, almost to the point of madness. That's exactly how we feel about our bakehouse.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10 leading-relaxed">
              We started in a small kitchen in Zirakpur with one mission: to prove that eggless doesn't mean compromise. Every recipe is a labor of love, tested hundreds of times to ensure that the texture is as light as a cloud and the flavor as deep as our devotion.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-[#1c1c19]">100% Pure Eggless Ingredients</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-[#1c1c19]">Locally Sourced Organic Flour</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-[#1c1c19]">Baked Fresh Every Single Morning</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

     
      <section className="py-24 bg-surface-container-highest paper-texture relative overflow-hidden" id="find-us">
   
        <div className="absolute top-0 left-0 w-full h-8 bg-background deckle-edge rotate-180" />

        <div className="max-w-container-max mx-auto px-margin-desktop">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            <div className="lg:col-span-5">
              <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary mb-6">
                Find Your <br />Sweet Spot
              </h2>
              
              <div className="space-y-8 mt-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary-container">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary uppercase mb-1">Our Address</h4>
                    <p className="font-body-lg text-body-lg text-on-surface">Shiva Complex, Zirakpur, Punjab</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary-container">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary uppercase mb-1">Opening Hours</h4>
                    <p className="font-body-lg text-body-lg text-on-surface">Mon - Sun: 9:00 AM - 10:00 PM</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary-container">call</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary uppercase mb-1">Contact</h4>
                    <p className="font-body-lg text-body-lg text-on-surface">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">

              <div className="bg-background p-10 rounded-[40px] shadow-sm border border-outline-variant/30">

                <h3 className="font-headline-md text-headline-md text-primary mb-8">Send us a Sweet Note</h3>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={sendEnquiry}>
                  <div className="md:col-span-1">
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Name</label>
                    <input
                      name="name"
                      value={note.name}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-colors outline-none text-[#1b1c17]"
                      placeholder="Your name"
                      type="text"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Email</label>
                    <input
                      name="email"
                      value={note.email}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-colors outline-none text-[#1b1c17]"
                      placeholder="Email address"
                      type="email"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Message</label>
                    <textarea
                      name="message"
                      value={note.message}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-colors outline-none text-[#1b1c17]"
                      placeholder="What's on your mind?"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <button
                      className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md hover:shadow-xl transition-all"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
