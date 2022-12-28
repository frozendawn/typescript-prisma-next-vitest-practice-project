import Card from "../components/Card";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import Pagination from "../components/Pagination";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import type { shopItem } from '../types/shopItem';
import { prisma } from "../prisma/client";
import { useState } from "react";

const fetchPageData = async (page: number) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page-results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page,
        "itemsPerPage": parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string)
      })
    })

    return await result.json();
  } catch (error) {
    console.log("Error fetching page results: ", error)
  }
}

interface Props {
  initialPageData: shopItem[] | null;
  totalAmount: number;
}

const Home: React.FC<Props> = ({initialPageData, totalAmount}) => {
  const [pageData, setPageData] = useState(initialPageData)
  //data-testid="home-element"
  return (
    <div className="container w-1200 h-screen bg-gray-dark my-0 mx-auto">
      <div className="grid py-xl grid-cols-4 gap-y-md justify-items-center">
        {
          pageData ?
            pageData.map((el, idx) => {
              return <Card key={idx} item={el}/>
            })
            : null
        }
      </div>
      <div>
        <Pagination totalAmount={totalAmount}/>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // await prisma.item.deleteMany({
  //   where: {
  //     id: {
  //       in: ['clbv6fpg70002ujncregkglmv']
  //     }
  //   }
  // })
  const { results } = await fetchPageData(0)
  const { totalAmount } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-total-amount`)).json();

  return {
    props: {
      initialPageData: results ? results : [],
      totalAmount
    }
  }
}


export default Home;
