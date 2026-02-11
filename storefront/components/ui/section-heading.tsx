interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} mb-10`}>
      {subtitle && (
        <p className="font-display text-sm italic text-gold-500">{subtitle}</p>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-neutral-500 lg:text-lg">{description}</p>
      )}
    </div>
  );
}
