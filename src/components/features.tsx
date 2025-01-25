import { Zap, Users, BarChart } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Video Visualization",
    description: "You learn better when someone draws images of that topic, right? That's what our chatbot does!",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Doing Quizzes",
    description: "Thinking of doing quizzes? Just type '/quiz' and give it a topic, it'll generate a quiz for you.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "English is Difficult",
    description: "English is difficult to understand? Our chatbot is multilingual.",
  },
]

const Features = () =>{
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features;