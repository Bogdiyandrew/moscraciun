import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Story from './components/Story';
import FAQ from './components/FAQ';
import OrderForm from './components/OrderForm';

export default function Home() {
  return (
    <main className="bg-background min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <HowItWorks />
      <Story />
      <FAQ />
      <OrderForm />
    </main>
  );
}