import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import NotFound from "./pages/not-found";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Arkaplan */}
        <div className="fixed inset-0 bg-linear-to-br from-dark-bg via-black-100 to-dark-bg -z-10" />

        {/* Işık Hüzmeleri */}
        <div className="fixed top-20 left-20 size-72 bg-primary-blue/20 rounded-full animate-pulse blur-xl" />

        <div
          className="fixed bottom-20 right-20 size-72 bg-accent/20 rounded-full animate-pulse blur-xl"
          style={{ animationDelay: "1s" }}
        />

        <Header />

        <main className="relative z-10 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
