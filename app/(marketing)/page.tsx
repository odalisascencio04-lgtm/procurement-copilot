import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DashboardPreview from "@/components/landing/DashboardPreview";
import TrustSection from "@/components/landing/TrustSection";
import AIDemo from "@/components/landing/AIDemo";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";


export default function Home(){

    return (
        <>
        <Navbar />
        
        <Hero />
        
        <Features />
        
        <DashboardPreview />
        
        <TrustSection />
        
        <AIDemo />
        
        <Pricing />
        
        
        </>
        )

}