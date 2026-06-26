import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { cakeItems, dessertItems, iceCreamItems } from '../data/bakeryData'

const ownerWhatsappNumber = '917626900391'

const productGroups = {
  cake: {
    items: cakeItems,
    backLink: '/menu',
    backText: 'Back to menu',
    label: 'Cake',
    heading: 'Fill cake details',
    optionLabel: 'Eggless',
    optionName: 'eggless',
    options: ['Yes', 'No'],
    messagePlaceholder: 'Message on cake / design detail',
  },
  dessert: {
    items: dessertItems,
    backLink: '/desserts',
    backText: 'Back to desserts',
    label: 'Dessert',
    heading: 'Fill dessert details',
    optionLabel: 'Eggless',
    optionName: 'eggless',
    options: ['Yes', 'No'],
    messagePlaceholder: 'Packing note / flavour mix / message',
  },
  ice: {
    items: iceCreamItems,
    backLink: '/ice-creams',
    backText: 'Back to ice creams',
    label: 'Ice Cream',
    heading: 'Fill ice cream details',
    optionLabel: 'Pack',
    optionName: 'pack',
    options: ['Single', 'Family Pack', 'Party Pack'],
    messagePlaceholder: 'Flavour note / quantity / delivery note',
  },
}

function ProductDetail({ type }) {
  const { itemId } = useParams()
  const group = productGroups[type]
  const product = group.items.find((item) => item.id === itemId)
  const relatedItems = group.items.filter((item) => item.id !== itemId).slice(0, 4)

  const [order, setOrder] = useState({
    customerName: '',
    phone: '',
    address: '',
    weight: type === 'ice' ? '1 Pack' : '1 Kg',
    eggless: 'Yes',
    pack: 'Single',
    message: '',
    date: '',
    payment: 'Cash on Pickup',
  })

  if (!product) {
    return (
      <section className="section-wrap text-center">
        <h2 className="text-4xl font-black text-stone-950">{group.label} not found</h2>
        <NavLink to={group.backLink} className="btn-main mt-6">
          {group.backText}
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

    const selectedOption = order[group.optionName]
    const orderDetail = {
      productType: group.label,
      productName: product.name,
      productPrice: `Rs. ${product.price}`,
      productRating: product.rating,
      productPhoto: product.img,
      customer: order,
      totalNote: 'Final amount can change with weight, design, quantity and delivery.',
    }

    console.log(`Bawra Bake House ${group.label} Order:`, orderDetail)

    const whatsappMessage = `
New ${group.label} Order - Bawra Bake House

Item: ${product.name}
Price: Rs. ${product.price}
Rating: ${product.rating}
Weight / Quantity: ${order.weight}
${group.optionLabel}: ${selectedOption}

Customer Name: ${order.customerName}
Phone: ${order.phone}
Address: ${order.address || 'Not added'}
Pickup Date: ${order.date || 'Not selected'}
Order Note: ${order.message || 'No message'}
Payment: ${order.payment}

Note: Final amount can change with weight, design, quantity and delivery.
`

    const whatsappLink = `https://wa.me/${ownerWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappLink, '_blank')
  }

  return (
    <section className="section-wrap">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-stone-500">
        <NavLink to={group.backLink} className="transition hover:text-[#5d4037]">
          {group.backText}
        </NavLink>
        <span>/</span>
        <span className="text-[#5d4037]">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          <div className="group overflow-hidden rounded-xl border border-[#d4c3be]/70 bg-[#f0eee6] shadow-sm">
            <img
              src={product.img}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
              onError={(event) => {
                if (product.fallbackImg) {
                  event.currentTarget.src = product.fallbackImg
                }
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[product.img, ...relatedItems.slice(0, 2).map((item) => item.img)].map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="aspect-square overflow-hidden rounded-lg border border-[#d4c3be]/70 bg-white"
              >
                <img
                  src={image}
                  alt={`${product.name} preview ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    if (product.fallbackImg) {
                      event.currentTarget.src = product.fallbackImg
                    }
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
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-3xl font-black text-[#442a22]">Rs. {product.price}</p>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#805062] shadow-sm">
                Rating {product.rating}
              </span>
              {product.eggless && (
                <span className="rounded-full bg-[#cceacd] px-3 py-1 text-sm font-bold text-[#334d37]">
                  Eggless available
                </span>
              )}
            </div>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#504441]">
              {product.desc} Fill your order detail, choose payment method and send it directly to
              Bawra Bake House on WhatsApp.
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
            <h2 className="mt-2 text-2xl font-black text-[#442a22]">{group.heading}</h2>

            <form className="mt-6 grid gap-4" onSubmit={confirmOrder}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="field" name="customerName" onChange={handleChange} placeholder="Customer name" required value={order.customerName} />
                <input className="field" name="phone" onChange={handleChange} placeholder="Phone number" required value={order.phone} />
              </div>
              <input className="field" name="address" onChange={handleChange} placeholder="Pickup / delivery address" value={order.address} />

              <div className="grid gap-4 sm:grid-cols-2">
                <select className="field" name="weight" onChange={handleChange} value={order.weight}>
                  <option>{type === 'ice' ? '1 Pack' : '0.5 Kg'}</option>
                  <option>{type === 'ice' ? '2 Packs' : '1 Kg'}</option>
                  <option>{type === 'ice' ? '3 Packs' : '1.5 Kg'}</option>
                  <option>{type === 'ice' ? '5 Packs' : '2 Kg'}</option>
                  <option>{type === 'ice' ? '10 Packs' : '3 Kg'}</option>
                </select>
                <select className="field" name={group.optionName} onChange={handleChange} value={order[group.optionName]}>
                  {group.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <textarea className="field min-h-28" name="message" onChange={handleChange} placeholder={group.messagePlaceholder} value={order.message} />
              <input className="field" name="date" onChange={handleChange} type="date" value={order.date} />

              <div className="rounded-lg bg-[#f5f4ec] p-4">
                <h3 className="font-black text-[#442a22]">Payment</h3>
                <select className="field mt-3" name="payment" onChange={handleChange} value={order.payment}>
                  <option>Cash on Pickup</option>
                  <option>UPI on Pickup</option>
                  <option>Card at Shop</option>
                </select>
                <p className="mt-3 text-sm leading-6 text-[#504441]">
                  Confirm karne ke baad WhatsApp open hoga with full order detail.
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
            <p className="mt-1 text-[#504441]">Recommended from the same collection</p>
          </div>
          <NavLink to={group.backLink} className="hidden text-sm font-black text-[#805062] transition hover:text-[#442a22] sm:block">
            View all
          </NavLink>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedItems.map((item) => (
            <NavLink key={item.id} to={`${group.backLink}/${item.id}`} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#f0eee6] shadow-sm">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(event) => {
                    if (item.fallbackImg) {
                      event.currentTarget.src = item.fallbackImg
                    }
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

export default ProductDetail
