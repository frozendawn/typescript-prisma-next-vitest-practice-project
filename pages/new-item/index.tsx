import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

const NewItem = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Category"/>
        <input type="text" placeholder="Name"/>
        <input type="text" placeholder="Description"/>
        <input type="text" placeholder="Image url"/>
        <input type="text" placeholder="Price"/>
        <button>Add</button>
      </form>
    </div>
  )
}

export default NewItem

// "category": "guns",
// "name": "JG0449A AU-2G [J.G.WORKS]",
// "description": "test123",
// "imageUrl": "https://www.taiwangun.com/img/imagecache/12001-13000/8e9d8d580bda52125378aa25c28b09e207571e7e.webp",
// "price": "185.14€",
// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsYXk3bGVoODAwMDB1anlrbDk0dWVia3EiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MTQ3NzIyMCwiZXhwIjoxNjcxNDc3MjMwfQ.Gzd59QDi7aGMOBzgvy8E-Yti6TuI9uYBuBT_NGpOGO4"


export const getStaticProps: GetStaticProps = async (context) => {

  return {
    props: {

    }
  }

}
