import Button from "./button";

const Hero = () => {
    return (
        <>
        <section className="py-20 text-black">
        <div className="h-screen grid items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">MindLoom</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
        A Personalized AI agent for next generation learning
        </p>
        <Button title={"Chat with MindLoom"} />
        </div>
        
      </div>
    </section>
        </>
    )
}

export default Hero;