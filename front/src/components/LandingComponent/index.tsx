'use client';

import Image from "next/image";
import Link from "next/link";

export default function LandingHomeComponent() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/chromia.png" // Adjusted for your image
          alt="Chromia Blockchain"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
          Empower Your To-Do List with Chromia
        </h2>
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          Experience the seamless integration of task management with
          blockchain technology. Organize, secure, and scale your goals like
          never before.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
        <Link href="/" passHref>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition" aria-label="Get Started with the To-Do dApp">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-base">{description}</p>
    </div>
  );
}
