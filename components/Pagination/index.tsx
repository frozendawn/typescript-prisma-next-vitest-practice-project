
interface Props {
  totalAmount?: number;
  currentPage?: number;
}

const Pagination:React.FC<Props> = ({totalAmount = 90, currentPage = 0}) => {

  const totalAmountOfPages: number = Math.ceil(totalAmount / parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string));

  const result = () => {
    const pageList = [];
    for (let i = 0; i < totalAmountOfPages; i++) {
      const page = <div key={i}><span className={`cursor-pointer text-3xl ${ i === currentPage ? 'text-pink' : ''}`}>{i + 1}</span></div>
      pageList.push(page)
    }
    return pageList;
  }
  return (
    <div className="flex justify-center gap-s my-md ">
      {result()}
    </div>
  )
}

export default Pagination

