import ProductDetails from '@/components/modules/SingleProduct/ProductDetails'

const SingleProductDetails = async ({ params }) => {
	const { id } = await params

	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`, {
		cache: 'no-store',
	})

	const products = await res.json()

	const product = products.find((item) => item.id === Number(id))

	if (!product) {
		return (
			<div className='p-10 text-center text-red-500'>Product not found</div>
		)
	}

	return (
		<section>
			<ProductDetails product={product} />
		</section>
	)
}

export default SingleProductDetails
