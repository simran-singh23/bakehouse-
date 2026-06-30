import { NavLink } from 'react-router-dom'
import { brownieItems } from '../data/bakeryData'

function Brownies() {
  return (
    <section className="section-wrap">
      <div className="section-title">
        <p>Brownies</p>
        <h2>Fresh Brownie Boxes</h2>
      </div>

      <div className="mb-8 rounded-xl border border-[#d4c3be] bg-white p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#805062]">Brownie counter</p>

          <h3 className="mt-2 text-2xl font-black text-[#442a22]">Fudgy picks for gifting and cravings.</h3>

        </div>
        <p className="mt-4 max-w-2xl leading-7 text-[#504441] md:mt-0">
          

          Select a brownie, add quantity and delivery details, then send the order directly to
          Bawra Bakehouse on WhatsApp.

        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brownieItems.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-xl border border-[#d4c3be]/60 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#f0eee6]">
              <img
                src={item.img}
                alt={item.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">

                <h3 className="text-xl font-black text-[#442a22]">{item.name}</h3>

                <span className="shrink-0 rounded-full bg-[#ffd9e4] px-3 py-1 text-sm font-black text-[#65394b]">
                  Rs. {item.price}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
                <span className="rounded-full bg-[#f0eee6] px-3 py-1 text-[#805062]">Rating {item.rating}</span>
                <span className="rounded-full bg-[#cceacd] px-3 py-1 text-[#334d37]">Eggless</span>
              </div>
              <p className="mt-3 leading-7 text-[#504441]">{item.desc}</p>

              <NavLink to={`/brownies/${item.id}`} className="btn-main mt-5">
                Order
              </NavLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Brownies
