import { CartProductProps } from "@/lib/typings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from 'next/image'
function CartProduct({ product, itemValueID }: { itemValueID: number, product: CartProductProps }) {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${itemValueID}`}>
          <AccordionTrigger><div className='w-full flex items-center space-x-3'>
            <Image src={product.image} alt={product.title} width={100} height={100} className='object-cover' />
            </div></AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      CartProductProps
    </>
  );
}

export default CartProduct;
