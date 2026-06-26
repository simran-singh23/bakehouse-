import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cakeItems } from '../data/bakeryData'

const cakeLimit = 10

function Menu() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(cakeItems.length / cakeLimit)

  const start = (page - 1) * cakeLimit
  const pageCakes = cakeItems.slice(start, start + cakeLimit)

  function goPrevious() {
    setPage((oldPage) => Math.max(1, oldPage - 1))
  }

  function goNext() {
    setPage((oldPage) => Math.min(totalPages, oldPage + 1))
  }

  return (
    <section className="section-wrap">

      <div className="section-title">
        <p>Menu</p>
        <h2>Fresh Cake Options</h2>
      </div>

      <div className="mb-8 rounded-xl border border-[#d4c3be] bg-white p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#805062]">Signature cakes</p>
          <h3 className="mt-2 text-2xl font-black text-[#442a22]">Handpicked cakes for every sweet moment.</h3>
        </div>
        <p className="mt-4 max-w-2xl leading-7 text-[#504441] md:mt-0">

          Browse our fresh cake collection, choose your favourite flavour, and open the order page
          to customize weight, eggless preference, message and payment details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pageCakes.map((cake) => (
          <article
            key={cake.id}
            className="group overflow-hidden rounded-xl border border-[#d4c3be]/60 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#f0eee6]">
              <img
                src={cake.img}
                alt={cake.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                onError={(event) => {
                  event.currentTarget.src = cake.fallbackImg
                }}
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">

    
       <h3 className="text-xl font-black text-[#442a22]">{cake.name}</h3>
                <span className="shrink-0 rounded-full bg-[#ffd9e4] px-3 py-1 text-sm font-black text-[#65394b]">
                  Rs. {cake.price}
                </span>
              </div>
       
         <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
                <span className="rounded-full bg-[#f0eee6] px-3 py-1 text-[#805062]">Rating {cake.rating}</span>
                {cake.eggless && (
          <span className="rounded-full bg-[#cceacd] px-3 py-1 text-[#334d37]">Eggless</span>
                )}
              </div>
              <p className="mt-3 leading-7 text-[#504441]">{cake.desc}</p>
             
              <NavLink to={`/menu/${cake.id}`} className="btn-main mt-5">
                Order
              </NavLink>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
       
        <button className="pager-btn" type="button"   onClick={goPrevious} disabled={page === 1}>
          Back
        </button>

        <span className="rounded-full bg-white px-4 py-2 font-bold text-stone-700 shadow-sm">
          {page} / {totalPages}
        </span>
        <button className="pager-btn" type="button" onClick={goNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </section>
  )
}

export default Menu
