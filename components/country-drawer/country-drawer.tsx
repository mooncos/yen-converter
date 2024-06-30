import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer'
import currencyCountry from '../country-select/countries.json'
import { useConversionRateStore } from '../converter/rates-store'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { CheckIcon } from 'lucide-react'

export function CountryDrawer() {
	const { country, setCountry, validCountries } = useConversionRateStore()

	const countries = Object.entries(currencyCountry)
		.map(([key, country]) => {
			return { country: key, label: `${country} ${key.toUpperCase()}` }
		})
		.filter(
			(country) =>
				!!validCountries.find(
					(validCountry) => validCountry === country.country.toLowerCase(),
				),
		)

	const selectedCountry = countries.find((c) => c.country === country)?.label

	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	const [countryQuery, setCountryQuery] = React.useState<string>('')

	const filteredCountries = countries.filter((c) =>
		c.country.toLowerCase().includes(countryQuery.toLowerCase()),
	)

	const onCloseDrawer = () => {
		setIsOpen(false)
		setCountryQuery('')
	}

	const countryListContainer = React.useRef<HTMLDivElement | null>(null)

	return (
		<Drawer
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open)
				setCountryQuery('')
			}}
		>
			<Button
				variant='outline'
				onClick={() => {
					setIsOpen(true)
				}}
			>
				{selectedCountry}
			</Button>
			<DrawerContent>
				<div className='mx-auto w-[95%] max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>Convert to Currency</DrawerTitle>
						<DrawerDescription>
							Select currency to compare to Japanese Yen price
						</DrawerDescription>
					</DrawerHeader>
					<div className='flex flex-col space-y-2 p-2'>
						<Input
							placeholder='Search for currency...'
							value={countryQuery}
							onChange={(e) => {
								const value = e.currentTarget.value
								setCountryQuery(value)

								if (countryListContainer.current) {
									countryListContainer.current.scrollTop = 0
								}
							}}
						/>
						<ul className='w-[100%]'>
							<ScrollArea
								className='h-96 w-[100%] rounded-md border'
								ref={countryListContainer}
							>
								{filteredCountries.map((c, idx) => (
									<li key={c.country} className='w-[100%]'>
										<Button
											onClick={() => {
												setCountry(c.country)
												onCloseDrawer()
											}}
											size='lg'
											variant='ghost'
											className='rounded-none w-[100%] flex items-center text-left justify-between px-2'
										>
											{c.label}
											{c.country === country && <CheckIcon />}
										</Button>
										{idx < countries.length - 1 && <Separator />}
									</li>
								))}
							</ScrollArea>
						</ul>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
