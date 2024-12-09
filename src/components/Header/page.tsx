import Link from 'next/link';

function Header() {
  return (
    <header>
        <nav className="flex flex-row items-center justify-between ">
            <ul className="flex flex-row items-center gap-10 ">
                <li><Link href="/">صفحه اصلی</Link></li>
                <li><Link href="/"> درباره ما</Link></li>
                <li><Link href="/"> محصولات</Link></li>
            </ul>
            <ul>
                <li><Link href="/signup"> ثبت نام</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header