import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { cakeItems } from '../data/bakeryData'

const ownerWhatsappNumber = '917626900391'

function CakeDetail() {
  const { cakeId } = useParams()
  const cake = cakeItems.find((item) => item.id === cakeId)
  const relatedCakes = cakeItems.filter((item) => item.id !== cakeId).slice(0, 4)

  const [order, setOrder] = useState({
    customerName: '',
    phone: '',
    address: '',
    weight: '1 Kg',
    eggless: 'Yes',
    message: '',
    date: '',
    payment: 'Cash on Pickup',
  })

  if (!cake) {
    return (
      <section className="section-wrap text-center">
        <h2 className="text-4xl font-black text-stone-950">Cake not found</h2>
        <NavLink to="/menu" className="btn-main mt-6">
          Back to Menu
        </NavLink>
      </section>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setOrder((oldOrder) => ({
      ...oldOrder,
      [name]: value,
    }))
  }

  function confirmOrder(event) {
    event.preventDefault()

    const orderDetail = {
      cakeName: cake.name,
      cakePrice: `Rs. ${cake.price}`,
      cakeRating: cake.rating,
      cakePhoto: cake.img,
      customer: order,
      totalNote: 'Final amount can change with weight, design and delivery.',
    }

    console.log('Bawra Bake House Cake Order:', orderDetail)

    const whatsappMessage = `
New Cake Order - Bawra Bake House

Cake: ${cake.name}
Price: Rs. ${cake.price}
Rating: ${cake.rating}
Weight: ${order.weight}
Eggless: ${order.eggless}

Customer Name: ${order.customerName}
Phone: ${order.phone}
Address: ${order.address || 'Not added'}
Pickup Date: ${order.date || 'Not selected'}
Cake Message / Design: ${order.message || 'No message'}
Payment: ${order.payment}

Note: Final amount can change with weight, design and delivery.
`

    const whatsappLink = `https://wa.me/${ownerWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappLink, '_blank')
  }

  return (
    <section className="section-wrap">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-stone-500">
        <NavLink to="/menu" className="transition hover:text-[#5d4037]">
          Back to menu
        </NavLink>
        <span>/</span>
        <span className="text-[#5d4037]">{cake.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          <div className="group overflow-hidden rounded-xl border border-[#d4c3be]/70 bg-[#f0eee6] shadow-sm">
            <img
              src={cake.img}
              alt={cake.name}
              className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.src = cake.fallbackImg
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[cake.img, ...relatedCakes.slice(0, 2).map((item) => item.img)].map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="aspect-square overflow-hidden rounded-lg border border-[#d4c3be]/70 bg-white"
              >
                <img
                  src={image}
                  alt={`${cake.name} preview ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = cake.fallbackImg
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <span className="inline-flex rounded-full bg-[#ffd9e4] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#65394b]">
              Fresh bakery order
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#442a22] md:text-5xl">
              {cake.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-3xl font-black text-[#442a22]">Rs. {cake.price}</p>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#805062] shadow-sm">
                Rating {cake.rating}
              </span>
              {cake.eggless && (
                <span className="rounded-full bg-[#cceacd] px-3 py-1 text-sm font-bold text-[#334d37]">
                  Eggless available
                </span>
              )}
            </div>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#504441]">
              {cake.desc} Specially eggless option bhi available hai. Customer apna flavour note,
              cake message, pickup date and payment method fill karke order confirm kar sakta ho.
            </p>
          </div>

          <div className="mb-6 grid gap-3 border-y border-[#d4c3be] py-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#827470]">Availability</p>

              <p className="mt-1 font-semibold text-[#334d37]">Fresh pickup or delivery</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#827470]">Order note</p>

              <p className="mt-1 font-semibold text-[#504441]">Final amount depends on custom detail</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#d4c3be] bg-white p-5 shadow-sm md:p-6">

            <p className="text-xs font-black uppercase tracking-widest text-[#805062]">Order form</p>

            <h2 className="mt-2 text-2xl font-black text-[#442a22]">Fill cake details</h2>

            <form className="mt-6 grid gap-4" onSubmit={confirmOrder}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="field"name="customerName" onChange={handleChange}  placeholder="Customer name"
                  required
                  value={order.customerName}
                />
                <input className="field"name="phone" onChange={handleChange} placeholder="Phone number"  required
                  value={order.phone}
                />
              </div>
              <input className="field" name="address" onChange={handleChange}placeholder="Pickup / delivery address"
                value={order.address}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <select className="field" name="weight" onChange={handleChange} value={order.weight}>
              <option>0.5 Kg</option>
              <option>1 Kg</option>
               <option>1.5 Kg</option>
             <option>2 Kg</option>
       <option>3 Kg</option>
                </select>
              
                <select className="field" name="eggless" onChange={handleChange} value={order.eggless}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <textarea
                className="field min-h-28"

                name="message"
                onChange={handleChange}
                placeholder="Message on cake / design detail"
                value={order.message}
              />
              <input className="field" name="date" onChange={handleChange} type="date" value={order.date} />

              <div className="rounded-lg bg-[#f5f4ec] p-4">
              
                <h3 className="font-black text-[#442a22]">Payment</h3>
                <select className="field mt-3" name="payment" onChange={handleChange} value={order.payment}>
                  <option>Cash on Pickup</option>
                  <option>UPI on Pickup</option>
                  <option>Card at Shop</option>
                </select>
                <p className="mt-3 text-sm leading-6 text-[#504441]">
                  apka order confirm ho gya hai please wait
                </p>
              </div>

              <button
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#442a22] px-6 font-black uppercase tracking-wider text-white shadow-lg shadow-stone-900/15 transition hover:bg-[#5d4037] active:scale-[0.98] sm:w-fit"
                type="submit"
              >
                Confirm Order on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#442a22]">More fresh picks</h2>
            <p className="mt-1 text-[#504441]">Recommended from the same cake collection</p>
          </div>
          <NavLink to="/menu" className="hidden text-sm font-black text-[#805062] transition hover:text-[#442a22] sm:block">
            View all
          </NavLink>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedCakes.map((item) => (

            <NavLink key={item.id} to={`/menu/${item.id}`} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#f0eee6] shadow-sm">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = item.fallbackImg
                  }}
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <h3 className="font-black text-[#442a22] transition group-hover:text-[#805062]">{item.name}</h3>
                <p className="shrink-0 font-black text-[#442a22]">Rs. {item.price}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </section>
  )
}

export default CakeDetail
