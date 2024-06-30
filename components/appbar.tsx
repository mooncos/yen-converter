import Link from 'next/link'
import { useRouter } from 'next/router'
import { CountrySelect } from './country-select/country-select'
import { CountryDrawer } from './country-drawer/country-drawer'
import { YennyLogo } from './yenny-logo'

const links = [
	{ label: 'Story', href: '/story' },
	{ label: 'Recipes', href: '/recipes' },
]

const Appbar = () => {
	const router = useRouter()

	return (
		<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
			<header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
					<Link href='/' className='flex space-x-2 items-center'>
						<YennyLogo height={20} width='auto' />
						<h1 className='font-bold'>Yenny</h1>
					</Link>
					<nav className='flex items-center space-x-6'>
						<CountryDrawer />
						<div className='hidden sm:block'>
							<div className='flex items-center space-x-6'>
								{/* {links.map(({ label, href }) => (
									<Link
										key={label}
										href={href}
										className={`text-sm ${
											router.pathname === href
												? 'text-indigo-500 dark:text-indigo-400'
												: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
										}`}
									>
										{label}
									</Link>
								))} */}
							</div>
						</div>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
