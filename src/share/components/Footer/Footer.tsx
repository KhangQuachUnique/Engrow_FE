import logo from "@/assets/Logo.webp";

const FOOTER_SECTIONS = [
  {
    title: "Product",
    items: ["Writing", "Vocabulary", "Progress"],
  },
  {
    title: "Learning",
    items: ["Essay types", "Band", "Feedback Guide"],
  },
  {
    title: "Account",
    items: ["Profile", "Settings", "Help Center"],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.7fr)_repeat(3,minmax(0,0.8fr))] lg:px-10 lg:py-14">
        <div className="max-w-[22rem]">
          <img src={logo} alt="Engrow" className="h-[60px] w-[120px] object-contain" />
          <p className="mt-3 max-w-md font-heading text-[13px] font-bold leading-[18px] text-text-main">
            Build better IELTS writing habits with focused practice, feedback, and vocabulary review.
          </p>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h2 className="font-heading text-[13px] font-bold leading-[18px] text-text-strong">
              {section.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {section.items.map((item) => (
                <li key={item} className="font-heading text-[13px] font-medium leading-[18px] text-text-main">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
