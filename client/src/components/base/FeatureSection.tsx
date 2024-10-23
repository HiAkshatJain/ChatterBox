import React from "react";
import FeatureCard from "../core/FeatureCard";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <FeatureCard
        icon="🌐"
        title="Global Connectivity"
        description="Chat with friends and colleagues anywhere, anytime."
      />
      <FeatureCard
        icon="🛡️"
        title="Privacy First"
        description="Your conversations are encrypted and secure."
      />
      <FeatureCard
        icon="🔒"
        title="Secure"
        description="Passcode protection for your private conversations."
      />
      <FeatureCard
        icon="📱"
        title="Seamless Experience"
        description="Enjoy smooth performance on all your devices."
      />
      <FeatureCard
        icon="📅"
        title="Scheduled Chats"
        description="Plan your conversations with built-in scheduling."
      />
      <FeatureCard
        icon="🚀"
        title="Instant Setup"
        description="Generate a room link in seconds. No account required."
      />
    </section>
  );
}
