function ProductCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-rose-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img src={item.img}
 alt={item.name}
       
 className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-bold text-stone-950">{item.name}</h3>

  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
            {item.price}
          </span>
        </div>
        <p className="mt-3 leading-7 text-stone-600">{item.desc}</p>
      </div>
    </article>
  )
}

export default ProductCard
