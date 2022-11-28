import Card from "../components/Card";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const Home = () => {
  return (
    <div className="container w-1200 h-screen bg-gray-dark my-0 mx-auto">
      <div data-testid="home-element" className="text-3xl font-bold underline text-red-500">
        Welcome
      </div>
      <div className="grid grid-cols-4 gap-y-md justify-items-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
