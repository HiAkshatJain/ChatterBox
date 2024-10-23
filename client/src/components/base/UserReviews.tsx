import Testimonials from "../core/Testimonials";

const testimonials = [
  {
    name: "Alice Johnson",
    title: "Community Manager at TechCo",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU3WlcdnneocMYI4EczlHJfed5DXpbNMJKIQ&s",
    quote:
      "Chatter Box has transformed the way our team communicates. The ease of use and flexibility is unmatched!",
  },
  {
    name: "Michael Lee",
    title: "Product Designer at Creative Solutions",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXpY2KxjcKDRq9QLbo0uqXkmT1tbxREgOt8A&s",
    quote:
      "The integration was seamless! I was able to set up our group chat in no time.",
  },
  {
    name: "David Thompson",
    title: "Software Engineer at CodeCraft",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9GFcYYBlO9bXtNf0FEnaHPuyU8zwtyMgDg&s",
    quote:
      "The collaboration features are fantastic! It feels like we're in the same room.",
  },
  {
    name: "David Martinez",
    title: "CTO at Innovatech",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vLGmjYvmTcL39HXnfAXWmg7rTToZnZudOQ&s",
    quote:
      "An essential tool for our remote team. Highly recommend for anyone looking to enhance their communication!",
  },
];

const UserReviews = () => {
  return (
    <div>
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default UserReviews;
