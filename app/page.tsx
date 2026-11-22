 import prisma from "@/lib/db";
import {
   Navbar,
   Hero,
   TrustBar,
   HowItWorks,
   Features,
   ResultsPreview,
   Transparency,
   FAQ,
   FinalCTA,
   Footer,
 } from "../components/landing";

export default async function HomePage() {
  // const data=await prisma.state.findMany()

  // console.log(data)
  return (
    <>
      <Navbar/>
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Features />
        <ResultsPreview />
        <Transparency />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
