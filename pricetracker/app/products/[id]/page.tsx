// used to fetch the product from it's id on the website

import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions"
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


type Props = {
  params: { id: string }
}
// fetching the products ID to get information about the product
const ProductDetails = async ({ params : { id } }: Props) => {
  const product: Product = await getProductById(id);
  
  if(!product) redirect('/')

  const similarProducts = await getSimilarProducts(id);

  return (
    // Contains the product image
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
      <Image
        src={product.image}
        alt={product.title}
        width={580}
        height={400}
        className="mx-auto"
      />
    </div>

    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
        <div className="flex flex-col gap-3">
          <p className="text-[28px] text-secondary font-semibold">
            {product.title}
            </p>
            {/* to visit product in new page */}
            <Link
              href={product.url}
              target="_blank" // to open in new tab
              className="text-base text-black opacity-50"
            >
            Visit Product
            </Link>
        </div>

        <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image 
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">{product.reviewsCount}

                </p>
        </div>

        <div className="p-2 bg-white-200 rounded-10">
          <Image
            src="/assets/icons/bookmark.svg"
            alt="bookmark"
            width={20}
            height={20}
          />
        </div>
        <div className="p-2 bg-white-200 rounded-10">
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
          />

        </div>
        </div>
        </div>
        <div className="product-info">
          <div className="flex flex-col gap-2">
          <p className="text-[34px] text-secondary font-bold">{product.currency} {formatNumber(product.currentPrice)}
          </p>
          <p className="text-[21px] text-black opacity-50 line-through font-bold">{product.currency} {formatNumber(product.originalPrice)}
          </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="product-stars">
                <Image
                src="/assets/icons/star.svg"
                alt="star"
                width={16}
                height={16}
                />
          <p className="text-sm text-primary-orange font-semibold">
            {product.stars || '4.1' || '3.9'}
          </p>
              </div>

          <div className="product-reviews">
            <Image 
            src="/assets/icons/comment.svg"
            alt="comments"
            width={16}
            height={16}
            />
            <p className="text-sm text-secondary font-semibold">
              {product.reviewsCount} Reviews
            </p>
          </div>
            </div>

            <p className="text-sm text-black opacity-80">
              <span className="text-cyan-800 font-semibold">93% </span> of
              buyers have recommended this
            </p>
          </div>
        </div>
        <div className="my-7 flex flex-col gap-5">
          <div className="flex gap-5 flex-wrap">

           {/* Information Card */}

            <PriceInfoCard
              title="Current Price"
              iconSrc="/assets/icons/price-tag.svg"
              value={`${product.currency} ${formatNumber(product.currentPrice)}`}
            />

            <PriceInfoCard
              title="Average Price"
              iconSrc="/assets/icons/chart.svg"
              value={`${product.currency} ${formatNumber(product.averagePrice)}`}
            />

            <PriceInfoCard
              title="Highest Price"
              iconSrc="/assets/icons/arrow-up.svg"
              value={`${product.currency} ${formatNumber(product.highestPrice)}`}
            />

            <PriceInfoCard
              title="Lowest Price"
              iconSrc="/assets/icons/arrow-down.svg"
              value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
            />
          </div>
        </div>

        <Modal productId={id} />
        </div>
        </div>
        {/* Product and Description */}
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl text-secondary font-semibold">
              Description of Product
            </h3>


          <div className="flex flex-col space-y-1 ">
            {product?.description?.split('\n')}

          </div>
</div>

      {/* Buy now Btn */}
          <button className="btn w-fit mx-auto flex items-center justify-center
          gap-3 min-w-[200px]">
            <Image
            src="/assets/icons/bag.svg"
            alt="check"
            width={22}
            height={22}
            />
            <Link
              href={product.url}
              target="_blank" // to open in new tab
              className="text-base text-white"
            >
            Buy now
            </Link>
            </button>
        </div>

        {similarProducts && similarProducts?.length > 0 && (
          <div className="py-14 flex flex-col gap-2 w-full">
            <p className="section-text">Similar Products</p>

            <div className="flex flex-wrap gap-10 mt-7 w-full"> 
              {similarProducts.map((product) => (
                // Importing ProductCard component here
                <ProductCard key={product._id} product={product} />
              ))}
              </div>
            </div>
        )}

        </div>
  )
}

export default ProductDetails;