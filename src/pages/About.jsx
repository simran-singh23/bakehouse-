function About() {
  return (
    <section className="section-wrap grid gap-8 md:grid-cols-2 md:items-center">
      <img
        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
        alt="Fresh bakery counter"
        className="h-[430px] w-full rounded-lg object-cover shadow-lg"
      />
      <div>
        <p className="tag">About us</p>
        <h2 className="mt-3 text-4xl font-black text-stone-950">Your nearby bake house in Zirakpur.</h2>
        <p className="mt-5 leading-8 text-stone-600">
          Bawra Bake House is made for people who want fresh, neat and tasty bakery items without
          making it complicated. Cakes, desserts and savouries are prepared with care for daily
          customers and small celebrations.
        </p>
      </div>
    </section>
  )
}

export default About
