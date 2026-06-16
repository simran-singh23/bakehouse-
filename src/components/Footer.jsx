function Footer() {
  return (
    <footer className="footer-wave bg-stone-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-black">Bawra Bake House</h2>
          <p className="mt-3 text-stone-300">Cakes, desserts and savouries baked fresh in Zirakpur.</p>
        </div>
        <div>
          <h3 className="font-bold text-amber-200">Shop</h3>
          <p className="mt-3 text-stone-300">Shiva Enclave, Patiala Chowk, Zirakpur</p>
        </div>
        <div>
          <h3 className="font-bold text-amber-200">Best for</h3>
          <p className="mt-3 text-stone-300">Birthdays, parties, tea time snacks and sweet cravings.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
