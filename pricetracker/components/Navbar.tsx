import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search'},
  { src: '/assets/icons/black-heart.svg', alt: 'heart' }
]

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center px-6 md:px-1 py-4">
        <Link href="/" className="flex items-center gap-1">
        {/* <Image 
        src="/assets/icons/logo.jpeg"
          width={27}
          height={27}
          alt="logo"
        /> */}

        <p className="font-spaceGrotesk text-[21px] text-secondary font-bold">
          Crawler<span className="text-primary">Mart</span>
          </p>
     </Link>

     <div className="flex items-center gap-5">
      {navIcons.map((icon) => (
        <Image 
        key={icon.alt}
        src={icon.src}
        alt={icon.alt}
        width={28}
        height={28}
        className="object-contain"
        />

      ))}
     </div>
      </nav>
    </header>
  )
}

export default Navbar