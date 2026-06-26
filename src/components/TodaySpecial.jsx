import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const deals = [
  {
    title: 'Cake Combo',
    text: 'Half kg fresh cream cake with 4 cupcakes.',
    badge: 'Popular',
    link: '/menu',
  },
  {
    title: 'Dessert Box',
    text: 'Brownies, mousse cups and mini pastry mix.',
    badge: 'Sweet',
    link: '/desserts',
  },

  {
    title: 'Ice Cream Corner',
    text: 'Hocco cups, cones, bars, kulfi and party packs.',
    
    badge: 'Chill',
    link: '/ice-creams',
  },
]

function TodaySpecial() {
  const [activeDeal, setActiveDeal] = useState(0)

  const navigate = useNavigate()

  function openDeal(index, link) {

    setActiveDeal(index)

    navigate(link)
  }

  return (
    <section className="special-strip">

      <div className="section-wrap py-14">
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">

          <div>
            <p className="tag">Today special</p>

            <h2 className="mt-3 text-4xl font-black text-stone-950">Fresh deals on the counter.</h2>

            <p className="mt-4 leading-8 text-stone-600">
              Tap any box and see active item. Simple animation, but thoda lively bakery feel aa janda.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {deals.map((deal, index) => (
              <button
                key={deal.title}

                type="button"

                onClick={() => openDeal(index, deal.link)}

                className={`deal-card ${activeDeal === index ? 'deal-card-active' : ''}`}
              >
                <span>{deal.badge}</span>
                <h3>{deal.title}</h3>
                <p>{deal.text}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TodaySpecial
