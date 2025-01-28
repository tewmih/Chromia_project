import Image from "next/image";
import Link from "next/link";

export default function LandingHomeComponent() {
  return (
    <div className="relative flex-1 min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 ">
        <Image
          src="/chromia.png" // Ensure this is in the public folder
          alt="Chromia Blockchain background image"
          fill
          className="object-cover blur-sm" // Adds the blur effect
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative w-full max-w-4xl px-4 text-center">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold mb-4 tracking-tight">
          Empower Your To-Do List with Chromia
        </h2>
        <p className="text-base sm:text-lg text-gray-200 mb-6">
          Experience the seamless integration of task management with blockchain
          technology. Organize, secure, and scale your goals like never before.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FeatureCard
            title="Secure & Reliable"
            description="Blockchain-powered for unmatched security and reliability."
          />
          <FeatureCard
            title="Scalable Management"
            description="Effortlessly scale tasks across multiple projects."
          />
          <FeatureCard
            title="Decentralized Efficiency"
            description="Ensure transparency and speed with Chromia."
          />
          <FeatureCard
            title="Innovative Integration"
            description="Combine task management with groundbreaking blockchain solutions."
          />
        </div>

        {/* Call to Action */}
        <Link
          href="/"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
          aria-label="Get Started with the To-Do dApp"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
