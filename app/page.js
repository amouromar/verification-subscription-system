import Verify from "./views/verify/page";
import Header from "./component/Header";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <Verify />
      </main>
      <Footer />
    </div>
  );
}

